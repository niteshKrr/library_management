const { Student } = require("../models/studentModel");
const express = require("express");
const router = express.Router();

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await Student.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully"});
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
