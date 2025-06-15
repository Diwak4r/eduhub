
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResourcesFiltersProps {
  resourceTypes: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export default function ResourcesFilters({
  resourceTypes,
  selectedType,
  onTypeChange,
}: ResourcesFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {resourceTypes.map((type) => (
        <Button
          key={type}
          variant={selectedType === type ? "default" : "outline"}
          size="sm"
          onClick={() => onTypeChange(type)}
          className={cn(
            "transition-all duration-300",
            selectedType === type 
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
              : "hover:bg-blue-50"
          )}
        >
          <Filter className="w-4 h-4 mr-2" />
          {type === "all" ? "All" : type}
        </Button>
      ))}
    </div>
  );
}
