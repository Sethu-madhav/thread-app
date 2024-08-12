const express = require("express");
const {
  createPaymentIntent,
  confirmPayment,
  handleWebhook,
} = require("../controllers/paymentController");
const { protect } = require("../utils/authMiddleware");

const router = express.Router();

router.post("/create-payment-intent", protect, createPaymentIntent);
router.post("/confirm-payment", protect, confirmPayment);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);

module.exports = router;
