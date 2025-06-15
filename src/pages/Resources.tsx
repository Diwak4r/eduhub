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
    description: '700+ full-length programming courses',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/freecodecamp',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-2',
    title: "William Fiset's DSA Playlist (Java)",
    description: 'Comprehensive data structures and algorithms in Java',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/playlist?list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P6',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-3',
    title: 'Take U Forward (DSA)',
    description: 'Structured interview preparation with DSA',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/channel/UC5UAwBUum5MDFMCTsYNDtFg',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-4',
    title: 'CodeWithHarry (Java DSA)',
    description: 'Java programming and data structures',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/c/CodeWithHarry',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-5',
    title: 'Apna College (Java DSA)',
    description: 'Complete Java DSA course in Hindi',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/c/ApnaCollegeDotIn',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-6',
    title: 'Kevin Powell (HTML/CSS)',
    description: 'CSS expert tutorials and tips',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@KevinPowell',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-7',
    title: 'Code with Ania Kubów (JS & React)',
    description: 'JavaScript and React development tutorials',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@AniaKubow',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-8',
    title: 'Corey Schafer (Python)',
    description: 'Python programming tutorials and best practices',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@CoreySchafer',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-9',
    title: 'Fireship',
    description: 'Quick tech explainers and modern development',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@Fireship',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-10',
    title: 'TechWorld with Nana (DevOps & Kubernetes)',
    description: 'DevOps, Kubernetes, and cloud technologies',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@TechWorldwithNana',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-11',
    title: 'The Coding Train (Creative coding with p5.js)',
    description: 'Creative coding with p5.js tutorials',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@TheCodingTrain',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-12',
    title: 'Masahiro Sakurai on Creating Games',
    description: 'Game development insights from Nintendo',
    type: 'Video Playlists',
    url: 'https://www.youtube.com/@SakuraiDev',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // Articles & Guides
  {
    id: 'static-13',
    title: 'Top 20 Resources to Learn Programming for Free (2025)',
    description: 'Comprehensive guide to free programming resources',
    type: 'Articles',
    url: 'https://www.linkedin.com/pulse/top-20-resources-learn-programming-coding-free-2025-soma-sharma-7nx4f',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-14',
    title: '22 Best Online Learning Platforms 2025',
    description: 'Research-backed comparison of learning platforms',
    type: 'Articles',
    url: 'https://research.com/software/best-online-learning-platforms',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-15',
    title: 'CareerFoundry: 11 Best Free Coding Classes',
    description: 'Curated list of free coding bootcamps and classes',
    type: 'Articles',
    url: 'https://careerfoundry.com/en/blog/web-development/best-free-coding-courses',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-16',
    title: 'Massive List of MOOC Platforms (Class Central)',
    description: 'Complete directory of online course platforms',
    type: 'Articles',
    url: 'https://www.classcentral.com/report/mooc-platforms',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-17',
    title: 'Top 30 Resources for New Programming Languages',
    description: 'Learn any programming language with these resources',
    type: 'Articles',
    url: 'https://pinata.cloud/blog/top-30-resources-for-learning-new-programming-languages-in-2025',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-18',
    title: 'The Best Resources to Learn Coding (Beginners)',
    description: 'AlgoCademy\'s guide for coding beginners',
    type: 'Articles',
    url: 'https://algocademy.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-19',
    title: '9 Best Free Python Learning Resources',
    description: 'Comprehensive Python learning guide',
    type: 'Articles',
    url: 'https://rivery.io',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-20',
    title: '15 Best Free Learning Resources',
    description: 'Comprehensive guide to free learning resources',
    type: 'Articles',
    url: 'https://savingsgrove.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // MOOCs & Course Platforms
  {
    id: 'static-21',
    title: 'MIT OpenCourseWare',
    description: '2,400+ free courses from MIT',
    type: 'Course Platforms',
    url: 'https://ocw.mit.edu',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-22',
    title: 'SWAYAM (India)',
    description: 'Free university-level MOOCs from India',
    type: 'Course Platforms',
    url: 'https://swayam.gov.in',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-23',
    title: 'Hyperskill (JetBrains Academy)',
    description: 'Project-based coding education',
    type: 'Course Platforms',
    url: 'https://hyperskill.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-24',
    title: 'OpenClassrooms',
    description: 'Free vocational tech courses',
    type: 'Course Platforms',
    url: 'https://openclassrooms.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-25',
    title: 'Google Digital Garage',
    description: 'Digital and coding skills from Google',
    type: 'Course Platforms',
    url: 'https://learndigital.withgoogle.com/digitalgarage',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-26',
    title: 'Coursera',
    description: 'Ivy League & university courses',
    type: 'Course Platforms',
    url: 'https://coursera.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-27',
    title: 'edX',
    description: 'Free courses from MIT, Harvard & more',
    type: 'Course Platforms',
    url: 'https://edx.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-28',
    title: 'FutureLearn',
    description: 'Accredited free courses from top universities',
    type: 'Course Platforms',
    url: 'https://futurelearn.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-29',
    title: 'Khan Academy',
    description: 'Science & math tutor-style learning',
    type: 'Course Platforms',
    url: 'https://khanacademy.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-30',
    title: 'Skillshare',
    description: 'Creative & coding video classes',
    type: 'Course Platforms',
    url: 'https://skillshare.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-31',
    title: 'Udemy',
    description: 'Courses in tech, soft-skills, and more',
    type: 'Course Platforms',
    url: 'https://udemy.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-32',
    title: 'Teachable',
    description: 'Create & learn courses',
    type: 'Course Platforms',
    url: 'https://teachable.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-33',
    title: 'LinkedIn Learning',
    description: 'Professional development courses',
    type: 'Course Platforms',
    url: 'https://linkedin.com/learning',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-34',
    title: 'Pluralsight',
    description: 'Tech & development learning',
    type: 'Course Platforms',
    url: 'https://pluralsight.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // Learning Apps
  {
    id: 'static-35',
    title: 'Mimo',
    description: 'Interactive coding app for mobile learning',
    type: 'Learning Apps',
    url: 'https://mimo.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-36',
    title: 'Codecademy App',
    description: 'Mobile coding lessons and practice',
    type: 'Learning Apps',
    url: 'https://codecademy.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-37',
    title: 'SoloLearn',
    description: 'Gamified coding education',
    type: 'Learning Apps',
    url: 'https://sololearn.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-38',
    title: 'Grasshopper',
    description: 'JavaScript puzzles by Google',
    type: 'Learning Apps',
    url: 'https://grasshopper.app',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-39',
    title: 'DataCamp App',
    description: 'Python & data analytics on mobile',
    type: 'Learning Apps',
    url: 'https://datacamp.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-40',
    title: 'Google Colab',
    description: 'Online Jupyter notebooks for data science',
    type: 'Learning Apps',
    url: 'https://colab.research.google.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-41',
    title: 'Duolingo',
    description: 'Language learning made fun',
    type: 'Learning Apps',
    url: 'https://duolingo.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-42',
    title: 'Brilliant',
    description: 'Puzzle-based learning for math & science',
    type: 'Learning Apps',
    url: 'https://brilliant.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-43',
    title: 'Memrise',
    description: 'Mnemonic language learning',
    type: 'Learning Apps',
    url: 'https://memrise.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // Coding Practice Platforms
  {
    id: 'static-44',
    title: 'freeCodeCamp',
    description: 'Full-stack web development curriculum',
    type: 'Practice Platforms',
    url: 'https://freecodecamp.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-45',
    title: 'The Odin Project',
    description: 'Full-stack curriculum with projects',
    type: 'Practice Platforms',
    url: 'https://theodinproject.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-46',
    title: 'LeetCode',
    description: 'Coding interview preparation platform',
    type: 'Practice Platforms',
    url: 'https://leetcode.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-47',
    title: 'Codeforces',
    description: 'Competitive programming contests',
    type: 'Practice Platforms',
    url: 'https://codeforces.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-48',
    title: 'GeeksforGeeks',
    description: 'Topic-based coding practice and tutorials',
    type: 'Practice Platforms',
    url: 'https://geeksforgeeks.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-49',
    title: 'CodeCombat',
    description: 'Learn coding through gaming',
    type: 'Practice Platforms',
    url: 'https://codecombat.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-50',
    title: 'CodinGame',
    description: 'Gamified coding challenges',
    type: 'Practice Platforms',
    url: 'https://codingame.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-51',
    title: 'MongoDB University',
    description: 'Free database courses',
    type: 'Practice Platforms',
    url: 'https://university.mongodb.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-52',
    title: 'Harvard CS50X',
    description: 'Introduction to Computer Science',
    type: 'Practice Platforms',
    url: 'https://cs50.harvard.edu/x',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },

  // Community & References
  {
    id: 'static-53',
    title: 'GitHub',
    description: 'Open-source projects and code collaboration',
    type: 'Community',
    url: 'https://github.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-54',
    title: 'Stack Overflow',
    description: 'Programming Q&A community',
    type: 'Community',
    url: 'https://stackoverflow.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-55',
    title: 'dev.to',
    description: 'Developer community and articles',
    type: 'Community',
    url: 'https://dev.to',
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
              Browse curated articles, tutorials, tools, video playlists, and learning platforms to accelerate your learning journey.
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
                  <div className="text-2xl font-bold text-gray-800">Daily</div>
                  <div className="text-gray-600">Updates</div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Search and Filter */}
            <div className="max-w-2xl mx-auto animate-fade-in-up mb-6" style={{ animationDelay: '0.4s' }}>
              <SearchBar value={search} onChange={setSearch} placeholder="Search for articles, tutorials, tools..." />
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
