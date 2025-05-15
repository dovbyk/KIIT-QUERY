
import { Query } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useCommunities } from "@/context/CommunityContext";
import { useQueries } from "@/context/QueryContext";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ArrowUp, ArrowDown, MessageSquare, FileText, Link as LinkIcon, BookOpen } from "lucide-react";
import { Badge } from "./ui/badge";
import { users } from "@/data/mockData";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface QueryCardProps {
  query: Query;
}

const QueryCard = ({ query }: QueryCardProps) => {
  const { upvoteQuery, downvoteQuery } = useQueries();
  const { currentUser } = useAuth();
  const { getSubjectById } = useCommunities();

  const author = users.find(user => user.id === query.authorId);
  const subject = getSubjectById(query.subjectId);
  const isResource = query.type === 'resource';

  return (
    <div className={cn(
      "query-card relative overflow-hidden transition-all duration-300",
      isResource 
        ? "bg-gradient-to-br from-card/95 via-card/90 to-accent/10 backdrop-blur-md" 
        : "bg-gradient-to-br from-card/95 to-primary/5 backdrop-blur-md"
    )}>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/60 via-accent/40 to-secondary/60 rounded-t-xl" />
      
      <div className="flex z-10 relative p-0.5">
        {/* Vote Column */}
        <div className="mr-4 flex flex-col items-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            className="upvote-button"
            onClick={() => upvoteQuery(query.id)}
            disabled={!currentUser}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          
          <span className="text-xs font-bold my-0.5">{query.upvotes - query.downvotes}</span>
          
          <Button
            variant="ghost"
            size="sm"
            className="downvote-button"
            onClick={() => downvoteQuery(query.id)}
            disabled={!currentUser}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content Column */}
        <div className="flex-1 pr-3 pt-2">
          <div className="flex items-start">
            <Avatar className="mr-3 h-9 w-9 shadow border border-primary/30">
              <AvatarImage src={author?.avatar} alt={author?.name} />
              <AvatarFallback>{author?.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{author?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(query.createdAt), { addSuffix: true })}
                  </p>
                </div>

                <div className="flex gap-2">
                  {isResource && (
                    <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Resource
                    </Badge>
                  )}
                  
                  {subject && subject.id !== 'educational-resource' && (
                    <Badge variant="secondary" className="bg-secondary/20 backdrop-blur-sm">
                      {subject.name}
                    </Badge>
                  )}
                </div>
              </div>

              <Link 
                to={isResource ? query.fileUrl || "#" : `/query/${query.id}`} 
                target={isResource ? "_blank" : undefined}
                className="block mt-2 hover:text-accent transition-colors"
              >
                <h3 className="text-xl font-bold">{query.title}</h3>
                <p className="mt-2 text-sm opacity-80 line-clamp-3">{query.content}</p>
              
                {isResource && query.fileUrl && (
                  <div className="mt-3 flex items-center gap-2 text-primary hover:text-primary/80">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium hover:underline inline-flex items-center gap-1">
                      View Resource <LinkIcon className="h-3 w-3" />
                    </span>
                  </div>
                )}
                
                {query.imageUrl && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-border">
                    <img 
                      src={query.imageUrl} 
                      alt="Query attachment" 
                      className="max-h-64 w-auto object-contain"
                    />
                  </div>
                )}
              </Link>

              <div className="flex items-center justify-end mt-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{query.comments.length} comments</span>
                  {!isResource && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{query.responses.length} responses</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryCard;
