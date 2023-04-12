require("dotenv").config();
const express = require("express");
const app = express();
const { connection } = require("./config/db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME PANTALOONS HOME PAGE");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Can't Connect to DB");
  }
  console.log("Server running at port", process.env.PORT);
});
