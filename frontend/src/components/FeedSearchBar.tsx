
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface FeedSearchBarProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

export default function FeedSearchBar({ searchTerm, setSearchTerm }: FeedSearchBarProps) {
  return (
    <div className="relative w-full mb-8 fade-in-up">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 pr-4 py-6 bg-card/60 backdrop-blur-sm text-lg border-primary/20 shadow-sm"
            placeholder="Search queries, subjects, resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 hover:bg-background/30"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
