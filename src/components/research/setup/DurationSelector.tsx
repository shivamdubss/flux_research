import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface DurationSelectorProps {
  duration?: number;
  onChange?: (duration: number) => void;
}

const DurationSelector = ({
  duration = 30,
  onChange = () => {},
}: DurationSelectorProps) => {
  const presetDurations = [
    { value: 15, label: "15 minutes" },
    { value: 30, label: "30 minutes" },
    { value: 45, label: "45 minutes" },
    { value: 60, label: "1 hour" },
  ];

  const handleCustomDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      onChange(value);
    }
  };

  const handlePresetChange = (value: string) => {
    const numericValue = parseInt(value, 10);
    onChange(numericValue);
  };

  return (
    <Card className="w-full p-6 bg-background">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Interview Duration</Label>

        <RadioGroup
          defaultValue={duration.toString()}
          onValueChange={handlePresetChange}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {presetDurations.map((preset) => (
            <div
              key={preset.value}
              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent"
            >
              <RadioGroupItem
                value={preset.value.toString()}
                id={`duration-${preset.value}`}
              />
              <Label
                htmlFor={`duration-${preset.value}`}
                className="cursor-pointer"
              >
                {preset.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex items-center space-x-4">
          <Label htmlFor="custom-duration" className="whitespace-nowrap">
            Custom Duration:
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="custom-duration"
              type="number"
              min="1"
              value={duration}
              onChange={handleCustomDurationChange}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">minutes</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Select a preset duration or enter a custom length for your interview.
          Consider your research objectives and participant availability when
          choosing the duration.
        </p>
      </div>
    </Card>
  );
};

export default DurationSelector;
