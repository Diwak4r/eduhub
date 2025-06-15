
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import ResourcesHeader from "@/components/resources/ResourcesHeader";
import ResourcesFilters from "@/components/resources/ResourcesFilters";
import ResourcesGrid from "@/components/resources/ResourcesGrid";
import { useResources } from "@/hooks/useResources";
import { sectionStyles } from "@/utils/resourceSectionStyles";

export default function Resources() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const { resources, loading, refreshing, handleRefreshResources } = useResources();

  // Group resources by type and filter by search
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    
    if (
      (selectedType === "all" || resource.type === selectedType) &&
      (resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description?.toLowerCase().includes(search.toLowerCase()))
    ) {
      acc[resource.type].push(resource);
    }
    
    return acc;
  }, {} as Record<string, typeof resources>);

  const handleResourceClick = (url?: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const resourceTypes = ["all", ...Object.keys(sectionStyles)];
  const totalResources = resources.length;
  const filteredCount = Object.values(groupedResources).reduce((sum, items) => sum + items.length, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <main className="pt-20">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-lg text-gray-600">Loading resources...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="pt-20">
        <ResourcesHeader
          totalResources={totalResources}
          categoryCount={resourceTypes.length - 1}
          onRefresh={handleRefreshResources}
          refreshing={refreshing}
          search={search}
          onSearchChange={setSearch}
        />

        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <ResourcesFilters
              resourceTypes={resourceTypes}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
            
            <ResourcesGrid
              groupedResources={groupedResources}
              sectionStyles={sectionStyles}
              onResourceClick={handleResourceClick}
              filteredCount={filteredCount}
              totalResources={totalResources}
              selectedType={selectedType}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
