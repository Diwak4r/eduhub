
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Gift, Star, Users, BookOpen, Globe } from "lucide-react";

const freeResources = [
  {
    title: "freeCodeCamp",
    description: "Complete programming curriculum with interactive coding challenges",
    type: "Full Curriculum",
    students: "400M+",
    rating: 4.9,
    link: "https://www.freecodecamp.org/",
    features: ["Web Development", "Data Science", "Machine Learning", "Certifications"]
  },
  {
    title: "Coursera Free Courses",
    description: "Audit courses from top universities like Stanford, Yale, and MIT",
    type: "University Courses",
    students: "100M+",
    rating: 4.7,
    link: "https://www.coursera.org/courses?query=free",
    features: ["Computer Science", "Business", "Data Science", "Personal Development"]
  },
  {
    title: "Khan Academy",
    description: "World-class education for anyone, anywhere - completely free",
    type: "Academic Learning",
    students: "70M+",
    rating: 4.8,
    link: "https://www.khanacademy.org/",
    features: ["Math", "Science", "Programming", "Economics"]
  },
  {
    title: "MIT OpenCourseWare",
    description: "Free access to course materials from MIT's undergraduate and graduate courses",
    type: "MIT Courses",
    students: "10M+",
    rating: 4.9,
    link: "https://ocw.mit.edu/",
    features: ["Engineering", "Computer Science", "Mathematics", "Physics"]
  },
  {
    title: "edX Free Courses",
    description: "High-quality courses from Harvard, MIT, Berkeley, and other top institutions",
    type: "Premium Education",
    students: "35M+",
    rating: 4.6,
    link: "https://www.edx.org/search?q=&free=true",
    features: ["Computer Science", "Business", "Language", "Engineering"]
  },
  {
    title: "YouTube Learning Channels",
    description: "Curated collection of the best educational YouTube channels",
    type: "Video Learning",
    students: "1B+",
    rating: 4.5,
    link: "/resources?type=Video%20Playlists",
    features: ["Programming", "Design", "Business", "Languages"]
  }
];

const affordableOptions = [
  {
    title: "Udemy",
    description: "Professional courses often on sale for $10-20",
    priceRange: "$10 - $200",
    originalPrice: "Usually $200",
    link: "https://www.udemy.com/",
    icon: <DollarSign className="w-6 h-6" />
  },
  {
    title: "Skillshare",
    description: "Creative skills and business courses with free trial",
    priceRange: "$8/month",
    originalPrice: "2 months free",
    link: "https://www.skillshare.com/",
    icon: <Star className="w-6 h-6" />
  },
  {
    title: "Pluralsight",
    description: "Technology and creative skills with hands-on learning",
    priceRange: "$29/month",
    originalPrice: "10-day free trial",
    link: "https://www.pluralsight.com/",
    icon: <BookOpen className="w-6 h-6" />
  }
];

export default function FreeAffordableSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Free Resources Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Gift className="w-10 h-10 text-green-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-800">100% Free Learning Resources</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access world-class education without spending a penny - these platforms offer completely free courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {freeResources.map((resource, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group border-2 border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                      FREE
                    </span>
                    <div className="flex items-center text-gray-500">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm">{resource.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {resource.students}
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {resource.type}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 mb-2">SUBJECTS AVAILABLE</div>
                    <div className="flex flex-wrap gap-1">
                      {resource.features.slice(0, 3).map((feature, featureIndex) => (
                        <span key={featureIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                      {resource.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                          +{resource.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300">
                      Start Learning Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Affordable Options Section */}
        <div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="w-10 h-10 text-blue-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-800">Premium Options Under $30/month</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              When you're ready to invest in your future, these platforms offer exceptional value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {affordableOptions.map((option, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group border-2 border-blue-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {option.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {option.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {option.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{option.priceRange}</div>
                    <div className="text-sm text-gray-500 line-through">{option.originalPrice}</div>
                  </div>
                  
                  <a href={option.link} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
                      View Deals
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Learning?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you choose free or premium options, the most important step is to start. Your future self will thank you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resources">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Gift className="mr-2 h-5 w-5" />
                  Browse Free Resources
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Globe className="mr-2 h-5 w-5" />
                  Explore All Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
