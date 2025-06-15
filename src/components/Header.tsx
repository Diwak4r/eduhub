
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses & Careers" },
    { to: "/resources", label: "Resources" },
    { to: "/ai-tools", label: "AI Tools" },
    { to: "/chat", label: "Chat with Diwa" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RiverSkills
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group ${
                  pathname === link.to ? "text-blue-700" : ""
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full ${
                  pathname === link.to ? "w-full" : ""
                }`}></span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
