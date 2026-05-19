import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Leaf, Droplet, Sparkles, BoxSelect, Package, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f9f5ed] font-poppins">
      <SEO 
        title="Premium Kerala Banana Chips" 
        description="Buy the freshest, crunchiest premium Kerala banana chips online in Bangalore."
        keywords="Kerala Banana Chips, Premium Banana Chips, Taste of Malabar"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left z-20">
              <h1 className="text-5xl md:text-6xl lg:text-[4.8rem] font-bold leading-[1.05] tracking-tight mb-6">
                <span className="text-[#0d4023] block mb-2">Crispy happiness</span>
                <span className="text-[#eebc1d] block mb-2">for everyone,</span>
                <span className="text-[#eebc1d] block">every day.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-md mx-auto lg:mx-0 font-inter leading-relaxed font-medium">
                Authentic Kerala Banana Chips made with real ingredients and lots of care.
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <Link to="/shop" className="bg-[#eebc1d] text-[#0d4023] px-8 py-3.5 rounded-full font-bold hover:bg-[#d8a918] transition-all flex items-center gap-3 shadow-sm">
                  SHOP NOW <ArrowRight size={20} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
            
            {/* Right Image Area */}
            <div className="lg:w-1/2 relative flex justify-center w-full mt-10 lg:mt-0">
              {/* Circular stamp mock "Made with Coconut Oil" */}
              <div className="absolute top-0 right-4 md:right-12 w-28 h-28 border-[2px] border-[#0d4023] rounded-full flex flex-col items-center justify-center text-[#0d4023] font-bold text-[10px] transform rotate-12 z-30 bg-[#f9f5ed]/80 backdrop-blur-md shadow-sm">
                <span>MADE</span>
                <span>WITH</span>
                <Droplet size={20} className="my-1 fill-current" />
                <span>COCONUT OIL</span>
              </div>
              
              {/* Product Image */}
              <img 
                src="https://images.unsplash.com/photo-1599490659213-e2b9527fd34c?auto=format&fit=crop&q=80&w=800" 
                alt="Premium Kerala Banana Chips Jar" 
                className="relative z-20 w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl object-cover h-[450px] lg:h-[550px]"
              />
              
              {/* Decorative yellow glow behind the image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#eebc1d] rounded-full blur-[120px] opacity-20 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Green Feature Banner */}
      <section className="bg-[#0d4023] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 md:gap-4 text-white">
            {[
              { icon: Leaf, text: "100% Natural\nReal Ingredients" },
              { icon: Droplet, text: "Cooked in\nReal Coconut Oil" },
              { icon: Sparkles, text: "Crispy &\nLight" },
              { icon: BoxSelect, text: "No\nPreservatives" },
              { icon: Package, text: "Packed Fresh\nEveryday" }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 w-[45%] lg:w-auto">
                <div className="text-[#eebc1d]">
                    <feature.icon size={36} strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium whitespace-pre-line leading-snug">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Bestsellers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0d4023]">Our Bestsellers</h2>
            <Link to="/shop" className="border-[2px] border-[#eebc1d] text-[#0d4023] px-8 py-2.5 rounded-full font-bold text-xs uppercase hover:bg-[#eebc1d] transition-colors tracking-wide">
              VIEW ALL PRODUCTS
            </Link>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 1, name: "Kerala Banana Chips", weight: "250g Jar", img: "https://images.unsplash.com/photo-1599490659213-e2b9527fd34c?auto=format&fit=crop&q=80&w=400" },
              { id: 2, name: "Spicy Banana Chips", weight: "250g Jar", img: "https://images.unsplash.com/photo-1599490659213-e2b9527fd34c?auto=format&fit=crop&q=80&w=400" },
              { id: 3, name: "Pepper Banana Chips", weight: "250g Jar", img: "https://images.unsplash.com/photo-1599490659213-e2b9527fd34c?auto=format&fit=crop&q=80&w=400" },
              { id: 4, name: "Family Gift Pack", weight: "4x 250g Box", img: "https://images.unsplash.com/photo-1599490659213-e2b9527fd34c?auto=format&fit=crop&q=80&w=400" },
            ].map((item) => (
              <Link to={`/shop`} key={item.id} className="bg-[#f9f5ed] rounded-[2rem] p-4 flex flex-col items-center group cursor-pointer transition-all hover:shadow-md">
                
                {/* Product Image Box */}
                <div className="w-full aspect-[4/5] mb-5 overflow-hidden rounded-[1.5rem] flex items-center justify-center relative mix-blend-multiply">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                    />
                </div>

                {/* Product Details */}
                <h3 className="font-bold text-[#0d4023] text-lg text-center leading-tight mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{item.weight}</p>
                
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;