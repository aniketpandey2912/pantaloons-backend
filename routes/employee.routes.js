const express = require("express");
const employeeRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { EmployeeModel } = require("../models/employee.model.js");
const { employeeAuth } = require("../middlewares/employeeAuth.middleware.js");

employeeRouter.get("/all-employee", employeeAuth, async (req, res) => {
  try {
    let employees = await EmployeeModel.find();
    res.send({ status: true, data: employees });
  } catch (err) {
    res.send({
      status: false,
      mssg: "Can't fetch all employees",
      err: err.message,
    });
  }
  res.send("All Employees");
});

employeeRouter.post("/signup", async (req, res) => {
  let payload = req.body;
  let { email, password } = payload;
  try {
    let employee = await EmployeeModel.find({ email });

    if (employee.length) {
      res.send({
        status: false,
        mssg: "Employee e-mail is already registered",
      });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (hash) {
          let newEmployee = new EmployeeModel({ ...payload, password: hash });
          await newEmployee.save();
          res.send({ status: true, mssg: "Employee Signup successful" });
        } else {
          res.send({ status: false, mssg: "Signup failed", err });
        }
      });
    }
  } catch (err) {
    res.send({ status: false, mssg: "Signup failed", err: err.message });
  }
});

employeeRouter.get("/login", async (req, res) => {
  let payload = req.body;
  let { email, password } = payload;

  try {
    let employee = await EmployeeModel.find({ email });

    if (employee.length) {
      bcrypt.compare(password, employee[0].password, async (err, result) => {
        if (result) {
          let token = jwt.sign(
            { employeeId: employee[0]._id },
            "pantaloons-employee"
          );
          res.send({
            status: true,
            mssg: "Login successfull",
            token,
            data: employee[0],
          });
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

  res.send("Employee Login");
});

employeeRouter.patch("/editinfo", (req, res) => {
  res.send("Employee edit");
});

employeeRouter.patch("/deactivate/:employeeId", (req, res) => {
  const { employeeId } = req.params;
  res.send(employeeId, "deactivated");
});

module.exports = {
  employeeRouter,
};
