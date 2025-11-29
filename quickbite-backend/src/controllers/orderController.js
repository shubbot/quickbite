const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { items, total, paymentIntentId } = req.body;

    const order = await Order.create({
      user: req.user.id,
      items,
      total,
      paymentIntentId,
      status: 'PAID',
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .populate('items.menuItem')
    .sort({ createdAt: -1 });
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user.id })
    .populate('items.menuItem');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

module.exports = { createOrder, getMyOrders, getOrderById };