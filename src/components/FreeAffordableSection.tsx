
import { DollarSign, Gift, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CourseCard from './CourseCard';

const freeAndAffordableCourses = [
  {
    id: 7,
    title: 'HTML & CSS Fundamentals',
    instructor: 'John Martinez',
    category: 'Web Development',
    level: 'Beginner',
    duration: '25 hours',
    students: 15623,
    rating: 4.5,
    price: 0,
    image: '/placeholder.svg',
    description: 'Learn the basics of web development with HTML and CSS'
  },
  {
    id: 8,
    title: 'JavaScript Essentials',
    instructor: 'Emma Davis',
    category: 'Web Development',
    level: 'Beginner',
    duration: '30 hours',
    students: 9876,
    rating: 4.6,
    price: 0,
    image: '/placeholder.svg',
    description: 'Master JavaScript fundamentals and DOM manipulation'
  },
  {
    id: 9,
    title: 'Git Version Control',
    instructor: 'Tom Wilson',
    category: 'DevOps',
    level: 'Beginner',
    duration: '15 hours',
    students: 7432,
    rating: 4.4,
    price: 29.99,
    image: '/placeholder.svg',
    description: 'Learn version control with Git and GitHub'
  },
  {
    id: 10,
    title: 'Introduction to Data Analysis',
    instructor: 'Rachel Green',
    category: 'Data Science',
    level: 'Beginner',
    duration: '20 hours',
    students: 5234,
    rating: 4.7,
    price: 39.99,
    image: '/placeholder.svg',
    description: 'Get started with data analysis using Excel and basic statistics'
  }
];

export default function FreeAffordableSection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-green-500 to-emerald-600">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="h-8 w-8 text-white" />
            <h2 className="text-4xl font-bold text-white">
              Free & Affordable Options
            </h2>
          </div>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Start your learning journey without breaking the bank. Explore our collection of free courses and budget-friendly options.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Gift className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-xl font-bold mb-2">100% Free Courses</h3>
              <p className="text-green-100">Access high-quality content without any cost</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Tag className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-xl font-bold mb-2">Under $50</h3>
              <p className="text-green-100">Premium courses at affordable prices</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-xl font-bold mb-2">Great Value</h3>
              <p className="text-green-100">Learn from industry experts without the premium price</p>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {freeAndAffordableCourses.map((course) => (
            <div key={course.id} className="relative">
              {course.price === 0 && (
                <div className="absolute -top-2 -right-2 z-10 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  FREE
                </div>
              )}
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            View All Free & Affordable Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
