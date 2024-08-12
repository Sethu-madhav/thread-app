const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");
const { protect } = require("../utils/authMiddleware");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/", protect, updateCartItem);
router.delete("/", protect, removeCartItem);

module.exports = router;
