
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { schedule = '0 0 */2 * *' } = await req.json().catch(() => ({})); // Default: every 2 days at midnight

    // Create or update the cron job for resource fetching
    const cronSQL = `
      SELECT cron.schedule(
        'fetch-resources-job',
        '${schedule}',
        $$
        SELECT
          net.http_post(
              url:='${supabaseUrl}/functions/v1/fetch-resources',
              headers:='{"Content-Type": "application/json", "Authorization": "Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}"}'::jsonb,
              body:='{"scheduled": true}'::jsonb
          ) as request_id;
        $$
      );
    `;

    const { data, error } = await supabase.rpc('exec_sql', { sql: cronSQL });

    if (error) {
      console.error('Error setting up cron job:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to setup resource fetching schedule',
        details: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Resource fetching schedule set up successfully');

    return new Response(JSON.stringify({
      success: true,
      message: 'Resource fetching scheduled successfully',
      schedule: schedule,
      description: 'Resources will be automatically fetched based on the specified schedule'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in setup-resource-scheduler function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to setup resource scheduler',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
