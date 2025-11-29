const MenuItem = require('../models/MenuItem');

const getMenuItems = async (req, res) => {
  const items = await MenuItem.find().sort({ createdAt: -1 });
  res.json(items);
};

const createMenuItem = async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
};

const updateMenuItem = async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
};

const deleteMenuItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

module.exports = { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem };