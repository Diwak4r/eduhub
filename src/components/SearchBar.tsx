
import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="mb-4">
      <Input
        type="search"
        className="w-full max-w-xl"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder || "Search"}
      />
    </div>
  );
}
