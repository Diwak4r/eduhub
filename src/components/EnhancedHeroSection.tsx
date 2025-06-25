
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Users, BookOpen, Brain, TrendingUp } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import AnimatedButton from './AnimatedButton';
import FadeInSection from './FadeInSection';
import SkeletonLoader from './SkeletonLoader';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: "Rajesh Hamal",
    role: "Senior Frontend Developer",
    company: "Tech Solutions Nepal",
    content: "RiverSkills transformed my career. The courses are practical and industry-relevant.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Priya Sharma",
    role: "Full Stack Developer",
    company: "Digital Nepal",
    content: "The AI tools section helped me discover amazing productivity tools for my work.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Bikash Thapa",
    role: "Data Scientist",
    company: "Analytics Plus",
    content: "Best learning platform in Nepal. Quality content and user-friendly interface.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

const stats = [
  { label: "Active Learners", value: "15,000+", icon: <Users className="w-6 h-6" /> },
  { label: "Courses Available", value: "200+", icon: <BookOpen className="w-6 h-6" /> },
  { label: "AI Tools", value: "50+", icon: <Brain className="w-6 h-6" /> },
  { label: "Success Rate", value: "94%", icon: <TrendingUp className="w-6 h-6" /> }
];

export default function EnhancedHeroSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate real-time enrollment counter
    const interval = setInterval(() => {
      setEnrollmentCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    // Testimonial carousel
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);

    return () => {
      clearInterval(interval);
      clearInterval(testimonialInterval);
    };
  }, []);

  if (isLoading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <SkeletonLoader variant="text" height="4rem" className="mb-6" />
            <SkeletonLoader variant="text" lines={3} className="mb-8" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <SkeletonLoader variant="rectangular" width="200px" height="56px" />
              <SkeletonLoader variant="rectangular" width="180px" height="56px" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonLoader key={i} variant="card" height="120px" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <FadeInSection delay={0}>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                RiverSkills
              </span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={200}>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your career with cutting-edge courses, AI tools, and personalized learning paths. 
              Join Nepal's fastest-growing tech community.
            </p>
          </FadeInSection>

          {/* Real-time Enrollment Counter */}
          <FadeInSection delay={300}>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {enrollmentCount + 247} students enrolled this week
            </div>
          </FadeInSection>

          {/* Action Buttons */}
          <FadeInSection delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <AnimatedButton
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                asChild
              >
                <Link to="/courses">Start Learning Now</Link>
              </AnimatedButton>
              
              <AnimatedButton
                variant="outline"
                size="lg"
                icon={<Play className="w-5 h-5" />}
              >
                Watch Demo
              </AnimatedButton>
            </div>
          </FadeInSection>

          {/* Stats Grid */}
          <FadeInSection delay={500}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeInSection>

          {/* Testimonial Carousel */}
          <FadeInSection delay={600}>
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <OptimizedImage
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                {/* Carousel Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        'w-2 h-2 rounded-full transition-all duration-300',
                        index === currentTestimonial 
                          ? 'bg-blue-500 w-6' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      )}
                      onClick={() => setCurrentTestimonial(index)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
