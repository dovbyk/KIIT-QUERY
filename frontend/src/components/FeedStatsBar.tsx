
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeedStatsBarProps {
  filteredLength: number;
  searchTerm: string;
}

export default function FeedStatsBar({ filteredLength, searchTerm }: FeedStatsBarProps) {
  return (
    <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <span>Showing {filteredLength} items</span>
      </div>
      {searchTerm && (
        <Badge variant="outline" className="bg-primary/5">
          Search: "{searchTerm}"
        </Badge>
      )}
    </div>
  );
}
