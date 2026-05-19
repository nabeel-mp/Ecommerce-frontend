import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import SEO from '../components/SEO';
import { Minus, Plus, ShoppingBag, Heart, CheckCircle2, AlertCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Selection States
  const [activeImage, setActiveImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${slug}`);
        if (data.success) {
          setProduct(data.product);
          // Set defaults
          setActiveImage(data.product.images?.find(i => i.isPrimary)?.url || data.product.images[0]?.url);
          if (data.product.variants?.length > 0) {
            setSelectedVariant(data.product.variants[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load product", err);
        navigate('/shop'); // Redirect if not found
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, navigate]);

  const handleQuantityChange = (type) => {
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    if (type === 'inc' && quantity < (selectedVariant?.stock || 1)) setQuantity(q => q + 1);
  };

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({
    productId: product._id,
    variantId: selectedVariant._id,
    quantity
  }));
    // Phase 3 implementation
    console.log("Adding to cart:", {
      productId: product._id,
      variantId: selectedVariant._id,
      quantity
    });
    alert(`Added ${quantity}x ${product.name} (${selectedVariant.weight}) to cart!`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-cream"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-matte-black"></div></div>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-white py-12">
      <SEO 
        title={product.metaTitle || product.name} 
        description={product.metaDescription || product.shortDescription}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 hide-scrollbar">
              {product.images?.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img.url)}
                  className={`border-2 rounded-xl overflow-hidden aspect-square flex-shrink-0 transition ${activeImage === img.url ? 'border-matte-black' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 bg-cream-light rounded-3xl overflow-hidden flex items-center justify-center p-8 aspect-square md:aspect-auto">
              <img src={activeImage} alt={product.name} className="max-w-full max-h-full object-contain drop-shadow-xl" />
            </div>
          </div>

          {/* Product Info & Actions */}
          <div className="flex flex-col pt-4">
            <span className="text-warm-yellow-dark font-bold tracking-widest text-sm uppercase mb-2">{product.flavor}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-matte-black mb-4">{product.name}</h1>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Price Display */}
            <div className="mb-8 flex items-end gap-3">
              <span className="text-4xl font-bold text-matte-black">₹{selectedVariant?.price}</span>
              {selectedVariant?.mrp > selectedVariant?.price && (
                <span className="text-lg text-gray-400 line-through mb-1">₹{selectedVariant.mrp}</span>
              )}
            </div>

            {/* Variant Selection (Weight/Packaging) */}
            <div className="mb-8">
              <h3 className="font-semibold text-matte-black mb-3">Select Size & Packaging</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants?.map((variant) => (
                  <button
                    key={variant._id}
                    onClick={() => { setSelectedVariant(variant); setQuantity(1); }}
                    className={`px-5 py-3 rounded-xl border-2 font-medium transition ${
                      selectedVariant?._id === variant._id 
                        ? 'border-matte-black bg-matte-black text-white shadow-md' 
                        : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
                    }`}
                  >
                    {variant.weight} - {variant.packagingType}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6 flex items-center gap-2">
              {selectedVariant?.stock > 0 ? (
                <><CheckCircle2 size={18} className="text-green-600" /><span className="text-green-700 font-medium">In Stock ({selectedVariant.stock} available)</span></>
              ) : (
                <><AlertCircle size={18} className="text-red-500" /><span className="text-red-600 font-medium">Out of Stock</span></>
              )}
            </div>

            {/* Add to Cart Area */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border-2 border-gray-200 rounded-xl h-14 bg-white">
                <button onClick={() => handleQuantityChange('dec')} disabled={quantity <= 1} className="w-12 flex justify-center text-gray-500 hover:text-matte-black disabled:opacity-50"><Minus size={18} /></button>
                <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                <button onClick={() => handleQuantityChange('inc')} disabled={quantity >= selectedVariant?.stock} className="w-12 flex justify-center text-gray-500 hover:text-matte-black disabled:opacity-50"><Plus size={18} /></button>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={selectedVariant?.stock === 0}
                className="flex-1 bg-warm-yellow hover:bg-warm-yellow-dark text-matte-black h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button className="w-14 h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition bg-white">
                <Heart size={22} />
              </button>
            </div>

            {/* Ingredients & Nutrition Accordion could go here */}
            {product.ingredients && (
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-matte-black mb-2">Ingredients</h3>
                <p className="text-gray-600 text-sm">{product.ingredients}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;