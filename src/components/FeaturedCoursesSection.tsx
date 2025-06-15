
import { Star, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const featuredCourses = [
  {
    id: 1,
    title: 'Complete React Development Course',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    students: 12543,
    price: 89.99,
    originalPrice: 129.99,
    image: '/placeholder.svg',
    badge: 'Most Popular',
    badgeIcon: TrendingUp,
    badgeColor: 'bg-orange-500'
  },
  {
    id: 2,
    title: 'Advanced Machine Learning',
    instructor: 'Prof. Emily Rodriguez',
    rating: 4.9,
    students: 3456,
    price: 129.99,
    originalPrice: 199.99,
    image: '/placeholder.svg',
    badge: 'Top Rated',
    badgeIcon: Star,
    badgeColor: 'bg-yellow-500'
  },
  {
    id: 3,
    title: 'Cloud Infrastructure with AWS',
    instructor: 'Lisa Wang',
    rating: 4.8,
    students: 2876,
    price: 109.99,
    originalPrice: 149.99,
    image: '/placeholder.svg',
    badge: 'New Release',
    badgeIcon: Award,
    badgeColor: 'bg-green-500'
  }
];

export default function FeaturedCoursesSection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Courses
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Discover our most popular and highly-rated courses, carefully selected for their quality and impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => {
            const IconComponent = course.badgeIcon;
            const discountPercent = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
            
            return (
              <Card key={course.id} className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 bg-white overflow-hidden">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Badge */}
                  <div className={`absolute top-4 left-4 ${course.badgeColor} text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium`}>
                    <IconComponent className="h-4 w-4" />
                    {course.badge}
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{discountPercent}%
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    by {course.instructor}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      {course.students.toLocaleString()} students
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">
                        ${course.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ${course.originalPrice}
                      </span>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            View All Featured Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
