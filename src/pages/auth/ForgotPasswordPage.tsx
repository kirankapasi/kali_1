import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { resetPassword } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    try {
      setError('');
      setMessage('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Password reset link sent. Check your email.');
    } catch (err) {
      setError('Failed to reset password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-2 text-neutral-900">Reset password</h2>
      <p className="text-neutral-600 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-error-50 text-error-600 rounded-md flex items-center">
          <AlertCircle size={18} className="mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      {message && (
        <div className="mb-4 p-3 bg-success-50 text-success-600 rounded-md flex items-center">
          <Check size={18} className="mr-2" />
          <span>{message}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input pl-10"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Sending link...' : 'Reset password'}
        </button>
      </form>
      
      <p className="mt-8 text-center text-sm text-neutral-600">
        Remember your password?{' '}
        <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-800">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;