
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SectionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  onClick?: () => void;
}

export default function SectionCard({ title, description, icon, gradient, onClick }: SectionCardProps) {
  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 ${gradient} text-white overflow-hidden relative`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-white/90 leading-relaxed">{description}</p>
        <div className="mt-4 flex items-center text-white/80 group-hover:text-white transition-colors">
          <span className="text-sm font-medium">Explore</span>
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
