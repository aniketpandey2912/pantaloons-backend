const express = require("express");
const { UserModel } = require("../models/users.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

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

module.exports = {
  userRouter,
};
