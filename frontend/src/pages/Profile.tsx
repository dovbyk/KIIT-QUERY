
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useQueries } from "@/context/QueryContext";
import { useCommunities } from "@/context/CommunityContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import QueryCard from "@/components/QueryCard";
import { Query } from "@/types";

const Profile = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { queries } = useQueries();
  const { communities, getSubjectById } = useCommunities();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("your-queries");
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  if (!currentUser) return null;
  
  // Get queries relevant to this user (based on role)
  const userQueries = queries.filter(query => 
    currentUser.role === "student" 
      ? query.authorId === currentUser.id 
      : query.responses.some(response => response.teacherId === currentUser.id)
  );
  
  // Get unfulfilled queries (for teachers only)
  const unfulfilledQueries = currentUser.role === "teacher" 
    ? queries.filter(query => {
        // Check if query is in teacher's communities
        const subject = getSubjectById(query.subjectId);
        const isInCommunity = subject && currentUser.communities.includes(subject.communityId);
        
        // Check if query has no responses yet
        const hasNoResponses = query.responses.length === 0;
        
        return isInCommunity && hasNoResponses && query.type !== 'resource';
      })
    : [];
  
  const userCommunities = communities.filter(community => 
    currentUser.communities.includes(community.id)
  );
  
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 overflow-hidden border-primary/20 shadow-lg bg-gradient-to-br from-card/95 to-card/70">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary/60 via-accent/60 to-secondary/60" />
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/30 shadow-md">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl mb-1 text-gradient-primary">{currentUser.name}</CardTitle>
              <CardDescription>{currentUser.email}</CardDescription>
              <Badge className="mt-2 bg-primary/90">{currentUser.role === "student" ? "Student" : "Teacher"}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Communities</h3>
                <ul className="space-y-2">
                  {userCommunities.map(community => (
                    <li key={community.id} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary/70"></span>
                      {community.name}
                    </li>
                  ))}
                </ul>
              </div>
              
              {currentUser.role === "teacher" && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Total Responses:</span>
                      <Badge variant="outline" className="font-mono">{currentUser.responseCount || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pending Queries:</span>
                      <Badge variant="outline" className="font-mono">{unfulfilledQueries.length}</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-card/80 backdrop-blur-sm">
            <TabsTrigger value="your-queries" className="text-sm">
              {currentUser.role === "student" ? "Your Queries" : "Responded Queries"}
            </TabsTrigger>
            {currentUser.role === "teacher" && (
              <TabsTrigger value="unfulfilled-queries" className="text-sm">
                Unfulfilled Queries
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="your-queries" className="mt-0">
            <h2 className="text-xl font-bold mb-4 opacity-80">
              {currentUser.role === "student" ? "Your Queries" : "Queries You've Responded To"}
            </h2>
            
            {userQueries.length > 0 ? (
              <div className="space-y-4">
                {userQueries.map((query, index) => (
                  <div key={query.id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <QueryCard query={query} />
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    {currentUser.role === "student" 
                      ? "You haven't asked any queries yet."
                      : "You haven't responded to any queries yet."}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {currentUser.role === "teacher" && (
            <TabsContent value="unfulfilled-queries" className="mt-0">
              <h2 className="text-xl font-bold mb-4 opacity-80">Unfulfilled Queries</h2>
              
              {unfulfilledQueries.length > 0 ? (
                <div className="space-y-4">
                  {unfulfilledQueries.map((query, index) => (
                    <div key={query.id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <QueryCard query={query} />
                    </div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      There are no unfulfilled queries in your communities.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
