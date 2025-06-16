
import { useState, useEffect } from 'react';
import { useAPI } from './useAPI';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const useGitHubTrending = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const { request, loading, error } = useAPI({
    baseUrl: 'https://api.github.com',
  });

  const fetchTrendingRepos = async () => {
    console.log('Fetching trending repos from GitHub API...');
    try {
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const dateString = lastWeek.toISOString().split('T')[0];
      
      const data = await request<{ items: GitHubRepo[] }>(
        `/search/repositories?q=created:>${dateString}&sort=stars&order=desc&per_page=6`
      );
      
      console.log('GitHub data received:', data);
      
      if (data?.items && Array.isArray(data.items)) {
        setRepos(data.items);
      } else {
        // Set fallback repos if API fails
        setRepos([
          {
            id: 1,
            name: "react-learning-resources",
            full_name: "riverskills/react-learning-resources",
            description: "Comprehensive collection of React learning materials and tutorials",
            html_url: "#",
            stargazers_count: 234,
            language: "JavaScript",
            topics: ["react", "learning", "tutorial"],
            updated_at: new Date().toISOString(),
            owner: {
              login: "riverskills",
              avatar_url: ""
            }
          },
          {
            id: 2,
            name: "javascript-fundamentals",
            full_name: "riverskills/javascript-fundamentals",
            description: "Essential JavaScript concepts and examples for beginners",
            html_url: "#",
            stargazers_count: 189,
            language: "JavaScript",
            topics: ["javascript", "fundamentals", "education"],
            updated_at: new Date().toISOString(),
            owner: {
              login: "riverskills",
              avatar_url: ""
            }
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      // Set fallback repos
      setRepos([
        {
          id: 1,
          name: "programming-resources",
          full_name: "riverskills/programming-resources",
          description: "Curated list of programming learning resources",
          html_url: "#",
          stargazers_count: 150,
          language: "Markdown",
          topics: ["programming", "resources"],
          updated_at: new Date().toISOString(),
          owner: {
            login: "riverskills",
            avatar_url: ""
          }
        }
      ]);
    }
  };

  useEffect(() => {
    fetchTrendingRepos();
  }, []);

  return { repos, loading, error, refetch: fetchTrendingRepos };
};
