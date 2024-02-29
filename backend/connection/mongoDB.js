require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster11.gd9qm3q.mongodb.net/library_management?retryWrites=true&w=majority`
    // `mongodb://database:27017/library_management`
  )
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((err) => {
    console.log(err);
    console.log("error aa gaya bhai");
  });
