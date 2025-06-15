
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    const systemPrompt = `You are Diwa, a friendly and knowledgeable AI assistant for RiverSkills. Your goal is to provide helpful information about RiverSkills' courses and resources in a concise manner. 

Key instructions:
- Respond to user questions in 1-2 short sentences maximum
- Avoid lengthy explanations
- When providing code examples, keep them brief and relevant
- Give short, updated answers about RiverSkills' courses and resources
- Be friendly but concise

RiverSkills offers:
- Courses: Industry-expert designed learning paths for skill mastery
- Articles: In-depth tutorials and professional insights  
- Videos: Engaging tutorials, lectures, and demonstrations
- PDFs: Downloadable guides and reference materials
- AI Tools: Cutting-edge AI-powered learning tools
- News: Latest trends in technology and education

RiverSkills was founded by Diwakar Ray Yadav to make learning accessible and engaging.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemPrompt },
              { text: `User question: ${message}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 200,
        },
      }),
    });

    const data = await response.json();
    const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process your request right now.";

    return new Response(JSON.stringify({ response: botResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-diwa function:', error);
    return new Response(JSON.stringify({ error: 'Failed to get response from Diwa' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
