
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Star, Zap, Crown, Users, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CompactAIToolCardProps {
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

export default function CompactAIToolCard({ 
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
}: CompactAIToolCardProps) {
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
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 bg-gradient-to-br from-white via-gray-50 to-white border-0 relative overflow-hidden h-full">
      {/* 3D Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 via-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-bl-xl font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          HOT
        </div>
      )}
      
      <CardContent className="p-4 relative z-10 h-full flex flex-col" onClick={onClick}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {icon ? (
              <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                {name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm line-clamp-1">
                {name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <Badge className={`text-xs border ${categoryColor}`} variant="outline">
                  {category.split(' ')[0]}
                </Badge>
                {isPremium && (
                  <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    <Crown className="w-3 h-3" />
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {url && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink className="w-4 h-4 text-blue-500" />
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs mb-3 line-clamp-2 flex-1">{description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
              </div>
            )}
            {userCount && (
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{userCount}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-xs">
            <Zap className="w-3 h-3 text-green-500" />
            <span className="font-medium text-green-600">{pricing}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
