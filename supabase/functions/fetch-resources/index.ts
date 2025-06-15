
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface ResourceData {
  title: string;
  description: string;
  type: 'Articles' | 'Tutorials' | 'Tools';
  url?: string;
  source_id: string;
}

// Sample function to fetch resources from an external API
// You can replace this with actual API calls to your preferred sources
async function fetchResourcesFromAPI(): Promise<ResourceData[]> {
  // This is a mock implementation - replace with actual API calls
  const mockResources: ResourceData[] = [
    {
      title: "Advanced React Patterns in 2024",
      description: "Learn the latest React patterns and best practices for modern web development.",
      type: "Articles",
      url: "https://example.com/react-patterns-2024",
      source_id: "react_patterns_2024"
    },
    {
      title: "Building Scalable APIs with Node.js",
      description: "A comprehensive guide to creating robust and scalable backend services.",
      type: "Tutorials",
      url: "https://example.com/nodejs-scalable-apis",
      source_id: "nodejs_apis_guide"
    },
    {
      title: "VS Code Extensions for Developers",
      description: "Essential VS Code extensions that boost productivity for developers.",
      type: "Tools",
      url: "https://example.com/vscode-extensions",
      source_id: "vscode_extensions_2024"
    }
  ];

  // Add timestamp to source_id to simulate new resources
  const timestamp = new Date().toISOString().split('T')[0];
  return mockResources.map(resource => ({
    ...resource,
    source_id: `${resource.source_id}_${timestamp}`
  }));
}

async function addResourcesToDatabase(resources: ResourceData[]) {
  const results = [];
  
  for (const resource of resources) {
    try {
      // Check if resource already exists
      const { data: existing } = await supabase
        .from('resources')
        .select('id')
        .eq('source_id', resource.source_id)
        .single();

      if (!existing) {
        // Insert new resource
        const { data, error } = await supabase
          .from('resources')
          .insert([resource])
          .select();

        if (error) {
          console.error('Error inserting resource:', error);
          results.push({ success: false, resource: resource.title, error: error.message });
        } else {
          console.log('Successfully added resource:', resource.title);
          results.push({ success: true, resource: resource.title, data });
        }
      } else {
        console.log('Resource already exists:', resource.title);
        results.push({ success: true, resource: resource.title, message: 'Already exists' });
      }
    } catch (error) {
      console.error('Error processing resource:', error);
      results.push({ success: false, resource: resource.title, error: error.message });
    }
  }

  return results;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting resource fetch process...');
    
    // Fetch resources from external sources
    const resources = await fetchResourcesFromAPI();
    console.log(`Fetched ${resources.length} resources from external sources`);

    // Add resources to database
    const results = await addResourcesToDatabase(resources);
    
    const successCount = results.filter(r => r.success).length;
    const errorCount = results.filter(r => !r.success).length;

    console.log(`Process completed: ${successCount} successful, ${errorCount} errors`);

    return new Response(JSON.stringify({
      success: true,
      message: `Resource fetch completed: ${successCount} successful, ${errorCount} errors`,
      results,
      totalFetched: resources.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fetch-resources function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: 'Failed to fetch resources',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
