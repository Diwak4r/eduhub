
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { useQuotable } from '@/hooks/useQuotable';

export default function DailyQuote() {
  const { quote, loading } = useQuotable();

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!quote) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <Quote className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <p className="text-gray-800 font-medium mb-2 italic">"{quote.content}"</p>
            <p className="text-sm text-gray-600">— {quote.author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
