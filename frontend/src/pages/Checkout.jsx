import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axios';
import SEO from '../components/SEO';
import { CreditCard, Banknote, Loader2, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';

const InputField = ({ label, name, type = 'text', placeholder, required = true, value, onChange, half }) => (
  <div className={half ? '' : 'col-span-2 sm:col-span-2'}>
    <label className="block text-[12px] font-bold text-[#0d4023]/60 uppercase tracking-wide mb-1.5">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full h-11 bg-[#f9f5ed] border border-black/[0.08] rounded-xl px-4 text-sm text-[#0d4023] placeholder:text-[#0d4023]/30 focus:outline-none focus:bg-white focus:border-[#0d4023]/30 focus:ring-2 focus:ring-[#0d4023]/10 transition"
    />
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, shippingCharge, total } = useSelector((s) => s.cart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1 = address, 2 = payment

  const [formData, setFormData] = useState({
    fullName: '', phone: '', addressLine1: '', addressLine2: '',
    city: '', state: '', pincode: '', paymentMethod: 'stripe',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/orders', {
        shippingAddress: {
          fullName: formData.fullName, phone: formData.phone,
          addressLine1: formData.addressLine1, addressLine2: formData.addressLine2,
          city: formData.city, state: formData.state, pincode: formData.pincode, country: 'India',
        },
        paymentMethod: formData.paymentMethod,
      });
      if (formData.paymentMethod === 'stripe') {
        navigate(`/payment?orderId=${data.order._id}`);
      } else {
        navigate(`/my-orders`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const PAYMENT_OPTIONS = [
    { value: 'stripe', icon: CreditCard, label: 'Card / UPI / NetBanking', sub: 'Secured by Stripe' },
    { value: 'cod', icon: Banknote, label: 'Cash on Delivery', sub: 'Pay when it arrives' },
  ];

  return (
    <div className="min-h-screen bg-[#f9f5ed]">
      <SEO title="Checkout" description="Complete your ChipCharm order securely." />

      {/* Header */}
      <div className="bg-white border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/cart" className="text-[#0d4023]/50 hover:text-[#0d4023] transition-colors font-medium">
              Cart
            </Link>
            <ChevronRight size={14} className="text-[#0d4023]/30" />
            <span className="font-bold text-[#0d4023]">Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handlePlaceOrder}>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: Form */}
            <div className="flex-1 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-4 text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
                <div className="flex items-center gap-3 p-5 border-b border-black/[0.06]">
                  <div className="w-8 h-8 bg-[#0d4023] text-[#f5c842] rounded-xl flex items-center justify-center text-sm font-black">
                    1
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#0d4023]" />
                    <h2 className="font-black text-[#0d4023]">Delivery Address</h2>
                  </div>
                </div>
                <div className="p-5 grid grid-cols-2 gap-4">
                  <InputField label="Full Name" name="fullName" placeholder="Your full name" value={formData.fullName} onChange={handleChange} />
                  <InputField label="Phone" name="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                  <div className="col-span-2">
                    <InputField label="Address Line 1" name="addressLine1" placeholder="House/Flat no., Street" value={formData.addressLine1} onChange={handleChange} />
                  </div>
                  <div className="col-span-2">
                    <InputField label="Address Line 2" name="addressLine2" placeholder="Area, Landmark (optional)" required={false} value={formData.addressLine2} onChange={handleChange} />
                  </div>
                  <InputField label="City" name="city" placeholder="City" half value={formData.city} onChange={handleChange} />
                  <InputField label="State" name="state" placeholder="State" half value={formData.state} onChange={handleChange} />
                  <InputField label="Pincode" name="pincode" placeholder="6-digit pincode" half value={formData.pincode} onChange={handleChange} />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
                <div className="flex items-center gap-3 p-5 border-b border-black/[0.06]">
                  <div className="w-8 h-8 bg-[#0d4023] text-[#f5c842] rounded-xl flex items-center justify-center text-sm font-black">
                    2
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-[#0d4023]" />
                    <h2 className="font-black text-[#0d4023]">Payment Method</h2>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === opt.value
                          ? 'border-[#0d4023] bg-[#0d4023]/[0.03]'
                          : 'border-black/[0.08] hover:border-black/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.value}
                        checked={formData.paymentMethod === opt.value}
                        onChange={handleChange}
                        className="w-4 h-4 accent-[#0d4023]"
                      />
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        formData.paymentMethod === opt.value ? 'bg-[#0d4023]' : 'bg-[#f9f5ed]'
                      }`}>
                        <opt.icon size={18} className={formData.paymentMethod === opt.value ? 'text-[#f5c842]' : 'text-[#0d4023]/60'} />
                      </div>
                      <div>
                        <p className="font-bold text-[#0d4023] text-sm">{opt.label}</p>
                        <p className="text-xs text-[#0d4023]/50">{opt.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Security note */}
              <div className="flex items-center gap-3 px-2">
                <ShieldCheck size={16} className="text-green-600 shrink-0" />
                <p className="text-xs text-[#0d4023]/50">
                  Your payment information is encrypted and secure. We never store card details.
                </p>
              </div>
            </div>

            {/* Right: Order summary */}
            <div className="lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
                <div className="p-5 border-b border-black/[0.06]">
                  <h2 className="font-black text-[#0d4023]">Order Summary</h2>
                  <p className="text-xs text-[#0d4023]/50 mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                </div>

                {/* Items */}
                <div className="divide-y divide-black/[0.04]">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 px-5 py-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f9f5ed] shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-base">🍌</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#0d4023] truncate">{item.name}</p>
                        <p className="text-[10px] text-[#0d4023]/40">{item.weight} × {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-[#0d4023] shrink-0">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="p-5 space-y-2.5 border-t border-black/[0.06]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0d4023]/60">Subtotal</span>
                    <span className="font-semibold text-[#0d4023]">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0d4023]/60">Delivery</span>
                    <span className={`font-semibold ${shippingCharge === 0 ? 'text-green-600' : 'text-[#0d4023]'}`}>
                      {shippingCharge === 0 ? 'Free' : `₹${shippingCharge}`}
                    </span>
                  </div>
                  <div className="border-t border-black/[0.06] pt-2.5 flex justify-between">
                    <span className="font-black text-[#0d4023]">Total</span>
                    <span className="font-black text-xl text-[#0d4023]">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-[#f5c842] text-[#0d4023] font-black rounded-xl hover:bg-[#e8b800] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 text-sm"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        {formData.paymentMethod === 'cod' ? 'Place Order' : `Pay ₹${total.toFixed(2)}`}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Need ArrowRight import
import { ArrowRight } from 'lucide-react';
export default Checkout;