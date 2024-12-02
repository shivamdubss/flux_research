import React from "react";
import { Check, CircleDot } from "lucide-react";

interface StepIndicatorProps {
  currentStep?: number;
  onStepClick?: (step: number) => void;
  steps?: Array<{
    label: string;
    description?: string;
  }>;
}

const StepIndicator = ({
  currentStep = 0,
  onStepClick = () => {},
  steps = [
    { label: "Setup", description: "Project configuration" },
    { label: "Test", description: "AI interviewer testing" },
    { label: "Deploy", description: "Generate interview link" },
    { label: "Results", description: "View transcripts" },
  ],
}: StepIndicatorProps) => {
  return (
    <div className="w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <li
                  key={step.label}
                  className="flex items-center cursor-pointer"
                  onClick={() => onStepClick(index)}
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center">
                      {isCompleted ? (
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center ring-4 ring-background shadow-lg transition-all duration-200">
                          <Check className="h-5 w-5 text-primary-foreground" />
                        </div>
                      ) : isActive ? (
                        <div className="h-10 w-10 rounded-full border-2 border-primary bg-background flex items-center justify-center ring-4 ring-background shadow-lg transition-all duration-200">
                          <CircleDot className="h-5 w-5 text-primary animate-pulse" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full border-2 border-muted bg-background flex items-center justify-center transition-all duration-200 hover:border-primary/50">
                          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      <p
                        className={`text-sm font-semibold ${isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {step.label}
                      </p>
                      {step.description && (
                        <p className="text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default StepIndicator;
