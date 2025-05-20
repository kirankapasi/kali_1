import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - branding */}
      <div className="bg-primary-600 text-white p-8 md:w-1/2 flex flex-col justify-center items-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <img 
              src="/logo.png"
              alt="Komune Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Komune</h1>
          <p className="text-xl mb-8">Humanity's Most Valuable Social Space</p>
          <p className="text-primary-100">
            Connect with like-minded communities, engage in meaningful conversations,
            and discover valuable connections in a safe and enriching environment.
          </p>
        </div>
      </div>
      
      {/* Right side - auth forms */}
      <div className="bg-white p-8 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;