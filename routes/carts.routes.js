const express = require("express");
const { cartsModel } = require("../models/carts.model");
const { ProductModelAll } = require("../models/products.model");
const cartsRouter = express.Router();

// allproducts
cartsRouter.post("/addtocart", async (req, res) => {
  const query = req.body || {};
  console.log(query);
  try {
    let prods = await ProductModelAll.find(query);
    console.log(prods);
    res.send({ status: true, mssg: "Sucessful", data: prods });
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
