import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import AuthLayout from './components/auth/AuthLayout';
import Loading from './components/ui/Loading';

// Lazy load pages to improve initial load time
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected routes */}
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/auth/login" replace />}
        >
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="community/:id" element={<CommunityPage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;