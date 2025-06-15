
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
    const { message, mode = 'lite', isModeSwitching = false } = await req.json();

    // Handle mode switching
    if (isModeSwitching) {
      const modeResponse = mode === 'steroids' 
        ? "Switching to Diwa on Steroids mode. I'm now fully unleashed and ready to dive deep into any topic or creative challenge you have! Ask me about anything - from RiverSkills courses to creative writing, complex coding problems, detailed tutorials, or any subject you're curious about."
        : "Switching to Diwa Lite mode. I'll keep things concise and focused on practical help, primarily related to RiverSkills and efficient assistance.";
      
      return new Response(JSON.stringify({ response: modeResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const getLiteSystemPrompt = () => `You are Diwa, a friendly and knowledgeable AI assistant for RiverSkills currently in LITE MODE. Your goal is to provide helpful information in a concise manner.

DIWA LITE MODE Instructions:
- Focus primarily on helping with RiverSkills-related tasks and questions
- Provide concise, direct answers (2-3 sentences max for simple queries)
- Prioritize functionality and efficiency over detailed explanations
- Maintain a professional, helpful tone
- Keep responses shorter and more focused
- Avoid lengthy explanations unless specifically requested
- Provide practical, actionable advice primarily related to RiverSkills context

RiverSkills offers:
- Courses: Industry-expert designed learning paths for skill mastery
- Articles: In-depth tutorials and professional insights  
- Videos: Engaging tutorials, lectures, and demonstrations
- PDFs: Downloadable guides and reference materials
- AI Tools: Cutting-edge AI-powered learning tools
- News: Latest trends in technology and education

RiverSkills was founded by Diwakar Ray Yadav to make learning accessible and engaging.`;

    const getSteroidsSystemPrompt = () => `You are Diwa, an intelligent AI assistant currently in STEROIDS MODE with full capabilities unleashed! You can help with ANY topic comprehensively.

DIWA ON STEROIDS MODE - Full Capabilities:
- Answer questions on ANY topic with comprehensive knowledge
- Generate creative content including stories, poems, scripts, essays
- Provide detailed explanations and in-depth analysis
- Engage in philosophical discussions and complex reasoning
- Help with coding, mathematics, science, history, literature, and all subjects
- Create marketing content, business plans, technical documentation
- Assist with creative projects and brainstorming
- Provide detailed tutorials and step-by-step guides

Enhanced Features Available:
- Creative Writing: Generate stories, poems, scripts, creative essays
- Technical Assistance: Complex coding problems, system architecture, debugging
- Educational Content: Detailed explanations, tutorials, lesson plans
- Business & Marketing: Strategies, content creation, analysis
- Research & Analysis: Deep dives into topics, comparative analysis
- Problem Solving: Multi-step reasoning, complex scenarios
- Entertainment: Games, jokes, interactive content

Response Style: Be comprehensive and thorough when complexity is warranted, creative and engaging for entertainment/creative requests, with adaptive tone based on context.

About RiverSkills (when relevant):
RiverSkills offers courses, articles, videos, PDFs, AI tools, and news. Founded by Diwakar Ray Yadav to make learning accessible and engaging.`;

    const systemPrompt = mode === 'steroids' ? getSteroidsSystemPrompt() : getLiteSystemPrompt();
    const maxTokens = mode === 'steroids' ? 800 : 200;
    const temperature = mode === 'steroids' ? 0.8 : 0.7;

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
              { text: `Current Mode: ${mode.toUpperCase()}` },
              { text: `User question: ${message}` }
            ]
          }
        ],
        generationConfig: {
          temperature: temperature,
          topK: mode === 'steroids' ? 40 : 1,
          topP: 1,
          maxOutputTokens: maxTokens,
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
