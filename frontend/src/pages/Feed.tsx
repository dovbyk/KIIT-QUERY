import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useQueries } from "@/context/QueryContext";
import { useCommunities } from "@/context/CommunityContext";
import { useNavigate } from "react-router-dom";
import QueryCard from "@/components/QueryCard";
import { Input } from "@/components/ui/input";
import { Search, Filter, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import TopTeachersCard from "@/components/TopTeachersCard";
import TopSubjectsCard from "@/components/TopSubjectsCard";

import FeedSearchBar from "@/components/FeedSearchBar";
import FeedTabs from "@/components/FeedTabs";
import FeedStatsBar from "@/components/FeedStatsBar";
import FeedList from "@/components/FeedList";

const Feed = () => {
  const { currentUser } = useAuth();
  const { queries, teacherResources } = useQueries();
  const { getSubjectById } = useCommunities();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (currentUser) {
    console.log("User authenticated, showing feed");
    setLoading(false);
  }
}, [currentUser]);

  // Create combined feed of queries and resources
  // Ensure we have arrays before trying to map them
  const queriesArray = queries || [];
  const resourcesArray = teacherResources || [];
  
  const allItems = [
    ...queriesArray.map(q => ({ ...q, type: 'query' as const })),
    ...resourcesArray.map(r => ({
      id: r.id,
      title: r.title,
      content: r.description,
      subjectId: 'educational-resource', // Special subject ID for resources
      authorId: r.teacherId,
      createdAt: r.createdAt,
      type: 'resource' as const,
      fileUrl: r.fileUrl,
      fileType: r.fileType,
      upvotes: 0,
      downvotes: 0,
      responses: [],
      comments: []
    }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Filter items to show only those from user's community
  const communityItems = allItems.filter(item => {
    if (!currentUser) return false;
    if (item.type === 'resource') return true; // Always show educational resources
    const subject = getSubjectById(item.subjectId);
    return subject && currentUser.communities.includes(subject.communityId);
  });
  
  // Filter based on search and active tab
  const filteredItems = communityItems.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.type === 'query' && 
       getSubjectById(item.subjectId)?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter based on active tab
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "queries") return item.type === 'query' && matchesSearch;
    if (activeTab === "resources") return item.type === 'resource' && matchesSearch;
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="container py-10 text-center">
        <div className="max-w-md mx-auto glass-morphism p-10 rounded-xl">
          <p className="text-lg">Loading feed...</p>
          <div className="mt-4 h-2 bg-primary/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 px-4 md:px-6 lg:px-8">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        {/* Left side (Top Subjects) */}
        <div className="hidden lg:block lg:col-span-2 h-fit">
          <TopSubjectsCard />
        </div>

        {/* Main Feed */}
        <div className="col-span-1 lg:col-span-7">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col items-start mb-8 fade-in">
              <h1 className="text-3xl font-bold mb-2 text-gradient-primary">Community Feed</h1>
              <p className="text-muted-foreground">Discover queries and resources from your communities</p>
            </div>
            
            <FeedSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <FeedStatsBar filteredLength={filteredItems.length} searchTerm={searchTerm} />
            <FeedList
              filteredItems={filteredItems}
              setSearchTerm={setSearchTerm}
              setActiveTab={setActiveTab}
              searchTerm={searchTerm}
            />
          </div>
        </div>

        {/* Right side (Top Teachers) */}
        <div className="hidden lg:block lg:col-span-3 h-fit">
          <TopTeachersCard />
        </div>
      </div>
    </div>
  );
};

export default Feed;
