require("dotenv").config();
const { Student } = require("../models/studentModel");
const { Books } = require("../models/booksModel");
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, total_books, reg_roll, books } = req.body;

  // console.log("books", books);

  try {
    let user = await Student.findOne({ email, reg_roll });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const books_id = books.map((book) => book.code);
    const books_name = books.map((book) => book.name);

    for (let i = 0; i < books_name.length; i++) {
      let book_in_db = await Books.findOne({ name: books_name[i] });
      let issue_books = book_in_db.quantity - 1;
      await Books.updateOne(
        { _id: book_in_db._id },
        { $set: { quantity: issue_books } }
      );
    }

    const updatedBooksId = [...user.books_id, ...books_id];
    const updatedBooksName = [...user.books_name, ...books_name];

    await Student.updateOne(
      { email, reg_roll },
      { $set: { books_id: updatedBooksId } }
    );

    await Student.updateOne(
      { email, reg_roll },
      { $set: { books_name: updatedBooksName } }
    );

    const totalBooks = user.total_books + total_books;

    await Student.updateOne(
      { email, reg_roll },
      { $set: { total_books: totalBooks } }
    );

    sendEmail({
      name: user.name,
      books_name: books_name,
      total_books: total_books,
      totalBooks,
      email,
    });

    res.status(200).send({ message: "Books issued successfully" });
  } catch (error) {
    console.error("Error issuing books:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const sendEmail = async ({
  name,
  books_name,
  total_books,
  totalBooks,
  email,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nkumar35101@gmail.com", // Your Gmail email address
      pass: process.env.NODE_MAILER_PASSWORD, // Your Gmail App Password
    },
  });

  await transporter.sendMail({
    from: '"LNJPIT Library🚀🔥" libraryLNJPIT@gmail.com',
    to: email,
    subject: `Books Issued - ${name}`,
    html: generateEmailTemplate({ name, books_name, total_books, totalBooks }),
  });
};

const generateEmailTemplate = ({
  name,
  books_name,
  total_books,
  totalBooks,
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <!-- Include any necessary meta tags or styles -->
    </head>
    <body>
      <div class="container">
        <h1>Hello, ${name}!</h1>
        <p>We are excited to let you know that you have successfully issued books from the Library LNJPIT.</p>
        
        <p><strong>Issued Books:</strong></p>
        <ul>
          ${books_name.map((book) => `<li>${book}</li>`).join("")}
        </ul>
        
        <p><strong>Current Issued Books:</strong> ${total_books}</p>

        <p><strong>Total Issued Books:</strong> ${totalBooks}</p>

        <p>Please ensure to return the books on time to avoid any late fees.</p>

        <p>Thank you for using the Library LNJPIT services. If you have any questions or need assistance, feel free to contact us.</p>

        <p>Have a great day 😊</p>

      </div>
    </body>
    </html>
  `;
};

module.exports = router;
