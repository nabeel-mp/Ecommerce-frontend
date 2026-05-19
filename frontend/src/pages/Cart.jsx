import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart } from '../features/cart/cartSlice';
import SEO from '../components/SEO';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, subtotal, shippingCharge, total, isLoading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream">
        <h2 className="text-2xl font-bold text-matte-black mb-4">Please login to view your cart</h2>
        <Link to="/login" className="bg-matte-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">Login Now</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <SEO title="Your Cart" description="Review your selected premium banana chips before checkout." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-matte-black mb-8 flex items-center gap-3">
          <ShoppingBag size={32} className="text-warm-yellow-dark" /> Your Cart
        </h1>

        {items.length === 0 && !isLoading ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-matte-black mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any crunchy goodness yet.</p>
            <Link to="/shop" className="bg-warm-yellow text-matte-black px-8 py-4 rounded-full font-bold hover:bg-warm-yellow-dark transition">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="lg:w-2/3 space-y-4">
              {items.map((item) => (
                <div key={item._id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-gray-50" />
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-lg text-matte-black">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.flavor} | {item.weight} | {item.packagingType}</p>
                    <p className="font-bold text-warm-yellow-dark">₹{item.price}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button 
                        onClick={() => dispatch(updateCartItem({ itemId: item._id, quantity: item.quantity - 1 }))}
                        disabled={item.quantity <= 1}
                        className="w-10 h-10 flex justify-center items-center text-gray-500 hover:text-matte-black disabled:opacity-30"
                      ><Minus size={16} /></button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateCartItem({ itemId: item._id, quantity: item.quantity + 1 }))}
                        className="w-10 h-10 flex justify-center items-center text-gray-500 hover:text-matte-black"
                      ><Plus size={16} /></button>
                    </div>
                    
                    <button 
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="w-10 h-10 flex justify-center items-center text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-matte-black mb-6">Order Summary</h3>
                
                <div className="space-y-4 text-gray-600 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-matte-black">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium text-matte-black">{shippingCharge === 0 ? 'Free' : `₹${shippingCharge.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-matte-black">Total</span>
                  <span className="text-3xl font-extrabold text-matte-black">₹{total.toFixed(2)}</span>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-matte-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition shadow-lg"
                >
                  Proceed to Checkout <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;