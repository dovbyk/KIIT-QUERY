
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, BookOpen } from "lucide-react";

interface FeedTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FeedTabs({ activeTab, setActiveTab }: FeedTabsProps) {
  return (
    <Tabs 
      defaultValue="all" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full mb-6 fade-in-up" 
      style={{ animationDelay: '0.2s' }}
    >
      <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 bg-card/60 backdrop-blur-sm">
        <TabsTrigger value="all" className="data-[state=active]:bg-primary/10">
          All
        </TabsTrigger>
        <TabsTrigger value="queries" className="data-[state=active]:bg-primary/10">
          <div className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Queries</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="resources" className="data-[state=active]:bg-primary/10">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Resources</span>
          </div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
