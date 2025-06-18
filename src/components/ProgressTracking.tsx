
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, Calendar, Award, BookOpen, Clock, CheckCircle, Trophy } from 'lucide-react';

interface LearningProgress {
  coursesCompleted: number;
  totalCoursesStarted: number;
  hoursLearned: number;
  streak: number;
  skillsLearned: string[];
  certificates: number;
  lastActivity: Date;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate?: Date;
  progress?: number;
  target?: number;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first course',
    icon: '🎯',
    progress: 1,
    target: 1
  },
  {
    id: '2',
    title: 'Learning Streak',
    description: 'Learn for 7 days in a row',
    icon: '🔥',
    progress: 3,
    target: 7
  },
  {
    id: '3',
    title: 'Course Collector',
    description: 'Complete 10 courses',
    icon: '📚',
    progress: 2,
    target: 10
  },
  {
    id: '4',
    title: 'Time Master',
    description: 'Log 50 hours of learning',
    icon: '⏰',
    progress: 15,
    target: 50
  },
  {
    id: '5',
    title: 'Skill Builder',
    description: 'Learn 5 different skills',
    icon: '🛠️',
    progress: 3,
    target: 5
  },
  {
    id: '6',
    title: 'Certificate Collector',
    description: 'Earn 5 certificates',
    icon: '🏆',
    progress: 2,
    target: 5
  }
];

export default function ProgressTracking() {
  const [progress, setProgress] = useState<LearningProgress>({
    coursesCompleted: 2,
    totalCoursesStarted: 5,
    hoursLearned: 15.5,
    streak: 3,
    skillsLearned: ['React', 'JavaScript', 'Node.js'],
    certificates: 2,
    lastActivity: new Date(),
    weeklyGoal: 10,
    weeklyProgress: 6.5
  });

  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);

  const completionRate = Math.round((progress.coursesCompleted / progress.totalCoursesStarted) * 100);
  const weeklyProgressPercent = Math.round((progress.weeklyProgress / progress.weeklyGoal) * 100);

  const updateWeeklyGoal = (newGoal: number) => {
    setProgress(prev => ({ ...prev, weeklyGoal: newGoal }));
  };

  const getAchievementStatus = (achievement: Achievement) => {
    if (!achievement.progress || !achievement.target) return 'locked';
    return achievement.progress >= achievement.target ? 'unlocked' : 'in-progress';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Learning Progress
        </h2>
        <p className="text-xl text-gray-600">Track your learning journey and achievements</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Courses Completed</p>
                <p className="text-3xl font-bold">{progress.coursesCompleted}</p>
                <p className="text-blue-100 text-sm">of {progress.totalCoursesStarted} started</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Hours Learned</p>
                <p className="text-3xl font-bold">{progress.hoursLearned}</p>
                <p className="text-green-100 text-sm">total time</p>
              </div>
              <Clock className="w-12 h-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Learning Streak</p>
                <p className="text-3xl font-bold">{progress.streak}</p>
                <p className="text-orange-100 text-sm">days in a row</p>
              </div>
              <TrendingUp className="w-12 h-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Certificates</p>
                <p className="text-3xl font-bold">{progress.certificates}</p>
                <p className="text-purple-100 text-sm">earned</p>
              </div>
              <Award className="w-12 h-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Completion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Course Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-bold text-2xl text-blue-600">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-sm text-gray-500">
              You've completed {progress.coursesCompleted} out of {progress.totalCoursesStarted} courses
            </p>
          </CardContent>
        </Card>

        {/* Weekly Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Weekly Learning Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">This Week</span>
              <span className="font-bold text-2xl text-green-600">
                {progress.weeklyProgress}h / {progress.weeklyGoal}h
              </span>
            </div>
            <Progress value={weeklyProgressPercent} className="h-3" />
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((hours) => (
                <Button
                  key={hours}
                  variant={progress.weeklyGoal === hours ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateWeeklyGoal(hours)}
                >
                  {hours}h
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Learned */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-purple-600" />
            Skills Learned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {progress.skillsLearned.map((skill, index) => (
              <Badge key={index} className="bg-purple-100 text-purple-700 px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            You've learned {progress.skillsLearned.length} skills so far. Keep going!
          </p>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userAchievements.map((achievement) => {
              const status = getAchievementStatus(achievement);
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    status === 'unlocked'
                      ? 'border-yellow-300 bg-yellow-50'
                      : status === 'in-progress'
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  
                  {achievement.progress !== undefined && achievement.target && (
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">
                          {achievement.progress}/{achievement.target}
                        </span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.target) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                  
                  {status === 'unlocked' && (
                    <Badge className="mt-2 bg-yellow-500 text-white">
                      <Trophy className="w-3 h-3 mr-1" />
                      Unlocked!
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
