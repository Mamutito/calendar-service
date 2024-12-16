const express = require("express");
const path = require("path");
require("dotenv").config();
const { dbConnection } = require("./database/config");
const port = process.env.PORT;
const app = express();
const cors = require("cors");

//Database connection
dbConnection();

//CORS
app.use(cors());

//Public directory
app.use(express.static("public"));

//Read and parse body
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.use("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
