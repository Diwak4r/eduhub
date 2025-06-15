
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const RATE_LIMIT_REQUESTS = 20;
export const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

export const GEMINI_MODELS = {
  EXPERIMENTAL: 'gemini-2.0-flash-exp',
  STABLE: 'gemini-1.5-flash'
} as const;
