import { CheckCircle2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import AnalysisDocCard from "./analysis-doc-card";
import CategorySelector from "./category-selector";

import type { MedicalHistory } from "@/db/querys/medical-history-querys";
import type { AnalysisMethod } from "@/lib/types";

interface SelectionStepProps {
  analysisMethod: AnalysisMethod;
  documents: Array<MedicalHistory>;
  categories: Record<string, number>;
  selectedDocuments: string[];
  selectedCategories: string[];
  customQuery: string;
  setCustomQuery: (query: string) => void;
  onDocumentToggle: (id: string) => void;
  onCategoryToggle: (documentIds: string[]) => void;
  onCategorySelectorToggle: (category: string) => void;
}

const SelectionStep = ({
  analysisMethod,
  documents,
  categories,
  selectedDocuments,
  selectedCategories,
  customQuery,
  setCustomQuery,
  onDocumentToggle,
  onCategoryToggle,
  onCategorySelectorToggle,
}: SelectionStepProps) => {
  return (
    <div className="space-y-6">
      {analysisMethod === "all" ? (
        <>
          <div className="space-y-2 text-center">
            <h2 className="text-lg font-semibold">
              Análisis completo seleccionado
            </h2>
            <p className="text-muted-foreground text-sm">
              Se analizarán todos tus documentos médicos disponibles
            </p>
          </div>
          <div className="ring-alternative/80 bg-background/50 relative w-full rounded-xl p-4 text-left ring-2 backdrop-blur-md transition hover:shadow-md">
            <div className="mb-4 flex items-center gap-4">
              <div className="bg-premium grid size-10 place-content-center rounded-full">
                <CheckCircle2 className="size-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">
                  Todos los documentos incluidos
                </h3>
                <p className="text-muted-foreground text-sm">
                  {documents.length} documentos médicos serán analizados
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {Object.entries(categories).map(([category, total]) => (
                <div
                  key={category}
                  className="bg-primary/10 flex items-center justify-between rounded-lg p-3"
                >
                  <span className="text-sm font-medium">{category}</span>
                  <span className="text-muted-foreground text-xs">
                    {total} documento{total !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : analysisMethod === "specific" ? (
        <>
          <div className="space-y-2 text-center">
            <h2 className="text-lg font-semibold">
              Selecciona tus documentos médicos
            </h2>
            <p className="text-muted-foreground text-sm">
              Elige los documentos específicos que quieres incluir en el
              análisis
            </p>
          </div>
          <AnalysisDocCard
            documents={documents}
            selectedDocuments={selectedDocuments}
            onCategoryToggle={onCategoryToggle}
            onDocumentToggle={onDocumentToggle}
          />
        </>
      ) : (
        <CategorySelector
          documents={documents}
          selectedCategories={selectedCategories}
          onCategorySelectorToggle={onCategorySelectorToggle}
          allCategories={categories}
        />
      )}

      <div className="flex flex-col gap-2">
        <Label>Pregunta específica (opcional)</Label>
        <Textarea
          placeholder="¿Hay algo específico sobre tu salud que te preocupe? Ej: 'Me preocupa mi salud cardiovascular'"
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          className="bg-background border-alternative resize-none"
          rows={3}
        />
      </div>
    </div>
  );
};

export default SelectionStep;
