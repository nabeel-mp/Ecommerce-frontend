import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuthStatus } from '../features/auth/authSlice';
import SEO from '../components/SEO';
import { 
  Mail, 
  Lock, 
  Loader2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Truck
} from 'lucide-react';
import loginBg from '../assets/login background.png';
import logo from '../assets/Logo.jpeg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col lg:flex-row antialiased select-none">
      <SEO title="Login" description="Sign in to your ChipCharm account." />

      {/* Left Panel: Graphic Branding Sheet */}
      <div className="relative w-full lg:w-1/2 xl:w-[50%] flex flex-col p-6 sm:p-10 lg:p-14 overflow-hidden min-h-[40vh] sm:min-h-[48vh] lg:min-h-screen shrink-0">
        {/* Background Canvas Graphic */}
        <div className="absolute inset-0 z-0">
          <img 
            src={loginBg} 
            alt="ChipCharm Marketing Banner" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Brand Logo Header Block */}
        <div className="relative z-10 hidden lg:block mb-8 xl:mb-1">
          <Link to="/" className="inline-block transition-transform duration-300 hover:scale-[1.01]">
            <img 
              src={logo} 
              alt="ChipCharm Logo" 
              className="h-14 xl:h-16 w-auto object-contain mix-blend-multiply" 
            />
          </Link>
        </div>

        {/* Fixed Hero Heading Text Block - Clean rendering positioned perfectly under the logo */}
        <div className="relative z-10 max-w-xl lg:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0d4023] leading-[1.18] mb-3 tracking-tight">
            Welcome back <br />
            to crispy <span className="text-[#f5c842] font-black">happiness!</span>
          </h1>
          <p className="text-[#0d4023]/80 font-medium text-xs sm:text-sm leading-relaxed max-w-xs sm:max-w-sm">
            Login to your account and continue enjoying authentic Kerala banana chips made with love.
          </p>
        </div>

        {/* Desktop Footer Trademark Info Summary */}
        <div className="relative z-10 hidden lg:block text-[11px] text-[#0d4023]/40 font-semibold mt-auto">
          © {new Date().getFullYear()} ChipCharm · Premium Kerala Banana Chips
        </div>
      </div>

      {/* Right Panel: Clean Authentication Interface Form Layout */}
      <div className="flex-1 flex flex-col justify-between bg-white relative z-10 -mt-8 lg:mt-0 rounded-t-[2.5rem] lg:rounded-none px-6 sm:px-16 lg:px-12 xl:px-24 py-10 lg:py-12 min-h-[60vh] lg:min-h-screen">
        
        {/* Mobile Header Brand Icon Block */}
        <div className="w-full max-w-md mx-auto lg:hidden flex flex-col items-center justify-center pb-4 pt-2">
          <Link to="/">
            <img 
              src={logo} 
              alt="ChipCharm Logo" 
              className="h-12 w-auto object-contain mix-blend-multiply" 
            />
          </Link>
          <div className="w-12 h-[2px] bg-[#f5c842] mt-2 rounded-full opacity-60" />
        </div>

        {/* Authentication Panel Wrapper Container */}
        <div className="w-full max-w-[350px] sm:max-w-md mx-auto my-auto space-y-6 sm:space-y-7">
          
          {/* Typography Header Title Section */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d4023] tracking-tight">
              Login to your account
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1.5 font-medium">
              Enter your email and password to continue
            </p>
          </div>

          {/* Dynamic Core Response Errors */}
          {isError && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 rounded-xl p-3.5 text-xs sm:text-sm animate-fade-in">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span className="font-medium">{message}</span>
            </div>
          )}

          {/* Core Login Entry Form Elements */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Field: Email Box */}
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full h-12 bg-[#edf2f7]/50 border border-gray-200 rounded-xl pl-12 pr-4 text-sm text-chip-black placeholder:text-gray-400 focus:outline-none focus:border-chip-green/40 focus:ring-2 focus:ring-chip-green/5 transition-all"
              />
            </div>

            {/* Input Field: Password Box */}
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full h-12 bg-[#edf2f7]/50 border border-gray-200 rounded-xl pl-12 pr-12 text-sm text-chip-black placeholder:text-gray-400 focus:outline-none focus:border-chip-green/40 focus:ring-2 focus:ring-chip-green/5 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-chip-green transition-colors z-10"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Action Tools: Utilities Strip Row */}
            <div className="flex items-center justify-between text-xs sm:text-sm pt-0.5">
              <label className="flex items-center gap-2 text-chip-black/70 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-chip-green text-chip-green focus:ring-transparent cursor-pointer"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="font-bold text-[#0d4023] hover:text-[#092a17] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Control Action Button CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#0d4023] hover:bg-[#092a17] text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-70 group mt-2"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Login <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Social Divider Splitter Graphic */}
          <div className="relative flex items-center justify-center py-1">
            <div className="absolute w-full border-t border-gray-100" />
            <span className="relative bg-white px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              or continue with
            </span>
          </div>

          {/* Google Federated Social Sign-In Option Button */}
          <button
            type="button"
            className="w-full h-12 bg-white border border-gray-200 hover:border-gray-300 rounded-xl font-bold text-sm text-chip-black shadow-2xs hover:bg-gray-50/40 transition-all flex items-center justify-center gap-3"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Account Registration Contextual Switch Link Info */}
          <p className="text-center text-sm font-medium text-gray-500 pt-1">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="font-bold text-[#0d4023] hover:underline underline-offset-4 decoration-2 transition-colors"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Security and Trust Footer Bottom Strip Metrics */}
        <div className="mt-10 lg:mt-6 pt-5 pb-2 bg-[#fdfbf7] lg:bg-white rounded-2xl p-4 lg:p-0 lg:border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left w-full max-w-md mx-auto">
          {[
            { icon: ShieldCheck, title: "Secure Login", desc: "Your data is 100% safe and encrypted" },
            { icon: Award, title: "Premium Quality", desc: "Authentic Kerala banana chips" },
            { icon: Truck, title: "Fast Delivery", desc: "Quick delivery across India" }
          ].map((trust, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <trust.icon className="text-[#0d4023] shrink-0 mt-0.5" size={16} strokeWidth={2.5} />
              <div>
                <h4 className="text-xs font-bold text-[#0d4023] leading-tight">{trust.title}</h4>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-snug">{trust.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Login;