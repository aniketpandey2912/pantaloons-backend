const express = require("express");
const { CartsModel } = require("../models/carts.model");
const wishlistRouter = express.Router();

wishlistRouter.get("/getcart", async (req, res) => {
  const { userID } = req.body;
  try {
    let cartItems = await WishlistModel.find({ userID });

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

// add to cart and increase quantity
wishlistRouter.post("/addtocart", async (req, res) => {
  const { prod, userID } = req.body || {};

  try {
    let prodAlready = await WishlistModel.find({ userID, _id: prod._id });

    if (prodAlready.length) {
      await WishlistModel.findOneAndUpdate(
        { userID, _id: prod._id },
        { qty: prodAlready[0].qty + 1 }
      );
    } else {
      let cart = new WishlistModel({ userID, ...prod });
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

// decrease quantity
wishlistRouter.post("/decreaseqty", async (req, res) => {
  const { prod, userID } = req.body || {};

  try {
    let prodAlready = await WishlistModel.find({ userID, _id: prod._id });

    if (prodAlready.length) {
      if (prodAlready[0].qty <= 1) {
        res.send({ status: false, mssg: "Insufficient items" });
      }
      await WishlistModel.findOneAndUpdate(
        { userID, _id: prod._id },
        { qty: prodAlready[0].qty - 1 }
      );
      res.send({ status: true, mssg: "Decreased qty of item" });
    } else {
      res.send({ status: false, mssg: "Invalid request, Product Not Found" });
    }
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// delete cart item
wishlistRouter.delete("/deletecartitem/:prodID", async (req, res) => {
  const { userID } = req.body;
  const { prodID } = req.params;
  // console.log(userID, prodID);
  try {
    await WishlistModel.findOneAndDelete({ userID, _id: prodID });
    res.send({ status: true, mssg: "Deleted cart item" });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// delete entire cart - after purchase use
wishlistRouter.delete("/deletemycart", async (req, res) => {
  const { userID } = req.body;
  try {
    await WishlistModel.deleteMany({ userID });
    res.send({ status: true, mssg: "Deleted cart after purchase" });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

module.exports = {
  wishlistRouter,
};
