import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, Type } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

interface ScriptEditorProps {
  script?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

const ScriptEditor = ({
  script = "Hello! Thank you for participating in our research study today. I'd like to start by asking you about your experience with our product...",
  onChange = () => {},
  maxLength = 2000,
}: ScriptEditorProps) => {
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
          <Label htmlFor="script" className="text-base font-semibold">
            Interview Script
          </Label>
          <span className="text-sm text-muted-foreground">
            {script.length}/{maxLength} characters
          </span>
        </div>

        <div className="flex items-center space-x-2 pb-4">
          <Toggle aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Separator orientation="vertical" className="h-6" />
          <Toggle aria-label="Toggle bullet list">
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="Toggle heading">
            <Type className="h-4 w-4" />
          </Toggle>
        </div>

        <Textarea
          id="script"
          value={script}
          onChange={handleChange}
          placeholder="Enter your interview script here..."
          className="min-h-[250px]"
          aria-describedby="script-description"
        />

        <div className="space-y-4">
          <p id="script-description" className="text-sm text-muted-foreground">
            Write out your interview script with clear questions and prompts.
            Include introduction, main questions, follow-up prompts, and closing
            remarks.
          </p>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onChange("")}>
              Clear
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const template =
                  "Introduction:\n\n[Greeting and purpose]\n\nMain Questions:\n\n1. [First question]\n2. [Second question]\n3. [Third question]\n\nClosing:\n\n[Thank you and next steps]";
                onChange(template);
              }}
            >
              Use Template
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScriptEditor;
