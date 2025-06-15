
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatLoadingSkeleton() {
  return (
    <div className="flex flex-col h-full max-h-[80vh] bg-white rounded-lg border border-red-200 shadow-lg">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between p-4 border-b rounded-t-lg bg-red-50 border-red-200">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div>
            <Skeleton className="h-5 w-24 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      {/* Messages Area Skeleton */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {/* Welcome message skeleton */}
        <div className="flex gap-3 justify-start">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="max-w-[80%] rounded-lg px-4 py-3 bg-gray-100">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>

      {/* Input Area Skeleton */}
      <div className="p-4 border-t rounded-b-lg bg-red-50 border-red-200">
        <div className="flex gap-3 items-end">
          <Skeleton className="flex-1 h-11" />
          <Skeleton className="h-11 w-11" />
        </div>
      </div>
    </div>
  );
}
