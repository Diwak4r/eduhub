
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user && location.pathname !== '/auth') {
        console.log('Redirecting to auth - no user found');
        navigate('/auth', { replace: true });
      } else if (user && location.pathname === '/auth') {
        console.log('Redirecting to dashboard - user authenticated');
        navigate('/', { replace: true });
      }
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything while redirecting
  if (!user && location.pathname !== '/auth') {
    return null;
  }

  if (user && location.pathname === '/auth') {
    return null;
  }

  return <>{children}</>;
}
