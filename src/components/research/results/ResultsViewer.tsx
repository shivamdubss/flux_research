import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import TranscriptViewer from "./TranscriptViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultsViewerProps {
  onNext?: () => void;
  results?: {
    transcripts: Array<{
      id: string;
      date: string;
      duration: string;
      content: Array<{
        speaker: "ai" | "participant";
        text: string;
        timestamp: string;
      }>;
    }>;
  };
  onDownloadTranscript?: (id: string) => void;
  onCopyTranscript?: (id: string) => void;
}

const ResultsViewer = ({
  onNext = () => {},
  results = {
    transcripts: [
      {
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
      {
        id: "interview-124",
        date: "2024-03-22",
        duration: "30 minutes",
        content: [
          {
            speaker: "ai",
            text: "Welcome to our research session. How are you today?",
            timestamp: "00:00",
          },
          {
            speaker: "participant",
            text: "I'm doing well, thanks for asking.",
            timestamp: "00:03",
          },
        ],
      },
    ],
  },
  onDownloadTranscript = () => {},
  onCopyTranscript = () => {},
}: ResultsViewerProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-background">
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Interview Results</h2>
          <p className="text-muted-foreground">
            Review and analyze the transcripts from your research interviews.
          </p>
        </div>

        <Tabs defaultValue={results.transcripts[0]?.id} className="w-full">
          <TabsList className="w-full justify-start">
            {results.transcripts.map((transcript) => (
              <TabsTrigger
                key={transcript.id}
                value={transcript.id}
                className="flex-1 max-w-[200px]"
              >
                Interview {transcript.id.split("-")[1]}
              </TabsTrigger>
            ))}
          </TabsList>

          {results.transcripts.map((transcript) => (
            <TabsContent key={transcript.id} value={transcript.id}>
              <TranscriptViewer
                transcript={transcript}
                onDownload={() => onDownloadTranscript(transcript.id)}
                onCopy={() => onCopyTranscript(transcript.id)}
              />
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button onClick={onNext} className="w-32">
            Next Step
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ResultsViewer;
