
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Star, Clock, Zap, Crown, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EnhancedAIToolCardProps {
  id: string;
  name: string;
  description: string | null;
  category: string;
  url: string | null;
  icon?: ReactNode;
  isPopular?: boolean;
  isPremium?: boolean;
  pricing?: string;
  rating?: number;
  userCount?: string;
  onClick?: () => void;
}

export default function EnhancedAIToolCard({ 
  name, 
  description, 
  category, 
  url,
  icon,
  isPopular,
  isPremium,
  pricing = "Free",
  rating,
  userCount,
  onClick 
}: EnhancedAIToolCardProps) {
  const categoryColors = {
    'Chatbots & Assistants': 'bg-blue-100 text-blue-700 border-blue-200',
    'Image Generation': 'bg-purple-100 text-purple-700 border-purple-200',
    'Video & Audio': 'bg-red-100 text-red-700 border-red-200',
    'Writing & Content': 'bg-green-100 text-green-700 border-green-200',
    'Development & Code': 'bg-orange-100 text-orange-700 border-orange-200',
    'Productivity & Automation': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'Design & Graphics': 'bg-pink-100 text-pink-700 border-pink-200',
    'Research & Analysis': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  };

  const defaultColor = 'bg-gray-100 text-gray-700 border-gray-200';
  const categoryColor = categoryColors[category as keyof typeof categoryColors] || defaultColor;

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 relative overflow-hidden">
      {isPopular && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">
          🔥 POPULAR
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-6 relative z-10" onClick={onClick}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon ? (
              <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                {icon}
              </div>
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {name.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`text-xs border ${categoryColor}`} variant="outline">
                  {category}
                </Badge>
                {isPremium && (
                  <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
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

        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
              </div>
            )}
            {userCount && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{userCount}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span className="font-medium">{pricing}</span>
            </div>
          </div>
          
          {url && (
            <span className="text-blue-600 group-hover:text-blue-800 text-sm font-medium">
              Try Now →
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
