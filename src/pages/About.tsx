
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lightbulb, Rocket, Heart, Target, Globe, Users, MapPin, GraduationCap, Briefcase, Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion for Learning",
      description: "Driven by curiosity and the desire to grow every day, turning struggles into stepping stones."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Goal-Oriented",
      description: "Every project and skill learned is a step toward changing my life and supporting my family."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Community First",
      description: "Building resources that help students like me navigate the challenging world of IT and programming."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real-World Focus",
      description: "Bridging the gap between academic learning and practical application through hands-on projects."
    }
  ];

  const personalInfo = [
    { label: "Full Name", value: "Diwakar Ray Yadav", icon: <Users className="w-4 h-4" /> },
    { label: "Nickname", value: "Raycode", icon: <Code2 className="w-4 h-4" /> },
    { label: "Age", value: "20 years", icon: <Heart className="w-4 h-4" /> },
    { label: "Location", value: "Kathmandu, Nepal", icon: <MapPin className="w-4 h-4" /> },
    { label: "Education", value: "BIT - Himalayan WhiteHouse International College", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Role", value: "Computer Support Staff at MC Group of Companies", icon: <Briefcase className="w-4 h-4" /> },
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
              About Me - Diwakar Ray Yadav
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Student, Developer, and Creator - Building EduHub with struggle and determination.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-left flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex-shrink-0 text-center">
                <Avatar className="w-32 h-32 md:w-48 md:h-48 border-4 border-white shadow-lg mx-auto">
                  <AvatarImage src="/lovable-uploads/5aebc577-c367-47ca-b60b-74b3d331753b.png" alt="Diwakar Ray Yadav" />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">DRY</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">Diwakar Ray Yadav</h2>
                <p className="text-gray-500">Raycode</p>
                <div className="flex justify-center mt-4 space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-lg text-gray-700 mb-6 italic">
                  "Welcome to <span className="font-bold text-blue-600">EduHub</span>! I'm a 20-year-old BIT student from Kathmandu, Nepal, who believes in learning through struggle and building something meaningful."
                </p>
                <p className="text-gray-600 mb-6">
                  Currently pursuing my Bachelor's in Information Technology while working as Computer Support Staff at MC Group of Companies. Every line of code I write is a step toward changing my life and supporting my family. EduHub is my way of helping fellow students navigate the challenging world of IT and programming.
                </p>
                <div className="space-y-6 border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full flex-shrink-0">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">My Motivation</h3>
                      <p className="text-gray-600">
                        As a student juggling work and studies, I understand the struggles of learning programming and managing resources. EduHub is my attempt to create a platform that makes learning accessible and practical for students like me who are building their future one project at a time.
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
                        From learning C programming with Marksheet Management Systems to building web applications like EduHub, every project teaches me something new. I'm passionate about AI tools, automation, and creating educational resources that bridge the gap between theory and practice.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-lg font-semibold text-gray-800 text-center md:text-right">
                  "Made with Struggle by Diwa" 💪
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Info Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Get to Know Me</h2>
              <p className="text-gray-600 text-lg">The person behind EduHub</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalInfo.map((info, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-2 rounded-full">
                        {info.icon}
                      </div>
                      <h3 className="font-semibold text-gray-800">{info.label}</h3>
                    </div>
                    <p className="text-gray-600 text-sm ml-11">{info.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">My Core Values</h2>
              <p className="text-gray-600 text-lg">What drives me every day</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
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
        <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-lg transform -translate-x-12 translate-y-12 rotate-45"></div>
              
              <h2 className="text-3xl font-bold mb-6 relative z-10">My Mission</h2>
              <p className="text-xl text-blue-100 leading-relaxed relative z-10">
                To create educational resources and tools that help students like me succeed in their IT journey. Every feature in EduHub reflects my commitment to making learning practical, accessible, and rooted in real-world application. Because every byte of code is a step toward changing lives and supporting families.
              </p>
              <div className="mt-8 relative z-10">
                <p className="text-lg font-semibold">
                  Current Projects: C Programming Systems, EduHub Platform, AI Integration
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
