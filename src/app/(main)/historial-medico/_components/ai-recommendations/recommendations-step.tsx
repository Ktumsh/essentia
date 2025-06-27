import AnalysisCard from "./analysis-card";
import RecommendationsHeader from "./recommendations-header";
import { getAnalysisDescription } from "../../_lib/utils";

import type {
  AIRecommendation,
  AnalysisMethod,
  SavedRecommendation,
} from "@/lib/types";

interface RecommendationsStepProps {
  analysisMethod: AnalysisMethod;
  docCount: number;
  selectedDocuments: string[];
  selectedCategories: string[];
  recommendations: Array<AIRecommendation>;
  savedRecommendations: Array<SavedRecommendation>;
  onViewDetails: (recommendation: AIRecommendation) => void;
  onToggleSave: (
    recommendation: AIRecommendation,
    savedList: SavedRecommendation[],
  ) => Promise<void>;
  onShareRecommendation: (
    recommendation: SavedRecommendation | SavedRecommendation[],
  ) => void;
  onSaveRecommendation: (recommendations: SavedRecommendation[]) => void;
  onStartAnalysis: () => void;
  isSaved: (
    recommendation: SavedRecommendation,
    savedList: SavedRecommendation[],
  ) => boolean;
}

const RecommendationsStep = ({
  recommendations,
  analysisMethod,
  docCount,
  selectedDocuments,
  selectedCategories,
  savedRecommendations,
  onViewDetails,
  onToggleSave,
  onShareRecommendation,
  onSaveRecommendation,
  onStartAnalysis,
  isSaved,
}: RecommendationsStepProps) => {
  const description = getAnalysisDescription({
    analysisMethod,
    docCount,
    selectedDocuments,
    selectedCategories,
  });

  return (
    <div className="space-y-6">
      <div className="mb-1! flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Recomendaciones personalizadas
        </h2>
      </div>
      <RecommendationsHeader
        recommendations={recommendations}
        savedRecommendations={savedRecommendations}
        onShareRecommendation={onShareRecommendation}
        onSaveRecommendation={onSaveRecommendation}
        onStartAnalysis={onStartAnalysis}
        isSaved={isSaved}
        description={description}
      />

      <div className="grid gap-4">
        {recommendations.map((recommendation) => (
          <AnalysisCard
            key={recommendation.id}
            recommendation={recommendation}
            onViewDetails={() => onViewDetails(recommendation)}
            isSaved={() => isSaved(recommendation, savedRecommendations)}
            onToggleSave={() =>
              onToggleSave(recommendation, savedRecommendations)
            }
            onShare={() => onShareRecommendation(recommendation)}
          />
        ))}
      </div>

      <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-950/20">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Importante:</strong> Estas recomendaciones son generadas por
          IA y no reemplazan el consejo médico profesional. Siempre consulta con
          tu médico antes de tomar decisiones sobre tu salud.
        </p>
      </div>
    </div>
  );
};

export default RecommendationsStep;
