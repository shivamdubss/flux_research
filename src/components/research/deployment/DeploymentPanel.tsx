import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import LinkGenerator from "./LinkGenerator";

interface DeploymentPanelProps {
  onNext?: () => void;
  deploymentData?: {
    interviewLink?: string;
    isGenerating?: boolean;
  };
  onChange?: (field: string, value: any) => void;
}

const DeploymentPanel = ({
  onNext = () => {},
  deploymentData = {
    interviewLink: "https://interview.example.com/session/abc123",
    isGenerating: false,
  },
  onChange = () => {},
}: DeploymentPanelProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-background">
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Deploy Interview</h2>
          <p className="text-muted-foreground">
            Generate and share the interview link with your research
            participants.
          </p>
        </div>

        <LinkGenerator
          interviewLink={deploymentData.interviewLink}
          isGenerating={deploymentData.isGenerating}
          onGenerate={() => {
            onChange("isGenerating", true);
            // Simulate link generation
            setTimeout(() => {
              onChange("isGenerating", false);
              onChange(
                "interviewLink",
                `https://interview.example.com/session/${Math.random().toString(36).substring(7)}`,
              );
            }, 1500);
          }}
          onCopy={() => {
            navigator.clipboard.writeText(deploymentData.interviewLink);
          }}
        />

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

export default DeploymentPanel;
