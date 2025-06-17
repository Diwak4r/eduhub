
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, Code, Brain, MessageCircle, Info, GraduationCap, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: <BookOpen className="w-4 h-4" /> },
    { path: "/courses", label: "Courses", icon: <GraduationCap className="w-4 h-4" /> },
    { path: "/resources", label: "Resources", icon: <Code className="w-4 h-4" /> },
    { path: "/ai-tools", label: "AI Tools", icon: <Brain className="w-4 h-4" /> },
    { path: "/chat", label: "Chat", icon: <MessageCircle className="w-4 h-4" /> },
    { path: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RiverSkills
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* User Profile and Sign Out */}
            {user && (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600 max-w-32 truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  disabled={loading}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile User Info and Sign Out */}
              {user && (
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 mb-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600 truncate">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    disabled={loading}
                    className="w-full justify-start space-x-2 text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
