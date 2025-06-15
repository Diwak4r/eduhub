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
}

// Static resources that are always available
const staticResources: Resource[] = [
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
    id: 'static-3',
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
    id: 'static-4',
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
    id: 'static-5',
    title: 'Stack Overflow',
    description: 'Programming Q&A community with millions of solutions',
    type: 'Tools',
    url: 'https://stackoverflow.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
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
        // Keep static resources on error
        return;
      }

      // Combine database resources with static resources
      const allResources = [...(data || []), ...staticResources];
      setResources(allResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
      // Keep static resources on error
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

  return {
    resources,
    loading,
    refreshing,
    fetchResources,
    handleRefreshResources,
  };
};
