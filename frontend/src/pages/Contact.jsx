import { useState } from 'react';
import SEO from '../components/SEO';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Leaf, 
  Headphones, 
  Send, 
  Plus, 
  Minus 
} from 'lucide-react';
// Import social icons from react-icons/fa instead of lucide-react to fix the error!
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const faqs = [
  { 
    q: 'Where do you deliver?', 
    a: 'We deliver all across India using our trusted network of courier partners to ensure your chips arrive fresh and crispy.' 
  },
  { 
    q: 'What are your delivery charges?', 
    a: 'We offer FREE shipping on all orders above ₹499! For orders below that, a nominal standard shipping fee applies.' 
  },
  { 
    q: 'What is your return policy?', 
    a: 'As we deal in perishable food items, we do not accept returns. However, if your order arrives damaged, please contact us within 24 hours with photos for a replacement.' 
  }
];

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-inter pb-16">
      <SEO title="Contact Us" description="Get in touch with the ChipCharm team. We'd love to hear from you!" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        
        {/* 1. HERO SECTION */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-6 mb-16">
          {/* Left text */}
          <div className="lg:w-5/12">
            <div className="flex items-center gap-2 text-chip-green font-bold text-xs tracking-widest uppercase mb-4">
               <Leaf size={16} className="text-chip-green" /> WE'D LOVE TO HEAR FROM YOU
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-chip-green leading-tight mb-1 font-poppins">
              Let's talk
            </h1>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-chip-gold leading-tight mb-4 font-poppins">
              all things crunchy!
            </h1>
            <p className="text-gray-500 text-sm max-w-sm">
              Have a question, feedback, or need help with your order? Our team is here to help you with love and care.
            </p>
          </div>

          {/* Right Cards */}
          <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <FaWhatsapp size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-chip-green mb-1">WhatsApp Us</p>
                <p className="text-sm font-semibold text-gray-800">+91 6235 123 456</p>
                <p className="text-[10px] text-gray-400 mt-1">Chat with us</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-chip-green mb-1">Email Us</p>
                <p className="text-sm font-semibold text-gray-800">hello@chipcharm.com</p>
                <p className="text-[10px] text-gray-400 mt-1">We reply within 24 hrs</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <Headphones size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-chip-green mb-1">Customer Support</p>
                <p className="text-sm font-semibold text-gray-800">9 AM – 6 PM</p>
                <p className="text-[10px] text-gray-400 mt-1">Mon – Sat IST</p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-chip-green mb-1">Our Location</p>
                <p className="text-sm font-semibold text-gray-800">Calicut, Kerala, India</p>
                <p className="text-[10px] text-gray-400 mt-1">Pin - 673001</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MIDDLE CONTENT ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 h-fit">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-chip-green font-poppins flex items-center gap-2">
                Send Us a Message <Leaf size={18} className="text-chip-gold" />
              </h2>
              <p className="text-gray-500 text-xs mt-1">Fill out the form and we'll get back to you soon.</p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-800 mb-1.5">Full Name</label>
                  <input type="text" placeholder="Enter your name" className="w-full h-11 px-3 bg-[#fdfbf7] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-chip-green/40 focus:ring-1 focus:ring-chip-green/20 transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-800 mb-1.5">Email Address</label>
                  <input type="email" placeholder="Enter your email" className="w-full h-11 px-3 bg-[#fdfbf7] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-chip-green/40 focus:ring-1 focus:ring-chip-green/20 transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-800 mb-1.5">Phone Number</label>
                  <input type="tel" placeholder="Enter your phone number" className="w-full h-11 px-3 bg-[#fdfbf7] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-chip-green/40 focus:ring-1 focus:ring-chip-green/20 transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-800 mb-1.5">Subject</label>
                  <select className="w-full h-11 px-3 bg-[#fdfbf7] border border-gray-200 rounded-xl text-xs text-gray-500 focus:outline-none focus:border-chip-green/40 focus:ring-1 focus:ring-chip-green/20 transition-all appearance-none cursor-pointer">
                    <option>Select a subject</option>
                    <option>Order Inquiry</option>
                    <option>Product Feedback</option>
                    <option>Bulk/Wholesale</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-800 mb-1.5">Message</label>
                <textarea rows="4" placeholder="Write your message here..." className="w-full p-3 bg-[#fdfbf7] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-chip-green/40 focus:ring-1 focus:ring-chip-green/20 transition-all resize-none"></textarea>
              </div>

              <button type="submit" className="bg-chip-green hover:bg-[#092a17] text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-sm">
                Send Message <Send size={14} />
              </button>
            </form>
          </div>

          {/* Right Column: Info & FAQs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Visit Our Home block */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-chip-green font-poppins flex items-center gap-2 mb-2">
                  Visit Our Home <Leaf size={18} className="text-chip-green/60" />
                </h2>
                <p className="text-gray-500 text-xs mb-6 leading-relaxed">
                  We are proud to be based in Kerala — the land of lush greenery, rich culture, and the crispiest banana chips!
                </p>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-chip-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-gray-800">ChipCharm Snacks Pvt. Ltd.</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">Manjeri Road, Near Hi Lite Mall<br/>Calicut, Kerala - 673001<br/>India</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-chip-green shrink-0" />
                    <p className="text-xs font-semibold text-gray-800">+91 6235 123 456</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-chip-green shrink-0" />
                    <p className="text-xs font-semibold text-gray-800">hello@chipcharm.com</p>
                  </div>
                </div>
              </div>
              {/* Decorative Welcome Box */}
              <div className="w-full md:w-56 bg-[#fdfbf7] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                <MapPin size={32} className="text-chip-green mb-3" />
                <p className="text-sm font-bold text-chip-green">We'd love to<br/>welcome you!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Connect With Us */}
              <div>
                <h2 className="text-lg font-bold text-chip-green font-poppins mb-1">Connect With Us</h2>
                <p className="text-gray-500 text-xs mb-4">Follow us for crunchy updates, offers & behind-the-scenes!</p>
                <div className="flex items-center gap-3">
                  {[FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-chip-green hover:bg-chip-green hover:text-white transition-all shadow-sm">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQs Accordion */}
              <div>
                <h2 className="text-lg font-bold text-chip-green font-poppins mb-4">FAQs</h2>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
                      <button 
                        onClick={() => toggleFaq(index)} 
                        className="w-full flex items-center justify-between p-3.5 text-left focus:outline-none"
                      >
                        <span className="text-[13px] font-semibold text-gray-800">{faq.q}</span>
                        <span className="text-gray-400 shrink-0 ml-2">
                          {openFaq === index ? <Minus size={14} /> : <Plus size={14} />}
                        </span>
                      </button>
                      <div className={`px-3.5 pb-3.5 text-xs text-gray-500 leading-relaxed transition-all duration-300 ${openFaq === index ? 'block' : 'hidden'}`}>
                        {faq.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* 3. BOTTOM MAP SECTION */}
        <div className="mt-12">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-chip-green font-poppins">Find Us Here</h2>
            <p className="text-gray-500 text-xs mt-1">Visit us and experience the taste of Malabar.</p>
          </div>
          <div className="w-full h-48 md:h-64 bg-gray-200 rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative">
            {/* Map Image Placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" 
              alt="Map Location" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-chip-green text-white rounded-full flex items-center justify-center shadow-lg transform -translate-y-4">
                <MapPin size={24} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;