import { useState } from 'react';
import api from '../api/axios';
import SEO from '../components/SEO';
import { Store, Truck, BadgePercent, CheckCircle2, Loader2 } from 'lucide-react';

const Wholesale = () => {
  const [formData, setFormData] = useState({
    businessName: '', contactPerson: '', email: '', phone: '',
    deliveryLocation: '', quantityRequired: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/wholesale/inquiry', formData);
      setSuccess(true);
      setFormData({ businessName: '', contactPerson: '', email: '', phone: '', deliveryLocation: '', quantityRequired: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-16">
      <SEO title="Wholesale & Bulk Orders" description="Get premium Kerala banana chips for your business. Special B2B pricing, bulk loose weight, and fast delivery." />
      
      {/* Hero */}
      <div className="bg-matte-black text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-warm-yellow mb-4">Partner with ChipCharm</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">Premium quality banana chips for retailers, caterers, and corporate gifting. Get exclusive B2B pricing and reliable delivery.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: BadgePercent, title: "Special Pricing", desc: "Unbeatable wholesale margins." },
            { icon: Truck, title: "Pan-India Delivery", desc: "Secure & fast shipping." },
            { icon: Store, title: "Flexible Packaging", desc: "Loose weight or branded jars." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <feature.icon size={36} className="mx-auto text-warm-yellow-dark mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-matte-black mb-6 text-center">Submit a Wholesale Inquiry</h2>
          
          {success ? (
            <div className="text-center py-10">
              <CheckCircle2 size={60} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-matte-black mb-2">Inquiry Submitted!</h3>
              <p className="text-gray-600">Thank you for your interest. Our B2B team will contact you within 24 hours.</p>
              <button onClick={() => setSuccess(false)} className="mt-8 text-warm-yellow-dark font-bold hover:underline">Submit another inquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium text-sm">{error}</div>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required type="text" name="businessName" placeholder="Business/Company Name" value={formData.businessName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
                <input required type="text" name="contactPerson" placeholder="Contact Person Name" value={formData.contactPerson} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
                <input required type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
                <input required type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
              </div>
              
              <input required type="text" name="deliveryLocation" placeholder="Delivery City / Pincode" value={formData.deliveryLocation} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
              <input required type="text" name="quantityRequired" placeholder="Estimated Quantity (e.g. 50kg, 100 boxes)" value={formData.quantityRequired} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow" />
              
              <textarea name="message" placeholder="Any specific requirements? (Flavors, packaging, etc.)" value={formData.message} onChange={handleChange} rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 outline-none focus:border-warm-yellow resize-none"></textarea>

              <button type="submit" disabled={loading} className="w-full bg-matte-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition disabled:opacity-50 shadow-lg">
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wholesale;