
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, MessageSquare, Brain, TrendingUp, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsSection from './NewsSection';
import DailyQuote from './DailyQuote';

export default function Dashboard() {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Browse Courses',
      description: 'Explore free courses from top platforms',
      icon: <BookOpen className="w-6 h-6" />,
      href: '/courses',
      color: 'bg-blue-500',
    },
    {
      title: 'Learning Resources',
      description: 'Curated materials and tutorials',
      icon: <Brain className="w-6 h-6" />,
      href: '/resources',
      color: 'bg-green-500',
    },
    {
      title: 'AI Tools',
      description: 'Discover useful AI-powered tools',
      icon: <TrendingUp className="w-6 h-6" />,
      href: '/ai-tools',
      color: 'bg-purple-500',
    },
    {
      title: 'Chat Assistant',
      description: 'Get help from our AI assistant',
      icon: <MessageSquare className="w-6 h-6" />,
      href: '/chat',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="opacity-90">{user?.email}</p>
          </div>
        </div>
        <p className="text-lg opacity-90">
          Continue your learning journey with our curated free resources
        </p>
      </div>

      {/* Daily Quote */}
      <DailyQuote />

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${action.color} text-white rounded-lg flex items-center justify-center mb-4`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats and News */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <NewsSection />
        </div>
        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Learning Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Courses Explored</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Resources Saved</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Days Active</span>
                  <span className="font-semibold">5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
