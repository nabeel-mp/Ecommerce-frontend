import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content wrapper with flex-grow to push footer to bottom */}
      <main className="flex-grow pt-20 md:pt-24"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;