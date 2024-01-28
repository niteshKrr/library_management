const { Books } = require("../../models/booksModel");
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Books.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ book });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
