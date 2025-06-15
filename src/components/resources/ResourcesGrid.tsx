
import React from "react";
import EnhancedResourceCard from "@/components/EnhancedResourceCard";
import { getRandomDuration, getRandomRating, getRandomDifficulty } from "@/data/staticResources";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: string;
  url: string | null;
  created_at: string;
}

interface ResourcesGridProps {
  groupedResources: Record<string, Resource[]>;
  sectionStyles: { [key: string]: { icon: React.ReactNode; borderColor: string } };
  onResourceClick: (url?: string | null) => void;
  filteredCount: number;
  totalResources: number;
  selectedType: string;
}

export default function ResourcesGrid({
  groupedResources,
  sectionStyles,
  onResourceClick,
  filteredCount,
  totalResources,
  selectedType,
}: ResourcesGridProps) {
  if (filteredCount === 0) {
    return (
      <div className="text-center py-16 bg-white/50 rounded-lg shadow-sm">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">No resources found</h3>
        <p className="text-gray-500">Try adjusting your search terms or refresh to load new resources.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {filteredCount > 0 && (
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing {filteredCount} of {totalResources} resources
            {selectedType !== "all" && ` in ${selectedType}`}
          </p>
        </div>
      )}
      
      {Object.entries(groupedResources).map(
        ([type, items]) =>
          items.length > 0 && (
            <div key={type} className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white rounded-xl shadow-md">
                  {sectionStyles[type]?.icon}
                </div>
                <h2 className="text-3xl font-bold text-gray-800">{type}</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <EnhancedResourceCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    type={item.type}
                    url={item.url}
                    created_at={item.created_at}
                    borderColor={sectionStyles[type]?.borderColor}
                    icon={sectionStyles[type]?.icon}
                    duration={getRandomDuration()}
                    rating={getRandomRating()}
                    difficulty={getRandomDifficulty()}
                    onClick={() => onResourceClick(item.url)}
                  />
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  );
}
