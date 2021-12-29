const dotenv = require("dotenv");
const config = require("config");
const express = require("express");
const connectDB = require("./DB/db");
require('express-async-errors')
const app = express();


// Connect to Database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//Routes
app.use("/api/users", require("./routes/api/users"));


//Error Handler
app.use(require("./middlewares/error"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
