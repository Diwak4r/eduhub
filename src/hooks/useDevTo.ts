
import { useState, useEffect } from 'react';
import { useAPI } from './useAPI';

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
  published_at: string;
  user: {
    name: string;
    username: string;
  };
  tags: string[];
  reading_time_minutes: number;
}

export const useDevTo = () => {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const { request, loading, error } = useAPI({
    baseUrl: 'https://dev.to/api',
  });

  const fetchArticles = async () => {
    const data = await request<DevToArticle[]>('/articles?tag=javascript,react,programming,tutorial&top=7');
    
    if (data) {
      setArticles(data.slice(0, 6));
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, loading, error, refetch: fetchArticles };
};
