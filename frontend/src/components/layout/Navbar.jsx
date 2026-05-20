import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  LogOut, 
  X, 
  Search, 
  Menu, 
  Home as HomeIcon, 
  LayoutGrid 
} from 'lucide-react';
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
    { name: 'Our Story', path: '/our-story' },
    { name: 'Wholesale', path: '/wholesale' },
    { name: 'Contact', path: '/contact' },
  ];

  // UI State Logic
  const isTransparent = location.pathname === '/' && !isScrolled;
  const textColor = isTransparent ? 'text-[#0d4023]' : 'text-[#0d4023]';
  const activeColor = isTransparent ? 'text-[#f5c842]' : 'text-[#0d4023]';
  const underlineColor = isTransparent ? 'bg-[#f5c842]' : 'bg-[#0d4023]';
  const iconHoverColor = isTransparent ? 'hover:text-[#f5c842]' : 'hover:text-[#d4a017]';

  return (
    <>
      {/* ========================================================================= */}
      {/* 1 & 2 & 3. TOP NAVBAR (Desktop Transparent/Scrolled & Mobile Top)         */}
      {/* ========================================================================= */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'pt-2 px-3 md:px-4' : 'pt-2 md:pt-4 px-3 md:px-4'}`}>
        <nav className={`mx-auto max-w-7xl transition-all duration-500 ${
          isTransparent 
            ? 'bg-transparent px-4 md:px-8 py-4 md:py-5' 
            : 'bg-white/95 backdrop-blur-md shadow-md rounded-2xl md:rounded-full px-5 md:px-8 py-3'
        }`}>
          
          {/* ------------------------------------------------ */}
          {/* DESKTOP CONTENT (Hidden on Mobile)               */}
          {/* ------------------------------------------------ */}
          <div className="hidden md:flex justify-between items-center w-full">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="ChipCharm" 
                className="h-10 lg:h-12 w-auto group-hover:scale-105 transition-transform duration-500 object-contain mix-blend-multiply" 
              />
            </Link>

            {/* Desktop Center Navigation Links */}
            <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={`text-[13px] lg:text-sm font-bold tracking-wide transition-all duration-300 relative group ${
                      isActive ? activeColor : `${textColor} opacity-90 hover:opacity-100`
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1.5 left-0 h-[2px] transition-all duration-300 ${underlineColor} ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Right Icons */}
            <div className="flex items-center space-x-4 lg:space-x-5">
              
              
              {isAuthenticated && (
                <>
                  <Link to="/wishlist" className={`${textColor} ${iconHoverColor} transition-transform hover:scale-110 relative`}>
                    <Heart size={20} strokeWidth={2} />
                  </Link>
                  <Link to="/cart" className={`${textColor} ${iconHoverColor} transition-transform hover:scale-110 relative`}>
                    <ShoppingBag size={20} strokeWidth={2} />
                    {totalItems > 0 && (
                      <span className={`absolute -top-2 -right-2 ${isTransparent ? 'bg-white text-[#0d4023]' : 'bg-[#0d4023] text-white'} text-[10px] font-extrabold w-4 h-4 flex items-center justify-center rounded-full shadow-sm`}>
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </>
              )}
              
              {isAuthenticated ? (
                <div className="relative">
                  <button onClick={() => setShowLogoutConfirm(!showLogoutConfirm)} className={`${textColor} ${iconHoverColor} transition-transform hover:scale-110 flex items-center`}>
                    <User size={20} strokeWidth={2} />
                  </button>
                  
                  {showLogoutConfirm && (
                    <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 z-50">
                      <button onClick={() => setShowLogoutConfirm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-chip-black"><X size={18} /></button>
                      <div className="flex flex-col items-center text-center mt-2">
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3"><LogOut size={24} /></div>
                        <h4 className="font-bold text-[#0d4023] mb-1">Log Out?</h4>
                        <div className="flex gap-2 w-full mt-4">
                          <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2 rounded-xl font-bold text-xs bg-gray-100 hover:bg-gray-200 text-chip-black transition">Cancel</button>
                          <button onClick={handleLogout} className="flex-1 py-2 rounded-xl font-bold text-xs bg-red-500 hover:bg-red-600 text-white transition">Log Out</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className={`px-5 py-2.5 rounded-full font-bold text-xs tracking-wider transition-all shadow-sm hover:shadow-md ${isTransparent ? 'bg-white text-[#0d4023] hover:bg-gray-100' : 'bg-[#0d4023] text-white hover:bg-[#092a17]'}`}>
                  LOGIN
                </Link>
              )}
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* MOBILE TOP CONTENT (Hidden on Desktop)           */}
          {/* ------------------------------------------------ */}
          <div className="flex md:hidden justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <button className={`${textColor} transition-transform active:scale-95`}>
                <Menu size={24} strokeWidth={2} />
              </button>
              <Link to="/">
                <img src={logo} alt="ChipCharm" className="h-8 w-auto mix-blend-multiply" />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              
              <Link to="/wishlist" className={`${textColor} relative transition-transform active:scale-95`}>
                <Heart size={20} strokeWidth={2} />
              </Link>
              <Link to="/cart" className={`${textColor} relative transition-transform active:scale-95`}>
                <ShoppingBag size={20} strokeWidth={2} />
                {totalItems > 0 && (
                  <span className={`absolute -top-1.5 -right-1.5 ${isTransparent ? 'bg-white text-[#0d4023]' : 'bg-[#0d4023] text-white'} text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full shadow-sm`}>
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link to={isAuthenticated ? "/profile" : "/login"} className={`${textColor} transition-transform active:scale-95`}>
                <User size={20} strokeWidth={2} />
              </Link>
            </div>
          </div>
          
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* 4. MOBILE BOTTOM NAVBAR (Floating Tabs)                                   */}
      {/* ========================================================================= */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full px-5 py-2 flex justify-between items-center border border-gray-100">
          
          <Link to="/" className={`flex flex-col items-center gap-1 mt-1 transition-colors ${location.pathname === '/' ? 'text-[#0d4023]' : 'text-gray-400 hover:text-[#0d4023]'}`}>
            <HomeIcon size={22} className={location.pathname === '/' ? 'fill-[#0d4023]' : ''} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
            <span className="text-[9px] font-bold tracking-wide">Home</span>
          </Link>
          
          <Link to="/shop" className={`flex flex-col items-center gap-1 mt-1 transition-colors ${location.pathname === '/shop' ? 'text-[#0d4023]' : 'text-gray-400 hover:text-[#0d4023]'}`}>
            <LayoutGrid size={22} strokeWidth={location.pathname === '/shop' ? 2.5 : 2} />
            <span className="text-[9px] font-bold tracking-wide">Shop</span>
          </Link>
          
          {/* Prominent Center Bag Indicator */}
          <Link to="/cart" className="relative -top-5 w-14 h-14 bg-[#0d4023] rounded-full flex items-center justify-center text-white shadow-lg border-[5px] border-[#faf6ee] shrink-0 hover:scale-105 active:scale-95 transition-transform">
            <ShoppingBag size={22} strokeWidth={2.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f5c842] text-[#0d4023] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#0d4023]">
                {totalItems}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className={`flex flex-col items-center gap-1 mt-1 transition-colors ${location.pathname === '/wishlist' ? 'text-[#0d4023]' : 'text-gray-400 hover:text-[#0d4023]'}`}>
            <Heart size={22} className={location.pathname === '/wishlist' ? 'fill-[#0d4023]' : ''} strokeWidth={location.pathname === '/wishlist' ? 2.5 : 2} />
            <span className="text-[9px] font-bold tracking-wide">Wishlist</span>
          </Link>
          
          <Link to={isAuthenticated ? "/profile" : "/login"} className={`flex flex-col items-center gap-1 mt-1 transition-colors ${location.pathname === '/profile' ? 'text-[#0d4023]' : 'text-gray-400 hover:text-[#0d4023]'}`}>
            <User size={22} className={location.pathname === '/profile' ? 'fill-[#0d4023]' : ''} strokeWidth={location.pathname === '/profile' ? 2.5 : 2} />
            <span className="text-[9px] font-bold tracking-wide">Account</span>
          </Link>

        </div>
      </div>
    </>
  );
};

export default Navbar;