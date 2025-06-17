
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';
import { signUpSchema, signInSchema } from '@/lib/validations';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      fullName: '',
      confirmPassword: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data using zod schemas
    try {
      if (isSignUp) {
        signUpSchema.parse(formData);
      } else {
        signInSchema.parse({
          email: formData.email,
          password: formData.password
        });
      }
    } catch (error: any) {
      toast({
        title: "Validation Error",
        description: error.errors?.[0]?.message || "Please check your input",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.fullName
            }
          }
        });

        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: "Account Exists",
              description: "An account with this email already exists. Please sign in instead.",
              variant: "destructive"
            });
            setIsSignUp(false);
            resetForm();
          } else {
            throw error;
          }
        } else {
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account.",
          });
          // If email confirmation is disabled, user will be automatically signed in
          if (data.user && !data.user.email_confirmed_at) {
            resetForm();
            setIsSignUp(false);
          }
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Invalid Credentials",
              description: "Please check your email and password and try again.",
              variant: "destructive"
            });
          } else if (error.message.includes('Email not confirmed')) {
            toast({
              title: "Email Not Verified",
              description: "Please check your email and click the verification link.",
              variant: "destructive"
            });
          } else {
            throw error;
          }
        } else if (data.user) {
          toast({
            title: "Welcome back!",
            description: "You have been successfully signed in.",
          });
          console.log('Sign in successful, redirecting...');
          // Navigation will be handled by AuthGate component
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform group-hover:scale-110 transition-transform duration-300 shadow-lg flex items-center justify-center">
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RiverSkills
            </span>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
            <p className="text-gray-600">
              {isSignUp ? 'Start your learning journey today' : 'Sign in to continue your learning'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      className="pl-10"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="pl-10"
                    disabled={loading}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    disabled={loading}
                    required
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm your password"
                      className="pl-10"
                      disabled={loading}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={toggleMode}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                disabled={loading}
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Create one"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
