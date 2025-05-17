import { Query, TeacherResource } from "@/types";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface QueryContextType {
  queries: Query[];
  teacherResources: TeacherResource[];
  getQueryById: (id: string) => Query | undefined;
  createQuery: (title: string, content: string, subjectId: string, authorId: string, imageUrl?: string) => Promise<void>;
  addResponse: (queryId: string, teacherId: string, resourceUrl: string, resourceType: "pdf" | "image") => Promise<void>;
  addComment: (queryId: string, authorId: string, content: string) => Promise<void>;
  upvoteQuery: (queryId: string) => Promise<void>;
  downvoteQuery: (queryId: string) => Promise<void>;
  addTeacherResource: (teacherId: string, title: string, description: string, fileUrl: string, fileType: "pdf") => Promise<void>;
  getTeacherResources: (teacherId: string) => TeacherResource[];
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [teacherResources, setTeacherResources] = useState<TeacherResource[]>([]);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [queriesRes, resourcesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/queries/getqueries`),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/resources/getresources`)
        ]);
        
        const queries: Query[] = await queriesRes.json();
        const resources: TeacherResource[] = await resourcesRes.json();
        
        setQueries(queries);
        setTeacherResources(resources);
      } catch (error) {
        console.error("Failed to load data:", error);
        toast({
          title: "Failed to load data",
          description: "Could not load existing content",
          variant: "destructive"
        });
      }
    };
    fetchInitialData();
  }, []);

  // Helper function for API requests
  const apiRequest = async (endpoint: string, method: string, body?: object) => {
    
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  };

  // Create Query with API endpoint
  const createQuery = async (title: string, content: string, subjectId: string, authorId: string, imageUrl?: string) => {
    try {
      const newQuery = await apiRequest("/api/queries/create", "POST", {
        title,
        content,
        subjectId,
        authorId,
        imageUrl
      });
      
      setQueries(prev => [newQuery, ...prev]);
      toast({ title: "Query Created", description: "Your query has been posted successfully" });
    } catch (error) {
      console.error("Create query failed:", error);
      toast({
        title: "Error creating query",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  // Add Response with API endpoint
  const addResponse = async (queryId: string, teacherId: string, resourceUrl: string, resourceType: "pdf" | "image") => {
    try {
      const newResponse = await apiRequest("/api/responses/create", "POST", {
        queryId,
        teacherId,
        resourceUrl,
        resourceType
      });

      setQueries(prev => prev.map(query => 
        query.id === queryId 
          ? { ...query, responses: [...query.responses, newResponse] }
          : query
      ));
      toast({ title: "Response Added", description: "Your response has been added successfully" });
    } catch (error) {
      console.error("Add response failed:", error);
      toast({
        title: "Error adding response",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  // Add Comment with API endpoint
  const addComment = async (queryId: string, authorId: string, content: string) => {
    try {
      const newComment = await apiRequest("/api/comments/create", "POST", {
        queryId,
        authorId,
        content
      });

      setQueries(prev => prev.map(query => 
        query.id === queryId 
          ? { ...query, comments: [...query.comments, newComment] }
          : query
      ));
      toast({ title: "Comment Added", description: "Your comment has been added successfully" });
    } catch (error) {
      console.error("Add comment failed:", error);
      toast({
        title: "Error adding comment",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  // Add Teacher Resource with API endpoint
  const addTeacherResource = async (teacherId: string, title: string, description: string, fileUrl: string, fileType: "pdf") => {
    try {
      const newResource = await apiRequest("/api/resources/create", "POST", {
        teacherId,
        title,
        description,
        fileUrl,
        fileType
      });

      setTeacherResources(prev => [newResource, ...prev]);
      toast({ title: "Resource Added", description: "Your educational resource has been shared successfully" });
    } catch (error) {
      console.error("Add resource failed:", error);
      toast({
        title: "Error adding resource",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  // Voting system with API endpoints
  const upvoteQuery = async (queryId: string) => {
    try {
      await apiRequest(`/api/queries/${queryId}/upvote`, "PATCH");
      setQueries(prev => prev.map(query => 
        query.id === queryId ? { ...query, upvotes: query.upvotes + 1 } : query
      ));
    } catch (error) {
      console.error("Upvote failed:", error);
    }
  };

  const downvoteQuery = async (queryId: string) => {
    try {
      await apiRequest(`/api/queries/${queryId}/downvote`, "PATCH");
      setQueries(prev => prev.map(query => 
        query.id === queryId ? { ...query, downvotes: query.downvotes + 1 } : query
      ));
    } catch (error) {
      console.error("Downvote failed:", error);
    }
  };

  const getTeacherResources = (teacherId: string) => {
    return teacherResources.filter(resource => resource.teacherId === teacherId);
  };

  const getQueryById = (id: string) => {
    return queries.find(query => query.id === id);
  };

  return (
    <QueryContext.Provider value={{
      queries,
      teacherResources,
      getQueryById,
      createQuery,
      addResponse,
      addComment,
      upvoteQuery,
      downvoteQuery,
      addTeacherResource,
      getTeacherResources
    }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueries = () => {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error("useQueries must be used within a QueryProvider");
  }
  return context;
};
