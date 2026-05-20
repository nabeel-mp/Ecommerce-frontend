import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart } from '../features/cart/cartSlice';
import SEO from '../components/SEO';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, Loader2 } from 'lucide-react';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, subtotal, shippingCharge, total, isLoading } = useSelector((s) => s.cart);
  const { isAuthenticated } = useSelector((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchCart());
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f9f5ed] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-black/[0.06]">
            <ShoppingBag size={32} className="text-[#0d4023]/30" />
          </div>
          <h2 className="text-2xl font-black text-[#0d4023] mb-2">Sign in to view cart</h2>
          <p className="text-[#0d4023]/50 mb-6 text-sm">Your cart is waiting. Log in to see what's inside.</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 h-11 px-8 bg-[#0d4023] text-white rounded-xl font-bold text-sm hover:bg-[#092a17] transition-all"
          >
            Sign in <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const isEmpty = items.length === 0 && !isLoading;

  return (
    <div className="min-h-screen bg-[#f9f5ed]">
      <SEO title="Your Cart" description="Review your ChipCharm selections before checkout." />

      {/* Header */}
      <div className="bg-white border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} className="text-[#0d4023]" />
            <h1 className="text-2xl font-black text-[#0d4023]">Your Cart</h1>
            {items.length > 0 && (
              <span className="h-6 px-2.5 bg-[#f5c842] text-[#0d4023] text-xs font-black rounded-full flex items-center">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={32} className="animate-spin text-[#f5c842]" />
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-black/[0.06] text-5xl">
              🍌
            </div>
            <h2 className="text-2xl font-black text-[#0d4023] mb-2">Your cart is empty</h2>
            <p className="text-[#0d4023]/50 mb-8 text-sm max-w-xs">
              Looks like you haven't added any chips yet. Time to fix that!
            </p>
            <Link
              to="/shop"
              className="h-12 px-8 bg-[#0d4023] text-white rounded-xl font-bold text-sm hover:bg-[#092a17] transition-all flex items-center gap-2 shadow-sm"
            >
              Browse Collection <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Items */}
            <div className="flex-1 space-y-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-black/[0.06] flex items-center gap-4"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#f9f5ed] shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🍌</div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-[#c4a020] uppercase tracking-wider mb-0.5">
                      {item.flavor}
                    </p>
                    <h3 className="font-bold text-[#0d4023] text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-[#0d4023]/40 mt-0.5">
                      {item.weight} · {item.packagingType}
                    </p>
                  </div>

                  {/* Qty + Price + Remove */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Qty control */}
                    <div className="flex items-center gap-1 bg-[#f9f5ed] rounded-xl p-1">
                      <button
                        onClick={() => dispatch(updateCartItem({ itemId: item._id, quantity: item.quantity - 1 }))}
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-[#0d4023]/60 hover:text-[#0d4023] hover:bg-white disabled:opacity-30 transition-all"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-[#0d4023]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(updateCartItem({ itemId: item._id, quantity: item.quantity + 1 }))}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-[#0d4023]/60 hover:text-[#0d4023] hover:bg-white transition-all"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right w-20">
                      <p className="font-black text-[#0d4023] text-base">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-[#0d4023]/40">₹{item.price} each</p>
                      )}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="w-8 h-8 flex items-center justify-center text-[#0d4023]/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      aria-label="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Free shipping nudge */}
              {subtotal < 500 && (
                <div className="bg-[#0d4023]/5 border border-[#0d4023]/10 rounded-2xl p-4 flex items-center gap-3">
                  <Tag size={16} className="text-[#0d4023] shrink-0" />
                  <p className="text-sm text-[#0d4023]">
                    Add <span className="font-bold">₹{(500 - subtotal).toFixed(0)}</span> more for{' '}
                    <span className="font-bold text-green-700">free delivery</span>
                  </p>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
                <div className="p-6 border-b border-black/[0.06]">
                  <h2 className="font-black text-[#0d4023] text-lg">Order Summary</h2>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0d4023]/60">Subtotal</span>
                    <span className="font-semibold text-[#0d4023]">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0d4023]/60">Shipping</span>
                    <span className={`font-semibold ${shippingCharge === 0 ? 'text-green-600' : 'text-[#0d4023]'}`}>
                      {shippingCharge === 0 ? 'Free 🎉' : `₹${shippingCharge}`}
                    </span>
                  </div>
                  <div className="border-t border-black/[0.06] pt-3 flex justify-between">
                    <span className="font-black text-[#0d4023]">Total</span>
                    <span className="font-black text-2xl text-[#0d4023]">₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full h-12 bg-[#0d4023] text-white rounded-xl font-bold text-sm hover:bg-[#092a17] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </button>
                  <Link
                    to="/shop"
                    className="mt-3 w-full h-10 flex items-center justify-center text-sm font-semibold text-[#0d4023]/60 hover:text-[#0d4023] transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;