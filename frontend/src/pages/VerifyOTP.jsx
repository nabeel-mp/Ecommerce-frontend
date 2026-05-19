import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, resetAuthStatus } from '../features/auth/authSlice';
import api from '../api/axios';
import SEO from '../components/SEO';
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

const VerifyOTP = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  
  const { isAuthenticated, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!email) navigate('/login');
    if (isAuthenticated) navigate('/');
    return () => dispatch(resetAuthStatus());
  }, [email, isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ email, otp }));
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage('');
    try {
      const { data } = await api.post('/auth/resend-otp', { email });
      setResendMessage(data.message);
    } catch (err) {
      setResendMessage(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <SEO title="Verify Email" description="Verify your ChipCharm account." />
      
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 sm:p-10 text-center">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={32} />
        </div>
        
        <h2 className="text-3xl font-extrabold text-matte-black mb-2">Check Your Email</h2>
        <p className="text-gray-500 text-sm mb-8">
          We've sent a 6-digit code to <span className="font-semibold text-matte-black">{email}</span>. This code will expire in 10 minutes.
        </p>

        {isError && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center justify-center gap-2 text-sm font-medium">
            <AlertCircle size={18} />
            <span>{message}</span>
          </div>
        )}

        {resendMessage && (
          <div className="mb-6 p-4 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium">
            {resendMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            required
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Numbers only
            className="w-full bg-gray-50 border-2 border-gray-200 text-center text-3xl font-bold tracking-[0.5em] text-matte-black rounded-xl py-4 focus:ring-0 focus:border-warm-yellow outline-none transition"
            placeholder="000000"
          />

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-matte-black text-white font-bold rounded-xl py-4 hover:bg-gray-800 transition shadow-md flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Verify Account'}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-600">
          Didn't receive the code?{' '}
          <button 
            onClick={handleResend}
            disabled={resendLoading}
            className="font-bold text-warm-yellow-dark hover:text-matte-black transition disabled:opacity-50"
          >
            {resendLoading ? 'Resending...' : 'Resend OTP'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;