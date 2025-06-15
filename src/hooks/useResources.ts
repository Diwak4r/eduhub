import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { staticResources } from "@/data/staticResources";

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

export function useResources() {
  const [resources, setResources] = useState<Resource[]>(staticResources); // Start with static resources
  const [loading, setLoading] = useState(false); // Start with false since we have static resources
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resources:', error);
        // Keep static resources on error
        setResources(staticResources);
        return;
      }

      // Combine database resources with static resources
      const allResources = [...(data || []), ...staticResources];
      setResources(allResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
      // Fallback to static resources
      setResources(staticResources);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefreshResources = useCallback(async () => {
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
  }, [fetchResources, toast]);

  useEffect(() => {
    // Only fetch from database if we don't have static resources already loaded
    fetchResources();
  }, [fetchResources]);

  return {
    resources,
    loading,
    refreshing,
    handleRefreshResources,
  };
}
