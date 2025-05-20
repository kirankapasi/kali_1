import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Users, 
  MessageSquare, 
  Video 
} from 'lucide-react';

const MobileNavbar = () => {
  const { pathname } = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/explore', label: 'Explore', icon: <Search size={20} /> },
    { path: '/communities', label: 'Communities', icon: <Users size={20} /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { path: '/rooms', label: 'Rooms', icon: <Video size={20} /> },
  ];
  
  return (
    <nav className="bg-white border-t border-neutral-200 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 ${
              pathname === item.path 
                ? 'text-primary-600' 
                : 'text-neutral-600'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavbar;