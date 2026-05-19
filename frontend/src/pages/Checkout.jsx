import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axios';
import SEO from '../components/SEO';
import { CreditCard, Banknote, Loader2 } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { total } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '', phone: '', addressLine1: '', addressLine2: '',
    city: '', state: '', pincode: '', paymentMethod: 'stripe'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: 'India'
        },
        paymentMethod: formData.paymentMethod,
        deliveryInstructions: ''
      };

      const { data } = await api.post('/orders', payload);

      if (formData.paymentMethod === 'stripe') {
        // Redirect to payment page to complete Stripe transaction
        navigate(`/payment?orderId=${data.order._id}`);
      } else {
        // COD
        navigate(`/order-success?orderId=${data.order.orderNumber}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <SEO title="Checkout" description="Secure checkout for your ChipCharm order." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-extrabold text-matte-black mb-8">Checkout</h1>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium">{error}</div>}

        <form onSubmit={handlePlaceOrder} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          
          {/* Shipping Address */}
          <h2 className="text-xl font-bold text-matte-black mb-6">Shipping Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <input required type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
            <input required type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
            <div className="md:col-span-2">
              <input required type="text" name="addressLine1" placeholder="Address Line 1" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow mb-4" />
              <input type="text" name="addressLine2" placeholder="Address Line 2 (Optional)" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
            </div>
            <input required type="text" name="city" placeholder="City" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" name="state" placeholder="State" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
              <input required type="text" name="pincode" placeholder="Pincode" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
            </div>
          </div>

          {/* Payment Method */}
          <h2 className="text-xl font-bold text-matte-black mb-6">Payment Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${formData.paymentMethod === 'stripe' ? 'border-matte-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="radio" name="paymentMethod" value="stripe" checked={formData.paymentMethod === 'stripe'} onChange={handleChange} className="w-5 h-5 accent-matte-black" />
              <div className="flex items-center gap-2">
                <CreditCard size={24} className="text-matte-black" />
                <span className="font-semibold text-matte-black">Credit / Debit / UPI</span>
              </div>
            </label>
            <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${formData.paymentMethod === 'cod' ? 'border-matte-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="w-5 h-5 accent-matte-black" />
              <div className="flex items-center gap-2">
                <Banknote size={24} className="text-matte-black" />
                <span className="font-semibold text-matte-black">Cash on Delivery</span>
              </div>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-warm-yellow hover:bg-warm-yellow-dark text-matte-black font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : `Pay ₹${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;