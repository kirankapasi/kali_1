import { Link } from 'react-router-dom';
import { Triangle, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <Triangle size={64} className="text-primary-600 mb-6" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-neutral-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or you don't have permission to view it.
      </p>
      <Link to="/" className="btn-primary inline-flex items-center">
        <Home size={18} className="mr-2" />
        <span>Go back home</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;