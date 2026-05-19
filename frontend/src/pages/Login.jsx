import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuthStatus } from '../features/auth/authSlice';
import SEO from '../components/SEO';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading, isError, message, requireOtpEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    if (requireOtpEmail) {
      dispatch(resetAuthStatus());
      navigate(`/verify-otp?email=${requireOtpEmail}`);
    }
  }, [isAuthenticated, requireOtpEmail, navigate, dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <SEO title="Login" description="Login to your ChipCharm account." />
      
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Image */}
        <div className="md:w-1/2 bg-warm-yellow-dark relative hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800" 
            alt="Kerala Snacks" 
            className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 to-transparent flex flex-col justify-end p-10 text-white">
            <h2 className="text-3xl font-poppins font-bold mb-2">Welcome Back</h2>
            <p className="text-cream-light">Log in to access your premium orders, saved addresses, and wishlist.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-matte-black mb-2">Sign In</h2>
            <p className="text-gray-500 text-sm">Enter your details below to continue.</p>
          </div>

          {isError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-3 text-sm font-medium">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 text-matte-black rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-warm-yellow focus:border-warm-yellow outline-none transition"
                placeholder="Email Address"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 text-matte-black rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-warm-yellow focus:border-warm-yellow outline-none transition"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm font-semibold text-warm-yellow-dark hover:text-matte-black transition">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-matte-black text-white font-bold rounded-xl py-4 hover:bg-gray-800 transition shadow-lg flex justify-center items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Login to Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-warm-yellow-dark hover:text-matte-black transition">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;