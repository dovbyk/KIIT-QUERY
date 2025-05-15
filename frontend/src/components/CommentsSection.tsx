
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import CommentCard from "./CommentCard";
import { Comment } from "@/types";

interface CommentsSectionProps {
  comments: Comment[];
  isAuthenticated: boolean;
  onAddComment: (comment: string) => void;
}

const CommentsSection = ({
  comments,
  isAuthenticated,
  onAddComment,
}: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="scale-in">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      {isAuthenticated && (
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="md:self-end"
          >
            Comment
          </Button>
        </div>
      )}

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={comment.id} className="fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
              <CommentCard comment={comment} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-4 text-muted-foreground">No comments yet</p>
      )}
    </div>
  );
};

export default CommentsSection;
