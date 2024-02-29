const { Student } = require("../models/studentModel");
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
        $or: [{ reg_roll: { $regex: regex } }],
      };
    }

    const count = await Student.find(query).count();
    const all_students = await Student.find(query);
    const users = await Student.find(query)
      .limit(ITEM_PER_PAGE)
      .skip(skipCount);

    res.status(200).send({ count, users , all_students });
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;