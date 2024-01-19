const { Student } = require("../models/studentModel");
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await Student.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
