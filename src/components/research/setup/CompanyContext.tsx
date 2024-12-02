import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CompanyContextProps {
  context?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

const CompanyContext = ({
  context = "We are a SaaS company focused on improving customer experience through AI-powered solutions. Our platform helps businesses automate and enhance their customer interactions.",
  onChange = () => {},
  maxLength = 1000,
}: CompanyContextProps) => {
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
          <Label htmlFor="company-context" className="text-base font-semibold">
            Company Context
          </Label>
          <span className="text-sm text-muted-foreground">
            {context.length}/{maxLength} characters
          </span>
        </div>

        <Textarea
          id="company-context"
          value={context}
          onChange={handleChange}
          placeholder="Describe your company and its context..."
          className="min-h-[120px] resize-none"
          aria-describedby="context-description"
        />

        <p id="context-description" className="text-sm text-muted-foreground">
          Provide relevant information about your company, industry, and the
          context in which this research is being conducted. This helps frame
          the research appropriately.
        </p>
      </div>
    </Card>
  );
};

export default CompanyContext;
