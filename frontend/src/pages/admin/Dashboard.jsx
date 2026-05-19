import { useState, useEffect } from 'react';
import api from '../../api/axios';
import SEO from '../../components/SEO';
import { IndianRupee, ShoppingBag, Package, Users, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        if (res.data.success) {
          setData(res.data.dashboard);
        }
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="flex justify-center pt-20"><Loader2 className="animate-spin text-warm-yellow-dark" size={40} /></div>;
  if (!data) return <div className="text-center pt-20 text-red-500">Failed to load data</div>;

  const { stats, monthlyProfit, recentOrders } = data;

  return (
    <div>
      <SEO title="Admin Dashboard" />
      <h1 className="text-3xl font-extrabold text-matte-black mb-8">Dashboard Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Total Revenue", value: `₹${stats.totalRevenue.toFixed(2)}`, icon: IndianRupee, color: "text-green-600", bg: "bg-green-100" },
          { title: "Total Orders", value: stats.totalOrders, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100" },
          { title: "Total Products", value: stats.totalProducts, icon: Package, color: "text-purple-600", bg: "bg-purple-100" },
          { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-orange-600", bg: "bg-orange-100" }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
              <kpi.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{kpi.title}</p>
              <h3 className="text-2xl font-bold text-matte-black">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-matte-black mb-6">Revenue Overview</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProfit}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip cursor={{fill: '#fef9ec'}} />
                <Bar dataKey="profit" fill="#1a1a1a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-matte-black mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-bold text-matte-black">#{order.orderNumber}</p>
                  <p className="text-xs text-gray-500">{order.user?.name || 'Guest'}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-warm-yellow-dark">₹{order.pricing.total}</p>
                  <p className="text-xs font-semibold capitalize text-gray-500">{order.orderStatus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;