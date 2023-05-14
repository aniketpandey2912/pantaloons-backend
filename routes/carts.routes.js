const express = require("express");
const { CartsModel } = require("../models/carts.model");
const { ProductModelAll } = require("../models/products.model");
const cartsRouter = express.Router();

// allproducts
cartsRouter.post("/addtocart", async (req, res) => {
  const { id, userID } = req.body || {};

  try {
    let prods = await ProductModelAll.find({ id });
    let cart = new CartsModel(prods[0], userID);

    // cart.userID = userID;
    // console.log(cart);
    // await cart.save();

    res.send({
      status: true,
      mssg: "Added to cart",
      prod: cart,
    });
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
