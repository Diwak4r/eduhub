
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, ExternalLink, Calendar, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DailyTool {
  id: string;
  tool_name: string;
  description: string | null;
  tool_url: string | null;
  image_url: string | null;
  category: string | null;
  featured_date: string;
  created_at: string;
}

export default function ToolOfTheDay() {
  const [dailyTool, setDailyTool] = useState<DailyTool | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTodaysTool = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('daily_tools')
        .select('*')
        .eq('featured_date', today)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Error fetching daily tool:', error);
        toast({
          title: "Error",
          description: "Failed to load today's tool. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (!data) {
        // No tool for today, try to fetch one
        console.log('No tool for today, fetching new one...');
        await fetchNewDailyTool();
        return;
      }

      setDailyTool(data);
    } catch (error) {
      console.error('Error fetching daily tool:', error);
      toast({
        title: "Error",
        description: "Failed to load today's tool. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchNewDailyTool = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-daily-tool');
      
      if (error) {
        console.error('Error fetching new daily tool:', error);
        toast({
          title: "Error",
          description: "Failed to fetch today's tool. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Refresh the tool after fetching
      await fetchTodaysTool();
    } catch (error) {
      console.error('Error invoking fetch-daily-tool:', error);
    }
  };

  useEffect(() => {
    fetchTodaysTool();
  }, []);

  const handleToolClick = () => {
    if (dailyTool?.tool_url) {
      window.open(dailyTool.tool_url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 animate-pulse">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!dailyTool) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
        <CardContent className="p-6 text-center">
          <div className="p-3 bg-gray-100 rounded-lg inline-block mb-4">
            <Wrench className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Tool Today</h3>
          <p className="text-gray-500 text-sm mb-4">
            We're working on fetching today's featured tool.
          </p>
          <Button 
            onClick={fetchNewDailyTool}
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200 hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
              Tool of the Day
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{new Date(dailyTool.featured_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
            {dailyTool.tool_name}
          </h4>
          {dailyTool.category && (
            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full mb-3">
              {dailyTool.category}
            </span>
          )}
          <p className="text-gray-600 text-sm leading-relaxed">
            {dailyTool.description || "Discover this amazing AI tool and enhance your productivity today!"}
          </p>
        </div>

        {dailyTool.tool_url && (
          <Button 
            onClick={handleToolClick}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Try This Tool
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
