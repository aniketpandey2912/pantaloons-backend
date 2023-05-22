require("dotenv").config();
const express = require("express");
const { OrderModel } = require("../models/orders.model");
const ordersRouter = express.Router();

// get all orders (admins use only)
ordersRouter.get("/getallorders", async (req, res) => {
  let { userID } = req.body;

  try {
    if (userID === process.env.ADMIN1) {
      let orders = await OrderModel.find();
      res.send({ status: true, orders });
    } else {
      res.send({ status: false, mssg: "You are not authorized" });
    }
  } catch (err) {
    res.send({ status: false, mssg: "Something went wrong" });
  }
});

// get orders by userID
ordersRouter.get("/getmyorders", async (req, res) => {
  let { userID } = req.body;
  try {
    let orders = await OrderModel.find({ userID });
    res.send({ status: true, orders });
  } catch (err) {
    res.send({ status: false, mssg: "Something went wrong" });
  }
});

// post order details
ordersRouter.post("/addorder", async (req, res) => {
  let payload = req.body;
  let order = new OrderModel(payload);
  await order.save();
  res.send({ status: true, order });
});

module.exports = {
  ordersRouter,
};
