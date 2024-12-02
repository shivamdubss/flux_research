import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserCircle2, Sparkles, RefreshCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonaConfigProps {
  persona?: {
    type: string;
    tone: string;
    expertise: string;
    customization?: string;
  };
  onChange?: (field: string, value: string) => void;
}

const PersonaConfig = ({
  persona = {
    type: "expert",
    tone: "professional",
    expertise: "user-research",
    customization:
      "A seasoned UX researcher with 10+ years of experience conducting user interviews.",
  },
  onChange = () => {},
}: PersonaConfigProps) => {
  const personaTypes = [
    { value: "expert", label: "Expert Interviewer" },
    { value: "peer", label: "Peer Researcher" },
    { value: "facilitator", label: "Discussion Facilitator" },
    { value: "custom", label: "Custom Persona" },
  ];

  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "friendly", label: "Friendly" },
    { value: "formal", label: "Formal" },
  ];

  const expertiseAreas = [
    { value: "user-research", label: "User Research" },
    { value: "product-design", label: "Product Design" },
    { value: "market-research", label: "Market Research" },
    { value: "customer-experience", label: "Customer Experience" },
  ];

  return (
    <Card className="w-full p-6 bg-background">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-semibold">
              AI Persona Configuration
            </Label>
            <p className="text-sm text-muted-foreground">
              Customize the AI interviewer's personality and behavior
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              onChange("type", "expert");
              onChange("tone", "professional");
              onChange("expertise", "user-research");
              onChange("customization", "");
            }}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="persona-type">Persona Type</Label>
            <Select
              value={persona.type}
              onValueChange={(value) => onChange("type", value)}
            >
              <SelectTrigger id="persona-type">
                <SelectValue placeholder="Select persona type" />
              </SelectTrigger>
              <SelectContent>
                {personaTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center">
                      <UserCircle2 className="h-4 w-4 mr-2" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Conversation Tone</Label>
            <Select
              value={persona.tone}
              onValueChange={(value) => onChange("tone", value)}
            >
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {toneOptions.map((tone) => (
                  <SelectItem key={tone.value} value={tone.value}>
                    {tone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expertise">Area of Expertise</Label>
            <Select
              value={persona.expertise}
              onValueChange={(value) => onChange("expertise", value)}
            >
              <SelectTrigger id="expertise">
                <SelectValue placeholder="Select expertise" />
              </SelectTrigger>
              <SelectContent>
                {expertiseAreas.map((area) => (
                  <SelectItem key={area.value} value={area.value}>
                    <div className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2" />
                      {area.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="customization">Custom Persona Description</Label>
            <Textarea
              id="customization"
              value={persona.customization}
              onChange={(e) => onChange("customization", e.target.value)}
              placeholder="Describe the AI interviewer's background, expertise, and interviewing style..."
              className="min-h-[100px] resize-none"
            />
            <p className="text-sm text-muted-foreground">
              Add specific details about how you want the AI interviewer to
              conduct the conversation
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PersonaConfig;
