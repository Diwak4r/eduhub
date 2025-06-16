
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  language?: string;
}

// Comprehensive static resources covering all major free platforms
const staticResources: Resource[] = [
  // Global MOOC Platforms
  {
    id: 'static-1',
    title: 'Coursera Free Courses',
    description: 'Audit free courses from top universities worldwide',
    type: 'Global MOOC Platforms',
    url: 'https://www.coursera.org/courses?query=free',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  {
    id: 'static-2',
    title: 'edX Free Courses',
    description: 'Free courses from Harvard, MIT, and other top institutions',
    type: 'Global MOOC Platforms',
    url: 'https://www.edx.org/search?q=&tab=course&availability=Upcoming&availability=Current',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  {
    id: 'static-3',
    title: 'SWAYAM by Government of India',
    description: 'Free courses in multiple Indian languages',
    type: 'Global MOOC Platforms',
    url: 'https://swayam.gov.in',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'Hindi',
  },
  {
    id: 'static-4',
    title: 'NPTEL Courses',
    description: 'Technical courses by IITs and IISc',
    type: 'Global MOOC Platforms',
    url: 'https://nptel.ac.in',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  // Tech & Coding
  {
    id: 'static-5',
    title: 'freeCodeCamp',
    description: 'Complete web development curriculum - completely free',
    type: 'Tech & Coding',
    url: 'https://www.freecodecamp.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  {
    id: 'static-6',
    title: 'MIT OpenCourseWare',
    description: 'Free access to MIT course materials',
    type: 'Tech & Coding',
    url: 'https://ocw.mit.edu',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  {
    id: 'static-7',
    title: 'CS50 by Harvard',
    description: 'Harvard\'s introduction to computer science',
    type: 'Tech & Coding',
    url: 'https://cs50.harvard.edu',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  {
    id: 'static-8',
    title: 'Khan Academy Computer Programming',
    description: 'Free programming courses for beginners',
    type: 'Tech & Coding',
    url: 'https://www.khanacademy.org/computing/computer-programming',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  // Data, AI & Business
  {
    id: 'static-9',
    title: 'Google AI Essentials',
    description: 'Learn AI fundamentals from Google',
    type: 'Data, AI & Business',
    url: 'https://grow.google/ai-essentials',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  {
    id: 'static-10',
    title: 'HubSpot Academy',
    description: 'Free marketing, sales, and customer service courses',
    type: 'Data, AI & Business',
    url: 'https://academy.hubspot.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  {
    id: 'static-11',
    title: 'IBM SkillsBuild',
    description: 'Free technology and professional development courses',
    type: 'Data, AI & Business',
    url: 'https://www.ibm.com/skillsbuild',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  // Languages & Soft Skills
  {
    id: 'static-12',
    title: 'Duolingo',
    description: 'Learn languages for free',
    type: 'Languages & Soft Skills',
    url: 'https://www.duolingo.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  {
    id: 'static-13',
    title: 'Khan Academy Grammar',
    description: 'Free grammar and writing courses',
    type: 'Languages & Soft Skills',
    url: 'https://www.khanacademy.org/humanities/grammar',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'English',
  },
  {
    id: 'static-14',
    title: 'ApniPathshala',
    description: 'Free educational content in Hindi and regional languages',
    type: 'Languages & Soft Skills',
    url: 'https://www.apnipathshala.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    language: 'Hindi',
  },
];

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>(staticResources);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resources:', error);
        return;
      }

      // Combine database resources with static resources
      const allResources = [...(data || []), ...staticResources];
      setResources(allResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshResources = async () => {
    setRefreshing(true);
    try {
      await fetchResources();
      toast({
        title: "Success",
        description: "Resources refreshed successfully!",
      });
    } catch (error) {
      console.error('Error refreshing resources:', error);
      toast({
        title: "Error",
        description: "Failed to refresh resources. Showing cached resources.",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return {
    resources,
    loading,
    refreshing,
    fetchResources,
    handleRefreshResources
  };
};
