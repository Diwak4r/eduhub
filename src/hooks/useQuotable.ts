
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
    const data = await request<Quote>('/quotes/random?tags=motivational|success|wisdom');
    if (data) {
      setQuote(data);
    }
  };

  useEffect(() => {
    fetchDailyQuote();
  }, []);

  return { quote, loading, refetch: fetchDailyQuote };
};
