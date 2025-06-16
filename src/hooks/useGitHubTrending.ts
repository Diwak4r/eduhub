
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
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dateString = lastWeek.toISOString().split('T')[0];
    
    const data = await request<{ items: GitHubRepo[] }>(
      `/search/repositories?q=created:>${dateString}&sort=stars&order=desc&per_page=6`
    );
    
    if (data?.items) {
      setRepos(data.items);
    }
  };

  useEffect(() => {
    fetchTrendingRepos();
  }, []);

  return { repos, loading, error, refetch: fetchTrendingRepos };
};
