import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../../assets/Logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-chip-green text-chip-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-chip-cream/10 pb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="bg-white inline-block p-2 rounded-xl mb-6">
              <img src={logo} alt="ChipCharm" className="h-10 w-auto object-contain mix-blend-multiply" />
            </div>
            <p className="text-chip-cream/70 text-sm leading-relaxed mb-6">
              Premium Kerala Banana Chips handcrafted in small batches using traditional Malabar recipes and pure coconut oil.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-chip-cream/10 flex items-center justify-center hover:bg-chip-gold hover:text-chip-green transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-chip-cream/10 flex items-center justify-center hover:bg-chip-gold hover:text-chip-green transition-all">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-chip-cream/10 flex items-center justify-center hover:bg-chip-gold hover:text-chip-green transition-all">
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-chip-gold font-bold mb-6 tracking-wider uppercase text-sm">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-chip-cream/70 hover:text-chip-gold text-sm transition-colors">All Products</Link></li>
              <li><Link to="/shop?flavor=classic" className="text-chip-cream/70 hover:text-chip-gold text-sm transition-colors">Classic Salted</Link></li>
              <li><Link to="/shop?flavor=spicy" className="text-chip-cream/70 hover:text-chip-gold text-sm transition-colors">Spicy Masala</Link></li>
              <li><Link to="/wholesale" className="text-chip-cream/70 hover:text-chip-gold text-sm transition-colors">Wholesale Orders</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-chip-gold font-bold mb-6 tracking-wider uppercase text-sm">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/our-story" className="text-chip-cream/70 hover:text-chip-gold text-sm transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-chip-cream/70 hover:text-chip-gold text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-chip-cream/70 hover:text-chip-gold text-sm transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-chip-gold font-bold mb-6 tracking-wider uppercase text-sm">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-chip-cream/70 hover:text-chip-gold text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-chip-cream/70 hover:text-chip-gold text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/shipping" className="text-chip-cream/70 hover:text-chip-gold text-sm transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-chip-cream/40 text-xs">
          <p>&copy; {new Date().getFullYear()} ChipCharm. All rights reserved. Taste of Malabar.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;