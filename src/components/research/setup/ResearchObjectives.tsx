import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ResearchObjectivesProps {
  objectives?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

const ResearchObjectives = ({
  objectives = "We want to understand how users interact with our product and identify key pain points in the user experience.",
  onChange = () => {},
  maxLength = 500,
}: ResearchObjectivesProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      onChange(value);
    }
  };

  return (
    <Card className="w-full p-6 bg-background">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="objectives" className="text-base font-semibold">
            Research Objectives
          </Label>
          <span className="text-sm text-muted-foreground">
            {objectives.length}/{maxLength} characters
          </span>
        </div>

        <Textarea
          id="objectives"
          value={objectives}
          onChange={handleChange}
          placeholder="Enter your research objectives here..."
          className="min-h-[120px] resize-none"
          aria-describedby="objectives-description"
        />

        <p
          id="objectives-description"
          className="text-sm text-muted-foreground"
        >
          Clearly define what you want to learn from this research project. Be
          specific about your goals and desired outcomes.
        </p>
      </div>
    </Card>
  );
};

export default ResearchObjectives;
