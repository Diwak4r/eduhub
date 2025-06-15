
import { Book, Video, FileText, Newspaper, Bot, GraduationCap } from 'lucide-react';
import Hero3D from '@/components/Hero3D';
import Header from '@/components/Header';
import SectionCard from '@/components/SectionCard';
import { Button } from '@/components/ui/button';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Hero3D />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-800 via-purple-700 to-blue-900 bg-clip-text text-transparent leading-tight">
              SkillSphere
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
              Your universe of knowledge. Explore, learn, and grow with our comprehensive platform for skill development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg">
                Start Learning
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-3 text-lg">
                Explore Resources
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-20 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-25 animate-float"></div>
      </section>

      {/* Main Sections */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
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

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have already started their journey to success with SkillSphere.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
            Join SkillSphere Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold">SkillSphere</span>
              </div>
              <p className="text-gray-400">
                Empowering learners worldwide with comprehensive educational resources.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Articles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Videos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PDFs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">AI Assistant</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Progress Tracker</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Skill Assessment</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkillSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
