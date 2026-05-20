import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Leaf, Droplet, Sparkles, Package, ArrowRight, Star } from 'lucide-react';

// Import your newly uploaded assets
import heroBg from '../assets/website background image chipcharm.png';
import productImg from '../assets/ChipCharm-Banana-Chips.jpeg';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f9f5ed] font-poppins selection:bg-[#0d4023] selection:text-white">
      <SEO 
        title="Premium Kerala Banana Chips" 
        description="Buy the freshest, crunchiest premium Kerala banana chips online in Bangalore."
        keywords="Kerala Banana Chips, Premium Banana Chips, Taste of Malabar"
      />

      {/* 1. ELEGANT FULL-SCREEN HERO SECTION */}
      <section className="relative min-h-[110vh] flex items-center w-full overflow-hidden">
        
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="ChipCharm Premium Banana Chips" 
            className="w-full h-full object-cover object-right md:object-center"
          />
          {/* Subtle gradient overlay to ensure text readability while keeping the jar visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f9f5ed]/95 via-[#f9f5ed]/70 to-transparent md:w-2/3"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10">
          <div className="max-w-2xl">
            {/* Minimal Badge */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#eebc1d]/20 border border-[#eebc1d]/50 text-[#0d4023] font-semibold text-sm tracking-wide mb-6">
              100% Natural • No Preservatives
            </div>
            
            {/* Premium Typography */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#0d4023] leading-[1.1] mb-6 tracking-tight">
              Authentic Taste. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8a918] to-[#eebc1d]">
                Unmatched Crunch.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#0d4023]/80 mb-10 font-inter leading-relaxed max-w-lg font-medium">
              Experience the true heritage of Malabar with our premium Kerala Banana Chips. Thinly sliced, perfectly spiced, and fried in pure coconut oil.
            </p>
            
            {/* Modern CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link to="/shop" className="w-full sm:w-auto bg-[#0d4023] text-[#f9f5ed] px-9 py-4 rounded-full font-bold hover:bg-[#092a17] transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                SHOP NOW <ArrowRight size={20} />
              </Link>
              <Link to="/our-story" className="w-full sm:w-auto bg-white/60 backdrop-blur-md border border-[#0d4023]/10 text-[#0d4023] px-9 py-4 rounded-full font-bold hover:bg-white transition-all flex items-center justify-center shadow-sm hover:shadow-md">
                OUR STORY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PREMIUM DARK GREEN FEATURE STRIP */}
      <section className="bg-[#0d4023] py-10 relative z-20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {[
              { icon: Leaf, title: "100% Natural", sub: "Real Ingredients" },
              { icon: Droplet, title: "Coconut Oil", sub: "Cooked to Perfection" },
              { icon: Sparkles, title: "Crispy & Light", sub: "Perfect Thickness" },
              { icon: Package, title: "Packed Fresh", sub: "Sealed for Crunch" }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4">
                <feature.icon size={32} className="text-[#eebc1d] mb-3" strokeWidth={1.5} />
                <h3 className="text-[#f9f5ed] font-bold text-sm md:text-base tracking-wide uppercase">{feature.title}</h3>
                <p className="text-[#f9f5ed]/60 text-xs md:text-sm font-inter mt-1">{feature.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MINIMAL STORY / INTRO SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d4023] mb-6 font-poppins">
            Snacking, Elevated.
          </h2>
          <p className="text-lg text-gray-600 font-inter leading-relaxed mb-12">
            We believe that a great snack shouldn't be a guilty pleasure. It should be a masterpiece of tradition. That's why we source the finest Nendran bananas and craft them using age-old Malabar techniques, ensuring every bite delivers pure, unadulterated joy.
          </p>
          {/* Re-using the beautiful background as a landscape display image */}
          <div className="overflow-hidden rounded-[2.5rem] shadow-lg">
             <img src={heroBg} alt="Spices and Bananas" className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>
      </section>

      {/* 4. MODERN BESTSELLERS SHOWCASE */}
      <section className="py-24 bg-[#f9f5ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#0d4023]/10 pb-6">
            <div>
              <h2 className="text-4xl font-extrabold text-[#0d4023] mb-3 tracking-tight">Our Signature Collection</h2>
              <p className="text-gray-600 font-inter">Handpicked favorites loved by thousands.</p>
            </div>
            <Link to="/shop" className="mt-4 md:mt-0 text-[#0d4023] font-bold uppercase tracking-widest text-sm hover:text-[#d8a918] transition-colors flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { id: 1, name: "Premium Classic Salted", weight: "250g", price: "₹149", rating: 4.9 },
              { id: 2, name: "Spicy Malabar Masala", weight: "250g", price: "₹159", rating: 4.8 },
              { id: 3, name: "Black Pepper & Salt", weight: "250g", price: "₹159", rating: 4.9 },
            ].map((item) => (
              <div key={item.id} className="group flex flex-col bg-white rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-[#0d4023]/5">
                
                {/* Product Image Area */}
                <div className="w-full aspect-[4/5] mb-6 overflow-hidden rounded-3xl bg-[#f9f5ed] relative flex items-center justify-center">
                  <img 
                    src={productImg} 
                    alt={item.name} 
                    className="w-[85%] h-[85%] object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out drop-shadow-xl" 
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Star size={14} className="text-[#eebc1d] fill-[#eebc1d]" />
                    <span className="text-xs font-bold text-[#0d4023]">{item.rating}</span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow px-2">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="font-bold text-xl text-[#0d4023] leading-tight">{item.name}</h3>
                    <span className="font-extrabold text-xl text-[#0d4023]">{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-8 font-inter">{item.weight} Premium Jar</p>
                  
                  {/* Modern Outline Button */}
                  <Link to={`/shop`} className="mt-auto w-full py-4 rounded-xl border-[2px] border-[#0d4023] text-[#0d4023] font-bold text-center hover:bg-[#0d4023] hover:text-[#f9f5ed] transition-colors tracking-wide uppercase text-sm">
                    Add to Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;