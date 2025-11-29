import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useCart } from '../context/CartContext.jsx';

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem, total, items } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      setError('');
      setLoading(true);
      try {
        const res = await axiosClient.get('/menu');
        setMenu(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load menu');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-[#2979FF] text-white p-6 md:p-8 shadow-md">
        <div className="max-w-xl space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Craving something delicious?
          </h1>
          <p className="text-sm md:text-base text-white/90">
            Browse curated dishes from QuickBite&apos;s virtual restaurants and
            place your order in a few taps.
          </p>
          <div className="flex items-center gap-4 text-xs md:text-sm pt-2">
            <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span>Live orders</span>
            </span>
            <span>Items in cart: {items.length}</span>
            <span>Total: ₹{total}</span>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 hidden md:block">
          <div className="h-40 w-40 rounded-full bg-white/10 border border-white/20" />
          <div className="h-32 w-32 rounded-full bg-white/20 border border-white/30 absolute top-4 left-4" />
        </div>
      </section>

      {/* Menu grid */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-slate-800">Menu</h2>
          <p className="text-xs text-slate-500">
            Choose from {menu.length} items • Click &quot;Add to cart&quot; to
            build your order.
          </p>
        </div>

        {loading && <p>Loading menu...</p>}
        {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((item) => (
            <article
              key={item._id}
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition"
            >
              <div className="h-32 w-full bg-slate-100 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-sm md:text-base text-slate-900">
                      {item.name}
                    </h3>
                    {item.category && (
                      <span className="text-[10px] uppercase tracking-wide bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-[#2979FF] text-sm md:text-base">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() =>
                      addItem({
                        id: item._id,
                        name: item.name,
                        price: item.price,
                      })
                    }
                    className="text-xs md:text-sm bg-[#2979FF] text-white px-3 py-1.5 rounded-full hover:bg-blue-600"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!loading && !error && menu.length === 0 && (
          <p className="text-sm text-slate-500 mt-2">
            No menu items found. Add some via the Admin panel.
          </p>
        )}
      </section>
    </div>
  );
}