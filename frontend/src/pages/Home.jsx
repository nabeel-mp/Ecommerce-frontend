import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Leaf, Droplet, Sparkles, Package, ArrowRight, Star } from 'lucide-react';
import heroBg from '../assets/website background image chipcharm.png';
import productImg from '../assets/ChipCharm-Banana-Chips.jpeg';
import Contact from './Contact';

const Home = () => {
  return (
    <div className="w-full">
      <SEO 
        title="Premium Kerala Banana Chips" 
        description="Buy the freshest, crunchiest premium Kerala banana chips online in Bangalore."
      />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="ChipCharm Premium Banana Chips" 
            className="w-full h-full object-cover object-right md:object-center"
          />
          {/* Subtle gradient so text is readable, but image remains clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-chip-cream/90 via-chip-cream/50 to-transparent md:w-3/4"></div>
        </div>

        {/* Adjusted padding (pt-28 md:pt-32) to move the text block higher up the screen */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 md:pt-32">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-chip-gold/20 border border-chip-gold/50 text-chip-green font-semibold text-sm tracking-wide mb-6">
              100% Natural • No Preservatives
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-chip-green leading-[1.1] mb-6 tracking-tight">
              Crispy happiness <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-chip-gold-dark to-chip-gold">
                for everyone,
              </span> <br />
              everyday.
            </h1>
            
            <p className="text-lg md:text-xl text-chip-green/80 mb-10 font-inter leading-relaxed max-w-lg font-medium">
              Experience the true heritage of Malabar with our premium Kerala Banana Chips. Thinly sliced, perfectly spiced, and fried in pure coconut oil.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link to="/shop" className="w-full sm:w-auto bg-chip-green text-chip-cream px-9 py-4 rounded-full font-bold hover:bg-chip-green-dark transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                SHOP NOW <ArrowRight size={20} />
              </Link>
              <Link to="/our-story" className="w-full sm:w-auto bg-white/60 backdrop-blur-md border border-chip-green/10 text-chip-green px-9 py-4 rounded-full font-bold hover:bg-white transition-all flex items-center justify-center shadow-sm hover:shadow-md">
                OUR STORY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="bg-chip-green py-10 relative z-20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {[
              { icon: Leaf, title: "100% Natural", sub: "Real Ingredients" },
              { icon: Droplet, title: "Coconut Oil", sub: "Cooked to Perfection" },
              { icon: Sparkles, title: "Crispy & Light", sub: "Perfect Thickness" },
              { icon: Package, title: "Packed Fresh", sub: "Sealed for Crunch" }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4">
                <feature.icon size={32} className="text-chip-gold mb-3" strokeWidth={1.5} />
                <h3 className="text-chip-cream font-bold text-sm md:text-base tracking-wide uppercase">{feature.title}</h3>
                <p className="text-chip-cream/60 text-xs md:text-sm mt-1">{feature.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Side: Text */}
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-chip-green mb-6 leading-tight">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6 font-inter">
                We believe that a great snack shouldn't be a guilty pleasure. It should be a masterpiece of tradition. 
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-10 font-inter">
                That's why we source the finest Nendran bananas and craft them using age-old Malabar techniques, ensuring every bite delivers pure, unadulterated joy.
              </p>
              
              <Link to="/our-story" className="inline-flex items-center gap-2 text-chip-green font-bold uppercase tracking-widest text-sm hover:text-chip-gold-dark transition-colors group">
                Discover More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            {/* Right Side: Image */}
            <div className="relative">
              <div className="aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=800" 
                  alt="Kerala Bananas" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative background blobs to make the image pop */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-chip-gold rounded-full mix-blend-multiply filter blur-2xl opacity-60 z-0"></div>
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-chip-green rounded-full mix-blend-multiply filter blur-2xl opacity-20 z-0"></div>
            </div>

          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="py-24 bg-chip-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-chip-green/10 pb-6">
            <div>
              <h2 className="text-4xl font-extrabold text-chip-green mb-3 tracking-tight">Our Signature Collection</h2>
              <p className="text-gray-600">Handpicked favorites loved by thousands.</p>
            </div>
            <Link to="/shop" className="mt-4 md:mt-0 text-chip-green font-bold uppercase tracking-widest text-sm hover:text-chip-gold-dark transition-colors flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { id: 1, name: "Premium Classic Salted", weight: "250g", price: "₹149", rating: 4.9 },
              { id: 2, name: "Spicy Malabar Masala", weight: "250g", price: "₹159", rating: 4.8 },
              { id: 3, name: "Black Pepper & Salt", weight: "250g", price: "₹159", rating: 4.9 },
            ].map((item) => (
              <div key={item.id} className="group flex flex-col bg-white rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-chip-green/5">
                
                <div className="w-full aspect-[4/5] mb-6 overflow-hidden rounded-3xl bg-chip-cream relative flex items-center justify-center">
                  <img 
                    src={productImg} 
                    alt={item.name} 
                    className="w-[85%] h-[85%] object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out drop-shadow-xl" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Star size={14} className="text-chip-gold fill-chip-gold" />
                    <span className="text-xs font-bold text-chip-green">{item.rating}</span>
                  </div>
                </div>

                <div className="flex flex-col flex-grow px-2">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="font-bold text-xl text-chip-green leading-tight">{item.name}</h3>
                    <span className="font-extrabold text-xl text-chip-green">{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-8">{item.weight} Premium Jar</p>
                  
                  <Link to={`/shop`} className="mt-auto w-full py-4 rounded-xl border-2 border-chip-green text-chip-green font-bold text-center hover:bg-chip-green hover:text-chip-cream transition-colors tracking-wide uppercase text-sm">
                    Add to Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact/>
    </div>
  );
};

export default Home;