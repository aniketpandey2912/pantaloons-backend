const express = require("express");
const { CartsModel } = require("../models/carts.model");
const { ProductModelAll } = require("../models/products.model");
const cartsRouter = express.Router();

cartsRouter.get("/getcart", async (req, res) => {
  const { userID } = req.body;
  try {
    let cartItems = await CartsModel.find({ userID });

    if (cartItems.length) {
      res.send({
        status: true,
        mssg: "Sucessfull",
        data: cartItems,
      });
    } else {
      res.send({
        status: false,
        mssg: "Cart is empty",
      });
    }
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// add to cart
cartsRouter.post("/addtocart", async (req, res) => {
  const { prod, userID } = req.body || {};
  try {
    let prodAlready = await CartsModel.find({ userID, _id: prod._id });

    if (prodAlready.length) {
      await CartsModel.findOneAndUpdate(
        { userID, _id: prod._id },
        { qty: prodAlready[0].qty + 1 }
      );
    } else {
      let cart = new CartsModel({ userID, ...prod });
      await cart.save();
    }
    res.send({ status: true, mssg: "Added to cart" });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// delete cart item
cartsRouter.delete("/deletecartitem/:prodID", async (req, res) => {
  const { userID } = req.body;
  const { prodID } = req.params;
  // console.log(userID, prodID);
  try {
    await CartsModel.findOneAndDelete({ userID, _id: prodID });
    res.send({ status: true, mssg: "Deleted cart item" });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

module.exports = {
  cartsRouter,
};
