import { useState } from 'react';
import { Search, MapPin, DollarSign, TrendingUp, BookOpen, Users, ChevronRight, Star, Building, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import FeaturedCoursesSection from '@/components/FeaturedCoursesSection';
import FreeAffordableSection from '@/components/FreeAffordableSection';
import CareerPathsSection from '@/components/CareerPathsSection';

const categories = [
  'All Categories',
  'Web Development',
  'Data Science',
  'Mobile Development',
  'DevOps',
  'UI/UX Design',
  'Machine Learning',
  'Cybersecurity',
  'Cloud Computing'
];

const skillLevels = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
];

const priceRanges = [
  'All Prices',
  'Free',
  'Under $50',
  'Under $100',
  '$100+'
];

const courses = [
  {
    id: 1,
    title: 'Complete React Development Course',
    instructor: 'Sarah Johnson',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '40 hours',
    students: 12543,
    rating: 4.8,
    price: 89.99,
    image: '/placeholder.svg',
    description: 'Master React with hooks, context, and modern development practices'
  },
  {
    id: 2,
    title: 'Python for Data Science',
    instructor: 'Dr. Michael Chen',
    category: 'Data Science',
    level: 'Beginner',
    duration: '35 hours',
    students: 8921,
    rating: 4.7,
    price: 79.99,
    image: '/placeholder.svg',
    description: 'Learn Python programming and data analysis from scratch'
  },
  {
    id: 3,
    title: 'Advanced Machine Learning',
    instructor: 'Prof. Emily Rodriguez',
    category: 'Machine Learning',
    level: 'Advanced',
    duration: '60 hours',
    students: 3456,
    rating: 4.9,
    price: 129.99,
    image: '/placeholder.svg',
    description: 'Deep dive into ML algorithms and neural networks'
  },
  {
    id: 4,
    title: 'UI/UX Design Masterclass',
    instructor: 'Alex Thompson',
    category: 'UI/UX Design',
    level: 'Intermediate',
    duration: '45 hours',
    students: 6789,
    rating: 4.6,
    price: 94.99,
    image: '/placeholder.svg',
    description: 'Create beautiful and user-friendly digital experiences'
  },
  {
    id: 5,
    title: 'Mobile App Development with Flutter',
    instructor: 'David Kim',
    category: 'Mobile Development',
    level: 'Beginner',
    duration: '50 hours',
    students: 4321,
    rating: 4.7,
    price: 99.99,
    image: '/placeholder.svg',
    description: 'Build cross-platform mobile apps with Flutter and Dart'
  },
  {
    id: 6,
    title: 'Cloud Infrastructure with AWS',
    instructor: 'Lisa Wang',
    category: 'Cloud Computing',
    level: 'Intermediate',
    duration: '38 hours',
    students: 2876,
    rating: 4.8,
    price: 109.99,
    image: '/placeholder.svg',
    description: 'Master AWS services and cloud architecture patterns'
  },
  {
    id: 7,
    title: 'HTML & CSS Fundamentals',
    instructor: 'John Martinez',
    category: 'Web Development',
    level: 'Beginner',
    duration: '25 hours',
    students: 15623,
    rating: 4.5,
    price: 0,
    image: '/placeholder.svg',
    description: 'Learn the basics of web development with HTML and CSS'
  },
  {
    id: 8,
    title: 'JavaScript Essentials',
    instructor: 'Emma Davis',
    category: 'Web Development',
    level: 'Beginner',
    duration: '30 hours',
    students: 9876,
    rating: 4.6,
    price: 0,
    image: '/placeholder.svg',
    description: 'Master JavaScript fundamentals and DOM manipulation'
  },
  {
    id: 9,
    title: 'Git Version Control',
    instructor: 'Tom Wilson',
    category: 'DevOps',
    level: 'Beginner',
    duration: '15 hours',
    students: 7432,
    rating: 4.4,
    price: 29.99,
    image: '/placeholder.svg',
    description: 'Learn version control with Git and GitHub'
  },
  {
    id: 10,
    title: 'Introduction to Data Analysis',
    instructor: 'Rachel Green',
    category: 'Data Science',
    level: 'Beginner',
    duration: '20 hours',
    students: 5234,
    rating: 4.7,
    price: 39.99,
    image: '/placeholder.svg',
    description: 'Get started with data analysis using Excel and basic statistics'
  }
];

const careerCategories = [
  'All Categories',
  'AI Development & Engineering',
  'Data Science & Analytics',
  'Digital Marketing & Content',
  'Healthcare Technology',
  'Finance & Fintech',
  'Education Technology',
  'Agriculture & Environmental Tech',
  'E-commerce & Retail',
  'Government & Public Services',
  'Creative Industries'
];

const careers = [
  {
    id: 1,
    title: 'AI/ML Engineer',
    alternativeNames: ['Machine Learning Engineer', 'AI Developer', 'ML Developer'],
    category: 'AI Development & Engineering',
    description: 'Design and develop machine learning models and AI systems to solve real-world problems. Work with large datasets to create intelligent applications.',
    responsibilities: [
      'Develop and deploy machine learning models',
      'Process and analyze large datasets',
      'Optimize AI algorithms for performance',
      'Collaborate with cross-functional teams',
      'Maintain and update AI systems'
    ],
    technicalSkills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'SQL', 'Docker', 'Cloud platforms (AWS/GCP)'],
    softSkills: ['Problem-solving', 'Analytical thinking', 'Communication', 'Team collaboration', 'Continuous learning'],
    education: 'Bachelor\'s in Computer Science, Engineering, or related field. Certifications in AI/ML preferred.',
    salaryRange: 'NPR 60,000 - 150,000 per month',
    growthPotential: 'Junior → Senior → Lead → AI Architect → CTO',
    localOpportunities: ['CloudFactory', 'Leapfrog Technology', 'Fusemachines', 'eSewa', 'Khalti'],
    gettingStarted: [
      'Learn Python programming fundamentals',
      'Complete online ML courses (Coursera, edX)',
      'Practice with Kaggle competitions',
      'Build portfolio projects',
      'Get AWS/Google Cloud certifications'
    ]
  },
  {
    id: 2,
    title: 'Data Scientist',
    alternativeNames: ['Data Analyst', 'Business Intelligence Analyst', 'Data Researcher'],
    category: 'Data Science & Analytics',
    description: 'Extract insights from data to drive business decisions. Use statistical methods and machine learning to analyze trends and patterns.',
    responsibilities: [
      'Analyze complex datasets for business insights',
      'Create predictive models and forecasts',
      'Design and maintain data pipelines',
      'Present findings to stakeholders',
      'Collaborate with business teams'
    ],
    technicalSkills: ['Python/R', 'SQL', 'Tableau/Power BI', 'Statistics', 'Excel', 'Jupyter Notebooks', 'Git'],
    softSkills: ['Critical thinking', 'Communication', 'Business acumen', 'Curiosity', 'Attention to detail'],
    education: 'Bachelor\'s in Mathematics, Statistics, Computer Science, or Economics. Advanced degree preferred.',
    salaryRange: 'NPR 50,000 - 120,000 per month',
    growthPotential: 'Junior → Senior → Lead → Chief Data Officer',
    localOpportunities: ['Sastodeal', 'Daraz', 'IME Group', 'NIC Asia Bank', 'Various NGOs'],
    gettingStarted: [
      'Learn statistics and probability',
      'Master Python/R programming',
      'Practice with real datasets',
      'Create data visualization projects',
      'Build a portfolio on GitHub'
    ]
  },
  {
    id: 3,
    title: 'Prompt Engineer',
    alternativeNames: ['AI Prompt Designer', 'Conversational AI Specialist', 'LLM Engineer'],
    category: 'AI Development & Engineering',
    description: 'Design and optimize prompts for AI language models to generate desired outputs. Bridge the gap between human intent and AI understanding.',
    responsibilities: [
      'Design effective prompts for various AI models',
      'Test and optimize prompt performance',
      'Develop prompt templates and guidelines',
      'Train teams on prompt engineering best practices',
      'Monitor and improve AI system outputs'
    ],
    technicalSkills: ['GPT/Claude APIs', 'Python', 'Natural Language Processing', 'API integration', 'Testing frameworks'],
    softSkills: ['Creativity', 'Language skills', 'Patience', 'Systematic thinking', 'User empathy'],
    education: 'Bachelor\'s in Computer Science, Linguistics, or English. AI/NLP courses recommended.',
    salaryRange: 'NPR 40,000 - 100,000 per month',
    growthPotential: 'Junior → Senior → Lead → AI Product Manager',
    localOpportunities: ['Tech startups', 'Digital agencies', 'International remote work', 'Freelance platforms'],
    gettingStarted: [
      'Learn about LLMs and their capabilities',
      'Practice with ChatGPT, Claude, and other models',
      'Study prompt engineering techniques',
      'Build a portfolio of effective prompts',
      'Join AI communities and forums'
    ]
  },
  {
    id: 4,
    title: 'Digital Marketing Analyst',
    alternativeNames: ['Marketing Data Analyst', 'Growth Analyst', 'Performance Marketing Specialist'],
    category: 'Digital Marketing & Content',
    description: 'Analyze digital marketing campaigns and consumer behavior to optimize marketing strategies and ROI.',
    responsibilities: [
      'Analyze marketing campaign performance',
      'Track customer acquisition and retention metrics',
      'Create reports and dashboards',
      'Optimize marketing spend and targeting',
      'Conduct A/B tests and experiments'
    ],
    technicalSkills: ['Google Analytics', 'Facebook Ads Manager', 'SQL', 'Excel/Sheets', 'Tableau', 'Python (basic)'],
    softSkills: ['Analytical thinking', 'Communication', 'Creativity', 'Business acumen', 'Attention to detail'],
    education: 'Bachelor\'s in Marketing, Business, or related field. Digital marketing certifications preferred.',
    salaryRange: 'NPR 35,000 - 85,000 per month',
    growthPotential: 'Junior → Senior → Lead → Marketing Manager → CMO',
    localOpportunities: ['Digital agencies', 'E-commerce companies', 'Startups', 'Traditional businesses going digital'],
    gettingStarted: [
      'Get Google Analytics certification',
      'Learn Facebook/Instagram advertising',
      'Practice with Google Ads',
      'Create personal marketing projects',
      'Join digital marketing communities'
    ]
  },
  {
    id: 5,
    title: 'Health Data Analyst',
    alternativeNames: ['Medical Data Analyst', 'Healthcare Analytics Specialist', 'Clinical Data Analyst'],
    category: 'Healthcare Technology',
    description: 'Analyze healthcare data to improve patient outcomes, reduce costs, and support evidence-based medical decisions.',
    responsibilities: [
      'Analyze patient data and health trends',
      'Create healthcare dashboards and reports',
      'Support clinical research initiatives',
      'Ensure data privacy and compliance',
      'Collaborate with medical professionals'
    ],
    technicalSkills: ['SQL', 'R/Python', 'Healthcare databases', 'Statistical analysis', 'HIPAA compliance', 'Tableau/Power BI'],
    softSkills: ['Attention to detail', 'Ethical reasoning', 'Communication', 'Domain knowledge', 'Problem-solving'],
    education: 'Bachelor\'s in Health Information Management, Statistics, or related field. Healthcare background preferred.',
    salaryRange: 'NPR 45,000 - 100,000 per month',
    growthPotential: 'Junior → Senior → Lead → Healthcare Analytics Manager',
    localOpportunities: ['Hospitals', 'Medical colleges', 'NGOs', 'Government health departments', 'Telemedicine companies'],
    gettingStarted: [
      'Learn healthcare data standards',
      'Understand medical terminology',
      'Practice with healthcare datasets',
      'Get HIPAA training',
      'Network with healthcare professionals'
    ]
  }
];

const localResources = [
  {
    name: 'Kathmandu University',
    type: 'University',
    programs: ['Computer Science', 'AI/ML courses', 'Data Science'],
    location: 'Dhulikhel'
  },
  {
    name: 'Tribhuvan University',
    type: 'University',
    programs: ['IT', 'Computer Applications', 'Engineering'],
    location: 'Kirtipur'
  },
  {
    name: 'Fusemachines',
    type: 'Training Center',
    programs: ['AI Fellowship', 'Machine Learning Bootcamp'],
    location: 'Pulchowk'
  },
  {
    name: 'Leapfrog Technology',
    type: 'Training Center',
    programs: ['Internship Programs', 'Tech Talks'],
    location: 'Dillibazar'
  }
];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [selectedCareerCategory, setSelectedCareerCategory] = useState('All Categories');
  const [selectedCareer, setSelectedCareer] = useState<typeof careers[0] | null>(null);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    
    let matchesPrice = true;
    if (selectedPriceRange === 'Free') {
      matchesPrice = course.price === 0;
    } else if (selectedPriceRange === 'Under $50') {
      matchesPrice = course.price < 50;
    } else if (selectedPriceRange === 'Under $100') {
      matchesPrice = course.price < 100;
    } else if (selectedPriceRange === '$100+') {
      matchesPrice = course.price >= 100;
    }
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCareerCategory === 'All Categories' || career.category === selectedCareerCategory;
    return matchesSearch && matchesCategory;
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLevel('All Levels');
    setSelectedPriceRange('All Prices');
    setSelectedCareerCategory('All Categories');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 pb-2">
              Learn Skills, Build Career
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover courses and career paths in Nepal's growing AI and tech ecosystem
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for courses, careers, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="courses" className="text-lg py-3">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Courses & Learning
                </TabsTrigger>
                <TabsTrigger value="careers" className="text-lg py-3">
                  <Users className="w-5 h-5 mr-2" />
                  Career Guide
                </TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="courses">
                {/* Filters Section */}
                <div className="py-8 px-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg mb-8">
                  <div className="flex flex-wrap items-center gap-4 justify-between">
                    <div className="flex flex-wrap items-center gap-4">
                      <h3 className="text-lg font-semibold text-gray-800">Filter by:</h3>
                      
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Skill Level" />
                        </SelectTrigger>
                        <SelectContent>
                          {skillLevels.map(level => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Price Range" />
                        </SelectTrigger>
                        <SelectContent>
                          {priceRanges.map(range => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">
                        {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
                      </span>
                      <Button 
                        variant="outline" 
                        onClick={handleClearFilters}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Career Paths Section */}
                <CareerPathsSection />

                {/* Free & Affordable Options Section */}
                <FreeAffordableSection />

                {/* Featured Courses Section */}
                <FeaturedCoursesSection />

                {/* All Courses Grid */}
                <div className="py-16">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    {searchQuery || selectedCategory !== 'All Categories' || selectedLevel !== 'All Levels' || selectedPriceRange !== 'All Prices'
                      ? 'Search Results' 
                      : 'All Courses'}
                  </h2>
                  
                  {filteredCourses.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-gray-400 text-6xl mb-4">🔍</div>
                      <h3 className="text-2xl font-semibold text-gray-600 mb-2">No courses found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
                      <Button onClick={handleClearFilters} variant="outline">
                        Clear All Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Career Guide Tab */}
              <TabsContent value="careers">
                {/* Career Guide Hero */}
                <div className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg mb-8">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">AI Career Guide for Nepal</h2>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                      Navigate the AI revolution in Nepal's job market. Discover opportunities in Kathmandu's growing tech ecosystem.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <Building className="w-8 h-8 mb-4 mx-auto" />
                        <h3 className="text-lg font-semibold mb-2">50+ Local Companies</h3>
                        <p className="text-blue-100">Hiring for AI and tech roles in Kathmandu</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <TrendingUp className="w-8 h-8 mb-4 mx-auto" />
                        <h3 className="text-lg font-semibold mb-2">Growing Market</h3>
                        <p className="text-blue-100">Nepal's tech sector growing 25% annually</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <Globe className="w-8 h-8 mb-4 mx-auto" />
                        <h3 className="text-lg font-semibold mb-2">Remote Opportunities</h3>
                        <p className="text-blue-100">Work with international companies from Kathmandu</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Search and Filter */}
                <div className="py-8 px-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg mb-8">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Search careers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedCareerCategory} onValueChange={setSelectedCareerCategory}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {careerCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="text-gray-600">
                      {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''} found
                    </div>
                  </div>
                </div>

                {/* Career Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Career List */}
                  <div className="lg:col-span-2">
                    <div className="grid gap-6">
                      {filteredCareers.map(career => (
                        <Card 
                          key={career.id} 
                          className={`cursor-pointer transition-all hover:shadow-lg ${
                            selectedCareer?.id === career.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => setSelectedCareer(career)}
                        >
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-xl text-blue-700">{career.title}</CardTitle>
                                <CardDescription className="text-sm text-gray-500 mt-1">
                                  {career.alternativeNames.join(' • ')}
                                </CardDescription>
                              </div>
                              <Badge variant="secondary">{career.category}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-4">{career.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span>{career.salaryRange}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                <span>{career.localOpportunities.length} local companies</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                <span>View Details</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Career Details Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-24">
                      {selectedCareer ? (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-700">{selectedCareer.title}</CardTitle>
                            <CardDescription>{selectedCareer.category}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Tabs defaultValue="overview" className="w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="skills">Skills</TabsTrigger>
                                <TabsTrigger value="start">Get Started</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="overview" className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Key Responsibilities</h4>
                                  <ul className="space-y-1 text-sm">
                                    {selectedCareer.responsibilities.map((resp, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                        {resp}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Salary Range</h4>
                                  <p className="text-sm text-green-600 font-medium">{selectedCareer.salaryRange}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Career Growth</h4>
                                  <p className="text-sm">{selectedCareer.growthPotential}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Local Opportunities</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedCareer.localOpportunities.map((company, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {company}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="skills" className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Technical Skills</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedCareer.technicalSkills.map((skill, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Soft Skills</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {selectedCareer.softSkills.map((skill, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Education</h4>
                                  <p className="text-sm">{selectedCareer.education}</p>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="start" className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Getting Started</h4>
                                  <ul className="space-y-2 text-sm">
                                    {selectedCareer.gettingStarted.map((step, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center mt-0.5 flex-shrink-0">
                                          {index + 1}
                                        </span>
                                        {step}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card>
                          <CardContent className="pt-6 text-center">
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Career</h3>
                            <p className="text-sm text-gray-500">Click on any career to view detailed information</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </div>

                {/* Local Resources Section */}
                <div className="py-16 mt-16 px-6 bg-gray-50 rounded-lg">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Local Resources in Kathmandu</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {localResources.map((resource, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{resource.name}</CardTitle>
                          <CardDescription>{resource.type}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span>{resource.location}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {resource.programs.map((program, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {program}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join the growing community of professionals shaping Nepal's digital future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse AI Tools
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Join Community
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
