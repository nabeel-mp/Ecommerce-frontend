import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetAuthStatus } from '../features/auth/authSlice';
import SEO from '../components/SEO';
import { User, Mail, Lock, Phone, Loader2, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
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
    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <SEO title="Register" description="Create a new ChipCharm account." />
      
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-matte-black mb-2">Create Account</h2>
          <p className="text-gray-500 text-sm">Join ChipCharm for premium snacking experiences.</p>
        </div>

        {isError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-3 text-sm font-medium">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Inputs */}
          {[
            { name: 'name', type: 'text', placeholder: 'Full Name', icon: User },
            { name: 'email', type: 'email', placeholder: 'Email Address', icon: Mail },
            { name: 'phone', type: 'tel', placeholder: 'Phone Number (Optional)', icon: Phone, required: false },
            { name: 'password', type: 'password', placeholder: 'Create Password', icon: Lock },
          ].map((field) => (
            <div key={field.name} className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <field.icon size={20} />
              </div>
              <input
                type={field.type}
                name={field.name}
                required={field.required !== false}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 text-matte-black rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-warm-yellow focus:border-warm-yellow outline-none transition"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-warm-yellow text-matte-black font-bold rounded-xl py-4 mt-4 hover:bg-warm-yellow-dark transition shadow-md flex justify-center items-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-matte-black hover:text-warm-yellow-dark transition">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;