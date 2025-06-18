
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, BookmarkPlus, BookmarkMinus, ExternalLink, Filter, Search, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface BookmarkedItem {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'resource' | 'ai-tool';
  category: string;
  url?: string;
  dateBookmarked: Date;
  tags: string[];
  rating?: number;
}

interface BookmarkSystemProps {
  itemId?: string;
  itemTitle?: string;
  itemDescription?: string;
  itemType?: 'course' | 'resource' | 'ai-tool';
  itemCategory?: string;
  itemUrl?: string;
  showBookmarksPanel?: boolean;
}

export default function BookmarkSystem({
  itemId,
  itemTitle,
  itemDescription,
  itemType,
  itemCategory,
  itemUrl,
  showBookmarksPanel = false
}: BookmarkSystemProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const { toast } = useToast();

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('riverskills-bookmarks');
    if (savedBookmarks) {
      const parsed = JSON.parse(savedBookmarks);
      setBookmarks(parsed.map((bookmark: any) => ({
        ...bookmark,
        dateBookmarked: new Date(bookmark.dateBookmarked)
      })));
    }
  }, []);

  // Check if current item is bookmarked
  useEffect(() => {
    if (itemId) {
      setIsBookmarked(bookmarks.some(bookmark => bookmark.id === itemId));
    }
  }, [itemId, bookmarks]);

  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem('riverskills-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = () => {
    if (!itemId || !itemTitle || !itemType) return;

    if (isBookmarked) {
      // Remove bookmark
      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== itemId));
      toast({
        title: "Bookmark removed",
        description: `${itemTitle} has been removed from your bookmarks.`,
      });
    } else {
      // Add bookmark
      const newBookmark: BookmarkedItem = {
        id: itemId,
        title: itemTitle,
        description: itemDescription || '',
        type: itemType,
        category: itemCategory || 'General',
        url: itemUrl,
        dateBookmarked: new Date(),
        tags: [itemCategory || 'General', itemType]
      };
      setBookmarks(prev => [newBookmark, ...prev]);
      toast({
        title: "Bookmark added",
        description: `${itemTitle} has been added to your bookmarks.`,
      });
    }
  };

  const removeBookmark = (bookmarkId: string) => {
    const bookmark = bookmarks.find(b => b.id === bookmarkId);
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
    toast({
      title: "Bookmark removed",
      description: `${bookmark?.title} has been removed from your bookmarks.`,
    });
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    toast({
      title: "All bookmarks cleared",
      description: "Your bookmark list has been cleared.",
    });
  };

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || bookmark.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return '📚';
      case 'resource': return '📖';
      case 'ai-tool': return '🤖';
      default: return '📌';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-700';
      case 'resource': return 'bg-green-100 text-green-700';
      case 'ai-tool': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Single bookmark button component
  if (!showBookmarksPanel && itemId) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={toggleBookmark}
        className={`flex items-center gap-2 ${isBookmarked ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}`}
      >
        {isBookmarked ? (
          <>
            <BookmarkMinus className="w-4 h-4" />
            Bookmarked
          </>
        ) : (
          <>
            <BookmarkPlus className="w-4 h-4" />
            Bookmark
          </>
        )}
      </Button>
    );
  }

  // Full bookmarks panel
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">My Bookmarks</h2>
            <p className="text-gray-600">{bookmarks.length} saved items</p>
          </div>
        </div>
        {bookmarks.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllBookmarks}
            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'course', 'resource', 'ai-tool'].map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className="flex items-center gap-1"
            >
              {type === 'all' ? <Filter className="w-4 h-4" /> : getTypeIcon(type)}
              {type === 'all' ? 'All' : type.replace('-', ' ')}
            </Button>
          ))}
        </div>
      </div>

      {/* Bookmarks List */}
      {filteredBookmarks.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">🔖</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {bookmarks.length === 0 ? 'No bookmarks yet' : 'No matching bookmarks'}
          </h3>
          <p className="text-gray-500">
            {bookmarks.length === 0 
              ? 'Start bookmarking courses, resources, and AI tools to build your learning collection!'
              : 'Try adjusting your search or filter criteria.'
            }
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getTypeIcon(bookmark.type)}</span>
                    <Badge className={`text-xs ${getTypeColor(bookmark.type)}`}>
                      {bookmark.type.replace('-', ' ')}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBookmark(bookmark.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  >
                    <BookmarkMinus className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {bookmark.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 text-sm line-clamp-2">{bookmark.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {bookmark.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-gray-500">
                    {bookmark.dateBookmarked.toLocaleDateString()}
                  </span>
                  {bookmark.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(bookmark.url, '_blank')}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
