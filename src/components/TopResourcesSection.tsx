
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Book, Video, Code } from "lucide-react";

const resources = [
  {
    title: "Official React Docs",
    description: "The best place to start your journey with React.",
    link: "https://react.dev/",
    icon: <Code className="w-6 h-6 text-white" />,
    color: "from-sky-500 to-blue-600"
  },
  {
    title: "MDN Web Docs",
    description: "Comprehensive resource for all web technologies.",
    link: "https://developer.mozilla.org/",
    icon: <Book className="w-6 h-6 text-white" />,
    color: "from-gray-700 to-gray-900"
  },
  {
    title: "freeCodeCamp",
    description: "Learn to code for free. Build projects. Earn certifications.",
    link: "https://www.freecodecamp.org/",
    icon: <Video className="w-6 h-6 text-white" />,
    color: "from-green-500 to-green-700"
  },
  {
    title: "CS50 by Harvard",
    description: "Introduction to Computer Science from Harvard University.",
    link: "https://cs50.harvard.edu/x/2023/",
    icon: <Book className="w-6 h-6 text-white" />,
    color: "from-red-500 to-red-700"
  }
];

export default function TopResourcesSection() {
  return (
    <section className="py-16 px-6 bg-white/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Learning Resources</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A curated list of high-quality resources to boost your skills.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <a key={index} href={resource.link} target="_blank" rel="noopener noreferrer" className="block h-full">
              <Card className="h-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-105 cursor-pointer group flex flex-col">
                <CardContent className="p-6 text-center flex-grow flex flex-col justify-center items-center">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${resource.color} flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {resource.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </CardContent>
                <div className="p-4 text-center">
                   <Button variant="outline" size="sm">
                     Visit Resource <Link2 className="ml-2 h-4 w-4" />
                   </Button>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
