
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useQueries } from "@/context/QueryContext";
import { useCommunities } from "@/context/CommunityContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileImage, Upload } from "lucide-react";

const AskQuery = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { currentUser, isAuthenticated } = useAuth();
  const { createQuery } = useQueries();
  const { getSubjectsByCommunitiesIds } = useCommunities();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated || currentUser?.role !== "student") {
      navigate("/");
    }
  }, [isAuthenticated, currentUser, navigate]);
  
  const subjects = currentUser ? getSubjectsByCommunitiesIds(currentUser.communities) : [];
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, we would upload to a storage service
    // For demo purposes, we'll simulate it with a URL
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSubject) {
      alert("Please select a subject");
      return;
    }
    
    setIsLoading(true);
    
    if (currentUser) {
      createQuery(title, content, selectedSubject, currentUser.id, imageUrl);
      setIsLoading(false);
      navigate("/feed");
    }
  };
  
  return (
    <div className="container max-w-2xl mx-auto py-12">
      <Card className="slide-in-right">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Ask a Query</CardTitle>
          <CardDescription>
            Post your academic question to get answers from teachers
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Query Title</Label>
              <Input 
                id="title" 
                placeholder="Enter a descriptive title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="fade-in"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Query Details</Label>
              <Textarea 
                id="content" 
                placeholder="Describe your query in detail" 
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="fade-in"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Attach Image (Optional)</Label>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label 
                  htmlFor="image-upload" 
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors fade-in"
                >
                  {imageUrl ? (
                    <div className="space-y-3">
                      <img src={imageUrl} alt="Preview" className="max-h-40 mx-auto object-contain" />
                      <p className="text-sm text-muted-foreground">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <FileImage className="w-10 h-10 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload an image</p>
                    </div>
                  )}
                </Label>
                <Input 
                  id="image-upload" 
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select onValueChange={setSelectedSubject} required>
                <SelectTrigger className="fade-in">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full fade-in-up" type="submit" disabled={isLoading}>
              {isLoading ? (
                "Posting..."
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Post Query
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AskQuery;
