
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, GraduationCap, Lightbulb, Search, MessageSquare, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ModernHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Courses', href: '/courses', icon: <GraduationCap className="w-4 h-4" /> },
    { name: 'Resources', href: '/resources', icon: <Lightbulb className="w-4 h-4" /> },
    { name: 'AI Tools', href: '/ai-tools', icon: <Search className="w-4 h-4" /> },
    { name: 'Chat', href: '/chat', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto py-4 px-6">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                RiverSkills
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Learning Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:bg-gray-50 ${
                  location.pathname === item.href 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-100' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 ${
                    location.pathname === item.href 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'text-gray-600 hover:bg-white hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
