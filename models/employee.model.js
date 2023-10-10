const mongoose = require("mongoose");

let reqString = { type: String, required: true };

const employeeSchema = mongoose.Schema(
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
    address: [String],
    doj: String,
    isActive: { type: Boolean, default: true },
    dol: { type: String, default: "NA" },
  },
  {
    versionKey: false,
  }
);

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = {
  EmployeeModel,
};
