
import { useState, useEffect } from 'react';
import { useAPI } from './useAPI';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export const useNewsAPI = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const { request, loading, error } = useAPI({
    baseUrl: 'https://gnews.io/api/v4',
  });

  const fetchTechNews = async () => {
    const data = await request<{ articles: NewsArticle[] }>(
      '/search?q=technology%20programming%20AI&lang=en&country=any&max=6&apikey=demo'
    );
    
    if (data?.articles) {
      setArticles(data.articles);
    }
  };

  useEffect(() => {
    fetchTechNews();
  }, []);

  return { articles, loading, error, refetch: fetchTechNews };
};
