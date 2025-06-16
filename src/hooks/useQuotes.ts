
import { useState, useEffect } from 'react';
import { useAPI } from './useAPI';

interface Quote {
  q: string;
  a: string;
  c: number;
  h: string;
}

export const useQuotes = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const { request, loading } = useAPI({
    baseUrl: 'https://zenquotes.io/api',
  });

  const fetchDailyQuote = async () => {
    const data = await request<Quote[]>('/today');
    if (data && data.length > 0) {
      setQuote(data[0]);
    }
  };

  useEffect(() => {
    fetchDailyQuote();
  }, []);

  return { quote, loading, refetch: fetchDailyQuote };
};
