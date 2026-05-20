import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetAuthStatus } from '../features/auth/authSlice';
import SEO from '../components/SEO';
import { User, Mail, Lock, Phone, Loader2, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'Contains a letter', test: (p) => /[a-zA-Z]/.test(p) },
  { label: 'Contains a number', test: (p) => /\d/.test(p) },
];

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
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
  const handleSubmit = (e) => { e.preventDefault(); dispatch(registerUser(formData)); };

  const passRules = PASSWORD_RULES.map((r) => ({ ...r, pass: r.test(formData.password) }));
  const passStrength = passRules.filter((r) => r.pass).length;

  const fields = [
    { name: 'name', type: 'text', placeholder: 'Full name', label: 'Full Name', icon: User, required: true },
    { name: 'email', type: 'email', placeholder: 'you@example.com', label: 'Email', icon: Mail, required: true },
    { name: 'phone', type: 'tel', placeholder: '+91 98765 43210', label: 'Phone (optional)', icon: Phone, required: false },
  ];

  return (
    <div className="min-h-screen bg-[#f9f5ed] flex">
      <SEO title="Create Account" description="Join ChipCharm for premium Kerala banana chips delivered fresh to your door." />

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[420px] xl:w-1/2 bg-[#0d4023] flex-col justify-between p-14 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#f5c842]/[0.06] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/[0.03] -translate-x-1/3 translate-y-1/3" />

        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 bg-[#f5c842] rounded-full flex items-center justify-center">
            <span className="text-[#0d4023] text-lg font-black leading-none">C</span>
          </div>
          <span className="font-black text-xl text-white tracking-tight">ChipCharm</span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-4xl font-black text-white leading-tight mb-5">
            Join thousands of
            <br />
            <span className="text-[#f5c842]">chip lovers.</span>
          </h2>
          <p className="text-white/50 leading-relaxed text-sm mb-8">
            Create a free account and get access to exclusive deals, early launches, and our full collection of premium Kerala banana chips.
          </p>

          <div className="bg-white/[0.06] rounded-2xl p-6 border border-white/10">
            <p className="text-[#f5c842] text-xs font-bold tracking-widest uppercase mb-4">New member perks</p>
            <div className="space-y-3">
              {[
                '10% off your first order',
                'Free delivery on orders above ₹500',
                'Early access to new flavours',
                'Birthday surprise pack',
              ].map((perk) => (
                <div key={perk} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#f5c842] shrink-0" />
                  <span className="text-white/70 text-sm">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-white/20 text-xs relative z-10">
          © {new Date().getFullYear()} ChipCharm · All rights reserved
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#0d4023] rounded-full flex items-center justify-center">
              <span className="text-[#f5c842] font-black">C</span>
            </div>
            <span className="font-black text-lg text-[#0d4023]">ChipCharm</span>
          </Link>

          <h1 className="text-3xl font-black text-[#0d4023] mb-1">Create account</h1>
          <p className="text-[#0d4023]/50 text-sm mb-8">
            Already have one?{' '}
            <Link to="/login" className="font-bold text-[#c4a020] hover:text-[#0d4023] transition-colors">
              Sign in
            </Link>
          </p>

          {isError && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 rounded-xl p-4 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#0d4023]/70 uppercase tracking-wide">
                  {field.label}
                </label>
                <div className="relative">
                  <field.icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0d4023]/40" />
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full h-12 bg-white border border-black/[0.08] rounded-xl pl-11 pr-4 text-sm text-[#0d4023] placeholder:text-[#0d4023]/30 focus:outline-none focus:border-[#0d4023]/40 focus:ring-2 focus:ring-[#0d4023]/10 transition"
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#0d4023]/70 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0d4023]/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
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

              {/* Strength indicator */}
              {formData.password && (
                <div className="mt-2 space-y-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < passStrength
                            ? passStrength === 1
                              ? 'bg-red-400'
                              : passStrength === 2
                              ? 'bg-[#f5c842]'
                              : 'bg-green-500'
                            : 'bg-black/10'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    {passRules.map((r) => (
                      <div key={r.label} className="flex items-center gap-2">
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                            r.pass ? 'bg-green-500' : 'bg-black/10'
                          }`}
                        >
                          {r.pass && <span className="text-white text-[8px] font-black">✓</span>}
                        </div>
                        <span className={`text-xs ${r.pass ? 'text-green-600' : 'text-[#0d4023]/40'}`}>
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#f5c842] text-[#0d4023] font-black rounded-xl hover:bg-[#e8b800] transition-all flex items-center justify-center gap-2 shadow-sm mt-2 disabled:opacity-60"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Create free account →'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-[#0d4023]/40">
            By signing up, you agree to our{' '}
            <span className="underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;