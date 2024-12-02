import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import ResearchObjectives from "./ResearchObjectives";
import CompanyContext from "./CompanyContext";
import DurationSelector from "./DurationSelector";
import ScriptEditor from "./ScriptEditor";
import DocumentUploader from "./DocumentUploader";

interface ProjectSetupFormProps {
  onNext?: () => void;
  formData?: {
    objectives?: string;
    companyContext?: string;
    duration?: number;
    script?: string;
    documents?: Array<{
      name: string;
      type: string;
      size: number;
    }>;
  };
  onChange?: (field: string, value: any) => void;
}

const ProjectSetupForm = ({
  onNext = () => {},
  formData = {
    objectives: "",
    companyContext: "",
    duration: 30,
    script: "",
    documents: [],
  },
  onChange = () => {},
}: ProjectSetupFormProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-background">
      <div className="space-y-8">
        <ResearchObjectives
          objectives={formData.objectives}
          onChange={(value) => onChange("objectives", value)}
        />

        <CompanyContext
          context={formData.companyContext}
          onChange={(value) => onChange("companyContext", value)}
        />

        <DurationSelector
          duration={formData.duration}
          onChange={(value) => onChange("duration", value)}
        />

        <ScriptEditor
          script={formData.script}
          onChange={(value) => onChange("script", value)}
        />

        <DocumentUploader
          files={formData.documents}
          onUpload={(files) => {
            const newFiles = Array.from(files).map((file) => ({
              name: file.name,
              type: file.type,
              size: file.size,
            }));
            onChange("documents", [...formData.documents, ...newFiles]);
          }}
          onRemove={(fileName) => {
            const updatedFiles = formData.documents.filter(
              (file) => file.name !== fileName,
            );
            onChange("documents", updatedFiles);
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

export default ProjectSetupForm;
