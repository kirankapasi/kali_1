import { Outlet } from 'react-router-dom';
import Navbar from './navigation/Navbar';
import MobileNavbar from './navigation/MobileNavbar';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop navigation - hidden on small screens */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <Outlet />
      </main>
      
      {/* Mobile navigation - visible only on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Layout;