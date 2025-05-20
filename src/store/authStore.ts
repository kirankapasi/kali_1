import { create } from 'zustand';

interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Dummy user data
const dummyUser: User = {
  uid: 'dummy-user-id',
  email: 'user@example.com',
  displayName: 'Demo User',
  photoURL: null,
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (email === 'user@example.com' && password === 'password') {
        set({ user: dummyUser });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ error: 'Invalid email or password' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        uid: 'new-user-' + Date.now(),
        email,
        displayName: name,
        photoURL: null,
      };
      
      set({ user: newUser });
    } catch (error) {
      set({ error: 'Failed to create account' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  googleSignIn: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ user: dummyUser });
    } catch (error) {
      set({ error: 'Failed to sign in with Google' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (email: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would send a password reset email
      console.log('Password reset email sent to:', email);
    } catch (error) {
      set({ error: 'Failed to send password reset email' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));