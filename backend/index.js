require("./connection/mongoDB");

const set_studentRouter = require("./routes/set_studentRouter");
const get_studentRouter = require("./routes/get_studentRouter");
const get_single_studentRouter = require("./routes/get_single_studentRouter");
const delete_studentRouter = require("./routes/delete_studentRouter");
const updated_studentRouter = require("./routes/update_studentRouter");
const issue_booksRouter = require("./routes/issue_booksRouter");
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


app.use("/dashboard/students/add" , set_studentRouter);
app.use("/dashboard/students" , get_studentRouter);
app.use("/dashboard/students" , get_single_studentRouter);
app.use("/dashboard/students" , delete_studentRouter);
app.use("/dashboard/students" , updated_studentRouter);
app.use("/dashboard/students/issue_books" , issue_booksRouter);
app.use("/dashboard/admin" , adminRouter);


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("*", (req, res) => {
    res.send("sorry this page doesn’t exists.");
  });
  

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
