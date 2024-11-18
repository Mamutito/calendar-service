const express = require("express");
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
//app.use("/api/events", require("./routes/events"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
