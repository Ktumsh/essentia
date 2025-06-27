import { FileText, FileX, Lightbulb } from "lucide-react";

import { cn } from "@/utils";

import ConfidenceMeter from "./confidence-meter";
import PriorityBadge from "./priority-badge";
import {
  getFileTypeColor,
  recommendationTypeStyleConfig,
} from "../../_lib/utils";

import type { MedicalHistory } from "@/db/querys/medical-history-querys";
import type { AIRecommendation } from "@/lib/types";

interface AnalysisDetailsProps {
  documents: Array<MedicalHistory>;
  recommendation: AIRecommendation;
}

const AnalysisDetails = ({
  documents,
  recommendation,
}: AnalysisDetailsProps) => {
  const categoryLabel =
    recommendationTypeStyleConfig[recommendation.type].label;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">{recommendation.title}</h2>
          <PriorityBadge priority={recommendation.priority} />
        </div>

        <div className="flex items-center gap-4">
          <div className="text-muted-foreground text-sm">
            Confianza de la IA:
          </div>
          <ConfidenceMeter confidence={recommendation.confidence} />
        </div>

        <div className="bg-background rounded-xl p-4">
          <p className="text-sm leading-relaxed">
            {recommendation.description}
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Plan de acción recomendado</h3>
          <div className="space-y-3">
            {recommendation.actionItems.map((item, index) => (
              <div
                key={index}
                className="bg-primary/10 flex items-center gap-3 rounded-lg p-3"
              >
                <div className="bg-primary text-primary-foreground mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                  {index + 1}
                </div>
                <p className="text-foreground/80 flex-1 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary/10 flex items-center gap-4 rounded-xl p-4">
          <div className="mask mask-squircle grid size-10 place-content-center bg-linear-to-br from-fuchsia-500 to-fuchsia-700">
            <Lightbulb className="size-5 text-white" />
          </div>
          <div>
            <h4 className="mb-1 font-medium text-fuchsia-800 dark:text-fuchsia-200">
              Tipo de recomendación
            </h4>
            <p className="text-sm text-fuchsia-700 dark:text-fuchsia-300">
              {categoryLabel}
            </p>
          </div>
        </div>
        {recommendation.relatedDocuments &&
          recommendation.relatedDocuments.length > 0 && (
            <div>
              <h4 className="mb-1 text-sm font-medium">
                Documentos relacionados
              </h4>
              <div className="space-y-2">
                {recommendation.relatedDocuments.map((docId) => {
                  const doc = documents.find((d) => d.id === docId);
                  return doc ? (
                    <div
                      key={docId}
                      className="bg-background/80 relative rounded-xl border p-3 backdrop-blur-md"
                    >
                      <div className="flex gap-2">
                        <FileText
                          className={cn("size-5", getFileTypeColor(doc.type))}
                        />
                        <div className="space-y-1 truncate">
                          <p className="truncate text-sm font-medium">
                            {doc.condition}
                          </p>
                          <div className="text-muted-foreground text-xs">
                            {doc.issuer && <span>{doc.issuer}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="bg-background/80 flex flex-col items-center gap-2 rounded-xl border-2 border-dashed p-3"
                      key={docId}
                    >
                      <FileX className="text-muted-foreground size-4" />
                      <p className="text-muted-foreground text-sm">
                        Sin documentos relacionados
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default AnalysisDetails;
