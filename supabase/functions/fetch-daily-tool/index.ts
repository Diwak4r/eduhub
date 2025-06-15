
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
    const toolforgeApiKey = Deno.env.get('TOOLFORGE_API_KEY')
    
    if (!toolforgeApiKey) {
      console.error('TOOLFORGE_API_KEY not found')
      return new Response(
        JSON.stringify({ error: 'ToolForge API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if we already have a tool for today
    const today = new Date().toISOString().split('T')[0]
    const { data: existingTool, error: checkError } = await supabase
      .from('daily_tools')
      .select('*')
      .eq('featured_date', today)
      .eq('is_active', true)
      .single()

    if (existingTool && !checkError) {
      console.log('Tool for today already exists:', existingTool.tool_name)
      return new Response(
        JSON.stringify({ message: 'Tool for today already exists', tool: existingTool }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch a random AI tool from ToolForge API
    console.log('Fetching new tool from ToolForge API...')
    const toolforgeResponse = await fetch('https://api.toolforge.ai/tools/random?category=ai', {
      headers: {
        'Authorization': `Bearer ${toolforgeApiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!toolforgeResponse.ok) {
      console.error('ToolForge API error:', toolforgeResponse.status, await toolforgeResponse.text())
      
      // Fallback: Create a sample tool if API fails
      const fallbackTool = {
        id: `fallback-${Date.now()}`,
        name: 'ChatGPT',
        description: 'Advanced AI chatbot powered by OpenAI for conversational AI, content creation, and problem-solving.',
        url: 'https://chat.openai.com',
        image_url: null,
        category: 'AI Assistant'
      }

      const { data: insertedTool, error: insertError } = await supabase
        .from('daily_tools')
        .insert({
          tool_name: fallbackTool.name,
          description: fallbackTool.description,
          tool_url: fallbackTool.url,
          image_url: fallbackTool.image_url,
          category: fallbackTool.category,
          source_tool_id: fallbackTool.id,
          featured_date: today
        })
        .select()
        .single()

      if (insertError) {
        console.error('Error inserting fallback tool:', insertError)
        return new Response(
          JSON.stringify({ error: 'Failed to insert fallback tool' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ message: 'Fallback tool added successfully', tool: insertedTool }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const toolData = await toolforgeResponse.json()
    console.log('Received tool from ToolForge:', toolData)

    // Insert the new daily tool
    const { data: newTool, error: insertError } = await supabase
      .from('daily_tools')
      .insert({
        tool_name: toolData.name || toolData.title || 'Unknown Tool',
        description: toolData.description || toolData.summary || 'No description available',
        tool_url: toolData.url || toolData.website || null,
        image_url: toolData.image_url || toolData.logo || null,
        category: toolData.category || 'AI Tool',
        source_tool_id: toolData.id || toolData._id || null,
        featured_date: today
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting daily tool:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to insert daily tool' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Successfully added daily tool:', newTool.tool_name)
    return new Response(
      JSON.stringify({ message: 'Daily tool added successfully', tool: newTool }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in fetch-daily-tool function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
