import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext.jsx';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setError('');
      setLoading(true);
      try {
        const res = await axiosClient.get('/orders/my');
        setOrders(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Failed to load orders. Make sure you are logged in.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-6">
        <h1 className="text-2xl font-semibold mb-2 text-slate-900">
          My Orders
        </h1>
        <p className="text-slate-600 text-sm">
          You need to log in to see your orders.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-slate-900">
        My Orders
      </h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="text-sm text-slate-600">
          You haven&apos;t placed any orders yet.
        </p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <article
            key={order._id}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs text-slate-500">
                  Order ID:{' '}
                  <span className="font-mono">
                    #{order._id.slice(-6)}
                  </span>
                </p>
                <p className="text-xs text-slate-500">
                  Placed on{' '}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {order.status}
              </span>
            </div>

            <p className="text-sm text-slate-700 mb-2">
              Total:{' '}
              <span className="font-semibold text-[#2979FF]">
                ₹{order.total}
              </span>
            </p>

            {order.items && order.items.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                {order.items.map((it, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between border-b border-dashed border-slate-100 pb-1 last:border-0"
                  >
                    <span>
                      {it.quantity} ×{' '}
                      {it.menuItem?.name || 'Item'}
                    </span>
                    <span>₹{it.price * it.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}