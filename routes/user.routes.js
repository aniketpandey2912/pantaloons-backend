const express = require("express");
const { UserModel } = require("../models/users.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res) => {
  let payload = req.body;
  let { email, password } = payload;
  try {
    const users = await UserModel.find({ email });

    if (users.length > 0) {
      res.send({ status: false, mssg: "Email is already registered" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (hash) {
          let user = new UserModel({ ...payload, password: hash });
          await user.save();
          res.send({ status: true, mssg: "Signup successful" });
        } else {
          res.send({ status: false, mssg: "Signup failed", err });
        }
      });
    }
  } catch (err) {
    res.send({ status: false, mssg: "Signup failed", err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  let payload = req.body;
  let { email, password } = payload;

  try {
    let users = await UserModel.find({ email });
    if (users.length > 0) {
      let data = {
        avatar: users[0].avatar,
        first_name: users[0].first_name,
        last_name: users[0].last_name,
        email: users[0].email,
        gender: users[0].gender,
        mobile: users[0].mobile,
      };
      bcrypt.compare(password, users[0].password, async (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: users[0]._id }, "pantaloons");
          res.send({ status: true, mssg: "Login successfull", token, data });
        } else {
          res.send({ status: false, mssg: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ status: false, mssg: "Wrong Credentials" });
    }
  } catch (err) {
    res.send({ status: false, mssg: "Wrong Credentials", err: err.message });
  }
});

module.exports = {
  userRouter,
};
