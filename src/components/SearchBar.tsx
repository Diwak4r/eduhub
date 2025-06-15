
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchBar({ value, onChange, placeholder, className }: Props) {
  return (
    <div className={`relative w-full ${className || ''}`}>
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
      <Input
        type="search"
        className="w-full pl-14 pr-4 py-3 text-md rounded-full border-gray-200 focus:border-blue-500 shadow-lg border-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder || "Search"}
      />
    </div>
  );
}
