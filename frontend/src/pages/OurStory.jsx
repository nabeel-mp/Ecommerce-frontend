import SEO from '../components/SEO';

const OurStory = () => {
  return (
    <div className="min-h-screen bg-cream">
      <SEO title="Our Story | Authentic Kerala Heritage" description="Learn how ChipCharm brings the authentic taste of Kerala banana chips to the world." />
      
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-matte-black text-center mb-8">Rooted in Tradition. <br/> <span className="text-warm-yellow-dark">Perfected for You.</span></h1>
        
        <img src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=1200" alt="Kerala Bananas" className="w-full h-80 object-cover rounded-3xl shadow-xl mb-12" />

        <div className="space-y-8 text-lg text-gray-700 leading-relaxed font-inter">
          <p>
            The story of <strong>ChipCharm</strong> began in the heart of Kerala, where the rich aroma of fresh Nendran bananas frying in pure coconut oil is a daily celebration. We wanted to capture that exact nostalgia and deliver it to your doorstep.
          </p>
          <h3 className="text-2xl font-bold text-matte-black mt-10">The Nendran Difference</h3>
          <p>
            Not all bananas are created equal. We exclusively source raw, premium Nendran bananas directly from local farmers in Kerala. This specific variety is renowned for its thick texture and natural subtle sweetness, making it the absolute best choice for a crispy, golden chip.
          </p>
          <h3 className="text-2xl font-bold text-matte-black mt-10">Our Promise</h3>
          <p>
            No artificial colors. No heavy preservatives. Just the pure, authentic crunch that you deserve. Every batch is thinly sliced, perfectly spiced, and packed fresh to ensure that when you open a bag of ChipCharm, you're experiencing a true taste of heritage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;