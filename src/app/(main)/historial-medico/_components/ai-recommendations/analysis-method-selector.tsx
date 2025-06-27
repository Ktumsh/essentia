"use client";

import { FileText, FolderOpen, Tags, CheckCircle2 } from "lucide-react";

import { cn } from "@/utils";

import type { AnalysisMethod } from "@/lib/types";

interface AnalysisMethodSelectorProps {
  selectedMethod: AnalysisMethod;
  onMethodSelect: (method: AnalysisMethod) => void;
  documentCount: number;
  categoryCount: number;
}

const analysisOptions = [
  {
    id: "all" as AnalysisMethod,
    title: "Análisis completo",
    description: "Analizar todos los documentos médicos disponibles",
    icon: FolderOpen,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    id: "specific" as AnalysisMethod,
    title: "Documentos específicos",
    description: "Seleccionar documentos particulares para el análisis",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/50",
    borderColor: "border-green-200 dark:border-green-800",
  },
  {
    id: "categories" as AnalysisMethod,
    title: "Por categorías",
    description: "Analizar documentos agrupados por especialidad médica",
    icon: Tags,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
];

const AnalysisMethodSelector = ({
  selectedMethod,
  onMethodSelect,
  documentCount,
  categoryCount,
}: AnalysisMethodSelectorProps) => {
  const getMethodStats = (method: AnalysisMethod) => {
    switch (method) {
      case "all":
        return `${documentCount} documentos`;
      case "specific":
        return "Selección personalizada";
      case "categories":
        return `${categoryCount} categorías`;
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">
          ¿Cómo quieres analizar tus datos?
        </h2>
        <p className="text-muted-foreground text-sm">
          Elige el método de análisis que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="grid gap-4">
        {analysisOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedMethod === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onMethodSelect(option.id)}
              className={cn(
                "border-alternative/80 bg-background/50 relative w-full rounded-xl border-2 p-4 text-left backdrop-blur-md transition hover:shadow-md",
                isSelected && ["shadow-md", option.bgColor, option.borderColor],
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "mask mask-squircle grid size-10 place-content-center bg-gradient-to-r",
                    option.color,
                  )}
                >
                  <Icon className="size-5 text-white" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-base font-semibold">{option.title}</h3>
                  </div>
                  <p className="text-foreground/80 mb-2 text-sm">
                    {option.description}
                  </p>
                  <div className="text-muted-foreground text-xs font-medium">
                    {getMethodStats(option.id)}
                  </div>
                </div>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <div className="animate-fade-in absolute top-4 right-4 duration-150">
                  <div
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full bg-linear-to-br/shorter",
                      option.color,
                    )}
                  >
                    <CheckCircle2 className="size-4 text-white" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisMethodSelector;
