const jwt = require("jsonwebtoken");

const employeeAuth = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "pantaloons-employee", (err, decoded) => {
      if (decoded) {
        req.headers.employeeID = decoded.employeeID;
        next();
      } else {
        res.send({ status: false, mssg: "Please login first" });
      }
    });
  } else {
    res.send({ status: false, mssg: "Please login first" });
  }
};

module.exports = {
  employeeAuth,
};
