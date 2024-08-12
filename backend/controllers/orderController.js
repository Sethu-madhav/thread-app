const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {
  const { shippingAddress, billingAddress, paymentMethod, shippingMethod } =
    req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      totalAmount: cart.totalAmount,
      subtotal: cart.totalAmount,
      tax: cart.totalAmount * 0.08, // Example tax calculation
      shippingCost: 5.0, // Example shipping cost
      discount: 0,
      shippingAddress,
      billingAddress,
      paymentMethod,
      shippingMethod,
      estimatedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Example delivery date
    });

    await order.save();
    await Cart.findOneAndDelete({ userId: req.user._id }); // Clear the cart after order is placed
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate(
      "items.productId"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
