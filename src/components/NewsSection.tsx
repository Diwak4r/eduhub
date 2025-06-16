
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, ExternalLink, RefreshCw } from 'lucide-react';
import { useNewsAPI } from '@/hooks/useNewsAPI';

export default function NewsSection() {
  const { articles, loading, refetch } = useNewsAPI();

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-blue-600" />
          Latest in Tech & AI
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={refetch}
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {articles.slice(0, 3).map((article, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <h4 className="font-medium text-sm mb-1 line-clamp-2">{article.title}</h4>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.source.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(article.url, '_blank')}
                    className="h-6 px-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
