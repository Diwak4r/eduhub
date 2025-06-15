
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Star } from "lucide-react";

const featuredCourses = [
  {
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch",
    duration: "12 weeks",
    students: "45K+",
    rating: 4.8,
    image: "/lovable-uploads/5aebc577-c367-47ca-b60b-74b3d331753b.png",
    link: "https://www.freecodecamp.org/learn/responsive-web-design/",
    category: "Web Development"
  },
  {
    title: "Python Programming Fundamentals",
    description: "Master Python basics and build real-world projects",
    duration: "8 weeks",
    students: "32K+",
    rating: 4.7,
    image: "/lovable-uploads/9e936acc-262b-44f4-b7a4-ff1260719c6e.png",
    link: "https://www.codecademy.com/learn/learn-python-3",
    category: "Programming"
  },
  {
    title: "Digital Marketing Essentials",
    description: "Learn SEO, social media marketing, and content strategy",
    duration: "6 weeks",
    students: "28K+",
    rating: 4.6,
    image: "/lovable-uploads/5aebc577-c367-47ca-b60b-74b3d331753b.png",
    link: "https://www.coursera.org/learn/digital-marketing",
    category: "Marketing"
  },
];

export default function FeaturedCoursesSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your learning journey with our most popular and highly-rated courses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-lg font-semibold mb-2">{course.category}</h3>
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students}
                  </div>
                </div>
                <a 
                  href={course.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/courses">
            <Button size="lg" variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
