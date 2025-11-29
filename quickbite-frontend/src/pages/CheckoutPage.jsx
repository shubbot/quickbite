import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext.jsx';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async () => {
    if (!items.length) return;
    setError('');
    setLoading(true);

    try {
      // Build items for backend: { menuItem, quantity, price }
      const orderItems = items.map((it) => ({
        menuItem: it._id,
        quantity: it.quantity,
        price: it.price,
      }));

      await axiosClient.post('/orders', {
        items: orderItems,
        total,
        paymentIntentId: 'demo', // fake payment id for Option A
      });

      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to place order. Make sure you are logged in.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <div className="max-w-xl mx-auto mt-6">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white rounded shadow p-6">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      {user ? (
        <p className="text-sm text-slate-700 mb-4">
          Ordering as <span className="font-semibold">{user.name}</span> (
          {user.email})
        </p>
      ) : (
        <p className="text-sm text-red-600 mb-4">
          You are not logged in. Login first to place an order.
        </p>
      )}

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Items</h2>
        <ul className="space-y-1 text-sm">
          {items.map((it) => (
            <li key={it._id} className="flex justify-between">
              <span>
                {it.name} x {it.quantity}
              </span>
              <span>₹{it.price * it.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">Total:</span>
        <span className="text-lg font-semibold text-[#2979FF]">
          ₹{total}
        </span>
      </div>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <button
        onClick={handlePlaceOrder}
        disabled={loading || !user}
        className="w-full bg-[#2979FF] text-white py-2 rounded hover:bg-blue-600 disabled:opacity-60"
      >
        {loading ? 'Placing order...' : 'Place order'}
      </button>

      <p className="text-xs text-slate-500 mt-3">
        (Demo checkout: payment is simulated; order is stored via backend API.)
      </p>
    </div>
  );
}