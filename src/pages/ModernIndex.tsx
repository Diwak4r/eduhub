
import ModernHeader from "@/components/ModernHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Brain, Search, MessageSquare, ArrowRight, Star, Users, Globe, Zap } from "lucide-react";
import River3D from "@/components/River3D";
import EnhancedHeroSection from "@/components/EnhancedHeroSection";
import FadeInSection from "@/components/FadeInSection";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

export default function ModernIndex() {
  const { metrics } = usePerformanceMonitor();

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
      
      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose RiverSkills?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to accelerate your learning journey
              </p>
            </div>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FadeInSection key={index} delay={index * 100}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <p className="text-xl text-gray-600">Jump right into what you need</p>
            </div>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <FadeInSection key={index} delay={index * 100}>
                <Link to={action.href}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold text-gray-800">{action.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeInSection>
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
          </FadeInSection>
        </div>
      </section>

      {/* Performance Metrics (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <section className="py-4 px-6 bg-gray-100">
          <div className="container mx-auto max-w-4xl">
            <details className="text-sm">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                Performance Metrics (Dev Only)
              </summary>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
                <div>LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A'}</div>
                <div>FID: {metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A'}</div>
                <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}</div>
                <div>TTFB: {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A'}</div>
                <div>FCP: {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A'}</div>
              </div>
            </details>
          </div>
        </section>
      )}
    </div>
  );
}
