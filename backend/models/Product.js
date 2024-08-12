const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  category: { type: String, required: true },
  subCategory: { type: String },
  sizes: [String],
  colors: [String],
  images: [String],
  stock: { type: Number, required: true },
  tags: [String],
  brand: { type: String },
  material: { type: String },
  careInstructions: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
