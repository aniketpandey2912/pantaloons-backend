require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/products.routes");
// const { authenticate } = require("./middlewares/auth.middleware");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("WELCOME PANTALOONS HOME PAGE");
});

app.use("/users", userRouter);

app.use("/products", productRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Can't Connect to DB");
  }
  console.log("Server running at port", process.env.PORT);
});
