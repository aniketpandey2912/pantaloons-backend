const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userID: String,
    payment: {
      mode: { type: String, enum: ["CashOnDelivery", "Online"] },
      amount: Number,
    },
    date: {
      type: Date,
      default: () => new Date().toISOString().split("T")[0],
    },
    time: {
      type: String,
      default: () => new Date().toLocaleTimeString(),
      required: true,
    },
    address: String,
  },
  { versionKey: false }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
  OrderModel,
};
