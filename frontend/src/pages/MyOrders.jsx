import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axios';
import SEO from '../components/SEO';
import { Package, Clock, CheckCircle2, XCircle, ArrowRight, Loader2 } from 'lucide-react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my-orders');
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated, navigate]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'placed':
      case 'processing': return { color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock, label: 'Processing' };
      case 'shipped':
      case 'out_for_delivery': return { color: 'text-warm-yellow-dark', bg: 'bg-warm-yellow/20', icon: Package, label: 'On The Way' };
      case 'delivered': return { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle2, label: 'Delivered' };
      case 'cancelled':
      case 'returned': return { color: 'text-red-600', bg: 'bg-red-50', icon: XCircle, label: 'Cancelled' };
      default: return { color: 'text-gray-600', bg: 'bg-gray-50', icon: Clock, label: status };
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-cream"><Loader2 className="animate-spin text-warm-yellow-dark" size={40} /></div>;

  return (
    <div className="min-h-screen bg-cream py-12">
      <SEO title="My Orders" description="View your past orders and track current shipments." />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-matte-black mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-matte-black mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">You haven't placed any orders with us yet.</p>
            <Link to="/shop" className="bg-matte-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusConf = getStatusConfig(order.orderStatus);
              const StatusIcon = statusConf.icon;

              return (
                <div key={order._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition hover:shadow-md">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order <span className="font-semibold text-matte-black">#{order.orderNumber}</span></p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConf.bg} ${statusConf.color}`}>
                      <StatusIcon size={16} />
                      <span className="text-sm font-bold">{statusConf.label}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-600">
                      <p>Total Amount: <span className="font-bold text-matte-black text-lg">₹{order.pricing.total.toFixed(2)}</span></p>
                      <p className="mt-1">Items: {order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                    </div>
                    {/* Placeholder for order details routing if you choose to build it */}
                    <button className="flex items-center gap-2 text-warm-yellow-dark font-semibold hover:text-matte-black transition">
                      View Details <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;