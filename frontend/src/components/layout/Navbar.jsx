import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, LogOut, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
import logo from '../../assets/logo.jpeg'; 

const Navbar = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth); 
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll listener for the "curve" effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Wholesale', path: '/wholesale' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed top-0 w-full z-50 px-0 md:px-4 pt-0 md:pt-4 transition-all duration-500">
      <nav className={`w-full transition-all duration-500 backdrop-blur-xl border border-[#0d4023]/5 ${
        isScrolled 
          ? "bg-[#f9f5ed]/90 shadow-lg rounded-full px-8 max-w-7xl mx-auto py-3" 
          : "bg-transparent px-8 py-4"
      }`}>
        <div className="flex justify-between items-center h-14 md:h-16">
          
          {/* Logo - Increased Size */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="ChipCharm Logo" 
              className="h-14 md:h-16 w-auto group-hover:scale-105 transition-transform duration-500 object-contain" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group ${
                    isActive ? 'text-[#d8a918]' : 'text-[#0d4023] hover:text-[#d8a918]'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#d8a918] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              );
            })}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-6">
            {isAuthenticated && (
              <>
                <Link to="/wishlist" className="text-[#0d4023] hover:text-[#d8a918] transition-transform hover:scale-110">
                  <Heart size={22} strokeWidth={1.75} />
                </Link>
                <Link to="/cart" className="text-[#0d4023] hover:text-[#d8a918] transition-transform hover:scale-110 relative">
                  <ShoppingBag size={22} strokeWidth={1.75} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#eebc1d] text-[#0d4023] text-[10px] font-extrabold w-4 h-4 flex items-center justify-center rounded-full border border-[#f9f5ed]">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <button onClick={() => setShowLogoutConfirm(!showLogoutConfirm)} className="text-[#0d4023] hover:text-[#d8a918] transition-transform hover:scale-110">
                  <User size={22} strokeWidth={1.75} />
                </button>
                {/* Logout Dropdown remains same as before */}
                {showLogoutConfirm && (
                   <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 z-50">
                     <button onClick={() => setShowLogoutConfirm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={18} /></button>
                     <div className="flex flex-col items-center text-center mt-2">
                       <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3"><LogOut size={24} /></div>
                       <h4 className="font-bold text-[#0d4023] mb-1">Log Out?</h4>
                       <div className="flex gap-2 w-full mt-4">
                         <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2 rounded-xl font-bold text-xs bg-gray-100">Cancel</button>
                         <button onClick={handleLogout} className="flex-1 py-2 rounded-xl font-bold text-xs bg-red-500 text-white">Log Out</button>
                       </div>
                     </div>
                   </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex bg-[#0d4023] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-[#092a17] transition-all">
                LOGIN
              </Link>
            )}
          </div>
        </div>
    </nav>
      </div>
  );
};

export default Navbar;