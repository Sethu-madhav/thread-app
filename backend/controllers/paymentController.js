const stripe = require("../config/stripe");
const Payment = require("../models/Payment");
const Order = require("../models/Order");

exports.createPaymentIntent = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100), // Convert to cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  const { paymentIntentId, paymentMethodId } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });

    if (paymentIntent.status === "succeeded") {
      const payment = new Payment({
        userId: req.user._id,
        orderId: paymentIntent.metadata.orderId,
        amount: paymentIntent.amount / 100, // Convert to dollars
        currency: paymentIntent.currency,
        stripePaymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        paymentMethod: {
          type: paymentIntent.charges.data[0].payment_method_details.type,
          last4:
            paymentIntent.charges.data[0].payment_method_details.card.last4,
          brand:
            paymentIntent.charges.data[0].payment_method_details.card.brand,
          expiryMonth:
            paymentIntent.charges.data[0].payment_method_details.card.exp_month,
          expiryYear:
            paymentIntent.charges.data[0].payment_method_details.card.exp_year,
        },
      });

      await payment.save();
      res.json(payment);
    } else {
      res.status(400).json({ error: "Payment not successful" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    // Handle successful payment intent
  }

  res.json({ received: true });
};
