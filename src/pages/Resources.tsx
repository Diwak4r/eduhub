
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Code, Wrench, RefreshCw, Play, Smartphone, Globe, Headphones, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
    description: '700+ full-length programming courses',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/freecodecamp',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-2',
    title: "William Fiset's DSA Playlist (Java)",
    description: 'Comprehensive data structures and algorithms in Java',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/playlist?list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P6',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-3',
    title: 'Take U Forward (DSA)',
    description: 'Structured interview preparation with DSA',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/channel/UC5UAwBUum5MDFMCTsYNDtFg',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-4',
    title: 'CodeWithHarry (Java DSA)',
    description: 'Java programming and data structures',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/c/CodeWithHarry',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-5',
    title: 'Apna College (Java DSA)',
    description: 'Complete Java DSA course in Hindi',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/c/ApnaCollegeDotIn',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-6',
    title: 'Kevin Powell (HTML/CSS)',
    description: 'CSS expert tutorials and tips',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@KevinPowell',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-7',
    title: 'Code with Ania Kubów (JS & React)',
    description: 'JavaScript and React development tutorials',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@AniaKubow',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-8',
    title: 'Corey Schafer (Python)',
    description: 'Python programming tutorials and best practices',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@CoreySchafer',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-9',
    title: 'Fireship',
    description: 'Quick tech explainers and modern development',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@Fireship',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-10',
    title: 'TechWorld with Nana (DevOps & Kubernetes)',
    description: 'DevOps, Kubernetes, and cloud technologies',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@TechWorldwithNana',
    created_at: new Date().toISOString(),
  },

  // Articles & Guides
  {
    id: 'static-11',
    title: 'Top 20 Resources to Learn Programming for Free (2025)',
    description: 'Comprehensive guide to free programming resources',
    type: 'Articles',
    url: 'https://www.linkedin.com/pulse/top-20-resources-learn-programming-coding-free-2025-soma-sharma-7nx4f',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-12',
    title: '22 Best Online Learning Platforms 2025',
    description: 'Research-backed comparison of learning platforms',
    type: 'Articles',
    url: 'https://research.com/software/best-online-learning-platforms',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-13',
    title: 'CareerFoundry: 11 Best Free Coding Classes',
    description: 'Curated list of free coding bootcamps and classes',
    type: 'Articles',
    url: 'https://careerfoundry.com/en/blog/web-development/best-free-coding-courses',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-14',
    title: 'Massive List of MOOC Platforms (Class Central)',
    description: 'Complete directory of online course platforms',
    type: 'Articles',
    url: 'https://www.classcentral.com/report/mooc-platforms',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-15',
    title: 'Top 30 Resources for New Programming Languages',
    description: 'Learn any programming language with these resources',
    type: 'Articles',
    url: 'https://pinata.cloud/blog/top-30-resources-for-learning-new-programming-languages-in-2025',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-16',
    title: 'The Best Resources to Learn Coding (Beginners)',
    description: 'AlgoCademy\'s guide for coding beginners',
    type: 'Articles',
    url: 'https://algocademy.com',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-17',
    title: '9 Best Free Python Learning Resources',
    description: 'Comprehensive Python learning guide',
    type: 'Articles',
    url: 'https://rivery.io',
    created_at: new Date().toISOString(),
  },

  // MOOCs & Course Platforms
  {
    id: 'static-18',
    title: 'MIT OpenCourseWare',
    description: '2,400+ free courses from MIT',
    type: 'Course Platforms',
    url: 'https://ocw.mit.edu',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-19',
    title: 'SWAYAM (India)',
    description: 'Free university-level MOOCs from India',
    type: 'Course Platforms',
    url: 'https://swayam.gov.in',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-20',
    title: 'Hyperskill (JetBrains Academy)',
    description: 'Project-based coding education',
    type: 'Course Platforms',
    url: 'https://hyperskill.org',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-21',
    title: 'OpenClassrooms',
    description: 'Free vocational tech courses',
    type: 'Course Platforms',
    url: 'https://openclassrooms.com',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-22',
    title: 'Google Digital Garage',
    description: 'Digital and coding skills from Google',
    type: 'Course Platforms',
    url: 'https://learndigital.withgoogle.com/digitalgarage',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-23',
    title: 'Coursera',
    description: 'Ivy League & university courses',
    type: 'Course Platforms',
    url: 'https://coursera.org',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-24',
    title: 'edX',
    description: 'Free courses from MIT, Harvard & more',
    type: 'Course Platforms',
    url: 'https://edx.org',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-25',
    title: 'FutureLearn',
    description: 'Accredited free courses from top universities',
    type: 'Course Platforms',
    url: 'https://futurelearn.com',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-26',
    title: 'Khan Academy',
    description: 'Science & math tutor-style learning',
    type: 'Course Platforms',
    url: 'https://khanacademy.org',
    created_at: new Date().toISOString(),
  },

  // Learning Apps
  {
    id: 'static-27',
    title: 'Mimo',
    description: 'Interactive coding app for mobile learning',
    type: 'Learning Apps',
    url: 'https://mimo.org',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-28',
    title: 'Codecademy App',
    description: 'Mobile coding lessons and practice',
    type: 'Learning Apps',
    url: 'https://codecademy.com',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-29',
    title: 'SoloLearn',
    description: 'Gamified coding education',
    type: 'Learning Apps',
    url: 'https://sololearn.com',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-30',
    title: 'Grasshopper',
    description: 'JavaScript puzzles by Google',
    type: 'Learning Apps',
    url: 'https://grasshopper.app',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-31',
    title: 'DataCamp App',
    description: 'Python & data analytics on mobile',
    type: 'Learning Apps',
    url: 'https://datacamp.com',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-32',
    title: 'Google Colab',
    description: 'Online Jupyter notebooks for data science',
    type: 'Learning Apps',
    url: 'https://colab.research.google.com',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-33',
    title: 'Duolingo',
    description: 'Language learning made fun',
    type: 'Learning Apps',
    url: 'https://duolingo.com',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-34',
    title: 'Brilliant',
    description: 'Puzzle-based learning for math & science',
    type: 'Learning Apps',
    url: 'https://brilliant.org',
    created_at: new Date().toISOString(),
  },

  // Coding Practice Platforms
  {
    id: 'static-35',
    title: 'freeCodeCamp',
    description: 'Full-stack web development curriculum',
    type: 'Practice Platforms',
    url: 'https://freecodecamp.org',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-36',
    title: 'The Odin Project',
    description: 'Full-stack curriculum with projects',
    type: 'Practice Platforms',
    url: 'https://theodinproject.com',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-37',
    title: 'LeetCode',
    description: 'Coding interview preparation platform',
    type: 'Practice Platforms',
    url: 'https://leetcode.com',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-38',
    title: 'Codeforces',
    description: 'Competitive programming contests',
    type: 'Practice Platforms',
    url: 'https://codeforces.com',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-39',
    title: 'GeeksforGeeks',
    description: 'Topic-based coding practice and tutorials',
    type: 'Practice Platforms',
    url: 'https://geeksforgeeks.org',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-40',
    title: 'CodeCombat',
    description: 'Learn coding through gaming',
    type: 'Practice Platforms',
    url: 'https://codecombat.com',
    created_at: new Date().toISOString(),
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
};

export default function Resources() {
  const [search, setSearch] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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
      resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description?.toLowerCase().includes(search.toLowerCase())
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
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in-up pb-2">
              Learning Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Browse curated articles, tutorials, tools, video playlists, and learning platforms to accelerate your learning journey.
            </p>

            <div className="max-w-2xl mx-auto animate-fade-in-up mb-6" style={{ animationDelay: '0.4s' }}>
              <SearchBar value={search} onChange={setSearch} placeholder="Search for articles, tutorials, tools..." />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                onClick={handleRefreshResources}
                disabled={refreshing}
                className="bg-blue-600 hover:bg-blue-700"
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
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {items.length} {items.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.map((item, index) => (
                          <Card
                            key={item.id}
                            className={cn(
                              "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 bg-white/80 backdrop-blur-sm animate-fade-in-up",
                              "border-t-4",
                              sectionStyles[type]?.borderColor || "border-gray-500",
                            )}
                            style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                            onClick={() => handleResourceClick(item.url)}
                          >
                            <CardContent className="p-6 pt-5">
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 mt-2">{item.description}</p>
                              <div className="flex items-center justify-between mt-4">
                                <span className="text-xs text-gray-400">
                                  Added {new Date(item.created_at).toLocaleDateString()}
                                </span>
                                {item.url && (
                                  <span className="text-xs text-blue-600 group-hover:text-blue-800">
                                    Click to open →
                                  </span>
                                )}
                              </div>
                            </CardContent>
                          </Card>
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
