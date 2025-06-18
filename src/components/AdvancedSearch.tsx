import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, X, Clock, Star, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchFilters {
  query: string;
  category: string;
  level: string;
  duration: string;
  language: string;
  rating: number;
  type: string;
}

interface SearchProps {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
}

const categories = [
  'All Categories', 'Web Development', 'Mobile Development', 'Data Science', 
  'AI & Machine Learning', 'DevOps', 'Cybersecurity', 'UI/UX Design', 
  'Game Development', 'Blockchain', 'Cloud Computing'
];

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const durations = ['Any Duration', 'Under 2 hours', '2-5 hours', '5-10 hours', '10+ hours'];
const languages = ['All Languages', 'English', 'Hindi', 'Nepali'];
const types = ['All Types', 'Video Course', 'Interactive', 'Text-based', 'Project-based'];

export default function AdvancedSearch({ onSearch, className }: SearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'All Categories',
    level: 'All Levels',
    duration: 'Any Duration',
    language: 'All Languages',
    rating: 0,
    type: 'All Types'
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: keyof SearchFilters, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update active filters
    const newActiveFilters = Object.entries(newFilters)
      .filter(([filterKey, filterValue]) => {
        if (filterKey === 'query') return filterValue !== '';
        if (filterKey === 'rating') return typeof filterValue === 'number' && filterValue > 0;
        return typeof filterValue === 'string' && !filterValue.startsWith('All') && filterValue !== 'Any Duration';
      })
      .map(([key, value]) => `${key}: ${value}`);
    
    setActiveFilters(newActiveFilters);
    onSearch(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: SearchFilters = {
      query: '',
      category: 'All Categories',
      level: 'All Levels',
      duration: 'Any Duration',
      language: 'All Languages',
      rating: 0,
      type: 'All Types'
    };
    setFilters(defaultFilters);
    setActiveFilters([]);
    onSearch(defaultFilters);
  };

  const removeFilter = (filterToRemove: string) => {
    const [key] = filterToRemove.split(': ');
    let defaultValue: string | number = '';
    
    if (key === 'rating') defaultValue = 0;
    else if (key === 'query') defaultValue = '';
    else if (key === 'duration') defaultValue = 'Any Duration';
    else defaultValue = `All ${key.charAt(0).toUpperCase() + key.slice(1)}s`;
    
    handleFilterChange(key as keyof SearchFilters, defaultValue);
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="search"
          className="w-full pl-12 pr-16 py-3 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 shadow-lg"
          value={filters.query}
          onChange={(e) => handleFilterChange('query', e.target.value)}
          placeholder="Search courses, resources, AI tools..."
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
        >
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-600">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              {filter}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Advanced Filters */}
      {isExpanded && (
        <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Level</label>
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Duration</label>
                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {durations.map((duration) => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Language</label>
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Minimum Rating</label>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <Button
                      key={rating}
                      variant={filters.rating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFilterChange('rating', rating)}
                      className="flex items-center gap-1"
                    >
                      {rating === 0 ? 'Any' : (
                        <>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {rating}+
                        </>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
