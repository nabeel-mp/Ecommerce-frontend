import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ShieldCheck, Truck, Sparkles, Store } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-cream">
      <SEO 
        title="Premium Kerala Banana Chips" 
        description="Buy the freshest, crunchiest premium Kerala banana chips online in Bangalore. Available for retail and wholesale bulk orders."
        keywords="Kerala Banana Chips, Premium Banana Chips, Banana Chips Online, Banana Chips Bangalore, Banana Chips Wholesale"
      />

      {/* Hero Section */}
      <section className="relative bg-cream-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 z-10 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-matte-black leading-tight mb-6">
              Authentic <span className="text-warm-yellow-dark">Kerala</span> <br/> Crunch in Every Bite.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Freshly sliced, perfectly spiced, and fried to golden perfection. Experience the true taste of premium banana chips delivered straight to your door.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/shop" className="bg-matte-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition w-full sm:w-auto text-center shadow-lg hover:shadow-xl">
                Shop Now
              </Link>
              <Link to="/wholesale" className="bg-white text-matte-black border-2 border-matte-black px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition w-full sm:w-auto text-center">
                Bulk Orders
              </Link>
            </div>
          </div>
          
          {/* Hero Image Area */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            <div className="absolute inset-0 bg-warm-yellow rounded-full blur-3xl opacity-20 transform scale-110"></div>
            <img 
              src="https://images.unsplash.com/photo-1599490659213-e2b9527fd34c?auto=format&fit=crop&q=80&w=800" 
              alt="Premium Kerala Banana Chips" 
              className="relative z-10 w-full max-w-lg mx-auto rounded-3xl shadow-2xl object-cover h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-matte-black">The ChipCharm Difference</h2>
            <p className="text-gray-500 mt-4">Why we are Bangalore's favorite banana chip brand.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "Authentic Taste", desc: "Traditional Kerala recipes" },
              { icon: ShieldCheck, title: "Premium Quality", desc: "Finest nendran bananas" },
              { icon: Truck, title: "Fast Delivery", desc: "Freshly packed & shipped" },
              { icon: Store, title: "Wholesale Support", desc: "Bulk ordering available" }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-cream rounded-2xl text-center hover:-translate-y-1 transition duration-300">
                <div className="w-14 h-14 bg-warm-yellow-dark/10 rounded-full flex items-center justify-center mx-auto mb-4 text-warm-yellow-dark">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale Banner */}
      <section className="bg-matte-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-warm-yellow mb-6">Wholesale Available Across Bangalore</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Running a business? Get our premium chips in loose weight or custom packaging at unbeatable wholesale prices.</p>
          <Link to="/contact" className="inline-block bg-warm-yellow text-matte-black px-8 py-4 rounded-full font-bold hover:bg-warm-yellow-dark transition">
            Contact For Bulk Pricing
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;