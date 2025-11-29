const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MenuItem',
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'PREPARING', 'DELIVERED'],
      default: 'PENDING',
    },
    paymentIntentId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);