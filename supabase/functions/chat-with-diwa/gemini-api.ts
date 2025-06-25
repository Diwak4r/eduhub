
import { GEMINI_MODELS } from './constants.ts';

interface GeminiConfig {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
    candidateCount?: number;
    stopSequences?: string[];
  };
  safetySettings: Array<{
    category: string;
    threshold: string;
  }>;
}

function createGeminiConfig(prompt: string, isExperimental = true): GeminiConfig {
  const baseConfig: GeminiConfig = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH", 
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ]
  };

  if (isExperimental) {
    baseConfig.generationConfig.candidateCount = 1;
    baseConfig.generationConfig.stopSequences = [];
    baseConfig.safetySettings.push({
      category: "HARM_CATEGORY_CIVIC_INTEGRITY",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    });
  }

  return baseConfig;
}

export async function callGeminiAPI(apiKey: string, prompt: string): Promise<string> {
  console.log('Calling new Gemini API...');
  
  // Use the provided API key directly
  const GEMINI_API_KEY = "AIzaSyAas9Qv7vdL2f2uUmJTZ7IVXs2-zrhifFM";
  
  try {
    // Try experimental model first
    const experimentalConfig = createGeminiConfig(prompt, true);
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODELS.EXPERIMENTAL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(experimentalConfig),
      }
    );

    if (geminiResponse.ok) {
      const data = await geminiResponse.json();
      console.log('Gemini response data:', JSON.stringify(data, null, 2));
      
      if (data.candidates && data.candidates.length > 0) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        console.log('Generated response length:', aiResponse.length);
        return aiResponse;
      }
    }

    // Fallback to stable model
    console.log('Trying fallback to stable model...');
    const fallbackConfig = createGeminiConfig(prompt, false);
    const fallbackResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODELS.STABLE}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fallbackConfig),
      }
    );

    if (!fallbackResponse.ok) {
      const fallbackErrorText = await fallbackResponse.text();
      console.error('Fallback Gemini API error:', fallbackResponse.status, fallbackErrorText);
      throw new Error(`AI service error: ${fallbackResponse.status}`);
    }

    const fallbackData = await fallbackResponse.json();
    console.log('Fallback Gemini response data:', JSON.stringify(fallbackData, null, 2));
    
    if (!fallbackData.candidates || fallbackData.candidates.length === 0) {
      throw new Error('Unable to generate response. Please try rephrasing your question.');
    }

    const aiResponse = fallbackData.candidates[0].content.parts[0].text;
    console.log('Generated fallback response length:', aiResponse.length);
    return aiResponse;

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
