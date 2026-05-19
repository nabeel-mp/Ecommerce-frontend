import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';

const { totalItems } = useSelector((state) => state.cart);

const Navbar = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl text-warm-yellow">🍌</span>
            <span className="font-poppins font-bold text-2xl text-matte-black tracking-tight">
              ChipCharm
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-matte-black hover:text-warm-yellow-dark font-medium transition">Home</Link>
            <Link to="/shop" className="text-matte-black hover:text-warm-yellow-dark font-medium transition">Shop</Link>
            <Link to="/our-story" className="text-matte-black hover:text-warm-yellow-dark font-medium transition">Our Story</Link>
            <Link to="/wholesale" className="text-matte-black hover:text-warm-yellow-dark font-medium transition">Wholesale</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/wishlist" className="text-gray-600 hover:text-warm-yellow-dark transition"><Heart size={22} /></Link>
            <Link to="/cart" className="text-gray-600 hover:text-warm-yellow-dark transition relative">
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-warm-yellow text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{totalItems}</span>
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-warm-yellow-dark transition hidden md:block"><User size={22} /></Link>
            <button className="md:hidden text-gray-600"><Menu size={24} /></button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;