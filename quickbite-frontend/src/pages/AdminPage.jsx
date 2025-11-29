import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminPage() {
  const { user } = useAuth();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  const isAdmin = user?.role === 'admin';

  // Load menu
  useEffect(() => {
    const fetchMenu = async () => {
      if (!isAdmin) {
        setLoading(false);
        return;
      }
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
  }, [isAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Sample items with images
  const sampleItems = [
    {
      name: 'Classic Margherita Pizza',
      description: 'Thin crust with mozzarella, basil and tomato sauce.',
      price: 299,
      category: 'Pizza',
      imageUrl:
        'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Veggie Burger',
      description: 'Grilled veggie patty with fresh lettuce and cheese.',
      price: 199,
      category: 'Burger',
      imageUrl:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Paneer Butter Masala',
      description: 'Creamy tomato gravy with soft paneer cubes.',
      price: 249,
      category: 'Indian',
      imageUrl:
        'https://images.unsplash.com/photo-1603899122634-2f24c0c51e1f?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Chicken Biryani',
      description: 'Fragrant basmati rice with marinated chicken.',
      price: 299,
      category: 'Biryani',
      imageUrl:
        'https://images.unsplash.com/photo-1626132647523-66f0b8d5210f?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Cold Coffee',
      description: 'Iced coffee with whipped cream.',
      price: 99,
      category: 'Beverage',
      imageUrl:
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    },

    {
    name: 'Masala Dosa',
    description: 'Crispy dosa stuffed with spiced potato masala.',
    price: 189,
    category: 'South Indian',
    imageUrl:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Veg Hakka Noodles',
    description: 'Stir-fried noodles with veggies and Indo-Chinese flavours.',
    price: 179,
    category: 'Chinese',
    imageUrl:
      'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Chicken Wrap',
    description: 'Grilled chicken with veggies wrapped in a soft tortilla.',
    price: 159,
    category: 'Wraps',
    imageUrl:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'French Fries',
    description: 'Crispy golden fries with a side of ketchup.',
    price: 99,
    category: 'Snacks',
    imageUrl:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Chocolate Brownie',
    description: 'Warm gooey brownie served with chocolate drizzle.',
    price: 149,
    category: 'Dessert',
    imageUrl:
      'https://images.unsplash.com/photo-1606312619349-39c5c261f4eb?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Mango Smoothie',
    description: 'Thick mango smoothie made with fresh mango pulp.',
    price: 129,
    category: 'Beverage',
    imageUrl:
      'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80',
  },
  ];

  const handleAddSamples = async () => {
    setSaving(true);
    setError('');
    try {
      const created = [];
      for (const item of sampleItems) {
        const res = await axiosClient.post('/menu', item);
        created.push(res.data);
      }
      setMenu((m) => [...created, ...m]);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to add sample items (check admin login).'
      );
    } finally {
      setSaving(false);
    }
  };

  // Edit
  const startEdit = (item) => {
    setEditingId(item._id);
    setEditForm({
      name: item.name || '',
      description: item.description || '',
      price: item.price?.toString() || '',
      category: item.category || '',
      imageUrl: item.imageUrl || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((f) => ({ ...f, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingId || !editForm.name || !editForm.price) return;

    setSaving(true);
    setError('');
    try {
      const res = await axiosClient.put(`/menu/${editingId}`, {
        name: editForm.name,
        description: editForm.description,
        price: Number(editForm.price),
        category: editForm.category,
        imageUrl: editForm.imageUrl,
      });

      setMenu((m) =>
        m.map((item) => (item._id === editingId ? res.data : item))
      );

      setEditingId(null);
      setEditForm({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
      });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to update menu item.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this menu item?')) return;
    setSaving(true);
    setError('');
    try {
      await axiosClient.delete(`/menu/${id}`);
      setMenu((m) => m.filter((item) => item._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to delete menu item.'
      );
    } finally {
      setSaving(false);
    }
  };

  // Create
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    setSaving(true);
    setError('');
    try {
      const res = await axiosClient.post('/menu', {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
      });
      setMenu((m) => [res.data, ...m]);
      setForm({ name: '', description: '', price: '', category: '' });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to create menu item (are you admin and logged in?)'
      );
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-6">
        <h1 className="text-2xl font-semibold mb-4">Admin</h1>
        <p>You must log in as admin to access this page.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto mt-6">
        <h1 className="text-2xl font-semibold mb-4">Admin</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Admin – Manage Menu</h1>
        <p className="text-xs text-slate-500">
          Only admin users can add, edit or remove menu items.
        </p>
      </div>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      {/* Edit form (only when editingId is set) */}
      {editingId && (
        <form
          onSubmit={handleUpdate}
          className="bg-white rounded shadow p-4 mb-6 space-y-3 border border-amber-200"
        >
          <h2 className="font-semibold mb-1 text-amber-700">
            Editing existing item
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Price (₹)</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                type="number"
                name="price"
                value={editForm.price}
                onChange={handleEditChange}
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Category</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Image URL</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                name="imageUrl"
                value={editForm.imageUrl}
                onChange={handleEditChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Description</label>
              <textarea
                className="w-full border rounded px-3 py-2 text-sm"
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                rows={2}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-amber-500 text-white px-4 py-2 rounded text-sm hover:bg-amber-600 disabled:opacity-60"
            >
              {saving ? 'Updating...' : 'Save changes'}
            </button>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="text-xs text-slate-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Create + samples */}
      <form
        onSubmit={handleCreate}
        className="bg-white rounded shadow p-4 mb-6 space-y-3"
      >
        <h2 className="font-semibold mb-1">Add new menu item</h2>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Price (₹)</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2 text-sm"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-2 bg-[#2979FF] text-white px-4 py-2 rounded text-sm hover:bg-blue-600 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Create item'}
        </button>

        <button
          type="button"
          onClick={handleAddSamples}
          disabled={saving}
          className="ml-2 text-xs border border-slate-300 px-3 py-1 rounded hover:bg-slate-100 disabled:opacity-60"
        >
          Add sample menu items
        </button>
      </form>

      {/* Existing items */}
      <div>
        <h2 className="font-semibold mb-2">Existing menu items</h2>
        {loading ? (
          <p>Loading menu...</p>
        ) : menu.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          <div className="space-y-2">
            {menu.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded shadow-sm border border-slate-100 px-4 py-3 flex justify-between items-start text-sm"
              >
                <div>
                  <p className="font-medium">
                    {item.name}{' '}
                    <span className="text-xs text-slate-500">
                      ({item.category || 'Uncategorized'})
                    </span>
                  </p>
                  {item.description && (
                    <p className="text-xs text-slate-600">
                      {item.description}
                    </p>
                  )}
                  {item.imageUrl && (
                    <p className="text-[10px] text-slate-400 mt-1 break-all">
                      Img: {item.imageUrl}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="font-semibold text-[#2979FF]">
                    ₹{item.price}
                  </p>
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => startEdit(item)}
                      className="px-2 py-1 rounded border border-amber-400 text-amber-600 hover:bg-amber-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-2 py-1 rounded border border-red-400 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}