import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TargetAudienceFormProps {
  audience?: {
    ageRange?: string;
    occupation?: string;
    location?: string;
    experience?: string;
  };
  onChange?: (field: string, value: string) => void;
}

const TargetAudienceForm = ({
  audience = {
    ageRange: "25-34",
    occupation: "Product Manager",
    location: "United States",
    experience: "3-5 years",
  },
  onChange = () => {},
}: TargetAudienceFormProps) => {
  const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55+"];

  const experienceLevels = [
    "0-2 years",
    "3-5 years",
    "6-10 years",
    "10+ years",
  ];

  return (
    <Card className="w-full p-6 bg-background">
      <div className="space-y-6">
        <div>
          <Label className="text-base font-semibold mb-4 block">
            Target Audience Demographics
          </Label>
          <p className="text-sm text-muted-foreground mb-6">
            Define the characteristics of your ideal interview participants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age-range">Age Range</Label>
            <Select
              defaultValue={audience.ageRange}
              onValueChange={(value) => onChange("ageRange", value)}
            >
              <SelectTrigger id="age-range">
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent>
                {ageRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              value={audience.occupation}
              onChange={(e) => onChange("occupation", e.target.value)}
              placeholder="e.g. Product Manager, Designer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={audience.location}
              onChange={(e) => onChange("location", e.target.value)}
              placeholder="e.g. United States, Global"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select
              defaultValue={audience.experience}
              onValueChange={(value) => onChange("experience", value)}
            >
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TargetAudienceForm;
