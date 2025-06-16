
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
    console.log('Fetching articles from Dev.to API...');
    try {
      const data = await request<DevToArticle[]>('/articles?tag=javascript,react,programming,tutorial&top=7');
      console.log('Articles data received:', data);
      
      if (data && Array.isArray(data)) {
        setArticles(data.slice(0, 6));
      } else {
        // Set fallback articles if API fails
        setArticles([
          {
            id: 1,
            title: "Getting Started with React Hooks",
            description: "Learn the basics of React Hooks and how to use them effectively in your projects.",
            url: "#",
            cover_image: "",
            published_at: new Date().toISOString(),
            user: { name: "RiverSkills", username: "riverskills" },
            tags: ["react", "javascript"],
            reading_time_minutes: 5
          },
          {
            id: 2,
            title: "JavaScript ES6 Features You Should Know",
            description: "Essential ES6 features that every JavaScript developer should master.",
            url: "#",
            cover_image: "",
            published_at: new Date().toISOString(),
            user: { name: "RiverSkills", username: "riverskills" },
            tags: ["javascript", "es6"],
            reading_time_minutes: 8
          },
          {
            id: 3,
            title: "Building Responsive Web Applications",
            description: "Best practices for creating responsive and mobile-friendly web applications.",
            url: "#",
            cover_image: "",
            published_at: new Date().toISOString(),
            user: { name: "RiverSkills", username: "riverskills" },
            tags: ["css", "responsive"],
            reading_time_minutes: 6
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Set fallback articles
      setArticles([
        {
          id: 1,
          title: "Programming Best Practices",
          description: "Essential programming practices for beginners and professionals.",
          url: "#",
          cover_image: "",
          published_at: new Date().toISOString(),
          user: { name: "RiverSkills", username: "riverskills" },
          tags: ["programming"],
          reading_time_minutes: 7
        }
      ]);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, loading, error, refetch: fetchArticles };
};
