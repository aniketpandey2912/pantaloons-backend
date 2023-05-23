const express = require("express");
const {
  ProductModelMen,
  ProductModelWomen,
  ProductModelHomeDecors,
  ProductModelAccessories,
  ProductModelNewArrivals,
  ProductModelAll,
  ProductModelKids,
} = require("../models/products.model");
const productRouter = express.Router();

// get products by id from allproducts collection
productRouter.get("/allproducts/:prodID", async (req, res) => {
  const { prodID } = req.params;
  try {
    let prod = await ProductModelAll.findOne({ _id: prodID });
    res.send({ status: true, mssg: "Sucessful", data: prod });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// newarrivals
productRouter.get("/newarrivals", async (req, res) => {
  const query = req.body.query || {};
  try {
    let prods = await ProductModelNewArrivals.find(query);
    res.send({ status: true, mssg: "Sucessful", data: prods });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// men
productRouter.get("/men", async (req, res) => {
  try {
    let prods = await ProductModelMen.find();
    res.send({ status: true, mssg: "Sucessful", data: prods });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// women
productRouter.get("/women", async (req, res) => {
  try {
    let prods = await ProductModelWomen.find();
    res.send({ status: true, mssg: "Sucessful", data: prods });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// kids
productRouter.get("/kids", async (req, res) => {
  try {
    let prods = await ProductModelKids.find();
    res.send({ status: true, mssg: "Sucessful", data: prods });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// homedecors
productRouter.get("/homedecors", async (req, res) => {
  try {
    let prods = await ProductModelHomeDecors.find();
    res.send({ status: true, mssg: "Sucessful", data: prods });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Something went wrong",
      error: err.message,
    });
  }
});

// accessories
productRouter.get("/accessories", async (req, res) => {
  try {
    let prods = await ProductModelAccessories.find();
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
  productRouter,
};
