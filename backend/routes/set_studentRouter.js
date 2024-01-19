const { Student } = require("../models/studentModel");
const express = require("express");
const router = new express.Router();

router.post("/", (req, res) => {
  //   console.log(req.body);
  const user = new Student(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send("Student successfully added...");
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = router;
