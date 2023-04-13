const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "pantaloons", (err, decoded) => {
      if (err) {
        res.send({ status: false, mssg: "Please login first" });
      } else {
        req.body.userID = decoded.userID;
        next();
      }
    });
  } else {
    res.send({ status: false, mssg: "Please login first" });
  }
};

module.exports = {
  authenticate,
};
