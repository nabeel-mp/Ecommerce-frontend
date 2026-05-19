import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../api/axios';
import { Loader2, ShieldCheck } from 'lucide-react';

// Load Stripe outside component to avoid recreating it
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ clientSecret, paymentIntentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    
    // Attempt to confirm the payment on Stripe's end
    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // Prevents automatic redirect to handle backend confirmation
    });

    if (submitError) {
      setError(submitError.message);
      setLoading(false);
      return;
    }

    // Tell our backend it was successful
    try {
      const { data } = await api.post('/payment/confirm', { paymentIntentId });
      if (data.success) {
        navigate(`/order-success?orderId=${data.order.orderNumber}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment confirmation failed on server.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 max-w-md mx-auto">
      <div className="text-center mb-6">
        <ShieldCheck size={40} className="text-green-500 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-matte-black">Secure Payment</h2>
        <p className="text-gray-500 text-sm">Powered by Stripe</p>
      </div>

      <PaymentElement className="mb-6" />

      {error && <div className="text-red-500 text-sm font-medium mb-4">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-matte-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Confirm Payment'}
      </button>
    </form>
  );
};

const Payment = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');

  useEffect(() => {
    if (!orderId) return;
    
    const getIntent = async () => {
      try {
        const { data } = await api.post('/payment/create-intent', { orderId });
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      } catch (err) {
        console.error("Payment intent creation failed", err);
      }
    };
    getIntent();
  }, [orderId]);

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Loader2 className="animate-spin text-warm-yellow-dark" size={40} />
      </div>
    );
  }

  const appearance = { theme: 'stripe', variables: { colorPrimary: '#f5c842' } };

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        <CheckoutForm clientSecret={clientSecret} paymentIntentId={paymentIntentId} />
      </Elements>
    </div>
  );
};

export default Payment;