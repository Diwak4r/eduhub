
import { Star, Clock, Users, Gift, Globe, Award } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  image: string;
  description: string;
  skills?: string[];
  language?: string;
  platform?: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const formatStudentCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLanguageFlag = (language: string) => {
    switch (language) {
      case 'Hindi':
        return '🇮🇳';
      case 'Nepali':
        return '🇳🇵';
      default:
        return '🇺🇸';
    }
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-white relative overflow-hidden">
      {course.isFeatured && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold z-10">
          ⭐ FEATURED
        </div>
      )}
      
      {course.isNew && (
        <div className="absolute top-4 right-4 bg-gradient-to-l from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full font-bold z-10">
          🆕 NEW
        </div>
      )}

      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{course.rating}</span>
        </div>
        
        {/* FREE Badge */}
        <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
          <Gift className="h-4 w-4" />
          <span className="text-sm font-bold">FREE</span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-blue-600 font-medium">{course.category}</span>
          {course.language && (
            <div className="flex items-center gap-1">
              <span>{getLanguageFlag(course.language)}</span>
              <span className="text-xs text-gray-500">{course.language}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <p className="text-sm text-gray-500 mb-4">
          by {course.instructor}
        </p>

        {/* Skills */}
        {course.skills && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {course.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {course.skills.length > 3 && (
                <span className="text-xs text-gray-500">+{course.skills.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{formatStudentCount(course.students)} students</span>
          </div>
        </div>

        {course.platform && (
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
            <Globe className="h-4 w-4" />
            <span>{course.platform}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift className="h-6 w-6 text-green-600" />
          <div>
            <p className="text-2xl font-bold text-green-600">FREE</p>
            <p className="text-sm text-gray-500 -mt-1">100% Free Access</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
          Start Learning
        </Button>
      </CardFooter>
    </Card>
  );
}
