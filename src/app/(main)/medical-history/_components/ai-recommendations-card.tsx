"use client";

import { Tag, FileText, Check } from "lucide-react";

import { SaveButton } from "@/components/button-kit/save-button";
import { ShareButton } from "@/components/button-kit/share-button";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/kit/card";
import { BetterTooltip } from "@/components/kit/tooltip";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { AIRecommendationType } from "./ai-recommendation";
import {
  getPriorityColor,
  getPriorityText,
  getTagColor,
  isRecommendationSaved,
} from "../_lib/utils";

interface AIRecommendationsCardProps {
  recommendation: AIRecommendationType;
  medicalHistory: MedicalHistoryWithTags[];
  currentItem: AIRecommendationType | null;
  savedRecommendations: AIRecommendationType[];
  onViewDetails: (rec: AIRecommendationType) => void;
  onSave: (rec: AIRecommendationType) => void;
  onShare: (rec: AIRecommendationType) => void;
}

export const AIRecommendationsCard = ({
  recommendation,
  medicalHistory,
  savedRecommendations,
  onViewDetails,
  onSave,
  onShare,
}: AIRecommendationsCardProps) => {
  const isMobile = useIsMobile();

  const isSaved = isRecommendationSaved(recommendation, savedRecommendations);

  return (
    <Card className="group/item flex flex-col overflow-hidden shadow-xs transition-all duration-200 hover:shadow-md">
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{recommendation.title}</CardTitle>
          <Badge
            className={cn(
              getPriorityColor(recommendation.priority),
              "bg-opacity-10",
            )}
          >
            Prioridad: {getPriorityText(recommendation.priority)}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Basado en {recommendation.relatedTags.length} categorías y{" "}
          {recommendation.relatedDocuments?.length || 0} documentos
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col px-4 pb-2">
        <p className="text-sm">{recommendation.description}</p>

        {recommendation.relatedTags.length > 0 && (
          <div className="mt-2">
            <p className="text-muted-foreground mb-1 text-xs">
              Categorías relacionadas:
            </p>
            <div className="flex flex-wrap gap-2">
              {recommendation.relatedTags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn("h-5 px-1.5 py-0 text-xs", getTagColor(tag))}
                >
                  <Tag className="mr-1 size-2.5" />
                  {tag}
                </Badge>
              ))}
              {recommendation.relatedTags.length > 2 && (
                <Badge
                  variant="outline"
                  className="bg-accent text-foreground/80 h-5 rounded-full px-1.5 py-0 text-xs"
                >
                  +{recommendation.relatedTags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}

        {recommendation.relatedDocuments &&
          recommendation.relatedDocuments.length > 0 && (
            <div className="mt-2">
              <p className="text-muted-foreground mb-1 text-xs">
                Documentos relacionados:
              </p>
              <div className="space-y-1">
                {recommendation.relatedDocuments.map((docId) => {
                  const doc = medicalHistory.find((d) => d.id === docId);
                  return doc ? (
                    <div
                      key={docId}
                      className="flex items-center gap-1 text-xs"
                    >
                      <FileText className="h-3 w-3 text-blue-500" />
                      <span>{doc.condition}</span>
                      {doc.issuer && (
                        <span className="text-muted-foreground">
                          ({doc.issuer})
                        </span>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
      </CardContent>

      <CardFooter className="flex justify-between px-4 pt-2 pb-4">
        <p className="text-muted-foreground text-xs">Generado por IA</p>
        <div
          className={cn(
            "flex gap-1 transition-opacity",
            isMobile ? "opacity-100" : "opacity-0 group-hover/item:opacity-100",
          )}
        >
          {isSaved ? (
            <BetterTooltip content="Recomendación guardada">
              <Button
                variant="ghost"
                size="icon"
                className="size-7 cursor-default rounded-sm text-emerald-500 hover:bg-transparent hover:text-emerald-500 dark:text-emerald-300 dark:hover:bg-transparent dark:hover:text-emerald-300 [&_svg]:size-3.5!"
              >
                <Check />
              </Button>
            </BetterTooltip>
          ) : (
            <BetterTooltip content="Guardar">
              <SaveButton
                variant="ghost"
                size="icon"
                onClick={() => onSave(recommendation)}
                className="size-7 rounded-sm text-emerald-500 hover:bg-emerald-50 hover:text-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-300 [&_svg]:size-3.5!"
              />
            </BetterTooltip>
          )}
          <BetterTooltip content="Compartir">
            <ShareButton
              variant="ghost"
              size="icon"
              onClick={() => onShare(recommendation)}
              className="size-7 rounded-sm text-blue-500 hover:bg-blue-50 hover:text-blue-500 dark:text-blue-300 dark:hover:bg-blue-950 dark:hover:text-blue-300 [&_svg]:size-3.5!"
            />
          </BetterTooltip>
          <Button
            radius="full"
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(recommendation)}
            className="h-7 text-xs [&_svg]:size-3.5!"
          >
            Ver más detalles
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
