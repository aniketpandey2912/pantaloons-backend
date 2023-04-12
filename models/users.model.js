const mongoose = require("mongoose");

let reqString = { type: String, required: true };

const userSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
      default:
        "https://www.transparentpng.com/thumb/user/blue-male-user-profile-transparent-png-2lbgMx.png",
    },
    first_name: reqString,
    last_name: reqString,
    email: reqString,
    password: reqString,
    gender: String,
    mobile: Number,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
