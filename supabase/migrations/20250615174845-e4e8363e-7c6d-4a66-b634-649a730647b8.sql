
-- Create a table to store daily featured tools
CREATE TABLE public.daily_tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_name TEXT NOT NULL,
  description TEXT,
  tool_url TEXT,
  image_url TEXT,
  category TEXT,
  featured_date DATE NOT NULL DEFAULT CURRENT_DATE,
  source_tool_id TEXT, -- ID from ToolForge API
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Create unique constraint to ensure one tool per day
CREATE UNIQUE INDEX idx_daily_tools_featured_date ON public.daily_tools(featured_date) WHERE is_active = true;

-- Create indexes for better performance
CREATE INDEX idx_daily_tools_category ON public.daily_tools(category);
CREATE INDEX idx_daily_tools_created_at ON public.daily_tools(created_at DESC);

-- Enable Row Level Security (make daily tools publicly readable)
ALTER TABLE public.daily_tools ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to active daily tools
CREATE POLICY "Public can view active daily tools" 
  ON public.daily_tools 
  FOR SELECT 
  USING (is_active = true);

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER update_daily_tools_updated_at 
    BEFORE UPDATE ON public.daily_tools 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
