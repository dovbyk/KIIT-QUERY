
import { Response } from "@/types";
import { users } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { FileText, FileImage, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";

interface ResponseCardProps {
  response: Response;
}

const ResponseCard = ({ response }: ResponseCardProps) => {
  const teacher = users.find(user => user.id === response.teacherId);

  return (
    <Card className="p-6 mb-4 glass-morphism relative border-2 border-primary/20 shadow-xl overflow-hidden animate-fade-in">
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-primary/60 via-accent/60 to-secondary/60 rounded-t-lg z-0" />
      <div className="flex items-start z-10 relative">
        <Avatar className="mr-4 border-2 border-primary/75 shadow-md">
          <AvatarImage src={teacher?.avatar} alt={teacher?.name} />
          <AvatarFallback>{teacher?.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{teacher?.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(response.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 glass-morphism flex items-center gap-4 rounded-lg border border-primary/10 shadow">
            {response.resourceType === "pdf" ? (
              <FileText className="h-6 w-6 opacity-80" />
            ) : (
              <FileImage className="h-6 w-6 opacity-80" />
            )}
            <span>
              <span className="text-lg font-semibold">
                {response.resourceType === "pdf" ? "PDF Document" : "Image"} Response
              </span>
              <span className="block text-sm mt-1 text-muted-foreground">by teacher</span>
            </span>
            <Button size="sm" asChild className="ml-auto btn-primary shadow-sm">
              <a href={response.resourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <ExternalLink className="h-4 w-4" />
                View
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResponseCard;
