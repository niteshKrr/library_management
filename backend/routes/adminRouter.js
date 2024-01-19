const { Admin } = require("../models/adminModel");
const express = require("express");
const router = new express.Router();


router.post("/", (req, res) => {
  //   console.log(req.body);
  const user = new Admin(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send("Admin successfully added...");
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});


module.exports = router
