
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Clock, Star } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  instructor: string;
  level: string;
  duration: string;
  rating: number;
  price: number;
}

interface CareerPath {
  id: string;
  title: string;
  description: string;
  averageSalaryUSD: string;
  averageSalaryNPR: string;
  courses: Course[];
  skills: string[];
  jobTitles: string[];
}

const careerPaths: CareerPath[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Build responsive websites and web applications using modern frameworks and technologies. Perfect for creative problem-solvers who enjoy bringing ideas to life through code.',
    averageSalaryUSD: '$75,000 - $120,000',
    averageSalaryNPR: 'NPR 10,000,000 - 15,960,000',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Git'],
    jobTitles: ['Frontend Developer', 'Full Stack Developer', 'Web Developer'],
    courses: [
      {
        id: 1,
        title: 'Complete React Development Course',
        instructor: 'Sarah Johnson',
        level: 'Intermediate',
        duration: '40 hours',
        rating: 4.8,
        price: 89.99
      },
      {
        id: 7,
        title: 'HTML & CSS Fundamentals',
        instructor: 'John Martinez',
        level: 'Beginner',
        duration: '25 hours',
        rating: 4.5,
        price: 0
      },
      {
        id: 8,
        title: 'JavaScript Essentials',
        instructor: 'Emma Davis',
        level: 'Beginner',
        duration: '30 hours',
        rating: 4.6,
        price: 0
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Extract insights from data using statistical analysis, machine learning, and visualization tools. Ideal for analytical minds who love discovering patterns and solving complex problems.',
    averageSalaryUSD: '$85,000 - $140,000',
    averageSalaryNPR: 'NPR 11,305,000 - 18,620,000',
    skills: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization'],
    jobTitles: ['Data Scientist', 'Data Analyst', 'Business Intelligence Analyst'],
    courses: [
      {
        id: 2,
        title: 'Python for Data Science',
        instructor: 'Dr. Michael Chen',
        level: 'Beginner',
        duration: '35 hours',
        rating: 4.7,
        price: 79.99
      },
      {
        id: 10,
        title: 'Introduction to Data Analysis',
        instructor: 'Rachel Green',
        level: 'Beginner',
        duration: '20 hours',
        rating: 4.7,
        price: 39.99
      }
    ]
  },
  {
    id: 'ux-ui-design',
    title: 'UX/UI Design',
    description: 'Create intuitive and beautiful user experiences for digital products. Perfect for creative individuals who understand user psychology and design principles.',
    averageSalaryUSD: '$70,000 - $110,000',
    averageSalaryNPR: 'NPR 9,310,000 - 14,630,000',
    skills: ['User Research', 'Prototyping', 'Figma', 'Adobe Creative Suite', 'Design Systems'],
    jobTitles: ['UX Designer', 'UI Designer', 'Product Designer'],
    courses: [
      {
        id: 4,
        title: 'UI/UX Design Masterclass',
        instructor: 'Alex Thompson',
        level: 'Intermediate',
        duration: '45 hours',
        rating: 4.6,
        price: 94.99
      }
    ]
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    description: 'Build native and cross-platform mobile applications for iOS and Android. Great for developers who want to create apps that reach millions of users worldwide.',
    averageSalaryUSD: '$80,000 - $125,000',
    averageSalaryNPR: 'NPR 10,640,000 - 16,625,000',
    skills: ['Swift', 'Kotlin', 'Flutter', 'React Native', 'Mobile UI/UX'],
    jobTitles: ['iOS Developer', 'Android Developer', 'Mobile App Developer'],
    courses: [
      {
        id: 5,
        title: 'Mobile App Development with Flutter',
        instructor: 'David Kim',
        level: 'Beginner',
        duration: '50 hours',
        rating: 4.7,
        price: 99.99
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps',
    description: 'Bridge the gap between development and operations teams by automating processes and managing infrastructure. Perfect for those who love system optimization and automation.',
    averageSalaryUSD: '$90,000 - $135,000',
    averageSalaryNPR: 'NPR 11,970,000 - 17,955,000',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Git'],
    jobTitles: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer'],
    courses: [
      {
        id: 9,
        title: 'Git Version Control',
        instructor: 'Tom Wilson',
        level: 'Beginner',
        duration: '15 hours',
        rating: 4.4,
        price: 29.99
      }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description: 'Develop intelligent systems that can learn and make decisions from data. Ideal for mathematically-inclined individuals who want to work on cutting-edge AI technologies.',
    averageSalaryUSD: '$95,000 - $150,000',
    averageSalaryNPR: 'NPR 12,635,000 - 19,950,000',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Statistics', 'Deep Learning'],
    jobTitles: ['ML Engineer', 'AI Researcher', 'Data Scientist'],
    courses: [
      {
        id: 3,
        title: 'Advanced Machine Learning',
        instructor: 'Prof. Emily Rodriguez',
        level: 'Advanced',
        duration: '60 hours',
        rating: 4.9,
        price: 129.99
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protect organizations from digital threats and ensure data security. Perfect for detail-oriented individuals who enjoy staying ahead of emerging security challenges.',
    averageSalaryUSD: '$85,000 - $130,000',
    averageSalaryNPR: 'NPR 11,305,000 - 17,290,000',
    skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Compliance', 'Incident Response'],
    jobTitles: ['Security Analyst', 'Cybersecurity Specialist', 'Information Security Manager'],
    courses: []
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    description: 'Design and manage scalable cloud infrastructure and services. Great for those who want to work with cutting-edge technology that powers modern applications.',
    averageSalaryUSD: '$88,000 - $140,000',
    averageSalaryNPR: 'NPR 11,704,000 - 18,620,000',
    skills: ['AWS', 'Azure', 'GCP', 'Serverless', 'Microservices'],
    jobTitles: ['Cloud Architect', 'Cloud Engineer', 'Solutions Architect'],
    courses: [
      {
        id: 6,
        title: 'Cloud Infrastructure with AWS',
        instructor: 'Lisa Wang',
        level: 'Intermediate',
        duration: '38 hours',
        rating: 4.8,
        price: 109.99
      }
    ]
  }
];

export default function CareerPathsSection() {
  const formatPrice = (price: number) => {
    if (price === 0) return 'FREE';
    return `$${price}`;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Career Paths
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different tech career paths and discover the skills you need to succeed. 
            Each path includes curated courses to help you reach your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {careerPaths.map((path) => (
            <Card key={path.id} className="group hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {path.title}
                  </CardTitle>
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {path.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Salary Information */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Average Salary
                  </h4>
                  <div className="space-y-1">
                    <p className="text-green-700 font-bold text-lg">{path.averageSalaryUSD}</p>
                    <p className="text-green-600 text-sm">{path.averageSalaryNPR}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Job Titles */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Common Job Titles</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.jobTitles.map((title) => (
                      <Badge key={title} variant="outline" className="border-blue-300 text-blue-700">
                        {title}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Courses */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Recommended Courses ({path.courses.length})
                  </h4>
                  {path.courses.length > 0 ? (
                    <div className="space-y-3">
                      {path.courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-gray-800 hover:text-purple-600 cursor-pointer">
                              {course.title}
                            </h5>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                                {course.level}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4 text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{course.rating}</span>
                              </div>
                            </div>
                            <div className="font-bold text-green-600">
                              {formatPrice(course.price)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm bg-gray-50 rounded-lg p-3">
                      Courses for this career path are coming soon! Check back later for curated learning resources.
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white">
                    Start Your {path.title} Journey
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
