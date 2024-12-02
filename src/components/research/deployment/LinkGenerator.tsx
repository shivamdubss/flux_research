import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Link as LinkIcon } from "lucide-react";

interface LinkGeneratorProps {
  interviewLink?: string;
  onCopy?: () => void;
  onGenerate?: () => void;
  isGenerating?: boolean;
}

const LinkGenerator = ({
  interviewLink = "https://interview.example.com/session/abc123",
  onCopy = () => {},
  onGenerate = () => {},
  isGenerating = false,
}: LinkGeneratorProps) => {
  return (
    <Card className="w-full p-6 bg-background">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-semibold">Interview Link</Label>
            <p className="text-sm text-muted-foreground">
              Share this link with your research participants
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex items-center space-x-2"
          >
            <LinkIcon className="h-4 w-4" />
            <span>{isGenerating ? "Generating..." : "Generate New Link"}</span>
          </Button>
        </div>

        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              value={interviewLink}
              readOnly
              className="font-mono text-sm"
            />
          </div>
          <Button
            variant="secondary"
            size="icon"
            onClick={onCopy}
            className="flex-shrink-0"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-start space-x-2 text-sm text-muted-foreground">
          <LinkIcon className="h-4 w-4 mt-0.5" />
          <p>
            This link will remain active for the duration of your research
            project. You can generate a new link at any time if needed.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default LinkGenerator;
