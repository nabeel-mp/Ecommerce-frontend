import SEO from '../components/SEO';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO title="Contact Us" description="Get in touch with the ChipCharm team." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-matte-black mb-4">We'd love to hear from you</h1>
          <p className="text-gray-500">Whether you have a question about our products, shipping, or anything else, our team is ready to answer all your questions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Phone, title: "Call Us", details: "+91 98765 43210", sub: "Mon-Fri from 9am to 6pm." },
            { icon: Mail, title: "Email Us", details: "support@chipcharm.com", sub: "We usually reply within 24 hours." },
            { icon: MapPin, title: "Visit Us", details: "Koramangala, Bangalore", sub: "HQ Office & Distribution Center." }
          ].map((item, idx) => (
            <div key={idx} className="bg-cream rounded-3xl p-8 text-center border border-gray-100">
              <item.icon size={40} className="mx-auto text-warm-yellow-dark mb-6" />
              <h3 className="text-xl font-bold text-matte-black mb-2">{item.title}</h3>
              <p className="font-semibold text-lg text-gray-800 mb-1">{item.details}</p>
              <p className="text-sm text-gray-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;