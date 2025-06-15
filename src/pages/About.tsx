
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lightbulb, Rocket, Heart, Target, Globe, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion for Learning",
      description: "We believe learning should be accessible, engaging, and transformative for everyone."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Goal-Oriented",
      description: "Every resource is carefully curated to help you achieve your specific learning objectives."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Community",
      description: "Connecting learners worldwide through shared knowledge and collaborative growth."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Inclusive Education",
      description: "Breaking down barriers to make quality education available to all backgrounds."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6 relative overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg opacity-30 animate-bounce"></div>
          
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in-up pb-2">
              About RiverSkills
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              The story behind our mission to make learning flow naturally.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-left flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex-shrink-0 text-center">
                <Avatar className="w-32 h-32 md:w-48 md:h-48 border-4 border-white shadow-lg mx-auto">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" alt="Diwakar Ray Yadav" />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">DRY</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">Diwakar Ray Yadav</h2>
                <p className="text-gray-500">Founder & Creator</p>
                <div className="flex justify-center mt-4 space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-lg text-gray-700 mb-6 italic">
                  "Welcome to <span className="font-bold text-blue-600">RiverSkills</span>! I created this platform to help people like you flow through the world of learning."
                </p>
                <p className="text-gray-600 mb-6">
                  I've always been passionate about helping others grow, and I wanted to build a space where anyone can gain new skills in an easy and engaging way. RiverSkills is designed to make learning feel like a natural part of your journey.
                </p>
                <div className="space-y-6 border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full flex-shrink-0">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">My Motivation</h3>
                      <p className="text-gray-600">
                        From early on, I recognized the challenges people face when navigating new knowledge and career paths. With RiverSkills, my vision is to break down barriers to learning—making education accessible, practical, and inspiring for everyone.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-full flex-shrink-0">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">My Journey</h3>
                      <p className="text-gray-600">
                        As an educator and lifelong learner myself, I've gathered the best resources and tools to support your personal growth. Every feature on RiverSkills reflects my commitment to making learning smooth, meaningful, and enjoyable.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-lg font-semibold text-gray-800 text-center md:text-right">
                  Join me, and let's explore new possibilities together!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
              <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-3 rounded-full w-fit mx-auto mb-4">
                      {value.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-lg transform -translate-x-12 translate-y-12 rotate-45"></div>
              
              <h2 className="text-3xl font-bold mb-6 relative z-10">Our Mission</h2>
              <p className="text-xl text-blue-100 leading-relaxed relative z-10">
                To democratize education by providing free, high-quality learning resources and AI-powered tools that help individuals around the world acquire new skills, advance their careers, and achieve their personal and professional goals.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
