require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'QuickBite API running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

module.exports = app;