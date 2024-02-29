const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      unique: true,
    },
    publication: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", booksSchema);
module.exports = { Books };
