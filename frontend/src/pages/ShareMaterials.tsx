
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { useQueries } from "@/context/QueryContext";

const ShareMaterials = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { addTeacherResource } = useQueries();
  
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfFile(file.name);
  };

  const handleUploadResource = () => {
    if (!resourceTitle || !pdfFile || !currentUser) return;
    
    addTeacherResource(
      currentUser.id,
      resourceTitle,
      resourceDescription,
      pdfFile,
      "pdf"
    );
    
    navigate("/feed");
  };

  if (!currentUser || currentUser.role !== "teacher") {
    navigate("/feed");
    return null;
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8 text-gradient-primary">Share Educational Materials</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resourceTitle">Resource Title</Label>
                <Input
                  id="resourceTitle"
                  placeholder="Enter a title for your resource"
                  value={resourceTitle}
                  onChange={e => setResourceTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resourceDescription">Description</Label>
                <Textarea
                  id="resourceDescription"
                  placeholder="Describe what this resource contains"
                  value={resourceDescription}
                  onChange={e => setResourceDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pdfUpload">Upload PDF</Label>
                <label
                  htmlFor="pdfUpload"
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors block"
                >
                  {pdfFile ? (
                    <div className="space-y-3">
                      <FileText className="w-10 h-10 mx-auto text-primary" />
                      <p className="text-sm">{pdfFile}</p>
                      <p className="text-xs text-muted-foreground">Click to change file</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload PDF</p>
                    </div>
                  )}
                  <Input
                    id="pdfUpload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => navigate("/feed")}>
                  Cancel
                </Button>
                <Button
                  onClick={handleUploadResource}
                  disabled={!resourceTitle || !pdfFile}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Share Resource
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareMaterials;
