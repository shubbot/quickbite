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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-slate-900">Your Cart</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-dashed border-slate-200 p-8 text-center">
          <p className="text-slate-600 mb-2">
            Your cart is empty. Browse the menu and add some dishes.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1 text-sm text-[#2979FF] hover:underline"
          >
            ← Back to menu
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[2fr,1fr] items-start">
          {/* Items */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y">
            {items.map((item) => (
              <div
                key={item.id}
                className="px-4 py-3 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium text-sm md:text-base text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    ₹{item.price} each
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded-full text-sm hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addItem(item)}
                    className="w-7 h-7 flex items-center justify-center border border-[#2979FF] text-[#2979FF] rounded-full text-sm hover:bg-[#2979FF] hover:text-white"
                  >
                    +
                  </button>
                  <span className="w-16 text-right font-semibold text-sm">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 space-y-3">
            <h2 className="font-semibold text-slate-900">Order summary</h2>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Items</span>
              <span>{items.length}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Delivery</span>
              <span>₹0</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold text-slate-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-2 bg-[#2979FF] text-white py-2 rounded-full text-sm hover:bg-blue-600"
            >
              Proceed to checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full text-xs text-red-600 mt-1 hover:underline"
            >
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}