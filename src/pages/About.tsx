
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lightbulb, Rocket, Heart, Target, Globe, Users, Mail, GraduationCap, Briefcase, Code2, Star, Book, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const platformFeatures = [
    {
      icon: <Book className="w-6 h-6" />,
      title: "200+ Free Courses",
      description: "Curated courses from top platforms worldwide, completely free."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Language Support",
      description: "Content available in English, Hindi, and Nepali for inclusive learning."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "50+ AI Tools",
      description: "Discover and access the best AI-powered learning and development tools."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Intelligent Assistant",
      description: "Chat with Diwa for personalized learning guidance and course recommendations."
    }
  ];

  const missionPoints = [
    "Making quality education accessible to everyone, regardless of financial background",
    "Supporting students in Nepal and India with resources in their native languages",
    "Bridging the gap between academic learning and practical industry skills",
    "Creating a community of learners who support each other's growth"
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
              Your gateway to free, quality education. Built with passion, powered by community.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-left animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">RiverSkills Platform</h2>
                <p className="text-gray-600">Where Learning Flows Like a River</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {platformFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="bg-blue-500 text-white p-3 rounded-full flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <div className="space-y-3">
                  {missionPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet the Creator</h2>
              <p className="text-gray-600 text-lg">The mind behind RiverSkills</p>
            </div>
            
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center md:text-left">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-lg mx-auto md:mx-0">
                      <AvatarImage src="/lovable-uploads/5aebc577-c367-47ca-b60b-74b3d331753b.png" alt="Diwakar Ray Yadav" />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">DRY</AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-bold text-gray-800 mt-4">Diwakar Ray Yadav</h3>
                    <p className="text-blue-600 font-medium">Creator & Developer</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a href="mailto:reachout.diwakar@gmail.com" className="text-sm text-blue-600 hover:underline">
                        reachout.diwakar@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-800">BIT Student</p>
                          <p className="text-sm text-gray-600">Himalayan WhiteHouse International College</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium text-gray-800">Computer Support Staff</p>
                          <p className="text-sm text-gray-600">MC Group of Companies</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Code2 className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="font-medium text-gray-800">Full Stack Developer</p>
                          <p className="text-sm text-gray-600">Kathmandu, Nepal</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <p className="text-gray-700 italic">
                        "As a student juggling work and studies, I understand the challenges of accessing quality education. RiverSkills is my contribution to making learning accessible to everyone, especially students like me who are building their future one project at a time."
                      </p>
                      <p className="text-right mt-2 font-medium text-blue-600">— Diwakar Ray Yadav</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Platform Stats */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Platform Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">200+</div>
                  <div className="text-blue-100">Courses</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">50+</div>
                  <div className="text-green-100">AI Tools</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">3</div>
                  <div className="text-purple-100">Languages</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">Global</div>
                  <div className="text-orange-100">Access</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl text-blue-100 mb-8">
              Have questions about RiverSkills? Want to contribute or collaborate?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:reachout.diwakar@gmail.com"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contact Diwakar
              </a>
            </div>
            <p className="mt-8 text-blue-200">
              "Made with Struggle and Passion by Diwakar Ray Yadav" 💪🌊
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
