
import { Book, Video, FileText, Newspaper, Bot, GraduationCap, Star, Users, TrendingUp, Award } from 'lucide-react';
import River3D from '@/components/River3D';
import Header from '@/components/Header';
import SectionCard from '@/components/SectionCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const sections = [
    {
      title: "Courses",
      description: "Comprehensive learning paths designed by industry experts to help you master new skills.",
      icon: <GraduationCap className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "News",
      description: "Stay updated with the latest trends, insights, and developments in technology and education.",
      icon: <Newspaper className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      title: "PDFs",
      description: "Downloadable resources, guides, and reference materials for offline learning.",
      icon: <FileText className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-red-500 to-rose-600"
    },
    {
      title: "Articles",
      description: "In-depth articles and tutorials written by professionals and thought leaders.",
      icon: <Book className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-purple-500 to-violet-600"
    },
    {
      title: "Videos",
      description: "Engaging video content including tutorials, lectures, and hands-on demonstrations.",
      icon: <Video className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-orange-500 to-amber-600"
    },
    {
      title: "AI Tools",
      description: "Cutting-edge AI-powered tools to enhance your learning experience and productivity.",
      icon: <Bot className="w-6 h-6" />,
      gradient: "bg-gradient-to-br from-cyan-500 to-teal-600"
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "50,000+", label: "Active Learners" },
    { icon: <GraduationCap className="w-8 h-8" />, value: "1,000+", label: "Expert Courses" },
    { icon: <Award className="w-8 h-8" />, value: "25,000+", label: "Certificates Issued" },
    { icon: <TrendingUp className="w-8 h-8" />, value: "95%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section with Enhanced Visuals */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <River3D />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg opacity-30 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-800 via-purple-700 to-blue-900 bg-clip-text text-transparent leading-tight">
              RiverSkills
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
              Flow with knowledge. Explore, learn, and grow with our comprehensive platform for skill development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Start Learning
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-3 text-lg hover:shadow-lg transition-all duration-300">
                Explore Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Discover Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our diverse range of learning resources and tools designed to accelerate your growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div key={section.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <SectionCard {...section} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-lg transform rotate-45"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Learning Flow?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have already started their journey to success with RiverSkills.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            Join RiverSkills Today
          </Button>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold">RiverSkills</span>
              </div>
              <p className="text-gray-400">
                Empowering learners worldwide with comprehensive educational resources.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/courses" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="/resources" className="hover:text-white transition-colors">Articles</a></li>
                <li><a href="/resources" className="hover:text-white transition-colors">Videos</a></li>
                <li><a href="/resources" className="hover:text-white transition-colors">PDFs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/ai-tools" className="hover:text-white transition-colors">AI Assistant</a></li>
                <li><a href="/chat" className="hover:text-white transition-colors">Chat with Diwa</a></li>
                <li><a href="/ai-tools" className="hover:text-white transition-colors">AI Tools</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="mailto:contact@riverskills.com" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RiverSkills. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
