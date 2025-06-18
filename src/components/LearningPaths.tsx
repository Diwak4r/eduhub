
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Users, Star, Award, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  courses: number;
  enrolled: number;
  rating: number;
  skills: string[];
  progress?: number;
  category: string;
  icon: React.ReactNode;
}

const learningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    description: 'Master frontend and backend development with modern technologies',
    level: 'Beginner',
    duration: '6-8 months',
    courses: 12,
    enrolled: 15420,
    rating: 4.8,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    progress: 25,
    category: 'Web Development',
    icon: <BookOpen className="w-6 h-6 text-blue-500" />
  },
  {
    id: '2',
    title: 'AI & Machine Learning Engineer',
    description: 'Comprehensive path to become an AI/ML engineer from scratch',
    level: 'Intermediate',
    duration: '8-10 months',
    courses: 15,
    enrolled: 8950,
    rating: 4.9,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science', 'Deep Learning'],
    progress: 0,
    category: 'Artificial Intelligence',
    icon: <Star className="w-6 h-6 text-purple-500" />
  },
  {
    id: '3',
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile apps with React Native and Flutter',
    level: 'Intermediate',
    duration: '4-6 months',
    courses: 10,
    enrolled: 12300,
    rating: 4.7,
    skills: ['React Native', 'Flutter', 'Dart', 'Mobile UI/UX', 'App Store'],
    progress: 60,
    category: 'Mobile Development',
    icon: <Award className="w-6 h-6 text-green-500" />
  },
  {
    id: '4',
    title: 'DevOps & Cloud Engineering',
    description: 'Learn infrastructure, deployment, and cloud technologies',
    level: 'Advanced',
    duration: '5-7 months',
    courses: 14,
    enrolled: 6780,
    rating: 4.6,
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
    progress: 0,
    category: 'DevOps',
    icon: <BookOpen className="w-6 h-6 text-orange-500" />
  },
  {
    id: '5',
    title: 'Data Science & Analytics',
    description: 'Master data analysis, visualization, and statistical modeling',
    level: 'Beginner',
    duration: '6-8 months',
    courses: 13,
    enrolled: 11200,
    rating: 4.8,
    skills: ['Python', 'R', 'SQL', 'Tableau', 'Statistics'],
    progress: 40,
    category: 'Data Science',
    icon: <Star className="w-6 h-6 text-cyan-500" />
  },
  {
    id: '6',
    title: 'Cybersecurity Specialist',
    description: 'Comprehensive cybersecurity training and ethical hacking',
    level: 'Advanced',
    duration: '7-9 months',
    courses: 16,
    enrolled: 5430,
    rating: 4.7,
    skills: ['Network Security', 'Penetration Testing', 'Cryptography', 'CISSP', 'Ethical Hacking'],
    progress: 0,
    category: 'Cybersecurity',
    icon: <Award className="w-6 h-6 text-red-500" />
  }
];

export default function LearningPaths() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredPaths = selectedLevel === 'all' 
    ? learningPaths 
    : learningPaths.filter(path => path.level === selectedLevel);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Learning Paths
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          Structured learning journeys to master new skills
        </p>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-8">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <Button
              key={level}
              variant={selectedLevel === level ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel(level)}
              className={selectedLevel === level ? "bg-gradient-to-r from-blue-500 to-purple-600" : ""}
            >
              {level === 'all' ? 'All Levels' : level}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path) => (
          <Card key={path.id} className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white border-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                  {path.icon}
                </div>
                <Badge className={`${getLevelColor(path.level)} border-0`}>
                  {path.level}
                </Badge>
              </div>
              
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                {path.title}
              </CardTitle>
              <p className="text-gray-600 text-sm">{path.description}</p>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10">
              {path.progress !== undefined && path.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-blue-600">{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{path.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{path.courses} courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{path.enrolled.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-600">{path.rating}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Skills you'll learn:</p>
                <div className="flex flex-wrap gap-1">
                  {path.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {path.skills.length > 3 && (
                    <span className="text-xs text-gray-500">+{path.skills.length - 3} more</span>
                  )}
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                {path.progress && path.progress > 0 ? 'Continue Learning' : 'Start Path'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
