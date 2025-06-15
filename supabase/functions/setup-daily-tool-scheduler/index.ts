
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Setting up daily tool scheduler...')

    // Create a cron job to fetch daily tools every day at 6 AM UTC
    const { data, error } = await supabase.rpc('cron_schedule', {
      job_name: 'fetch-daily-tool',
      cron_expression: '0 6 * * *', // Every day at 6 AM UTC
      sql_command: `
        SELECT net.http_post(
          url := 'https://utxinrvceloqhqeujanc.supabase.co/functions/v1/fetch-daily-tool',
          headers := '{"Content-Type": "application/json", "Authorization": "Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}"}'::jsonb,
          body := '{"scheduled": true}'::jsonb
        );
      `
    })

    if (error) {
      console.error('Error setting up cron job:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to setup cron job', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Daily tool scheduler setup successfully')
    return new Response(
      JSON.stringify({ message: 'Daily tool scheduler setup successfully', data }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in setup-daily-tool-scheduler:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
