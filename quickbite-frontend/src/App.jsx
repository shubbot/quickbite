import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import MenuPage from './pages/MenuPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { useAuth } from './context/AuthContext.jsx';

function App() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-[#2979FF] text-white flex items-center justify-center font-bold">
              Q
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight">QuickBite</div>
              <div className="text-xs text-slate-500">
                Online Food Ordering Platform
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <Link className="hover:text-[#2979FF]" to="/">
              Menu
            </Link>
            <Link className="hover:text-[#2979FF]" to="/cart">
              Cart
            </Link>
            <Link className="hover:text-[#2979FF]" to="/orders">
              My Orders
            </Link>
            {isAdmin && (
              <Link className="hover:text-[#2979FF]" to="/admin">
                Admin
              </Link>
            )}

            <span className="w-px h-5 bg-slate-300 mx-1" />

            {user ? (
              <>
                <span className="hidden sm:inline text-xs md:text-sm text-slate-100 bg-[#2979FF]/80 px-2 py-1 rounded-full">
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </span>
                <span className="text-xs md:text-sm text-slate-700">
                  Hi, <span className="font-semibold">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs md:text-sm border border-[#2979FF] text-[#2979FF] px-2 py-1 rounded hover:bg-[#2979FF] hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="hover:text-[#2979FF]" to="/login">
                  Login
                </Link>
                <Link className="hover:text-[#2979FF]" to="/register">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;