
-- Create a table to store resources
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('Articles', 'Tutorials', 'Tools')),
  url TEXT,
  source_id TEXT UNIQUE, -- To prevent duplicates from the same source
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Create an index for better performance
CREATE INDEX idx_resources_type ON public.resources(type);
CREATE INDEX idx_resources_created_at ON public.resources(created_at DESC);
CREATE INDEX idx_resources_source_id ON public.resources(source_id);

-- Enable Row Level Security (make resources publicly readable)
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to active resources
CREATE POLICY "Public can view active resources" 
  ON public.resources 
  FOR SELECT 
  USING (is_active = true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER update_resources_updated_at 
    BEFORE UPDATE ON public.resources 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable pg_cron extension for scheduling (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_net;
