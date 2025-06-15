
import { useState } from "react";
import { BookOpen, TrendingUp, Globe, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";

interface ResourcesHeaderProps {
  totalResources: number;
  categoryCount: number;
  onRefresh: () => void;
  refreshing: boolean;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ResourcesHeader({
  totalResources,
  categoryCount,
  onRefresh,
  refreshing,
  search,
  onSearchChange,
}: ResourcesHeaderProps) {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg opacity-30 animate-bounce"></div>
      
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in-up pb-2">
          Learning Resources
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Discover the best free learning resources from across the web. All links are carefully curated and regularly updated.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{totalResources}+</div>
              <div className="text-gray-600">Total Resources</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{categoryCount}</div>
              <div className="text-gray-600">Categories</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">100%</div>
              <div className="text-gray-600">Free Resources</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto animate-fade-in-up mb-6" style={{ animationDelay: '0.4s' }}>
          <SearchBar value={search} onChange={onSearchChange} placeholder="Search for courses, tutorials, tools..." />
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Button 
            onClick={onRefresh}
            disabled={refreshing}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {refreshing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Resources
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
