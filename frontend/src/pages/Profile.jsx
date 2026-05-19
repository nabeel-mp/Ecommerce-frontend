import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';
import SEO from '../components/SEO';
import { User, Mail, LogOut } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream py-12">
      <SEO title="My Profile" description="Manage your ChipCharm account details." />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-matte-black mb-8">My Account</h1>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
            <div className="w-20 h-20 bg-warm-yellow rounded-full flex items-center justify-center text-matte-black font-bold text-3xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-matte-black">{user.name}</h2>
              <p className="text-gray-500 flex items-center gap-2 mt-1"><Mail size={16}/> {user.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => navigate('/my-orders')}
              className="w-full text-left px-6 py-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-matte-black font-semibold transition flex justify-between items-center"
            >
              Order History
            </button>
            <button 
              className="w-full text-left px-6 py-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-matte-black font-semibold transition flex justify-between items-center"
            >
              Saved Addresses
            </button>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;