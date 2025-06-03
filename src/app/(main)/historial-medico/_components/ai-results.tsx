"use client";

import { CheckCheck, Lightbulb } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

import { BookmarkButton } from "@/components/button-kit/bookmark-button";
import { CopyButton } from "@/components/button-kit/copy-button";
import { RefreshButton } from "@/components/button-kit/refresh-button";
import { ShareButton } from "@/components/button-kit/share-button";
import { LoaderAIIcon } from "@/components/icons/status";
import { Button } from "@/components/kit/button";
import { BetterTooltip } from "@/components/kit/tooltip";
import { cn } from "@/utils";

import { AIRecommendationDetail } from "./ai-recommendation-detail";
import AIRecommendationsCard from "./ai-recommendations-card";

import type { AIRecommendationType } from "./ai-recommendation";
import type { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";

const secondaryMessages = [
  "El cerebro digital está en acción...",
  "Analizando patrones de salud...",
  "Sintetizando recomendaciones...",
  "Procesando datos médicos, ¡un instante por favor!",
  "Pensando en tu bienestar...",
  "Armando sugerencias personalizadas...",
  "Revisando tu historial con lupa...",
  "La IA está haciendo magia médica...",
  "Detectando oportunidades para mejorar tu salud...",
  "Ordenando tus datos geniales...",
  "Esto tomará solo unos segundos...",
  "Buscando ideas brillantes para ti...",
  "Traduciendo tus exámenes en soluciones...",
  "Afinando cada detalle de tus recomendaciones...",
  "Cargando ideas saludables...",
  "Inspirando bienestar y equilibrio...",
  "Leyendo tus antecedentes médicos con atención...",
];

interface AIResultsProps {
  isLoading: boolean;
  recommendations: Array<AIRecommendationType>;
  medicalHistory: Array<MedicalHistoryWithTags>;
  savedRecommendations: Array<AIRecommendationType>;
  selectedRecommendation: AIRecommendationType | null;
  onBack: () => void;
  toggleRecommendation: (
    recommendation: AIRecommendationType,
    savedList: AIRecommendationType[],
  ) => Promise<void>;
  onShareRecommendation: (
    recommendation: AIRecommendationType | AIRecommendationType[],
  ) => void;
  onSaveRecommendation: (recommendations: AIRecommendationType[]) => void;
  onSelectedRecommendation: (
    recommendation: AIRecommendationType | null,
  ) => void;
  onGenerateRecommendations: () => void;
  isRecommendationSaved: (
    rec: AIRecommendationType,
    savedList: AIRecommendationType[],
  ) => boolean;
}

const AIResults = ({
  isLoading,
  recommendations,
  medicalHistory,
  savedRecommendations,
  selectedRecommendation,
  onBack,
  toggleRecommendation,
  onShareRecommendation,
  onSaveRecommendation,
  onSelectedRecommendation,
  onGenerateRecommendations,
  isRecommendationSaved,
}: AIResultsProps) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const [secondaryIndex, setSecondaryIndex] = useState(
    Math.floor(Math.random() * secondaryMessages.length),
  );

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setSecondaryIndex((prevIndex) => {
          let newIndex = prevIndex;
          while (newIndex === prevIndex) {
            newIndex = Math.floor(Math.random() * secondaryMessages.length);
          }
          return newIndex;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const onCopy = async () => {
    const textFromParts = recommendations
      .map(
        (rec) =>
          `${rec.title}\nRecomendación: ${rec.description}\nPrioridad: ${
            rec.priority === "high"
              ? "Alta"
              : rec.priority === "medium"
                ? "Media"
                : "Baja"
          }\n\n`,
      )
      .join("");

    if (!textFromParts) {
      toast.error("¡No hay texto que copiar!");
      return;
    }

    await copyToClipboard(textFromParts);
    toast.success("¡Texto copiado!");
  };

  const allRecommendationsSaved = useMemo(() => {
    if (recommendations.length === 0) return false;
    return recommendations.every((rec) =>
      isRecommendationSaved(rec, savedRecommendations),
    );
  }, [recommendations, savedRecommendations, isRecommendationSaved]);

  return (
    <>
      {isLoading ? (
        <div className="m-4 flex flex-1 flex-col items-center justify-center rounded-lg bg-linear-to-r/shorter from-indigo-200 to-fuchsia-200 px-4 md:m-6 dark:from-indigo-900 dark:to-fuchsia-900">
          <LoaderAIIcon className="text-secondary mb-4 size-10" />

          <motion.p className="mb-1 text-base font-medium">
            ✨ Preparando sugerencias para ti
          </motion.p>
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="loading-shimmer text-center text-sm"
          >
            {secondaryMessages[secondaryIndex]}
          </motion.span>
        </div>
      ) : (
        <AnimatePresence mode="popLayout" initial={false}>
          {selectedRecommendation ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-1 flex-col overflow-y-auto"
            >
              <AIRecommendationDetail
                recommendation={selectedRecommendation}
                medicalHistory={medicalHistory}
                onBack={onBack}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-1 flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 pb-4 md:px-6 md:pb-6">
                <h3 className="flex items-center gap-2 text-base font-medium">
                  <Lightbulb className="size-5 shrink-0 text-amber-500" />{" "}
                  Recomendaciones personalizadas
                </h3>
                <div className="flex items-center gap-2">
                  <BetterTooltip content="Generar nuevas recomendaciones">
                    <RefreshButton
                      variant="ghost"
                      size="icon"
                      onClick={onGenerateRecommendations}
                      className="hover:bg-background"
                    />
                  </BetterTooltip>
                  <BetterTooltip content="Copiar">
                    <CopyButton
                      variant="ghost"
                      size="icon"
                      onClick={onCopy}
                      className="hover:bg-background"
                    />
                  </BetterTooltip>
                  <BetterTooltip content="Compartir">
                    <ShareButton
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        recommendations.length > 0 &&
                        onShareRecommendation(recommendations)
                      }
                      className="hover:bg-background"
                    />
                  </BetterTooltip>
                  {allRecommendationsSaved ? (
                    <BetterTooltip content="Recomendaciones guardadas">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-default text-emerald-500 hover:bg-transparent dark:text-emerald-400"
                      >
                        <CheckCheck className="size-4" />
                      </Button>
                    </BetterTooltip>
                  ) : (
                    <BetterTooltip content="Guardar recomendaciones">
                      <BookmarkButton
                        variant="ghost"
                        size="icon"
                        onClick={() => onSaveRecommendation(recommendations)}
                        className={cn(
                          "hover:bg-background",
                          allRecommendationsSaved && "fill-foreground",
                        )}
                      />
                    </BetterTooltip>
                  )}
                </div>
              </div>
              <div className="space-y-4 overflow-y-auto px-4 md:px-6 md:pb-6">
                {recommendations.map((rec, index) => (
                  <AIRecommendationsCard
                    key={index}
                    recommendation={rec}
                    medicalHistory={medicalHistory}
                    currentItem={selectedRecommendation}
                    savedRecommendations={savedRecommendations}
                    onViewDetails={() => onSelectedRecommendation(rec)}
                    onShare={onShareRecommendation}
                    isSaved={isRecommendationSaved}
                    toggleRecommendation={toggleRecommendation}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default AIResults;
