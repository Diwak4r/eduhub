
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, RefreshCw, Star } from 'lucide-react';
import { useGitHubTrending } from '@/hooks/useGitHubTrending';

export default function GitHubTrending() {
  const { repos, loading, refetch } = useGitHubTrending();

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Github className="w-5 h-5 text-slate-800" />
          Trending Repositories
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={refetch}
          disabled={loading}
          className="hover:bg-slate-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 bg-slate-100 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {repos.slice(0, 3).map((repo, index) => (
              <div key={index} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                <h4 className="font-medium text-sm mb-1 line-clamp-2 text-slate-800">{repo.name}</h4>
                <p className="text-xs text-slate-600 mb-2 line-clamp-2">{repo.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{repo.language}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-slate-500">{repo.stargazers_count}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(repo.html_url, '_blank')}
                    className="h-6 px-2 hover:bg-slate-100"
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
