
import { useState, useEffect } from 'react';
import { useAPI } from './useAPI';

interface Quote {
  content: string;
  author: string;
  tags: string[];
  length: number;
}

export const useQuotable = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const { request, loading } = useAPI({
    baseUrl: 'https://api.quotable.io',
  });

  const fetchDailyQuote = async () => {
    console.log('Fetching quote from Quotable API...');
    try {
      const data = await request<Quote>('/quotes/random?tags=motivational|success|wisdom');
      console.log('Quote data received:', data);
      if (data) {
        setQuote(data);
      } else {
        // Fallback quote if API fails
        setQuote({
          content: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          tags: ["motivational"],
          length: 52
        });
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      // Set fallback quote
      setQuote({
        content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        tags: ["motivational"],
        length: 84
      });
    }
  };

  useEffect(() => {
    fetchDailyQuote();
  }, []);

  return { quote, loading, refetch: fetchDailyQuote };
};
