
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, BarChart, Smartphone, Database, Shield } from "lucide-react";

const careerPaths = [
  {
    title: "Full Stack Developer",
    description: "Build complete web applications from frontend to backend",
    icon: <Code className="w-8 h-8" />,
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    salary: "$70K - $120K",
    demand: "High",
    color: "from-blue-500 to-blue-600",
    link: "/courses?category=web-development"
  },
  {
    title: "UI/UX Designer",
    description: "Create beautiful and user-friendly digital experiences",
    icon: <Palette className="w-8 h-8" />,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    salary: "$60K - $100K",
    demand: "High",
    color: "from-purple-500 to-purple-600",
    link: "/courses?category=design"
  },
  {
    title: "Data Scientist",
    description: "Extract insights from data to drive business decisions",
    icon: <BarChart className="w-8 h-8" />,
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    salary: "$80K - $140K",
    demand: "Very High",
    color: "from-green-500 to-green-600",
    link: "/courses?category=data-science"
  },
  {
    title: "Mobile Developer",
    description: "Create apps for iOS and Android platforms",
    icon: <Smartphone className="w-8 h-8" />,
    skills: ["React Native", "Flutter", "Swift", "Kotlin"],
    salary: "$75K - $130K",
    demand: "High",
    color: "from-orange-500 to-orange-600",
    link: "/courses?category=mobile-development"
  },
  {
    title: "Database Administrator",
    description: "Manage and optimize database systems and performance",
    icon: <Database className="w-8 h-8" />,
    skills: ["SQL", "PostgreSQL", "MongoDB", "Performance Tuning"],
    salary: "$65K - $110K",
    demand: "Medium",
    color: "from-teal-500 to-teal-600",
    link: "/courses?category=database"
  },
  {
    title: "Cybersecurity Specialist",
    description: "Protect organizations from digital threats and attacks",
    icon: <Shield className="w-8 h-8" />,
    skills: ["Network Security", "Penetration Testing", "Risk Assessment"],
    salary: "$85K - $150K",
    demand: "Very High",
    color: "from-red-500 to-red-600",
    link: "/courses?category=cybersecurity"
  }
];

export default function CareerPathsSection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore Career Paths</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover high-demand career opportunities and the skills you need to succeed
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {careerPaths.map((path, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group bg-white">
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${path.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {path.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {path.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {path.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">KEY SKILLS</div>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="text-xs font-medium text-gray-500">SALARY RANGE</div>
                      <div className="font-semibold text-gray-800">{path.salary}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500">DEMAND</div>
                      <div className={`font-semibold ${
                        path.demand === 'Very High' ? 'text-green-600' : 
                        path.demand === 'High' ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {path.demand}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link to={path.link}>
                  <Button className={`w-full bg-gradient-to-r ${path.color} hover:opacity-90 text-white transition-all duration-300`}>
                    Explore Path
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/courses">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              View All Career Paths
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
