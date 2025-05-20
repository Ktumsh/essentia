"use client";

import { Tag, FileText } from "lucide-react";

import { BookmarkButton } from "@/components/button-kit/bookmark-button";
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
import { getPriorityBadge, getTagColor } from "../_lib/utils";

interface AIRecommendationsCardProps {
  recommendation: AIRecommendationType;
  medicalHistory: MedicalHistoryWithTags[];
  currentItem: AIRecommendationType | null;
  savedRecommendations: AIRecommendationType[];
  onViewDetails: (rec: AIRecommendationType) => void;
  onShare: (rec: AIRecommendationType) => void;
  isSaved: (
    rec: AIRecommendationType,
    savedList: AIRecommendationType[],
  ) => boolean;
  toggleRecommendation: (
    recommendation: AIRecommendationType,
    savedList: AIRecommendationType[],
  ) => Promise<void>;
}

const AIRecommendationsCard = ({
  recommendation,
  medicalHistory,
  savedRecommendations,
  onViewDetails,
  onShare,
  isSaved,
  toggleRecommendation,
}: AIRecommendationsCardProps) => {
  const isMobile = useIsMobile();

  const saved = isSaved(recommendation, savedRecommendations);

  const priorityBadge = getPriorityBadge(recommendation.priority);

  return (
    <Card className="group/item bg-background flex flex-col overflow-hidden">
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{recommendation.title}</CardTitle>
          <Badge variant="outline" className={priorityBadge.color}>
            {priorityBadge.icon}
            Prioridad {priorityBadge.label}
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
              {recommendation.relatedTags.slice(0, 1).map((tag) => (
                <Badge
                  key={tag}
                  className={cn("font-normal text-white", getTagColor(tag))}
                >
                  <Tag className="size-2.5!" />
                  {tag}
                </Badge>
              ))}
              {recommendation.relatedTags.length > 1 && (
                <Badge
                  variant="outline"
                  className="bg-background border-alternative text-foreground/80"
                >
                  +{recommendation.relatedTags.length - 1}
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
                      <FileText className="h-3 w-3 text-blue-600" />
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
        <p className="bg-premium bg-clip-text text-xs font-medium text-transparent">
          Generado por IA
        </p>
        <div
          className={cn(
            "flex gap-1 transition-opacity",
            isMobile ? "opacity-100" : "opacity-0 group-hover/item:opacity-100",
          )}
        >
          <BetterTooltip content={saved ? "✓ Guardada" : "Guardar"}>
            <BookmarkButton
              variant="ghost"
              size="icon"
              onClick={() =>
                toggleRecommendation(recommendation, savedRecommendations)
              }
              className={cn(
                "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-950 dark:hover:text-emerald-400",
                saved && "**:fill-emerald-600 dark:**:fill-emerald-400",
              )}
            />
          </BetterTooltip>
          <BetterTooltip content="Compartir">
            <ShareButton
              variant="ghost"
              size="icon"
              onClick={() => onShare(recommendation)}
              className="text-blue-600 hover:bg-blue-50 hover:text-blue-600 dark:text-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-400"
            />
          </BetterTooltip>
          <Button
            radius="full"
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(recommendation)}
          >
            Ver más detalles
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIRecommendationsCard;
