require("./connection/mongoDB");

const studenRouter = require("./routes/studentRouter");
const adminRouter = require("./routes/adminRouter");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);


app.use("/dashboard" , studenRouter);
app.use("/dashboard" , adminRouter);


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("*", (req, res) => {
    res.send("sorry this page doesn’t exists.");
  });
  

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
