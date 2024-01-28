const { Books } = require("../../models/booksModel");
const express = require("express");
const router = express.Router();

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedBook = await Books.findByIdAndDelete(userId);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    // console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
