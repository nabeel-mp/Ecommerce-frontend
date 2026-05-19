import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './features/auth/authSlice';
//components
import Navbar from './components/layout/Navbar';
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
import AdminRoute from './components/routing/AdminRoute';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  // Check user session on initial app load
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Prevent flashing logged-out state while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-matte-black"></div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:slug" element={<ProductDetails />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wholesale" element={<Wholesale />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/contact" element={<Contact />} />

              <Route element={<AdminRoute />}>
  <Route element={<AdminLayout />}>
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/orders" element={<AdminOrders />} />
    {/* You can add AdminProducts and AdminUsers here later following the same pattern */}
  </Route>
</Route>
            </Routes>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}
export default App;