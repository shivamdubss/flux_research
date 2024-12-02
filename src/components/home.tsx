import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  PlusCircle,
  FileText,
  Search,
  Flag,
  Layout,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import StepIndicator from "./research/StepIndicator";
import ProjectSetupForm from "./research/setup/ProjectSetupForm";
import AIInterviewerConfig from "./research/testing/AIInterviewerConfig";
import DeploymentPanel from "./research/deployment/DeploymentPanel";
import ResultsViewer from "./research/results/ResultsViewer";

interface Project {
  id: string;
  title: string;
  type: "note" | "task" | "wiki" | "goal" | "whiteboard";
  createdAt: string;
  lastModified: string;
  currentStep: number;
}

const Home = () => {
  const [showWizard, setShowWizard] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [editingTitle, setEditingTitle] = React.useState(false);
  const [currentTitle, setCurrentTitle] = React.useState("");
  const [currentProjectId, setCurrentProjectId] = React.useState<string | null>(
    null,
  );
  const [projects, setProjects] = React.useState<Project[]>([
    {
      id: "1",
      title: "User Research Notes",
      type: "note",
      createdAt: "2024-03-21",
      lastModified: "2024-03-21",
      currentStep: 2,
    },
    {
      id: "2",
      title: "Product Feedback",
      type: "task",
      createdAt: "2024-03-20",
      lastModified: "2024-03-21",
      currentStep: 1,
    },
  ]);

  const getIconForType = (type: Project["type"]) => {
    switch (type) {
      case "note":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "task":
        return <FileText className="h-6 w-6 text-yellow-500" />;
      case "wiki":
        return <Search className="h-6 w-6 text-sky-500" />;
      case "goal":
        return <Flag className="h-6 w-6 text-purple-500" />;
      case "whiteboard":
        return <Layout className="h-6 w-6 text-orange-500" />;
    }
  };

  const createNewProject = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newTitle = `Study #${projects.length + 1}`;
    const newProject: Project = {
      id: newId,
      title: newTitle,
      type: "note",
      createdAt: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      currentStep: 0,
    };
    setProjects((prev) => [...prev, newProject]);
    setCurrentProjectId(newId);
    setCurrentTitle(newTitle);
    setCurrentStep(0);
    setShowWizard(true);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? {
              ...project,
              ...updates,
              lastModified: new Date().toISOString().split("T")[0],
            }
          : project,
      ),
    );
  };

  const deleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  React.useEffect(() => {
    if (currentProjectId) {
      updateProject(currentProjectId, { currentStep });
    }
  }, [currentStep]);

  React.useEffect(() => {
    if (currentProjectId && currentTitle) {
      updateProject(currentProjectId, { title: currentTitle });
    }
  }, [currentTitle]);

  if (showWizard) {
    return (
      <div className="w-full min-h-screen bg-background">
        <div className="relative border-b border-border">
          <div className="absolute right-4 top-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowWizard(false);
                setCurrentStep(0);
                setCurrentTitle("");
                setCurrentProjectId(null);
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
            <div className="flex items-center space-x-2">
              {editingTitle ? (
                <Input
                  value={currentTitle}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                  onBlur={() => setEditingTitle(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setEditingTitle(false);
                    }
                  }}
                  className="text-lg font-semibold h-8 w-[300px]"
                  autoFocus
                />
              ) : (
                <h2
                  className="text-lg font-semibold cursor-pointer hover:text-primary"
                  onClick={() => setEditingTitle(true)}
                >
                  {currentTitle}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingTitle(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </h2>
              )}
            </div>
          </div>
          <StepIndicator
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {currentStep === 0 && (
            <ProjectSetupForm onNext={() => setCurrentStep(1)} />
          )}
          {currentStep === 1 && (
            <AIInterviewerConfig onNext={() => setCurrentStep(2)} />
          )}
          {currentStep === 2 && (
            <DeploymentPanel onNext={() => setCurrentStep(3)} />
          )}
          {currentStep === 3 && (
            <ResultsViewer onNext={() => setCurrentStep(0)} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Good afternoon, Jane</h1>
          <Button
            onClick={createNewProject}
            className="flex items-center space-x-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create New Project</span>
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-32">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">
                  Create your first research project
                </h2>
                <p className="text-muted-foreground">
                  Get started by creating a new AI-powered research project
                </p>
              </div>
              <Button
                size="lg"
                onClick={createNewProject}
                className="flex items-center space-x-2"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Create New Project</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => {
                  setCurrentProjectId(project.id);
                  setCurrentTitle(project.title);
                  setCurrentStep(project.currentStep);
                  setShowWizard(true);
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    {getIconForType(project.type)}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => deleteProject(project.id, e)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Last modified: {project.lastModified}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
