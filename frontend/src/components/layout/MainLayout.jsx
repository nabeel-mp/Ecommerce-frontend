import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();
  
  // Check if we are currently on the Home page
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* If we are on the Home page, we remove the top padding so the Hero background 
        image goes all the way to the top of the screen, underneath the transparent Navbar.
        For all other pages (Shop, Contact, etc.), we keep the padding so the content 
        doesn't get hidden behind the Navbar.
      */}
      <main className={`flex-grow ${isHome ? '' : 'pt-20 md:pt-24'}`}> 
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;