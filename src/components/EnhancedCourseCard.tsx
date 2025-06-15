import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, Award, Play, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface EnhancedCourseCardProps {
  title: string;
  description: string;
  instructor?: string;
  duration?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  rating?: number;
  studentsCount?: string;
  image?: string;
  skills: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  onClick?: () => void;
}

export default function EnhancedCourseCard({
  title,
  description,
  instructor,
  duration,
  level,
  category,
  rating,
  studentsCount,
  image,
  skills,
  isFeatured,
  isNew,
  onClick
}: EnhancedCourseCardProps) {
  const levelColors = {
    'Beginner': 'bg-green-100 text-green-700 border-green-200',
    'Intermediate': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Advanced': 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 bg-white border-0 relative overflow-hidden">
      {isFeatured && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-br-lg font-bold z-10">
          ⭐ FEATURED
        </div>
      )}
      
      {isNew && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-bl-lg font-bold z-10">
          🆕 NEW
        </div>
      )}

      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white opacity-80" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="sm" className="bg-white/90 text-gray-800 hover:bg-white">
            <Play className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <CardContent className="p-6" onClick={onClick}>
        {/* Category and Level */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
            {category}
          </Badge>
          <Badge className={`text-xs border ${levelColors[level]}`} variant="outline">
            {level}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Instructor */}
        {instructor && (
          <p className="text-sm text-gray-600 mb-3">by {instructor}</p>
        )}

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="text-xs text-gray-500">+{skills.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            )}
            {studentsCount && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{studentsCount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-2xl font-bold text-gray-900">
            <span className="text-green-600">Free</span>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Enroll Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
