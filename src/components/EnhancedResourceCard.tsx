
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedResourceCardProps {
  title: string;
  description: string | null;
  type: string;
  url: string | null;
  created_at: string;
  borderColor?: string;
  icon?: ReactNode;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  rating?: number;
  onClick?: () => void;
}

export default function EnhancedResourceCard({ 
  title, 
  description, 
  type, 
  url, 
  created_at, 
  borderColor = "border-gray-500",
  icon,
  difficulty,
  duration,
  rating,
  onClick 
}: EnhancedResourceCardProps) {
  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-700',
    'Intermediate': 'bg-yellow-100 text-yellow-700',
    'Advanced': 'bg-red-100 text-red-700'
  };

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 bg-white/80 backdrop-blur-sm animate-fade-in-up",
        "border-t-4 relative overflow-hidden",
        borderColor,
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-6 pt-5 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {type}
                </span>
                {difficulty && (
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColors[difficulty]}`}>
                    {difficulty}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {url && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink className="w-5 h-5 text-blue-500" />
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
              </div>
            )}
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{rating}/5</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span>Added {new Date(created_at).toLocaleDateString()}</span>
            {url && (
              <span className="text-blue-600 group-hover:text-blue-800 ml-2">
                Click to open →
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
