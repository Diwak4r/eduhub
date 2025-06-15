
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Code, Wrench, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import React from "react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'Articles' | 'Tutorials' | 'Tools';
  url?: string;
  created_at: string;
}

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

      setResources(data || []);
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

  const handleResourceClick = (url?: string) => {
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
              Browse curated articles, tutorials, and tools to accelerate your learning journey.
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
                          {sectionStyles[type].icon}
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
                              sectionStyles[type].borderColor,
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
