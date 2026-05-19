import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <nav className="bg-[#f9f5ed]/95 backdrop-blur-md sticky top-0 z-50 border-b border-[#0d4023]/10 shadow-sm font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🍌</span>
            <span className="font-extrabold text-2xl text-[#0d4023] tracking-tight uppercase">
              ChipCharm
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center mt-1">
            <Link to="/" className="text-[#0d4023] hover:text-[#eebc1d] text-sm font-bold uppercase tracking-wide transition-colors">Home</Link>
            <Link to="/shop" className="text-[#0d4023] hover:text-[#eebc1d] text-sm font-bold uppercase tracking-wide transition-colors">Shop</Link>
            <Link to="/our-story" className="text-[#0d4023] hover:text-[#eebc1d] text-sm font-bold uppercase tracking-wide transition-colors">Our Story</Link>
            <Link to="/wholesale" className="text-[#0d4023] hover:text-[#eebc1d] text-sm font-bold uppercase tracking-wide transition-colors">Wholesale</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/wishlist" className="text-[#0d4023] hover:text-[#eebc1d] transition-colors">
              <Heart size={22} strokeWidth={2.5} />
            </Link>
            
            <Link to="/cart" className="text-[#0d4023] hover:text-[#eebc1d] transition-colors relative">
              <ShoppingBag size={22} strokeWidth={2.5} />
              {/* Dynamic Cart Badge - Only shows if items are in cart */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#eebc1d] text-[#0d4023] text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#f9f5ed]">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <Link to="/login" className="text-[#0d4023] hover:text-[#eebc1d] transition-colors hidden md:block">
              <User size={22} strokeWidth={2.5} />
            </Link>
            
            <button className="md:hidden text-[#0d4023] hover:text-[#eebc1d] transition-colors">
              <Menu size={26} strokeWidth={2.5} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;