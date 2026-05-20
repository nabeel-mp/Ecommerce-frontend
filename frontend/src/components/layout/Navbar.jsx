import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, LogOut, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
import logo from '../../assets/Logo.jpeg'; 

const Navbar = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth); 
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
      <nav className={`w-full transition-all duration-500 backdrop-blur-xl border border-chip-green/5 ${
        isScrolled 
          ? "bg-chip-cream/95 shadow-lg md:rounded-full px-6 md:px-8 max-w-7xl mx-auto py-3" 
          : "bg-transparent px-6 md:px-8 py-4"
      }`}>
        <div className="flex justify-between items-center h-14 md:h-16">
          
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="ChipCharm" 
              className="h-12 md:h-16 w-auto group-hover:scale-105 transition-transform duration-500 object-contain mix-blend-multiply" 
            />
          </Link>

          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group ${
                    isActive ? 'text-chip-gold-dark' : 'text-chip-green hover:text-chip-gold-dark'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-chip-gold-dark transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-5 md:space-x-6">
            {isAuthenticated && (
              <>
                <Link to="/wishlist" className="text-chip-green hover:text-chip-gold-dark transition-transform hover:scale-110">
                  <Heart size={22} strokeWidth={1.75} />
                </Link>
                <Link to="/cart" className="text-chip-green hover:text-chip-gold-dark transition-transform hover:scale-110 relative">
                  <ShoppingBag size={22} strokeWidth={1.75} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-chip-gold text-chip-green text-[10px] font-extrabold w-4 h-4 flex items-center justify-center rounded-full border border-chip-cream">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setShowLogoutConfirm(!showLogoutConfirm)} className="text-chip-green hover:text-chip-gold-dark transition-transform hover:scale-110 flex items-center">
                  <User size={22} strokeWidth={1.75} />
                </button>
                
                {showLogoutConfirm && (
                   <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 z-50">
                     <button onClick={() => setShowLogoutConfirm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-chip-black"><X size={18} /></button>
                     <div className="flex flex-col items-center text-center mt-2">
                       <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3"><LogOut size={24} /></div>
                       <h4 className="font-bold text-chip-green mb-1">Log Out?</h4>
                       <div className="flex gap-2 w-full mt-4">
                         <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2 rounded-xl font-bold text-xs bg-gray-100 hover:bg-gray-200 text-chip-black transition">Cancel</button>
                         <button onClick={handleLogout} className="flex-1 py-2 rounded-xl font-bold text-xs bg-red-500 hover:bg-red-600 text-white transition">Log Out</button>
                       </div>
                     </div>
                   </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-chip-green text-white px-5 py-2.5 rounded-full font-bold text-xs tracking-wider hover:bg-chip-green-dark shadow-md hover:shadow-lg transition-all">
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