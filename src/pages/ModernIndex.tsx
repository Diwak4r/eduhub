
import ModernHeader from "@/components/ModernHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Brain, Search, MessageSquare, ArrowRight, Star, Users, Globe, Zap } from "lucide-react";
import River3D from "@/components/River3D";

export default function ModernIndex() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "200+ Courses",
      description: "Curated learning paths from beginner to expert level",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "50+ AI Tools",
      description: "Latest AI-powered tools for enhanced productivity",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Language",
      description: "Content in English, Hindi, and Nepali",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Learning",
      description: "AI-powered personalized learning experience",
      color: "from-orange-500 to-red-500",
    },
  ];

  const quickActions = [
    { title: "Browse Courses", href: "/courses", icon: <BookOpen className="w-5 h-5" />, color: "bg-blue-600" },
    { title: "Explore Resources", href: "/resources", icon: <Brain className="w-5 h-5" />, color: "bg-purple-600" },
    { title: "AI Tools", href: "/ai-tools", icon: <Search className="w-5 h-5" />, color: "bg-green-600" },
    { title: "Chat Assistant", href: "/chat", icon: <MessageSquare className="w-5 h-5" />, color: "bg-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <ModernHeader />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <River3D />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  RiverSkills
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Your gateway to unlimited learning opportunities. Master new skills with our curated courses, resources, and AI-powered tools.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/courses" className="flex items-center gap-2">
                  Start Learning
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-400 px-8 py-4 rounded-2xl text-lg font-semibold"
              >
                <Link to="/chat">Chat with AI</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose RiverSkills?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to accelerate your learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <p className="text-xl text-gray-600">Jump right into what you need</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800">{action.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">3</div>
              <div className="text-gray-600">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">∞</div>
              <div className="text-gray-600">Possibilities</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
