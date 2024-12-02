import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";

interface TranscriptViewerProps {
  transcript?: {
    id: string;
    date: string;
    duration: string;
    content: Array<{
      speaker: "ai" | "participant";
      text: string;
      timestamp: string;
    }>;
  };
  onDownload?: () => void;
  onCopy?: () => void;
}

const TranscriptViewer = ({
  transcript = {
    id: "interview-123",
    date: "2024-03-21",
    duration: "45 minutes",
    content: [
      {
        speaker: "ai",
        text: "Hello and welcome to our research interview. Thank you for taking the time to speak with us today.",
        timestamp: "00:00",
      },
      {
        speaker: "participant",
        text: "Thank you for having me. I'm looking forward to sharing my experiences.",
        timestamp: "00:05",
      },
      {
        speaker: "ai",
        text: "Great! Let's start by discussing your overall experience with our product.",
        timestamp: "00:10",
      },
    ],
  },
  onDownload = () => {},
  onCopy = () => {},
}: TranscriptViewerProps) => {
  return (
    <Card className="w-full p-6 bg-background">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Interview Transcript</h3>
            <div className="text-sm text-muted-foreground space-x-4">
              <span>ID: {transcript.id}</span>
              <span>Date: {transcript.date}</span>
              <span>Duration: {transcript.duration}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCopy}
              className="flex items-center space-x-2"
            >
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[400px] border rounded-lg p-4">
          <div className="space-y-4">
            {transcript.content.map((entry, index) => (
              <div key={index} className="flex space-x-4">
                <div className="w-20 flex-shrink-0">
                  <span className="text-sm text-muted-foreground">
                    {entry.timestamp}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span
                      className={`text-sm font-medium ${entry.speaker === "ai" ? "text-primary" : "text-secondary-foreground"}`}
                    >
                      {entry.speaker === "ai"
                        ? "AI Interviewer"
                        : "Participant"}
                    </span>
                  </div>
                  <p className="text-sm">{entry.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <p className="text-sm text-muted-foreground">
          This transcript has been automatically generated from the interview
          recording. You can download it or copy the content for further
          analysis.
        </p>
      </div>
    </Card>
  );
};

export default TranscriptViewer;
