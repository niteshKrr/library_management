const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    reg_roll: {
      type: String,
    },
    total_books: {
      type: Number,
    },
    books_id: [
      {
        type: String,
      },
    ],
    books_name: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = { Student };
