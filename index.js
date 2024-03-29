require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/products.routes");
const { authenticate } = require("./middlewares/auth.middleware");
const { cartsRouter } = require("./routes/carts.routes");
const { ordersRouter } = require("./routes/orders.routes");
const { wishlistRouter } = require("./routes/wishlist.routes");
const { employeeRouter } = require("./routes/employee.routes");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("WELCOME PANTALOONS HOME PAGE");
});

// users
app.use("/users", userRouter);

app.use("/products", productRouter);

app.use("/cart", authenticate, cartsRouter);

app.use("/wishlist", authenticate, wishlistRouter);

app.use("/orders", authenticate, ordersRouter);

// employee
app.use("/employee", employeeRouter);

// admin

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Can't Connect to DB");
  }
  console.log("Server running at port", process.env.PORT);
});
