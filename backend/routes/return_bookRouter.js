require("dotenv").config();
const { Student } = require("../models/studentModel");
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, total_books, reg_roll, books_id } = req.body;

  try {
    let user = await Student.findOne({ email, reg_roll });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValidReturn = books_id.every((bookId) =>
      user.books_id.includes(bookId)
    );

    if (!isValidReturn) {
      return res
        .status(400)
        .json({
          error:
            "Invalid book return. Ensure the returning books that were issued.",
        });
    }

    const updatedBooksId = user.books_id.filter(
      (bookId) => !books_id.includes(bookId)
    );

    await Student.updateOne(
      { email, reg_roll },
      { $set: { books_id: updatedBooksId } }
    );

    const totalBooks = user.total_books - total_books;

    await Student.updateOne(
      { email, reg_roll },
      { $set: { total_books: totalBooks } }
    );

    sendEmail({
      name: user.name,
      books_id: books_id,
      total_books: total_books,
      totalBooks,
      email,
    });

    res.status(200).send({ message: "Books returned successfully" });
  } catch (error) {
    console.error("Error returning books:", error);
    res
      .status(500)
      .send({ error: "Internal Server Error", details: error.message });
  }
});

const sendEmail = async ({
  name,
  books_id,
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
    subject: `Books Returned - ${name}`,
    html: generateEmailTemplate({ name, books_id, total_books, totalBooks }),
  });
};

const generateEmailTemplate = ({ name, books_id, total_books, totalBooks }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <!-- Include any necessary meta tags or styles -->
    </head>
    <body>
      <div class="container">
        <h1>Hello, ${name}!</h1>
        <p>We hope you're doing well. This is to inform you that you have successfully returned books to the Library LNJPIT.</p>
        
        <p><strong>Returned Books:</strong></p>
        <ul>
          ${books_id.map((book) => `<li>${book}</li>`).join("")}
        </ul>
        
        <p><strong>Current Returned Books:</strong> ${total_books}</p>

        <p><strong>Remaining Books:</strong> ${totalBooks}</p>

        <p>Thank you for returning the books promptly. If you have any further inquiries or need assistance, feel free to contact us.</p>

        <p>Have a great day 😊</p>

      </div>
    </body>
    </html>
  `;
};

module.exports = router;
