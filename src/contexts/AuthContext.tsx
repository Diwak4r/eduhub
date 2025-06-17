
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const checkAdminRole = async (userId: string): Promise<boolean> => {
    try {
      console.log('Checking admin role for user:', userId);
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin role:', error);
        return false;
      }

      const adminStatus = !!data;
      console.log('Admin status determined:', adminStatus);
      return adminStatus;
    } catch (error) {
      console.error('Exception in checkAdminRole:', error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local state
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign out error",
        description: error.message || "Failed to sign out",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener...');
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);

        // Check admin role when user signs in
        if (session?.user) {
          try {
            const adminStatus = await checkAdminRole(session.user.id);
            if (mounted) {
              setIsAdmin(adminStatus);
            }
          } catch (error) {
            console.error('Error in admin check:', error);
            if (mounted) {
              setIsAdmin(false);
            }
          }
        } else {
          setIsAdmin(false);
        }

        if (mounted) {
          setLoading(false);
        }
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
        }
        
        if (!mounted) return;
        
        console.log('Initial session:', session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          try {
            const adminStatus = await checkAdminRole(session.user.id);
            if (mounted) {
              setIsAdmin(adminStatus);
            }
          } catch (error) {
            console.error('Error in initial admin check:', error);
            if (mounted) {
              setIsAdmin(false);
            }
          }
        }

        if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Exception in getInitialSession:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      console.log('Cleaning up auth subscription...');
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    loading,
    signOut,
    isAdmin
  };

  console.log('AuthProvider rendering with user:', user?.email, 'loading:', loading, 'isAdmin:', isAdmin);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
