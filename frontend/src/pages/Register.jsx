import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetAuthStatus } from '../features/auth/authSlice';
import SEO from '../components/SEO';
import { 
  User,
  Mail, 
  Lock, 
  Loader2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Truck,
  Leaf,
  Droplet,
  Package,
  FlaskConical,
  TreePalm,
  ChevronLeft
} from 'lucide-react';
import loginBg from '../assets/login background.png';
import logo from '../assets/Logo.jpeg';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (localError) setLocalError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    dispatch(registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password
    }));
  };

  const displayError = localError || (isError ? message : null);

  const trustFeatures = [
    { icon: Leaf, title: "100% Natural", sub: "Ingredients" },
    { icon: Droplet, title: "Real Coconut Oil", sub: "Cold Pressed" },
    { icon: Package, title: "No Preservatives", sub: "No Added Colors" },
    { icon: FlaskConical, title: "Packed Fresh", sub: "Everyday" },
    { icon: TreePalm, title: "Kerala Traditional", sub: "Authentic Recipe" }
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col lg:flex-row antialiased select-none">
      <SEO title="Create Account" description="Join ChipCharm for premium Kerala banana chips." />

      {/* ========================================================================= */}
      {/* DESKTOP LEFT PANEL: Immersive Graphic Viewports Only                      */}
      {/* ========================================================================= */}
      <div className="relative w-full lg:w-1/2 xl:w-[50%] hidden lg:flex flex-col overflow-hidden min-h-screen shrink-0 z-0">
        
        {/* Top Image Canvas */}
        <div className="relative flex-1 w-full flex flex-col p-10 lg:p-14 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={loginBg} 
              alt="ChipCharm Marketing Banner" 
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="relative z-10 flex-1 flex flex-col">
            <Link to="/" className="inline-block transition-transform duration-300 hover:scale-[1.01] mb-12">
              <img 
                src={logo} 
                alt="ChipCharm Logo" 
                className="h-14 xl:h-16 w-auto object-contain mix-blend-multiply" 
              />
            </Link>

            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#0d4023] leading-[1.18] mb-3 tracking-tight">
                Join the <br />
                <span className="text-[#f5c842] font-black">happiness</span> <br />
                family!
              </h1>
              
              <div className="flex items-center gap-2 mt-5 mb-5 text-[#d8a918] opacity-80 w-full select-none">
                <span className="h-[1px] w-8 bg-current opacity-40"></span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17 8C15.3 8 13.2 8.9 11.7 10.2C11.5 9.7 11.2 9.2 10.8 8.8C12.7 6.8 15.6 5.5 19 5C19 7.8 18.2 10.3 16.8 12.2C16.9 11.5 17 10.2 17 8ZM4 19C5.7 19 7.8 18.1 9.3 16.8C9.5 17.3 9.8 17.8 10.2 18.2C8.3 20.2 5.4 21.5 2 22C2 19.2 2.8 16.7 4.2 14.8C4.1 15.5 4 16.8 4 19ZM20.6 2.4C19.1 1.5 17.2 1 15 1C9.5 1 5 5.5 5 11C5 11.7 5.1 12.4 5.2 13.1C3.1 14.2 1.4 16.2 0.5 18.6C0.2 19.4 0 20.2 0 21C0 21.6 0.4 22 1 22C1.8 22 2.6 21.8 3.4 21.5C5.8 20.6 7.8 18.9 8.9 16.8C9.6 16.9 10.3 17 11 17C16.5 17 21 12.5 21 7C21 4.8 20.5 2.9 19.6 1.4L20.6 2.4Z" />
                </svg>
              </div>

              <p className="text-[#0d4023]/80 font-medium text-sm leading-relaxed max-w-xs">
                Create an account and <br />enjoy authentic <br />Kerala banana chips <br /> made with love.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Feature Strip (Desktop Only) */}
        <div className="w-full bg-[#0d4023] py-8 px-6 xl:px-10 flex justify-between items-start z-10 shrink-0 shadow-inner">
          {trustFeatures.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-1 flex-1">
              <div className="w-10 h-10 rounded-full border border-[#f5c842]/40 flex items-center justify-center text-[#f5c842] mb-2">
                <item.icon size={18} strokeWidth={1.8} />
              </div>
              <p className="text-[11px] font-bold text-white leading-tight mb-0.5 whitespace-nowrap">{item.title}</p>
              <p className="text-[10px] text-white/60 font-medium leading-snug whitespace-nowrap">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT PANEL / MOBILE VIEW: Registration Interface                         */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col bg-[#fdfbf7] lg:bg-white relative z-10 px-6 sm:px-16 lg:px-12 xl:px-24 py-6 lg:py-10 min-h-screen overflow-y-auto">
        
        {/* Mobile Top Navigation Header */}
        <div className="w-full lg:hidden flex items-center justify-between pb-4 pt-2">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#0d4023] hover:bg-black/5 rounded-full transition-colors">
            <ChevronLeft size={26} strokeWidth={2.5} />
          </button>
          <Link to="/">
            <img 
              src={logo} 
              alt="ChipCharm Logo" 
              className="h-10 w-auto object-contain mix-blend-multiply" 
            />
          </Link>
          <div className="w-10"></div> {/* Spacing balance */}
        </div>

        {/* Registration Form Container */}
        <div className="w-full max-w-[360px] sm:max-w-md mx-auto my-auto space-y-7">
          
          {/* Typography Header */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d4023] tracking-tight">
              Create your account
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1.5 font-medium">
              Sign up to start your crispy journey with us!
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="flex items-center justify-center w-full max-w-[280px] mx-auto pt-2 pb-2">
            <div className="flex flex-col items-center relative z-10">
              <div className="w-6 h-6 rounded-full bg-[#0d4023] text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-white">1</div>
              <span className="text-[10px] text-[#0d4023] font-bold mt-2 absolute top-6">Account</span>
            </div>
            <div className="flex-1 h-[1px] bg-gray-300 border-t border-dashed border-gray-400 mx-2"></div>
            
            <div className="flex flex-col items-center relative z-10">
              <div className="w-6 h-6 rounded-full bg-white border border-gray-300 text-gray-400 flex items-center justify-center text-[10px] font-bold ring-4 ring-white">2</div>
              <span className="text-[10px] text-gray-400 font-medium mt-2 absolute top-6">Verify</span>
            </div>
            <div className="flex-1 h-[1px] bg-gray-300 border-t border-dashed border-gray-400 mx-2"></div>
            
            <div className="flex flex-col items-center relative z-10">
              <div className="w-6 h-6 rounded-full bg-white border border-gray-300 text-gray-400 flex items-center justify-center text-[10px] font-bold ring-4 ring-white">3</div>
              <span className="text-[10px] text-gray-400 font-medium mt-2 absolute top-6">Success</span>
            </div>
          </div>

          {/* Dynamic Error Alerts */}
          {displayError && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 rounded-xl p-3.5 text-xs sm:text-sm animate-fade-in mt-6">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span className="font-medium">{displayError}</span>
            </div>
          )}

          {/* Core Registration Entry Form */}
          <form onSubmit={handleSubmit} className={`space-y-4 ${displayError ? 'mt-4' : 'mt-8'}`}>
            
            {/* Field: Full Name */}
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full h-12 bg-white border border-gray-200 rounded-xl pl-12 pr-4 text-sm text-chip-black placeholder:text-gray-400 focus:outline-none focus:border-chip-green/40 focus:ring-2 focus:ring-chip-green/5 transition-all shadow-sm"
              />
            </div>

            {/* Field: Email Address */}
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full h-12 bg-white border border-gray-200 rounded-xl pl-12 pr-4 text-sm text-chip-black placeholder:text-gray-400 focus:outline-none focus:border-chip-green/40 focus:ring-2 focus:ring-chip-green/5 transition-all shadow-sm"
              />
            </div>

            {/* Field: Password */}
            <div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full h-12 bg-white border border-gray-200 rounded-xl pl-12 pr-12 text-sm text-chip-black placeholder:text-gray-400 focus:outline-none focus:border-chip-green/40 focus:ring-2 focus:ring-chip-green/5 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-chip-green transition-colors z-10"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5 ml-2 font-medium">Minimum 6 characters</p>
            </div>

            {/* Field: Confirm Password */}
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full h-12 bg-white border border-gray-200 rounded-xl pl-12 pr-12 text-sm text-chip-black placeholder:text-gray-400 focus:outline-none focus:border-chip-green/40 focus:ring-2 focus:ring-chip-green/5 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-chip-green transition-colors z-10"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Legal Checkbox */}
            <div className="flex items-start gap-2.5 pt-2 mb-2">
              <div className="flex items-center h-4 mt-0.5 shrink-0">
                <input 
                  type="checkbox" 
                  required 
                  className="w-4 h-4 rounded border-gray-300 text-[#0d4023] focus:ring-[#0d4023] cursor-pointer accent-[#0d4023]" 
                />
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                I agree to the <a href="#" className="font-bold text-[#0d4023] hover:underline">Terms & Conditions</a> and <a href="#" className="font-bold text-[#0d4023] hover:underline">Privacy Policy</a>
              </p>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#0d4023] hover:bg-[#092a17] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 group mt-4"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Register <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute w-full border-t border-gray-100" />
            <span className="relative bg-[#fdfbf7] lg:bg-white px-4 text-xs font-semibold text-gray-400 lowercase tracking-widest">
              or sign up with
            </span>
          </div>

          {/* Google SSO Button */}
          <button
            type="button"
            className="w-full h-12 bg-white border border-gray-200 hover:border-gray-300 rounded-xl font-bold text-sm text-chip-black shadow-sm hover:bg-gray-50/40 transition-all flex items-center justify-center gap-3"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Login Redirection Switch */}
          <p className="text-center text-sm font-medium text-gray-600 pt-2 pb-4">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-bold text-[#0d4023] hover:underline underline-offset-4 decoration-2 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Security and Trust Footer Bottom Strip Metrics */}
        <div className="mt-8 lg:mt-6 pt-5 pb-2 border-t border-gray-200/60 grid grid-cols-3 gap-2 sm:gap-4 text-left w-full max-w-md mx-auto">
          {[
            { icon: ShieldCheck, title: "Secure", desc: "Your data is safe and encrypted" },
            { icon: Award, title: "Quality", desc: "Premium ingredients and quality" },
            { icon: Truck, title: "Fast Delivery", desc: "Quick delivery across India" }
          ].map((trust, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2.5">
              <trust.icon className="text-[#0d4023] shrink-0 sm:mt-0.5" size={18} strokeWidth={2.5} />
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold text-[#0d4023] leading-tight">{trust.title}</h4>
                <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium mt-0.5 leading-snug">{trust.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Register;