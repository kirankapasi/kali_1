import { ReactNode, createContext, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  googleSignIn: async () => {},
  resetPassword: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { 
    user, 
    loading, 
    login, 
    register, 
    logout, 
    googleSignIn, 
    resetPassword 
  } = useAuthStore();

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      // In a real app, this would check for an existing auth token
      console.log('Checking authentication status...');
    };
    
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    googleSignIn,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};