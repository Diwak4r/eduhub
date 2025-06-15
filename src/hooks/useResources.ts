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
    title: 'freeCodeCamp',
    description: 'Learn to code for free with interactive lessons',
    type: 'Course Platforms',
    url: 'https://www.freecodecamp.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-2',
    title: 'MDN Web Docs',
    description: 'The best documentation for web technologies',
    type: 'Documentation',
    url: 'https://developer.mozilla.org',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-3',
    title: 'GitHub',
    description: 'Code collaboration and version control',
    type: 'Tools',
    url: 'https://github.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-4',
    title: 'Stack Overflow',
    description: 'Programming community for developers',
    type: 'Community',
    url: 'https://stackoverflow.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  },
  {
    id: 'static-5',
    title: 'Codecademy',
    description: 'Interactive coding courses',
    type: 'Course Platforms',
    url: 'https://www.codecademy.com',
    source_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
  }
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
    // Only try to fetch additional resources, don't block UI
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
