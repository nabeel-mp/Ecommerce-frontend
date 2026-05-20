import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuthStatus } from '../features/auth/authSlice';
import SEO from '../components/SEO';
import { Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, isError, message, requireOtpEmail } = useSelector(
    (s) => s.auth
  );

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    if (requireOtpEmail) {
      dispatch(resetAuthStatus());
      navigate(`/verify-otp?email=${requireOtpEmail}`);
    }
  }, [isAuthenticated, requireOtpEmail, navigate, dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); dispatch(loginUser(formData)); };

  return (
    <div className="min-h-screen bg-[#f9f5ed] flex">
      <SEO title="Login" description="Sign in to your ChipCharm account." />

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0d4023] flex-col justify-between p-14 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.03]" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-[#f5c842]/10" />

        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#f5c842] rounded-full flex items-center justify-center">
            <span className="text-[#0d4023] text-lg font-black leading-none">C</span>
          </div>
          <span className="font-black text-xl text-white tracking-tight">ChipCharm</span>
        </Link>

        <div className="relative z-10">
          <div className="inline-block bg-[#f5c842]/15 border border-[#f5c842]/30 rounded-2xl px-4 py-2 text-[#f5c842] text-xs font-bold tracking-widest uppercase mb-6">
            Welcome Back
          </div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Your crunchy
            <br />
            favourites await.
          </h2>
          <p className="text-white/50 leading-relaxed">
            Sign in to track orders, manage your wishlist, and reorder your all-time favourite Kerala chips.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            {[
              'Order tracking & history',
              'Saved delivery addresses',
              'Wishlist & favourites',
              'Exclusive member offers',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#f5c842]/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#f5c842]" />
                </div>
                <span className="text-white/60 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/20 text-xs relative z-10">
          © {new Date().getFullYear()} ChipCharm · Premium Kerala Banana Chips
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#0d4023] rounded-full flex items-center justify-center">
              <span className="text-[#f5c842] font-black">C</span>
            </div>
            <span className="font-black text-lg text-[#0d4023]">ChipCharm</span>
          </Link>

          <h1 className="text-3xl font-black text-[#0d4023] mb-1">Sign in</h1>
          <p className="text-[#0d4023]/50 text-sm mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#c4a020] hover:text-[#0d4023] transition-colors">
              Create one free
            </Link>
          </p>

          {isError && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 rounded-xl p-4 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#0d4023]/70 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0d4023]/40" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full h-12 bg-white border border-black/[0.08] rounded-xl pl-11 pr-4 text-sm text-[#0d4023] placeholder:text-[#0d4023]/30 focus:outline-none focus:border-[#0d4023]/40 focus:ring-2 focus:ring-[#0d4023]/10 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-[#0d4023]/70 uppercase tracking-wide">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-[#c4a020] hover:text-[#0d4023] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0d4023]/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full h-12 bg-white border border-black/[0.08] rounded-xl pl-11 pr-12 text-sm text-[#0d4023] placeholder:text-[#0d4023]/30 focus:outline-none focus:border-[#0d4023]/40 focus:ring-2 focus:ring-[#0d4023]/10 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0d4023]/40 hover:text-[#0d4023] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#0d4023] text-white font-bold rounded-xl hover:bg-[#092a17] transition-all flex items-center justify-center gap-2 shadow-sm mt-2 disabled:opacity-60"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Sign in to account'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-black/[0.06] text-center">
            <p className="text-xs text-[#0d4023]/40">
              By continuing, you agree to our{' '}
              <span className="underline cursor-pointer">Terms</span> and{' '}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;