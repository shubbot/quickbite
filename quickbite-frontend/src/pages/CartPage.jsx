import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function CartPage() {
  const { items, addItem, removeItem, clearCart, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!items.length) return;
    navigate('/checkout');
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <button
          onClick={clearCart}
          disabled={!items.length}
          className="text-sm text-red-600 disabled:opacity-50"
        >
          Clear cart
        </button>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty. Go back to the menu to add items.</p>
      ) : (
        <>
          <div className="divide-y bg-white rounded shadow">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-600">
                    ₹{item.price} each
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeItem(item._id)}
                    className="w-8 h-8 flex items-center justify-center border rounded"
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => addItem(item)}
                    className="w-8 h-8 flex items-center justify-center border rounded"
                  >
                    +
                  </button>
                  <span className="w-16 text-right font-semibold">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-lg font-semibold">
              Total: <span className="text-[#2979FF]">₹{total}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="bg-[#2979FF] text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Proceed to checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}