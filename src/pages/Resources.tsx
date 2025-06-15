import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import EnhancedResourceCard from "@/components/EnhancedResourceCard";
import { BookOpen, Code, Wrench, RefreshCw, Play, Smartphone, Globe, Headphones, BookMarked, Filter, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: string;
  url: string | null;
  source_id: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean | null;
}

const staticResources = [
  // Video Playlists & Channels
  {
    id: 'static-1',
    title: 'freeCodeCamp YouTube',
    description: '700+ full-length programming courses including web development, data science, and computer science',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@freecodecamp',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-2',
    title: "Traversy Media",
    description: 'Web development tutorials, crash courses, and project builds',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@TraversyMedia',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-3',
    title: 'The Net Ninja',
    description: 'Programming tutorials for beginners and advanced developers',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@NetNinja',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-4',
    title: 'CS50 Harvard',
    description: 'Introduction to Computer Science from Harvard University',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@cs50',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-5',
    title: 'Programming with Mosh',
    description: 'Clear, concise programming tutorials for all skill levels',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@programmingwithmosh',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-6',
    title: 'Kevin Powell - CSS',
    description: 'CSS tutorials, tips, and modern web design techniques',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@KevinPowell',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-7',
    title: 'Fireship',
    description: 'Quick tech explainers, tutorials, and modern development trends',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@Fireship',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-8',
    title: 'Corey Schafer',
    description: 'Python programming, data science, and software development',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@CoreySchafer',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // Course Platforms
  {
    id: 'static-9',
    title: 'freeCodeCamp.org',
    description: 'Interactive coding lessons and certification programs - completely free',
    type: 'Course Platforms',
    url: 'https://www.freecodecamp.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-10',
    title: 'Codecademy',
    description: 'Interactive programming courses with hands-on coding practice',
    type: 'Course Platforms',
    url: 'https://www.codecademy.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-11',
    title: 'Khan Academy',
    description: 'Free courses in programming, math, science, and more',
    type: 'Course Platforms',
    url: 'https://www.khanacademy.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-12',
    title: 'Coursera',
    description: 'University courses from top institutions (many free to audit)',
    type: 'Course Platforms',
    url: 'https://www.coursera.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-13',
    title: 'edX',
    description: 'Free courses from MIT, Harvard, and other top universities',
    type: 'Course Platforms',
    url: 'https://www.edx.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-14',
    title: 'MIT OpenCourseWare',
    description: '2,400+ free courses from MIT with lecture notes and assignments',
    type: 'Course Platforms',
    url: 'https://ocw.mit.edu',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-15',
    title: 'Udemy Free Courses',
    description: 'Thousands of free courses in technology, business, and design',
    type: 'Course Platforms',
    url: 'https://www.udemy.com/courses/free',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // Practice Platforms
  {
    id: 'static-16',
    title: 'LeetCode',
    description: 'Coding interview preparation with 2000+ programming challenges',
    type: 'Practice Platforms',
    url: 'https://leetcode.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-17',
    title: 'HackerRank',
    description: 'Programming challenges and skill certification',
    type: 'Practice Platforms',
    url: 'https://www.hackerrank.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-18',
    title: 'Codewars',
    description: 'Programming kata and coding challenges to improve skills',
    type: 'Practice Platforms',
    url: 'https://www.codewars.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-19',
    title: 'GeeksforGeeks',
    description: 'Programming articles, practice problems, and interview preparation',
    type: 'Practice Platforms',
    url: 'https://www.geeksforgeeks.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-20',
    title: 'The Odin Project',
    description: 'Full-stack web development curriculum with projects',
    type: 'Practice Platforms',
    url: 'https://www.theodinproject.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-21',
    title: 'Exercism',
    description: 'Code practice and mentorship in 67+ programming languages',
    type: 'Practice Platforms',
    url: 'https://exercism.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // Learning Apps
  {
    id: 'static-22',
    title: 'SoloLearn',
    description: 'Mobile coding courses with interactive lessons and community',
    type: 'Learning Apps',
    url: 'https://www.sololearn.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-23',
    title: 'Grasshopper',
    description: 'Learn JavaScript through fun, quick games by Google',
    type: 'Learning Apps',
    url: 'https://grasshopper.app',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-24',
    title: 'Mimo',
    description: 'Learn programming on your phone with bite-sized lessons',
    type: 'Learning Apps',
    url: 'https://mimo.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-25',
    title: 'Duolingo',
    description: 'Learn languages with gamified lessons and daily practice',
    type: 'Learning Apps',
    url: 'https://www.duolingo.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // Tools & Resources
  {
    id: 'static-26',
    title: 'GitHub',
    description: 'Version control, code collaboration, and open source projects',
    type: 'Tools',
    url: 'https://github.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-27',
    title: 'Stack Overflow',
    description: 'Programming Q&A community with millions of solutions',
    type: 'Tools',
    url: 'https://stackoverflow.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-28',
    title: 'MDN Web Docs',
    description: 'Comprehensive web development documentation by Mozilla',
    type: 'Tools',
    url: 'https://developer.mozilla.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-29',
    title: 'VS Code',
    description: 'Free, powerful code editor with extensive extensions',
    type: 'Tools',
    url: 'https://code.visualstudio.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-30',
    title: 'CodePen',
    description: 'Online code editor for front-end development and sharing',
    type: 'Tools',
    url: 'https://codepen.io',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-31',
    title: 'Replit',
    description: 'Online IDE for coding, collaborating, and hosting projects',
    type: 'Tools',
    url: 'https://replit.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-32',
    title: 'Figma',
    description: 'Collaborative design tool for UI/UX design and prototyping',
    type: 'Tools',
    url: 'https://www.figma.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // Articles & Guides
  {
    id: 'static-33',
    title: 'dev.to',
    description: 'Developer community with articles, tutorials, and discussions',
    type: 'Articles',
    url: 'https://dev.to',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-34',
    title: 'Medium - Programming',
    description: 'In-depth programming articles and industry insights',
    type: 'Articles',
    url: 'https://medium.com/topic/programming',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-35',
    title: 'CSS-Tricks',
    description: 'Web design and development articles, especially CSS',
    type: 'Articles',
    url: 'https://css-tricks.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-36',
    title: 'Smashing Magazine',
    description: 'Web development and design articles for professionals',
    type: 'Articles',
    url: 'https://www.smashingmagazine.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-37',
    title: 'A List Apart',
    description: 'Articles on web standards, design, and development',
    type: 'Articles',
    url: 'https://alistapart.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-38',
    title: 'Real Python',
    description: 'Python tutorials, articles, and best practices',
    type: 'Articles',
    url: 'https://realpython.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // Community Resources
  {
    id: 'static-39',
    title: 'Reddit - Programming',
    description: 'Programming discussions, news, and community support',
    type: 'Community',
    url: 'https://www.reddit.com/r/programming',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-40',
    title: 'Discord Programming Communities',
    description: 'Real-time chat with developers and programmers',
    type: 'Community',
    url: 'https://discord.com/channels/programming',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-41',
    title: 'Hashnode',
    description: 'Developer blogging platform with technical articles',
    type: 'Community',
    url: 'https://hashnode.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // Specialized Learning
  {
    id: 'static-42',
    title: 'W3Schools',
    description: 'Web development tutorials with interactive examples',
    type: 'Tutorials',
    url: 'https://www.w3schools.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-43',
    title: 'TutorialsPoint',
    description: 'Free tutorials on programming, databases, and technology',
    type: 'Tutorials',
    url: 'https://www.tutorialspoint.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-44',
    title: 'Javatpoint',
    description: 'Comprehensive tutorials for Java, Python, and more',
    type: 'Tutorials',
    url: 'https://www.javatpoint.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-45',
    title: 'Learn Git Branching',
    description: 'Interactive Git tutorial with visual demonstrations',
    type: 'Tutorials',
    url: 'https://learngitbranching.js.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
];

const sectionStyles: { [key: string]: { icon: React.ReactNode; borderColor: string } } = {
  Articles: {
    icon: <BookOpen className="h-6 w-6 text-blue-500" />,
    borderColor: "border-blue-500",
  },
  Tutorials: {
    icon: <Code className="h-6 w-6 text-purple-500" />,
    borderColor: "border-purple-500",
  },
  Tools: {
    icon: <Wrench className="h-6 w-6 text-green-500" />,
    borderColor: "border-green-500",
  },
  "Video Playlists": {
    icon: <Play className="h-6 w-6 text-red-500" />,
    borderColor: "border-red-500",
  },
  "Course Platforms": {
    icon: <Globe className="h-6 w-6 text-indigo-500" />,
    borderColor: "border-indigo-500",
  },
  "Learning Apps": {
    icon: <Smartphone className="h-6 w-6 text-pink-500" />,
    borderColor: "border-pink-500",
  },
  "Practice Platforms": {
    icon: <Code className="h-6 w-6 text-orange-500" />,
    borderColor: "border-orange-500",
  },
  "Community": {
    icon: <BookMarked className="h-6 w-6 text-teal-500" />,
    borderColor: "border-teal-500",
  },
};

export default function Resources() {
  const [search, setSearch] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");
  const { toast } = useToast();

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resources:', error);
        toast({
          title: "Error",
          description: "Failed to load resources. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Combine database resources with static resources
      const allResources = [...(data || []), ...staticResources];
      setResources(allResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast({
        title: "Error",
        description: "Failed to load resources. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshResources = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-resources');
      
      if (error) {
        console.error('Error refreshing resources:', error);
        toast({
          title: "Error",
          description: "Failed to refresh resources. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Resources refreshed successfully!",
        });
        // Refetch resources to show updated data
        await fetchResources();
      }
    } catch (error) {
      console.error('Error refreshing resources:', error);
      toast({
        title: "Error",
        description: "Failed to refresh resources. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Group resources by type and filter by search
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    
    if (
      (selectedType === "all" || resource.type === selectedType) &&
      (resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description?.toLowerCase().includes(search.toLowerCase()))
    ) {
      acc[resource.type].push(resource);
    }
    
    return acc;
  }, {} as Record<string, Resource[]>);

  const handleResourceClick = (url?: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const resourceTypes = ["all", ...Object.keys(sectionStyles)];
  const totalResources = resources.length;
  const filteredCount = Object.values(groupedResources).reduce((sum, items) => sum + items.length, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <main className="pt-20">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-lg text-gray-600">Loading resources...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="pt-20">
        {/* Enhanced Header Section */}
        <section className="py-16 px-6 relative overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg opacity-30 animate-bounce"></div>
          
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in-up pb-2">
              Learning Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Discover the best free learning resources from across the web. All links are carefully curated and regularly updated.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{totalResources}+</div>
                  <div className="text-gray-600">Total Resources</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{resourceTypes.length - 1}</div>
                  <div className="text-gray-600">Categories</div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">100%</div>
                  <div className="text-gray-600">Free Resources</div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Search and Filter */}
            <div className="max-w-2xl mx-auto animate-fade-in-up mb-6" style={{ animationDelay: '0.4s' }}>
              <SearchBar value={search} onChange={setSearch} placeholder="Search for courses, tutorials, tools..." />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {resourceTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    "transition-all duration-300",
                    selectedType === type 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
                      : "hover:bg-blue-50"
                  )}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {type === "all" ? "All" : type}
                </Button>
              ))}
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                onClick={handleRefreshResources}
                disabled={refreshing}
                className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {refreshing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Resources
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-5xl">
            {filteredCount > 0 && (
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  Showing {filteredCount} of {totalResources} resources
                  {selectedType !== "all" && ` in ${selectedType}`}
                </p>
              </div>
            )}
            
            <div className="space-y-12">
              {Object.entries(groupedResources).map(
                ([type, items]) =>
                  items.length > 0 && (
                    <div key={type} className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white rounded-xl shadow-md">
                          {sectionStyles[type]?.icon || <BookOpen className="h-6 w-6 text-gray-500" />}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">{type}</h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                          {items.length} {items.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.map((item, index) => (
                          <EnhancedResourceCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            type={item.type}
                            url={item.url}
                            created_at={item.created_at}
                            borderColor={sectionStyles[type]?.borderColor}
                            icon={sectionStyles[type]?.icon}
                            duration={getRandomDuration()}
                            rating={getRandomRating()}
                            difficulty={getRandomDifficulty()}
                            onClick={() => handleResourceClick(item.url)}
                          />
                        ))}
                      </div>
                    </div>
                  ),
              )}
              {Object.keys(groupedResources).length === 0 && (
                <div className="text-center py-16 bg-white/50 rounded-lg shadow-sm">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">No resources found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or refresh to load new resources.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Helper functions for demo data
function getRandomDuration() {
  const durations = ['5 min', '10 min', '30 min', '1 hour', '2 hours', '1 week', 'Self-paced'];
  return durations[Math.floor(Math.random() * durations.length)];
}

function getRandomRating() {
  return Number((4 + Math.random()).toFixed(1));
}

function getRandomDifficulty(): 'Beginner' | 'Intermediate' | 'Advanced' {
  const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;
  return levels[Math.floor(Math.random() * levels.length)];
}
