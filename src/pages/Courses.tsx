
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import FeaturedCoursesSection from '@/components/FeaturedCoursesSection';

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
  }
];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLevel('All Levels');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section with Search */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Discover Your Next Skill
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore thousands of courses from industry experts and level up your career
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 px-6 bg-white/80 backdrop-blur-sm border-y border-gray-200">
          <div className="container mx-auto max-w-6xl">
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
        </section>

        {/* Featured Courses Section */}
        <FeaturedCoursesSection />

        {/* All Courses Grid */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {searchQuery || selectedCategory !== 'All Categories' || selectedLevel !== 'All Levels' 
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
        </section>
      </main>
    </div>
  );
}
