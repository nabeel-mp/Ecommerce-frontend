import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './features/auth/authSlice';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import AdminRoute from './components/routing/AdminRoute';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import MyOrders from './pages/MyOrders';
import Profile from './pages/Profile';
import Wholesale from './pages/Wholesale';
import OurStory from './pages/OurStory';
import Contact from './pages/Contact';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-chip-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chip-green"></div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Public Routes Wrapped in MainLayout (Navbar + Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          
          {/* Auth Routes (Standalone layouts, no Navbar/Footer to prevent distraction) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;