
import { useState, useEffect } from "react";
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

  return {
    resources,
    loading,
    refreshing,
    handleRefreshResources,
  };
}
