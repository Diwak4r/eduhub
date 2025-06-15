
import { useState } from 'react';
import { Search, MapPin, DollarSign, TrendingUp, BookOpen, Users, ChevronRight, Star, Building, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';

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
  // AI Development & Engineering
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
    title: 'Chatbot Developer',
    alternativeNames: ['Conversational AI Developer', 'Bot Developer', 'Virtual Assistant Developer'],
    category: 'AI Development & Engineering',
    description: 'Create intelligent chatbots and virtual assistants for customer service, sales, and support applications.',
    responsibilities: [
      'Design conversation flows and user experiences',
      'Integrate chatbots with existing systems',
      'Train and optimize bot responses',
      'Monitor bot performance and user satisfaction',
      'Implement natural language understanding'
    ],
    technicalSkills: ['Dialogflow', 'Microsoft Bot Framework', 'Python/Node.js', 'APIs', 'Natural Language Processing'],
    softSkills: ['User experience design', 'Communication', 'Problem-solving', 'Empathy', 'Testing mindset'],
    education: 'Bachelor\'s in Computer Science or related field. UX/UI knowledge beneficial.',
    salaryRange: 'NPR 45,000 - 110,000 per month',
    growthPotential: 'Junior → Senior → Lead → Conversational AI Architect',
    localOpportunities: ['Banks', 'E-commerce companies', 'Telecom companies', 'Government agencies'],
    gettingStarted: [
      'Learn chatbot platforms (Dialogflow, Rasa)',
      'Understand conversation design principles',
      'Build simple chatbots for practice',
      'Study user experience design',
      'Create portfolio of chatbot projects'
    ]
  },
  {
    id: 5,
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
    id: 6,
    title: 'Content Creator with AI Tools',
    alternativeNames: ['AI Content Specialist', 'Digital Content Producer', 'AI-Assisted Writer'],
    category: 'Digital Marketing & Content',
    description: 'Create engaging content using AI tools to enhance creativity and productivity across various digital platforms.',
    responsibilities: [
      'Produce high-quality content using AI assistance',
      'Manage content calendars and strategies',
      'Optimize content for SEO and engagement',
      'Collaborate with design and marketing teams',
      'Analyze content performance metrics'
    ],
    technicalSkills: ['AI writing tools (Jasper, Copy.ai)', 'SEO tools', 'Social media platforms', 'Basic design software', 'Analytics tools'],
    softSkills: ['Creativity', 'Writing skills', 'Adaptability', 'Time management', 'Brand awareness'],
    education: 'Bachelor\'s in English, Marketing, Communications, or related field.',
    salaryRange: 'NPR 30,000 - 75,000 per month',
    growthPotential: 'Junior → Senior → Content Lead → Content Strategy Manager',
    localOpportunities: ['Digital agencies', 'Media companies', 'Startups', 'Freelance/Remote work'],
    gettingStarted: [
      'Learn AI content creation tools',
      'Build a portfolio of diverse content',
      'Understand SEO basics',
      'Practice social media management',
      'Develop personal brand online'
    ]
  },
  {
    id: 7,
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
  },
  {
    id: 8,
    title: 'Fintech Analyst',
    alternativeNames: ['Financial Technology Analyst', 'Digital Finance Specialist', 'Payment Systems Analyst'],
    category: 'Finance & Fintech',
    description: 'Analyze financial technology trends, digital payment systems, and emerging fintech solutions in Nepal\'s growing digital economy.',
    responsibilities: [
      'Analyze fintech market trends and opportunities',
      'Evaluate digital payment systems and security',
      'Support product development and strategy',
      'Conduct risk assessments for financial products',
      'Research regulatory compliance requirements'
    ],
    technicalSkills: ['Financial modeling', 'SQL', 'Python/R', 'Blockchain basics', 'API testing', 'Risk analysis tools'],
    softSkills: ['Analytical thinking', 'Attention to detail', 'Communication', 'Regulatory awareness', 'Problem-solving'],
    education: 'Bachelor\'s in Finance, Economics, or related field. Fintech certifications beneficial.',
    salaryRange: 'NPR 50,000 - 120,000 per month',
    growthPotential: 'Junior → Senior → Lead → Product Manager → Strategy Director',
    localOpportunities: ['Khalti', 'eSewa', 'IME Pay', 'Banks', 'Microfinance institutions'],
    gettingStarted: [
      'Learn about digital payments and blockchain',
      'Understand Nepal\'s financial regulations',
      'Practice financial analysis and modeling',
      'Follow fintech news and trends',
      'Build projects with financial APIs'
    ]
  },
  {
    id: 9,
    title: 'EdTech Content Developer',
    alternativeNames: ['Educational Content Creator', 'Online Learning Designer', 'Curriculum Developer'],
    category: 'Education Technology',
    description: 'Create educational content and courses for online learning platforms, focusing on Nepal\'s educational needs.',
    responsibilities: [
      'Develop engaging educational content',
      'Design interactive learning experiences',
      'Create assessments and quizzes',
      'Collaborate with subject matter experts',
      'Optimize content for different learning styles'
    ],
    technicalSkills: ['Learning Management Systems', 'Video editing software', 'Graphic design tools', 'HTML/CSS basics', 'Educational technologies'],
    softSkills: ['Instructional design', 'Creativity', 'Communication', 'Empathy', 'Patience'],
    education: 'Bachelor\'s in Education, subject expertise, or related field. Instructional design certification preferred.',
    salaryRange: 'NPR 35,000 - 80,000 per month',
    growthPotential: 'Junior → Senior → Lead → Learning Experience Manager',
    localOpportunities: ['E-learning platforms', 'Educational institutions', 'NGOs', 'Government education initiatives'],
    gettingStarted: [
      'Learn instructional design principles',
      'Master content creation tools',
      'Understand learning psychology',
      'Create sample educational content',
      'Get feedback from educators'
    ]
  },
  {
    id: 10,
    title: 'Precision Agriculture Specialist',
    alternativeNames: ['Smart Farming Analyst', 'Agricultural Technology Specialist', 'Farm Data Analyst'],
    category: 'Agriculture & Environmental Tech',
    description: 'Use technology and data analysis to optimize farming practices, improve crop yields, and promote sustainable agriculture.',
    responsibilities: [
      'Analyze agricultural data and weather patterns',
      'Implement precision farming technologies',
      'Advise farmers on technology adoption',
      'Monitor crop health using sensors and drones',
      'Develop sustainable farming solutions'
    ],
    technicalSkills: ['GIS software', 'Remote sensing', 'IoT sensors', 'Data analysis', 'Agricultural software', 'Drone operation'],
    softSkills: ['Problem-solving', 'Communication', 'Adaptability', 'Field work', 'Cultural sensitivity'],
    education: 'Bachelor\'s in Agriculture, Environmental Science, or related field. Technology certifications beneficial.',
    salaryRange: 'NPR 40,000 - 90,000 per month',
    growthPotential: 'Junior → Senior → Lead → AgTech Manager → Consultant',
    localOpportunities: ['Agricultural cooperatives', 'NGOs', 'Government agencies', 'International development organizations'],
    gettingStarted: [
      'Learn about precision agriculture technologies',
      'Understand local farming practices',
      'Practice with GIS and mapping tools',
      'Connect with agricultural communities',
      'Study sustainable farming methods'
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

export default function CareerGuide() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCareer, setSelectedCareer] = useState<typeof careers[0] | null>(null);

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || career.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">AI Career Guide for Nepal</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Navigate the AI revolution in Nepal's job market. Discover opportunities in Kathmandu's growing tech ecosystem and build your career in the digital age.
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
        </section>

        {/* Search and Filter */}
        <section className="py-8 px-6 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto max-w-6xl">
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
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
        </section>

        {/* Main Content */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-7xl">
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
          </div>
        </section>

        {/* Local Resources Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
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
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your AI Career?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join the growing community of AI professionals in Nepal and shape the future of technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse AI Tools
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Explore Courses
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
