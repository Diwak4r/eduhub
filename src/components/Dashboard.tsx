
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, MessageSquare, Brain, TrendingUp, User, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import NewsSection from './NewsSection';
import DailyQuote from './DailyQuote';
import Dashboard3D from './Dashboard3D';
import GitHubTrending from './GitHubTrending';
import { ErrorBoundary } from './ErrorBoundary';

export default function Dashboard() {
  const navigate = useNavigate();

  console.log('Dashboard rendering for guest user');

  const quickActions = [
    {
      title: 'Browse Courses',
      description: 'Explore 200+ free courses from top platforms',
      icon: <BookOpen className="w-6 h-6" />,
      href: '/courses',
      color: 'bg-emerald-600',
      hoverColor: 'hover:bg-emerald-700',
    },
    {
      title: 'Learning Resources',
      description: 'Curated materials in English, Hindi & Nepali',
      icon: <Brain className="w-6 h-6" />,
      href: '/resources',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
    },
    {
      title: 'AI Tools',
      description: 'Discover 50+ AI-powered learning tools',
      icon: <TrendingUp className="w-6 h-6" />,
      href: '/ai-tools',
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
    },
    {
      title: 'Chat with Diwa',
      description: 'Get help from our intelligent assistant',
      icon: <MessageSquare className="w-6 h-6" />,
      href: '/chat',
      color: 'bg-rose-600',
      hoverColor: 'hover:bg-rose-700',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome to RiverSkills!</h1>
            <p className="opacity-90">Free Learning Platform</p>
          </div>
        </div>
        <p className="text-lg opacity-90">
          Start your learning journey with our curated free resources created by Diwakar Yadav
        </p>
      </div>

      {/* 3D Interactive Dashboard */}
      <ErrorBoundary fallback={
        <Card className="bg-gradient-to-br from-slate-100 to-purple-100 border-slate-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-2 text-slate-800">Interactive Dashboard</h3>
            <p className="text-slate-600">3D Dashboard temporarily unavailable</p>
          </CardContent>
        </Card>
      }>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Interactive Dashboard</h2>
          <Dashboard3D onNavigate={navigate} />
        </div>
      </ErrorBoundary>

      {/* Daily Quote */}
      <ErrorBoundary>
        <DailyQuote />
      </ErrorBoundary>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-slate-200 group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${action.color} ${action.hoverColor} text-white rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-800">{action.title}</h3>
                  <p className="text-sm text-slate-600">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ErrorBoundary>
            <NewsSection />
          </ErrorBoundary>
          <ErrorBoundary>
            <GitHubTrending />
          </ErrorBoundary>
        </div>
        <div className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Platform Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Free Courses</span>
                  <span className="font-semibold text-slate-800">200+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">AI Tools</span>
                  <span className="font-semibold text-slate-800">50+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Languages</span>
                  <span className="font-semibold text-slate-800">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Resources</span>
                  <span className="font-semibold text-emerald-600">Free Forever</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
