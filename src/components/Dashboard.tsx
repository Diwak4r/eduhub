
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, MessageSquare, Brain, TrendingUp, User, Calendar, Bookmark, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DailyQuote from './DailyQuote';
import GitHubTrending from './GitHubTrending';
import { ErrorBoundary } from './ErrorBoundary';
import River3D from './River3D';
import LearningPaths from './LearningPaths';
import ProgressTracking from './ProgressTracking';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  console.log('Dashboard rendering for guest user');

  const quickActions = [
    {
      title: 'Browse Courses',
      description: 'Explore 200+ courses from top platforms',
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

  const dashboardSections = [
    { id: 'overview', label: 'Overview', icon: <Calendar className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress', icon: <Target className="w-4 h-4" /> },
    { id: 'paths', label: 'Learning Paths', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'progress':
        return <ProgressTracking />;
      case 'paths':
        return <LearningPaths />;
      default:
        return (
          <div className="space-y-8">
            {/* Daily Quote */}
            <ErrorBoundary>
              <DailyQuote />
            </ErrorBoundary>

            {/* Stats and Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ErrorBoundary>
                  <GitHubTrending />
                </ErrorBoundary>
              </div>
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      Platform Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Courses</span>
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
                        <span className="text-sm text-slate-600">Learning Paths</span>
                        <span className="font-semibold text-emerald-600">25+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section with 3D River Background */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white rounded-2xl overflow-hidden shadow-2xl">
        <River3D />
        <div className="relative z-10 p-12 text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-white to-purple-300 bg-clip-text text-transparent">
              RiverSkills
            </h1>
            <p className="text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Where Knowledge Flows Like a River - Unlimited Learning Opportunities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className={`w-12 h-12 ${action.color} ${action.hoverColor} text-white rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-white">{action.title}</h3>
                  <p className="text-sm text-blue-100">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="flex justify-center">
        <div className="bg-white rounded-full p-2 shadow-lg border">
          <div className="flex gap-2">
            {dashboardSections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 ${
                  activeSection === section.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {section.icon}
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Content */}
      {renderActiveSection()}
    </div>
  );
}
