
import QueryCard from "@/components/QueryCard";
import { Button } from "@/components/ui/button";

interface FeedListProps {
  filteredItems: any[];
  setSearchTerm: (s: string) => void;
  setActiveTab: (tab: string) => void;
  searchTerm: string;
}

export default function FeedList({ filteredItems, setSearchTerm, setActiveTab, searchTerm }: FeedListProps) {
  return (
    <div className="space-y-4">
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <div 
            key={item.id} 
            className="fade-in-up" 
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <QueryCard query={item} />
          </div>
        ))
      ) : (
        <div className="text-center py-10 glass-morphism rounded-xl shadow-md backdrop-blur-xl fade-in bg-card/60">
          <p className="text-muted-foreground">
            {searchTerm ? "No items match your search." : "No items available in your community."}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 border-primary/30 hover:bg-primary/10"
            onClick={() => {
              setSearchTerm("");
              setActiveTab("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
