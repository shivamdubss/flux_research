import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, Image, Film } from "lucide-react";

interface DocumentUploaderProps {
  files?: Array<{
    name: string;
    type: string;
    size: number;
  }>;
  onUpload?: (files: FileList) => void;
  onRemove?: (fileName: string) => void;
}

const DocumentUploader = ({
  files = [
    { name: "research-context.pdf", type: "application/pdf", size: 2500000 },
    { name: "previous-findings.docx", type: "application/docx", size: 1800000 },
  ],
  onUpload = () => {},
  onRemove = () => {},
}: DocumentUploaderProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      onUpload(droppedFiles);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      onUpload(selectedFiles);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image")) return <Image className="h-4 w-4" />;
    if (fileType.includes("video")) return <Film className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <Card className="w-full p-6 bg-background">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Additional Documents</Label>

        <div
          className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />

          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <div className="space-y-2">
            <p className="text-sm font-medium">Drag and drop files here</p>
            <p className="text-xs text-muted-foreground">
              or click to browse from your computer
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm">Uploaded Files</Label>
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-2 rounded-md bg-accent/50"
                >
                  <div className="flex items-center space-x-2">
                    {getFileIcon(file.type)}
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({formatFileSize(file.size)})
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(file.name)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Upload any additional documents that provide context for the research,
          such as previous findings, user personas, or relevant data.
        </p>
      </div>
    </Card>
  );
};

export default DocumentUploader;
