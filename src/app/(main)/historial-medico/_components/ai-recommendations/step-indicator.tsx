import { Brain, Check, FileText, Settings, Sparkles } from "lucide-react";
import { Fragment } from "react";

import { cn } from "@/utils";

const steps = [
  { id: "method", label: "Método", icon: <Settings className="size-4" /> },
  {
    id: "selection",
    label: "Selección",
    icon: <FileText className="size-4" />,
  },
  { id: "processing", label: "Análisis", icon: <Brain className="size-4" /> },
  {
    id: "recommendations",
    label: "Resultados",
    icon: <Sparkles className="size-4" />,
  },
];

interface StepIndicatorProps {
  currentStep: string;
  completedSteps: string[];
}

const StepIndicator = ({ currentStep, completedSteps }: StepIndicatorProps) => {
  return (
    <div className="mx-auto mt-4 mb-6 flex w-full max-w-md items-center justify-between px-6">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = currentStep === step.id;
        const isLast = index === steps.length - 1;

        return (
          <Fragment key={step.id}>
            <div className="flex items-center">
              <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    "ring-border bg-background flex size-8 items-center justify-center rounded-full ring-2 transition-all duration-300",
                    isCompleted
                      ? "text-primary-foreground bg-green-600 ring-green-500/50 dark:bg-green-400"
                      : isCurrent &&
                          "ring-secondary/50 bg-secondary text-secondary-foreground",
                  )}
                >
                  {isCompleted ? <Check className="size-4" /> : step.icon}
                </div>
                <span
                  className={cn(
                    "text-muted-foreground absolute top-full mt-2 text-xs font-medium",
                    isCurrent && "text-secondary/80",
                  )}
                >
                  {step.label}
                </span>
              </div>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "bg-alternative mx-2 h-0.5 w-16 transition-colors duration-300",
                  isCompleted && "bg-green-500",
                )}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
