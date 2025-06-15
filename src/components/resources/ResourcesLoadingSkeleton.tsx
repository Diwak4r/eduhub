
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ResourcesLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="pt-20">
        {/* Header Skeleton */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-[600px] mx-auto mb-8" />
            
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <Skeleton className="w-8 h-8 mx-auto mb-2" />
                    <Skeleton className="h-8 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Search Skeleton */}
            <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-6" />
            <Skeleton className="h-10 w-40 mx-auto" />
          </div>
        </section>

        {/* Content Skeleton */}
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-5xl">
            {/* Filters Skeleton */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20" />
              ))}
            </div>
            
            {/* Grid Skeleton */}
            <div className="space-y-12">
              {Array.from({ length: 3 }).map((_, sectionIndex) => (
                <div key={sectionIndex}>
                  <div className="flex items-center gap-4 mb-6">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, cardIndex) => (
                      <Card key={cardIndex} className="p-6">
                        <CardContent className="p-0">
                          <div className="flex items-start gap-4">
                            <Skeleton className="w-12 h-12 rounded-lg" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-6 w-3/4" />
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-2/3" />
                              <div className="flex gap-2 pt-2">
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-18" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
