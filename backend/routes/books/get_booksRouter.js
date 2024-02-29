const { Books } = require("../../models/booksModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const regex = new RegExp(req.query.q, "i");
  const ITEM_PER_PAGE = 10;

  const page = parseInt(req.query.page) || 1;

  if (isNaN(page) || page < 1) {
    return res.status(400).send({ error: "Invalid page number" });
  }

  const skipCount = ITEM_PER_PAGE * (page - 1);

  try {
    let query = {};

    // Handle the case when a search query is provided
    if (req.query.q && req.query.q.trim().length > 0) {
      query = {
        $or: [{ name: { $regex: regex } }],
      };
    }

    const count = await Books.find(query).count();
    const all_books = await Books.find(query);
    const books = await Books.find(query).limit(ITEM_PER_PAGE).skip(skipCount);

    res.status(200).send({ count, books, all_books });
  } catch (error) {
    console.error("Error fetching books data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
