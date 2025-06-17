
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface APIConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

export const useAPI = (config: APIConfig) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const request = useCallback(async <T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${config.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
          ...options?.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('API Request failed:', errorMessage);
      setError(errorMessage);
      
      // Only show toast for non-abort errors
      if (!errorMessage.includes('aborted')) {
        toast({
          title: "API Error",
          description: "Failed to fetch data. Using fallback content.",
          variant: "destructive",
        });
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [config, toast]);

  return { request, loading, error };
};
