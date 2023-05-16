const mongoose = require("mongoose");

const cartsSchema = mongoose.Schema(
  {
    userID: String,
    _id: String,
    clickURL: String,
    clickTrackingURL: String,
    id: String,
    productURL: String,
    DefaultCategoryName: String,
    DefaultCategoryID: Number,
    rating: Number,
    CategoryGroupID: Number,
    Discount: Object,
    IsReturnable: Number,
    DefaultCategoryLinkRewrite: String,
    MetaKeywords: String,
    OrdersCount: Number,
    Gender: String,
    Name: String,
    ShortDescription: String,
    GenderID: Number,
    GenderLinkRewrite: String,
    Features: Object,
    StyleCode: String,
    GenderName: String,
    MetaTitle: String,
    Color: String,
    Quantity: Number,
    SellingPrice: Number,
    Sizes: Object,
    Active: Number,
    Price: Number,
    PublishedDate: String,
    imageURL: String,
    productLabel: String,
    qty: { type: Number, default: 1 },
  },
  { versionKey: false }
);

const CartsModel = mongoose.model("cart", cartsSchema);

module.exports = {
  CartsModel,
};
