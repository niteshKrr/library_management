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

    const updatedBooksId = [...user.books_id, ...books_id];

    await Student.updateOne(
      { email, reg_roll },
      { $set: { books_id: updatedBooksId } }
    );

    const totalBooks = user.total_books + total_books;

    await Student.updateOne(
      { email, reg_roll },
      { $set: { total_books: totalBooks } }
    );

    sendEmail({
      name: user.name,
      books_id: books_id,
      total_books: total_books,
      email,
    });

    res.status(200).send({ message: "Books issued successfully" });
  } catch (error) {
    console.error("Error issuing books:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const sendEmail = async ({ name, books_id, total_books, email }) => {
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
    html: generateEmailTemplate({ name, books_id, total_books }),
  });
};

const generateEmailTemplate = ({ name, books_id, total_books }) => {
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
          ${books_id.map((book) => `<li>${book}</li>`).join("")}
        </ul>
        
        <p><strong>Total Books Issued:</strong> ${total_books}</p>

        <p>Please ensure to return the books on time to avoid any late fees.</p>

        <p>Thank you for using the Library LNJPIT services. If you have any questions or need assistance, feel free to contact us.</p>

      </div>
    </body>
    </html>
  `;
};

module.exports = router;
