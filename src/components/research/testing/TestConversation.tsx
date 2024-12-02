import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, RefreshCw, MessageSquare } from "lucide-react";

interface TestConversationProps {
  script?: string;
  conversation?: Array<{
    speaker: "ai" | "user";
    message: string;
    timestamp: string;
  }>;
  isRecording?: boolean;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  onReset?: () => void;
}

const TestConversation = ({
  script = "Hello! Thank you for participating in our research study today...",
  conversation = [
    {
      speaker: "ai",
      message:
        "Hello! Thank you for participating in our research study today.",
      timestamp: "00:00",
    },
    {
      speaker: "user",
      message: "Hi, thanks for having me.",
      timestamp: "00:03",
    },
    {
      speaker: "ai",
      message: "Could you tell me about your experience with our product?",
      timestamp: "00:05",
    },
  ],
  isRecording = false,
  onStartRecording = () => {},
  onStopRecording = () => {},
  onReset = () => {},
}: TestConversationProps) => {
  return (
    <Card className="w-full p-6 bg-background">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Test Conversation</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={isRecording ? "destructive" : "default"}
              onClick={isRecording ? onStopRecording : onStartRecording}
              className="flex items-center space-x-2"
            >
              {isRecording ? (
                <>
                  <MicOff className="h-4 w-4" />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  <span>Start Recording</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onReset}
              title="Reset Conversation"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-muted/10">
          <p className="text-sm font-medium mb-2">Current Script</p>
          <p className="text-sm text-muted-foreground">{script}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            <p className="text-sm font-medium">Conversation Preview</p>
          </div>

          <ScrollArea className="h-[300px] border rounded-lg p-4">
            <div className="space-y-4">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${message.speaker === "ai" ? "" : "flex-row-reverse space-x-reverse"}`}
                >
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.speaker === "ai" ? "bg-primary" : "bg-secondary"}`}
                  >
                    <span className="text-xs font-medium text-white">
                      {message.speaker === "ai" ? "AI" : "You"}
                    </span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div
                      className={`rounded-lg p-3 ${message.speaker === "ai" ? "bg-muted" : "bg-primary text-primary-foreground"}`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <p className="text-sm text-muted-foreground">
          Test the conversation flow with the AI interviewer. Click the
          microphone button to start/stop recording your responses.
        </p>
      </div>
    </Card>
  );
};

export default TestConversation;
