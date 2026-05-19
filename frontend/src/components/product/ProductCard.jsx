import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  // Find primary image or fallback to first image
  const primaryImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url || 'https://via.placeholder.com/400?text=No+Image';
  
  // Get starting price from variants
  const startingPrice = product.variants?.length > 0 
    ? Math.min(...product.variants.map(v => v.price)) 
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      <Link to={`/shop/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
        <img 
          src={primaryImage} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-warm-yellow text-matte-black text-xs font-bold px-3 py-1 rounded-full">
            Bestseller
          </span>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">{product.flavor}</span>
        <Link to={`/shop/${product.slug}`}>
          <h3 className="font-poppins font-semibold text-lg text-matte-black mb-2 hover:text-warm-yellow-dark transition">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Starts from</span>
            <span className="font-bold text-xl text-matte-black">₹{startingPrice}</span>
          </div>
          <Link 
            to={`/shop/${product.slug}`}
            className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-matte-black hover:bg-warm-yellow transition group-hover:bg-matte-black group-hover:text-white"
          >
            <ShoppingBag size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;