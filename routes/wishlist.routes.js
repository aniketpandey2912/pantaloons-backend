const express = require("express");
const wishlistRouter = express.Router();
const { WishlistModel } = require("../models/wishlist.model");

// get all wishlisted items
wishlistRouter.get("/getwishlist", async (req, res) => {
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
        mssg: "Wishlist is empty",
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

// add to wishlist
wishlistRouter.post("/addtowishlist", async (req, res) => {
  const { prod, userID } = req.body || {};

  try {
    let prodAlready = await WishlistModel.find({ userID, _id: prod._id });

    if (prodAlready.length) {
      res.send({
        status: false,
        mssg: "Already present in your wishlist",
      });
    } else {
      let cart = new WishlistModel({ userID, ...prod });
      await cart.save();
      res.send({ status: true, mssg: "Added to wishlist" });
    }
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// delete wishlist item
wishlistRouter.delete("/deletewishlistitem/:prodID", async (req, res) => {
  const { userID } = req.body;
  const { prodID } = req.params;
  // console.log(userID, prodID);
  try {
    await WishlistModel.findOneAndDelete({ userID, _id: prodID });
    res.send({ status: true, mssg: "Removed item from wishlist" });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// delete entire wishlist - after purchase use
wishlistRouter.delete("/deletemywishlist", async (req, res) => {
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
