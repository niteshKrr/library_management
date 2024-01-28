const { Books } = require("../../models/booksModel");
const express = require("express");
const router = new express.Router();

router.post("/", (req, res) => {
  //   console.log(req.body);
  const book = new Books(req.body);
  book
    .save()
    .then(() => {
      res.status(201).send("Books successfully added...");
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = router;
