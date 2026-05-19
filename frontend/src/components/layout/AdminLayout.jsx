import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, Users, LogOut, ArrowLeft } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Users', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-matte-black text-white flex flex-col hidden md:flex fixed h-full z-10">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-warm-yellow hover:text-white transition">
            <ArrowLeft size={20} /> <span className="font-semibold text-sm">Back to Store</span>
          </Link>
          <div className="mt-8 mb-6">
            <h2 className="text-2xl font-poppins font-bold tracking-tight">Admin Portal</h2>
            <p className="text-gray-400 text-sm">ChipCharm Control Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname.includes(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive ? 'bg-warm-yellow text-matte-black font-bold' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <link.icon size={20} /> {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;