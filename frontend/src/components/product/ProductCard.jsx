import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);

  const primaryImage =
    product.images?.find((img) => img.isPrimary)?.url ||
    product.images?.[0]?.url ||
    null;

  const startingPrice = product.variants?.length
    ? Math.min(...product.variants.map((v) => v.price))
    : 0;

  const lowestMrp = product.variants?.length
    ? product.variants.find((v) => v.price === startingPrice)?.mrp
    : null;

  const discount =
    lowestMrp && lowestMrp > startingPrice
      ? Math.round(((lowestMrp - startingPrice) / lowestMrp) * 100)
      : null;

  const firstVariant = product.variants?.[0];

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!firstVariant) return;
    setAdding(true);
    dispatch(addToCart({ productId: product._id, variantId: firstVariant._id, quantity: 1 }));
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-black/[0.06] hover:border-[#0d4023]/20 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#f9f5ed]">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🍌</div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="bg-[#0d4023] text-[#f5c842] text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide uppercase">
              Bestseller
            </span>
          )}
          {discount && (
            <span className="bg-[#f5c842] text-[#0d4023] text-[10px] font-black px-2.5 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setWished(!wished); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wished
              ? 'bg-red-500 text-white shadow-sm'
              : 'bg-white/80 backdrop-blur-sm text-[#0d4023]/50 hover:text-red-500 opacity-0 group-hover:opacity-100'
          }`}
          aria-label="Wishlist"
        >
          <Heart size={14} fill={wished ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[10px] font-bold text-[#c4a020] tracking-widest uppercase mb-1">
          {product.flavor}
        </p>
        <h3 className="font-bold text-[#0d4023] text-[15px] leading-snug mb-3 line-clamp-2 group-hover:text-[#0d4023]">
          {product.name}
        </h3>

        {/* Rating */}
        {product.numReviews > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={11}
                  className={
                    s <= Math.round(product.averageRating)
                      ? 'text-[#f5c842] fill-[#f5c842]'
                      : 'text-black/10 fill-black/10'
                  }
                />
              ))}
            </div>
            <span className="text-[11px] text-[#0d4023]/50 font-medium">
              ({product.numReviews})
            </span>
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] text-[#0d4023]/40 font-medium mb-0.5">from</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-[#0d4023]">₹{startingPrice}</span>
              {lowestMrp && lowestMrp > startingPrice && (
                <span className="text-sm text-[#0d4023]/35 line-through font-medium">₹{lowestMrp}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all shrink-0 ${
              adding
                ? 'bg-[#0d4023] text-[#f5c842] scale-95'
                : 'bg-[#f9f5ed] text-[#0d4023] hover:bg-[#0d4023] hover:text-[#f5c842] group-hover:scale-110'
            }`}
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;