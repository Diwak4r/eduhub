
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsResponse {
  articles: NewsArticle[];
  status: string;
  totalResults: number;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
    // Auto-update every 30 minutes
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using NewsAPI.org free tier - requires API key in production
      // For demo purposes, using a mock response structure
      const response = await fetch('https://newsapi.org/v2/top-headlines?category=technology&country=us&pageSize=6&apiKey=demo');
      
      if (!response.ok) {
        // Fallback to mock data for demo
        const mockNews: NewsArticle[] = [
          {
            title: "Latest AI Breakthrough in Education Technology",
            description: "Researchers have developed new AI tools that are revolutionizing how students learn programming and technical skills.",
            url: "https://example.com/ai-education",
            urlToImage: "https://via.placeholder.com/300x200?text=AI+Education",
            publishedAt: new Date().toISOString(),
            source: { name: "Tech News" }
          },
          {
            title: "Programming Languages Trending in 2024",
            description: "A comprehensive look at the most in-demand programming languages for students and professionals this year.",
            url: "https://example.com/programming-trends",
            urlToImage: "https://via.placeholder.com/300x200?text=Programming+2024",
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            source: { name: "Dev Weekly" }
          },
          {
            title: "Free Learning Resources for IT Students",
            description: "Discover the best free platforms and tools available for students pursuing Information Technology degrees.",
            url: "https://example.com/free-resources",
            urlToImage: "https://via.placeholder.com/300x200?text=Free+Resources",
            publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            source: { name: "EduTech Today" }
          }
        ];
        
        setNews(mockNews);
        setLoading(false);
        return;
      }

      const data: NewsResponse = await response.json();
      setNews(data.articles.slice(0, 6));
      
      toast({
        title: "News Updated",
        description: `Loaded ${data.articles.length} latest tech news articles`,
      });
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load latest news');
      
      // Fallback to mock data
      const mockNews: NewsArticle[] = [
        {
          title: "AI Tools Transforming Student Learning",
          description: "How artificial intelligence is making education more accessible and personalized for students worldwide.",
          url: "https://example.com/ai-learning",
          urlToImage: "https://via.placeholder.com/300x200?text=AI+Learning",
          publishedAt: new Date().toISOString(),
          source: { name: "Education Weekly" }
        },
        {
          title: "Best Programming Practices for Beginners",
          description: "Essential coding practices every new programmer should know when starting their journey in software development.",
          url: "https://example.com/programming-basics",
          urlToImage: "https://via.placeholder.com/300x200?text=Programming+Basics",
          publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          source: { name: "Code Academy" }
        }
      ];
      
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Tech News</h2>
            <p className="text-gray-600">Loading the latest updates...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">Latest Tech News</h2>
          </div>
          <p className="text-gray-600 text-lg">Stay updated with the latest in technology and education</p>
          {error && (
            <p className="text-red-500 mt-2">
              {error} - Showing cached content
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {news.map((article, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
              {article.urlToImage && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/300x200?text=News+Image";
                    }}
                  />
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.source.name}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimeAgo(article.publishedAt)}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open(article.url, '_blank')}
                >
                  Read More
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={fetchNews}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {loading ? 'Updating...' : 'Refresh News'}
          </Button>
        </div>
      </div>
    </section>
  );
}
