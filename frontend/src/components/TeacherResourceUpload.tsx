import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Upload, FileText } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { TeacherResourceUploadProps } from "@/types";

const TeacherResourceUpload = ({
  onAddResponse,
  onUploadResource,
  loading = false,
}: TeacherResourceUploadProps) => {
  const [resourceUrl, setResourceUrl] = useState("");
  const [resourceType, setResourceType] = useState<"pdf" | "image">("pdf");

  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  const handleAddResponse = () => {
    if (!resourceUrl.trim()) return;
    onAddResponse(resourceUrl, resourceType);
    setResourceUrl("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfFile(file.name);
  };

  const handleUploadResource = () => {
    if (!resourceTitle || !pdfFile) return;
    onUploadResource(resourceTitle, resourceDescription, pdfFile);
    setResourceTitle("");
    setResourceDescription("");
    setPdfFile(null);
  };

  return (
    <div className="mb-8 scale-in">
      <Tabs defaultValue="response">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="response" className="flex-1">
            Add Response
          </TabsTrigger>
          <TabsTrigger value="resource" className="flex-1">
            Share PDF Resource
          </TabsTrigger>
        </TabsList>
        <TabsContent value="response">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Add Response</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resourceUrl">Resource URL (PDF or Image)</Label>
                  <Input
                    id="resourceUrl"
                    placeholder="Enter URL to your response document"
                    value={resourceUrl}
                    onChange={e => setResourceUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resourceType">Resource Type</Label>
                  <Select
                    value={resourceType}
                    onValueChange={value => setResourceType(value as "pdf" | "image")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleAddResponse} disabled={!resourceUrl.trim()} className="w-full">
                  Add Response
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resource">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Share Educational Resource</h2>
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
                <Button
                  onClick={handleUploadResource}
                  disabled={!resourceTitle || !pdfFile}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Share Resource
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherResourceUpload;
