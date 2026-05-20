import SEO from '../components/SEO';

const OurStory = () => {
  return (
    <div className="min-h-screen bg-chip-cream pt-40 pb-16">
      <SEO title="Our Story | Authentic Kerala Heritage" description="Learn how ChipCharm brings the authentic taste of Kerala banana chips to the world." />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-chip-gold-dark font-bold tracking-[3px] uppercase mb-4 text-sm">The ChipCharm Heritage</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-chip-green leading-tight">
            Rooted in Tradition. <br/> 
            <span className="text-chip-gold-dark">Perfected for You.</span>
          </h1>
        </div>
        
        <img 
          src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=1200" 
          alt="Kerala Bananas" 
          className="w-full h-80 md:h-[400px] object-cover rounded-[2.5rem] shadow-xl mb-16" 
        />

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-chip-black/5">
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed font-inter">
            <p>
              The story of <strong className="text-chip-green">ChipCharm</strong> began in the heart of Kerala, where the rich aroma of fresh Nendran bananas frying in pure coconut oil is a daily celebration. We wanted to capture that exact nostalgia and deliver it to your doorstep.
            </p>
            
            <div>
              <h3 className="text-2xl font-bold text-chip-green mb-4">The Nendran Difference</h3>
              <p>
                Not all bananas are created equal. We exclusively source raw, premium Nendran bananas directly from local farmers in Kerala. This specific variety is renowned for its thick texture and natural subtle sweetness, making it the absolute best choice for a crispy, golden chip.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-chip-green mb-4">Our Promise</h3>
              <p>
                No artificial colors. No heavy preservatives. Just the pure, authentic crunch that you deserve. Every batch is thinly sliced, perfectly spiced, and packed fresh to ensure that when you open a bag of ChipCharm, you're experiencing a true taste of heritage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;