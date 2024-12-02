import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Volume2, Play, Pause } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface VoiceSelectorProps {
  selectedVoice?: string;
  pitch?: number;
  speed?: number;
  onVoiceChange?: (voice: string) => void;
  onPitchChange?: (pitch: number) => void;
  onSpeedChange?: (speed: number) => void;
  onPreview?: () => void;
  isPlaying?: boolean;
}

const VoiceSelector = ({
  selectedVoice = "voice-1",
  pitch = 1.0,
  speed = 1.0,
  onVoiceChange = () => {},
  onPitchChange = () => {},
  onSpeedChange = () => {},
  onPreview = () => {},
  isPlaying = false,
}: VoiceSelectorProps) => {
  const voices = [
    { id: "voice-1", name: "Professional Female", accent: "American" },
    { id: "voice-2", name: "Professional Male", accent: "British" },
    { id: "voice-3", name: "Casual Female", accent: "Australian" },
    { id: "voice-4", name: "Casual Male", accent: "Canadian" },
  ];

  return (
    <Card className="w-full p-6 bg-background">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold">Voice Selection</Label>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
            onClick={onPreview}
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Stop Preview</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Preview Voice</span>
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="voice-select">Voice Type</Label>
            <Select value={selectedVoice} onValueChange={onVoiceChange}>
              <SelectTrigger id="voice-select">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.name} ({voice.accent})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="pitch-slider">Pitch</Label>
                <span className="text-sm text-muted-foreground">
                  {pitch.toFixed(1)}
                </span>
              </div>
              <Slider
                id="pitch-slider"
                min={0.5}
                max={2.0}
                step={0.1}
                value={[pitch]}
                onValueChange={(value) => onPitchChange(value[0])}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="speed-slider">Speaking Rate</Label>
                <span className="text-sm text-muted-foreground">
                  {speed.toFixed(1)}x
                </span>
              </div>
              <Slider
                id="speed-slider"
                min={0.5}
                max={2.0}
                step={0.1}
                value={[speed]}
                onValueChange={(value) => onSpeedChange(value[0])}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Volume2 className="h-4 w-4" />
          <p>
            Adjust the voice settings and preview to ensure it matches your
            research needs.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default VoiceSelector;
