import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Users, 
  MessageSquare, 
  Video, 
  Bell, 
  Settings, 
  LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/explore', label: 'Explore', icon: <Search size={20} /> },
    { path: '/communities', label: 'Communities', icon: <Users size={20} /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { path: '/rooms', label: 'Rooms', icon: <Video size={20} /> },
    { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];
  
  return (
    <nav className="bg-white border-b border-neutral-200 py-2 px-4 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between max-w-6xl">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 relative">
            <img 
              src="/logo.png"
              alt="Komune Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-bold text-primary-800">Komune</span>
        </Link>
        
        {/* Navigation items */}
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${pathname === item.path ? 'active' : ''}`}
              aria-label={item.label}
              title={item.label}
            >
              {item.icon}
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          ))}
          
          {/* Logout button */}
          <button 
            onClick={() => logout()} 
            className="nav-item text-red-500"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;