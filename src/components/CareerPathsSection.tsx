
import { Code, Database, Palette, Smartphone, Settings, Brain, Shield, Cloud, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CourseCard from './CourseCard';

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  image: string;
  description: string;
}

interface CareerPath {
  id: string;
  title: string;
  description: string;
  avgSalary: string;
  icon: React.ReactNode;
  gradient: string;
  courses: Course[];
}

const careerPaths: CareerPath[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Build dynamic websites and web applications using modern frameworks and technologies. Master both frontend and backend development.',
    avgSalary: '$75,000 - $120,000',
    icon: <Code className="w-6 h-6" />,
    gradient: 'from-blue-500 to-cyan-600',
    courses: [
      {
        id: 101,
        title: 'Complete Web Development Bootcamp',
        instructor: 'Sarah Johnson',
        category: 'Web Development',
        level: 'Beginner',
        duration: '50 hours',
        students: 25000,
        rating: 4.8,
        price: 89.99,
        image: '/placeholder.svg',
        description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch'
      },
      {
        id: 102,
        title: 'React Advanced Patterns',
        instructor: 'Michael Chen',
        category: 'Web Development',
        level: 'Advanced',
        duration: '35 hours',
        students: 12000,
        rating: 4.9,
        price: 129.99,
        image: '/placeholder.svg',
        description: 'Master advanced React patterns and performance optimization'
      },
      {
        id: 103,
        title: 'Node.js Backend Mastery',
        instructor: 'David Rodriguez',
        category: 'Web Development',
        level: 'Intermediate',
        duration: '40 hours',
        students: 18000,
        rating: 4.7,
        price: 99.99,
        image: '/placeholder.svg',
        description: 'Build scalable backend applications with Node.js and Express'
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Extract insights from data using statistical analysis, machine learning, and visualization tools to drive business decisions.',
    avgSalary: '$85,000 - $150,000',
    icon: <Database className="w-6 h-6" />,
    gradient: 'from-purple-500 to-pink-600',
    courses: [
      {
        id: 201,
        title: 'Python for Data Science',
        instructor: 'Dr. Emily Watson',
        category: 'Data Science',
        level: 'Beginner',
        duration: '45 hours',
        students: 22000,
        rating: 4.8,
        price: 79.99,
        image: '/placeholder.svg',
        description: 'Learn Python, pandas, NumPy, and matplotlib for data analysis'
      },
      {
        id: 202,
        title: 'Machine Learning A-Z',
        instructor: 'Prof. James Liu',
        category: 'Data Science',
        level: 'Intermediate',
        duration: '60 hours',
        students: 15000,
        rating: 4.9,
        price: 149.99,
        image: '/placeholder.svg',
        description: 'Complete machine learning course with hands-on projects'
      },
      {
        id: 203,
        title: 'Data Visualization with Tableau',
        instructor: 'Anna Parker',
        category: 'Data Science',
        level: 'Beginner',
        duration: '25 hours',
        students: 11000,
        rating: 4.6,
        price: 69.99,
        image: '/placeholder.svg',
        description: 'Create stunning data visualizations and dashboards'
      }
    ]
  },
  {
    id: 'ux-ui-design',
    title: 'UX/UI Design',
    description: 'Design user-centered digital experiences that are both beautiful and functional, focusing on user research and interface design.',
    avgSalary: '$70,000 - $110,000',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-pink-500 to-rose-600',
    courses: [
      {
        id: 301,
        title: 'UX Design Fundamentals',
        instructor: 'Lisa Thompson',
        category: 'Design',
        level: 'Beginner',
        duration: '30 hours',
        students: 18000,
        rating: 4.7,
        price: 89.99,
        image: '/placeholder.svg',
        description: 'Learn user research, wireframing, and prototyping'
      },
      {
        id: 302,
        title: 'UI Design with Figma',
        instructor: 'Marcus Brown',
        category: 'Design',
        level: 'Intermediate',
        duration: '35 hours',
        students: 14000,
        rating: 4.8,
        price: 99.99,
        image: '/placeholder.svg',
        description: 'Master Figma for professional UI design and prototyping'
      },
      {
        id: 303,
        title: 'Design Systems & Component Libraries',
        instructor: 'Rachel Green',
        category: 'Design',
        level: 'Advanced',
        duration: '28 hours',
        students: 8000,
        rating: 4.9,
        price: 119.99,
        image: '/placeholder.svg',
        description: 'Build scalable design systems for large applications'
      }
    ]
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    description: 'Create native and cross-platform mobile applications for iOS and Android using modern development frameworks.',
    avgSalary: '$80,000 - $130,000',
    icon: <Smartphone className="w-6 h-6" />,
    gradient: 'from-green-500 to-teal-600',
    courses: [
      {
        id: 401,
        title: 'React Native Complete Course',
        instructor: 'Alex Kim',
        category: 'Mobile Development',
        level: 'Intermediate',
        duration: '42 hours',
        students: 16000,
        rating: 4.7,
        price: 109.99,
        image: '/placeholder.svg',
        description: 'Build cross-platform mobile apps with React Native'
      },
      {
        id: 402,
        title: 'iOS Development with Swift',
        instructor: 'Jennifer Lopez',
        category: 'Mobile Development',
        level: 'Beginner',
        duration: '55 hours',
        students: 12000,
        rating: 4.8,
        price: 129.99,
        image: '/placeholder.svg',
        description: 'Learn iOS app development from scratch using Swift'
      },
      {
        id: 403,
        title: 'Flutter & Dart Masterclass',
        instructor: 'Raj Patel',
        category: 'Mobile Development',
        level: 'Intermediate',
        duration: '48 hours',
        students: 10000,
        rating: 4.6,
        price: 99.99,
        image: '/placeholder.svg',
        description: 'Create beautiful mobile apps with Flutter framework'
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps',
    description: 'Bridge development and operations by automating deployment processes, managing infrastructure, and ensuring system reliability.',
    avgSalary: '$95,000 - $160,000',
    icon: <Settings className="w-6 h-6" />,
    gradient: 'from-orange-500 to-red-600',
    courses: [
      {
        id: 501,
        title: 'Docker & Kubernetes Essentials',
        instructor: 'Mark Wilson',
        category: 'DevOps',
        level: 'Intermediate',
        duration: '38 hours',
        students: 14000,
        rating: 4.8,
        price: 119.99,
        image: '/placeholder.svg',
        description: 'Master containerization and orchestration technologies'
      },
      {
        id: 502,
        title: 'AWS Cloud Practitioner',
        instructor: 'Sandra Davis',
        category: 'DevOps',
        level: 'Beginner',
        duration: '32 hours',
        students: 20000,
        rating: 4.7,
        price: 89.99,
        image: '/placeholder.svg',
        description: 'Learn AWS fundamentals and cloud computing concepts'
      },
      {
        id: 503,
        title: 'CI/CD Pipeline Automation',
        instructor: 'Chris Taylor',
        category: 'DevOps',
        level: 'Advanced',
        duration: '35 hours',
        students: 9000,
        rating: 4.9,
        price: 139.99,
        image: '/placeholder.svg',
        description: 'Automate software delivery with Jenkins, GitLab CI, and more'
      }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description: 'Develop intelligent systems that can learn and make predictions from data using advanced algorithms and neural networks.',
    avgSalary: '$100,000 - $180,000',
    icon: <Brain className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-purple-600',
    courses: [
      {
        id: 601,
        title: 'Deep Learning with TensorFlow',
        instructor: 'Dr. Kevin Zhang',
        category: 'Machine Learning',
        level: 'Advanced',
        duration: '65 hours',
        students: 11000,
        rating: 4.9,
        price: 179.99,
        image: '/placeholder.svg',
        description: 'Master deep learning and neural networks with TensorFlow'
      },
      {
        id: 602,
        title: 'Natural Language Processing',
        instructor: 'Dr. Maria Garcia',
        category: 'Machine Learning',
        level: 'Intermediate',
        duration: '45 hours',
        students: 8000,
        rating: 4.8,
        price: 149.99,
        image: '/placeholder.svg',
        description: 'Build AI systems that understand and process human language'
      },
      {
        id: 603,
        title: 'Computer Vision Fundamentals',
        instructor: 'Robert Johnson',
        category: 'Machine Learning',
        level: 'Intermediate',
        duration: '40 hours',
        students: 7500,
        rating: 4.7,
        price: 129.99,
        image: '/placeholder.svg',
        description: 'Learn image processing and computer vision techniques'
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protect organizations from digital threats by implementing security measures, conducting risk assessments, and responding to incidents.',
    avgSalary: '$90,000 - $150,000',
    icon: <Shield className="w-6 h-6" />,
    gradient: 'from-red-500 to-orange-600',
    courses: [
      {
        id: 701,
        title: 'Ethical Hacking & Penetration Testing',
        instructor: 'Jake Miller',
        category: 'Cybersecurity',
        level: 'Intermediate',
        duration: '50 hours',
        students: 13000,
        rating: 4.8,
        price: 139.99,
        image: '/placeholder.svg',
        description: 'Learn to think like a hacker to better defend systems'
      },
      {
        id: 702,
        title: 'Network Security Fundamentals',
        instructor: 'Laura White',
        category: 'Cybersecurity',
        level: 'Beginner',
        duration: '35 hours',
        students: 15000,
        rating: 4.6,
        price: 99.99,
        image: '/placeholder.svg',
        description: 'Secure networks and understand common attack vectors'
      },
      {
        id: 703,
        title: 'Incident Response & Forensics',
        instructor: 'Tom Anderson',
        category: 'Cybersecurity',
        level: 'Advanced',
        duration: '42 hours',
        students: 6000,
        rating: 4.9,
        price: 159.99,
        image: '/placeholder.svg',
        description: 'Investigate security incidents and perform digital forensics'
      }
    ]
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    description: 'Design and manage scalable cloud infrastructure, leveraging services from AWS, Azure, and Google Cloud Platform.',
    avgSalary: '$85,000 - $145,000',
    icon: <Cloud className="w-6 h-6" />,
    gradient: 'from-cyan-500 to-blue-600',
    courses: [
      {
        id: 801,
        title: 'AWS Solutions Architect',
        instructor: 'Brian Lee',
        category: 'Cloud Computing',
        level: 'Intermediate',
        duration: '55 hours',
        students: 17000,
        rating: 4.8,
        price: 149.99,
        image: '/placeholder.svg',
        description: 'Design and deploy scalable AWS cloud solutions'
      },
      {
        id: 802,
        title: 'Azure Fundamentals',
        instructor: 'Michelle Carter',
        category: 'Cloud Computing',
        level: 'Beginner',
        duration: '30 hours',
        students: 12000,
        rating: 4.7,
        price: 89.99,
        image: '/placeholder.svg',
        description: 'Get started with Microsoft Azure cloud services'
      },
      {
        id: 803,
        title: 'Google Cloud Platform Essentials',
        instructor: 'Daniel Kim',
        category: 'Cloud Computing',
        level: 'Beginner',
        duration: '32 hours',
        students: 9000,
        rating: 4.6,
        price: 79.99,
        image: '/placeholder.svg',
        description: 'Learn GCP services and cloud architecture principles'
      }
    ]
  }
];

export default function CareerPathsSection() {
  const USD_TO_NPR_RATE = 133;

  const formatSalaryInNPR = (salaryRange: string) => {
    const numbers = salaryRange.match(/\d+,\d+/g);
    if (numbers && numbers.length >= 2) {
      const minUSD = parseInt(numbers[0].replace(',', ''));
      const maxUSD = parseInt(numbers[1].replace(',', ''));
      const minNPR = Math.round(minUSD * USD_TO_NPR_RATE).toLocaleString('en-IN');
      const maxNPR = Math.round(maxUSD * USD_TO_NPR_RATE).toLocaleString('en-IN');
      return `NPR ${minNPR} - ${maxNPR}`;
    }
    return '';
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Career Paths
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your future in tech. Each career path includes curated courses, salary insights, and a clear roadmap to success.
          </p>
        </div>

        <div className="space-y-16">
          {careerPaths.map((path, index) => (
            <div key={path.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="overflow-hidden border-0 shadow-xl bg-white">
                <CardHeader className={`bg-gradient-to-r ${path.gradient} text-white p-8`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                      {path.icon}
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold mb-2">{path.title}</CardTitle>
                      <p className="text-white/90 text-lg leading-relaxed max-w-4xl">
                        {path.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <p className="text-white/80 text-sm font-medium mb-1">Average Salary (USD)</p>
                      <p className="text-2xl font-bold">{path.avgSalary}</p>
                      <p className="text-white/80 text-sm mt-1">{formatSalaryInNPR(path.avgSalary)}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                    >
                      View All Courses
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-6">Featured Courses</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {path.courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white border-0 p-8">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Choose your career path and begin with our expertly crafted learning roadmap. Join thousands of successful professionals who started their journey with SkillSphere.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Personalized Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
