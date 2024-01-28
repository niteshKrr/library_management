const { Books } = require("../../models/booksModel");
const express = require("express");
const router = express.Router();

router.put("/:id", async (req, res) => {
  const bookId = req.params.id;
  const updateData = req.body;

  try {
    const updatedBook = await Books.findByIdAndUpdate(bookId, updateData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
