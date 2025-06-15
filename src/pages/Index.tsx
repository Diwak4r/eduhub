import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import FeaturedCoursesSection from "@/components/FeaturedCoursesSection";
import CareerPathsSection from "@/components/CareerPathsSection";
import FreeAffordableSection from "@/components/FreeAffordableSection";
import NewsSection from "@/components/NewsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Play,
  Star,
  Clock,
  Globe,
  Code,
  Brain,
  MessageCircle,
  GraduationCap,
} from "lucide-react";
import TopResourcesSection from "@/components/TopResourcesSection";
import AnimatedCareerPath from "@/components/AnimatedCareerPath";
import CourseCard from "@/components/CourseCard";

export default function Index() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Comprehensive Learning",
      description: "Access thousands of courses from beginner to advanced levels",
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Community Support",
      description: "Connect with learners and mentors from around the world",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Certified Learning",
      description: "Earn certificates and build your professional portfolio",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Career Growth",
      description: "Track your progress and advance your career goals",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Learners", icon: <Users className="w-6 h-6" /> },
    { number: "1000+", label: "Free Courses", icon: <BookOpen className="w-6 h-6" /> },
    { number: "500+", label: "Expert Instructors", icon: <Award className="w-6 h-6" /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
  ];

  const quickLinks = [
    {
      title: "Browse Courses",
      description: "Explore our comprehensive course catalog",
      icon: <GraduationCap className="w-6 h-6" />,
      path: "/courses",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Learning Resources",
      description: "Access free tutorials and documentation",
      icon: <Code className="w-6 h-6" />,
      path: "/resources",
      color: "from-green-500 to-green-600"
    },
    {
      title: "AI Tools",
      description: "Discover AI-powered learning tools",
      icon: <Brain className="w-6 h-6" />,
      path: "/ai-tools",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Get Help",
      description: "Chat with our AI assistant",
      icon: <MessageCircle className="w-6 h-6" />,
      path: "/chat",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const trendingCourses = [
    {
      id: 101,
      title: 'Modern React with Hooks',
      instructor: 'Jane Doe',
      category: 'Web Development',
      level: 'Intermediate',
      duration: '12 hours',
      students: 15234,
      rating: 4.8,
      price: 0,
      image: 'https://images.unsplash.com/photo-1526948128573-703ee1a4563e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      description: 'Master React.js with hooks, context, and all the new features from scratch.'
    },
    {
      id: 102,
      title: 'Python for Data Science and ML',
      instructor: 'John Smith',
      category: 'Data Science',
      level: 'Beginner',
      duration: '20 hours',
      students: 25890,
      rating: 4.9,
      price: 0,
      image: 'https://images.unsplash.com/photo-1555949963-ff98c872d8e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      description: 'Learn Python for Data Science and Machine Learning from A-Z. Scikit-learn, Pandas, and more!'
    },
    {
      id: 103,
      title: 'The Complete DevOps Bootcamp',
      instructor: 'Sam Wilson',
      category: 'DevOps',
      level: 'Advanced',
      duration: '30 hours',
      students: 8765,
      rating: 4.7,
      price: 0,
      image: 'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      description: 'Go from a beginner to a DevOps professional. Docker, Kubernetes, CI/CD, and more.'
    },
    {
      id: 104,
      title: 'Ethical Hacking: The Complete Course',
      instructor: 'Alex Ray',
      category: 'Cybersecurity',
      level: 'Intermediate',
      duration: '18 hours',
      students: 12345,
      rating: 4.8,
      price: 0,
      image: 'https://images.unsplash.com/photo-1555949963-a538202b37b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      description: 'Become a certified ethical hacker. Learn network security, penetration testing, and more.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg opacity-30 animate-bounce"></div>
        
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
              Learn Without Limits
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover thousands of free courses, resources, and AI-powered tools to accelerate your learning journey
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/courses">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Start Learning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/resources">
                <Button variant="outline" size="lg" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Play className="mr-2 h-5 w-5" />
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-2 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.path}>
                <Card className="h-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${link.color} flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                      {link.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{link.title}</h3>
                    <p className="text-gray-600 text-sm">{link.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose EduHub?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to accelerate your learning journey with cutting-edge tools and resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  activeFeature === index ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* Featured Sections */}
      <FeaturedCoursesSection />
      
      {/* Trending Courses Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Trending Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our most popular courses across various fields.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <CareerPathsSection />
      <AnimatedCareerPath />
      <FreeAffordableSection />
      <TopResourcesSection />

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Future?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners who are already advancing their careers with EduHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Browse All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Personalized Help
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
