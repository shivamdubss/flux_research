import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import VoiceSelector from "./VoiceSelector";
import PersonaConfig from "./PersonaConfig";
import TestConversation from "./TestConversation";

interface AIInterviewerConfigProps {
  onNext?: () => void;
  config?: {
    voice?: {
      selectedVoice?: string;
      pitch?: number;
      speed?: number;
    };
    persona?: {
      type?: string;
      tone?: string;
      expertise?: string;
      customization?: string;
    };
    script?: string;
  };
  onChange?: (field: string, value: any) => void;
}

const AIInterviewerConfig = ({
  onNext = () => {},
  config = {
    voice: {
      selectedVoice: "voice-1",
      pitch: 1.0,
      speed: 1.0,
    },
    persona: {
      type: "expert",
      tone: "professional",
      expertise: "user-research",
      customization:
        "A seasoned UX researcher with extensive experience in conducting user interviews.",
    },
    script: "Hello! Thank you for participating in our research study today...",
  },
  onChange = () => {},
}: AIInterviewerConfigProps) => {
  const [isPreviewPlaying, setIsPreviewPlaying] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);

  const handleVoiceChange = (field: string, value: any) => {
    onChange("voice", { ...config.voice, [field]: value });
  };

  const handlePersonaChange = (field: string, value: string) => {
    onChange("persona", { ...config.persona, [field]: value });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-background">
      <div className="space-y-8">
        <VoiceSelector
          selectedVoice={config.voice.selectedVoice}
          pitch={config.voice.pitch}
          speed={config.voice.speed}
          onVoiceChange={(voice) => handleVoiceChange("selectedVoice", voice)}
          onPitchChange={(pitch) => handleVoiceChange("pitch", pitch)}
          onSpeedChange={(speed) => handleVoiceChange("speed", speed)}
          onPreview={() => setIsPreviewPlaying(!isPreviewPlaying)}
          isPlaying={isPreviewPlaying}
        />

        <PersonaConfig
          persona={config.persona}
          onChange={handlePersonaChange}
        />

        <TestConversation
          script={config.script}
          isRecording={isRecording}
          onStartRecording={() => setIsRecording(true)}
          onStopRecording={() => setIsRecording(false)}
          onReset={() => {
            setIsRecording(false);
            setIsPreviewPlaying(false);
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

export default AIInterviewerConfig;
