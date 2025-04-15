"use client";

import { FileText, Lightbulb, Tag } from "lucide-react";
import { useState } from "react";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { DownloadButton } from "@/components/button-kit/download-button";
import { EyeButton } from "@/components/button-kit/eye-button";
import { Badge } from "@/components/kit/badge";
import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { Textarea } from "@/components/kit/textarea";
import { BetterTooltip } from "@/components/kit/tooltip";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import { AIRecommendationType } from "./ai-recommendation";
import {
  getFileTypeColor,
  getPriorityColor,
  getPriorityText,
  getTagColor,
} from "../_lib/utils";

interface AIRecommendationDetailProps {
  recommendation: AIRecommendationType;
  medicalHistory: MedicalHistoryWithTags[];
  onBack?: () => void;
  onSaveNotes?: () => void;
  onViewFile?: (fileData: { url?: string | null; name: string }) => void;
  isFromSavedRecommendations?: boolean;
}

export const AIRecommendationDetail = ({
  recommendation,
  medicalHistory,
  onBack,
  onSaveNotes,
  onViewFile,
  isFromSavedRecommendations = false,
}: AIRecommendationDetailProps) => {
  const isMobile = useIsMobile();
  const [editNotes, setEditNotes] = useState("");

  return (
    <>
      {onBack ? (
        <div className="mb-4 space-y-2 px-4 md:px-6">
          <ArrowLeftButton
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="self-start rounded-full [&_svg]:size-3.5!"
          >
            Volver a resultados
          </ArrowLeftButton>

          <div className="flex items-center justify-between">
            <h3 className="font-merriweather mb-2 flex items-center gap-2 text-base font-semibold">
              <Lightbulb className="size-5 shrink-0 text-amber-500" />
              {recommendation.title}
            </h3>
            <Badge
              className={cn(
                getPriorityColor(recommendation.priority),
                recommendation.priority === "high"
                  ? "bg-red-50 dark:bg-red-950"
                  : recommendation.priority === "medium"
                    ? "bg-yellow-50 dark:bg-yellow-950"
                    : "bg-green-50 dark:bg-green-950",
              )}
            >
              Prioridad: {getPriorityText(recommendation.priority)}
            </Badge>
          </div>
        </div>
      ) : isMobile ? (
        <>
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center gap-2">
              <Lightbulb className="size-4 shrink-0 text-amber-500" />
              <span className="truncate">{recommendation.title}</span>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="sr-only">
            Basado en {recommendation.relatedTags.length} categorías y{" "}
            {recommendation.relatedDocuments?.length || 0} documentos
          </DrawerDescription>
        </>
      ) : (
        <DialogHeader isSecondary className="pb-6!">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 shrink-0 text-amber-500" />
            <DialogTitle>{recommendation.title}</DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            Basado en {recommendation.relatedTags.length} categorías y{" "}
            {recommendation.relatedDocuments?.length || 0} documentos
          </DialogDescription>
          <Badge
            className={cn(
              getPriorityColor(recommendation.priority),
              recommendation.priority === "high"
                ? "bg-red-50 dark:bg-red-950"
                : recommendation.priority === "medium"
                  ? "bg-yellow-50 dark:bg-yellow-950"
                  : "bg-green-50 dark:bg-green-950",
            )}
          >
            Prioridad: {getPriorityText(recommendation.priority)}
          </Badge>
        </DialogHeader>
      )}

      <div className="space-y-4 p-4 md:p-6 md:pt-0">
        <div className="space-y-1 text-sm">
          {isMobile && (
            <Badge
              className={cn(
                getPriorityColor(recommendation.priority),
                recommendation.priority === "high"
                  ? "bg-red-50 dark:bg-red-950"
                  : recommendation.priority === "medium"
                    ? "bg-yellow-50 dark:bg-yellow-950"
                    : "bg-green-50 dark:bg-green-950",
              )}
            >
              Prioridad: {getPriorityText(recommendation.priority)}
            </Badge>
          )}
          <h4 className="mb-1 font-medium">Recomendación generada</h4>
          <div className="space-y-1 rounded-lg border p-4">
            <p>{recommendation.description}</p>
          </div>
        </div>

        {recommendation.relatedTags.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-medium">
              Categorías relacionadas
            </h4>
            <div className="flex flex-wrap gap-1">
              {recommendation.relatedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn("h-5 px-1.5 py-0 text-xs", getTagColor(tag))}
                >
                  <Tag className="size-2!" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {recommendation.relatedDocuments &&
          recommendation.relatedDocuments.length > 0 && (
            <div>
              <h4 className="mb-1 text-sm font-medium">
                Documentos relacionados
              </h4>
              <div className="space-y-2">
                {recommendation.relatedDocuments.map((docId) => {
                  const doc = medicalHistory.find((d) => d.id === docId);
                  return doc ? (
                    <div
                      key={docId}
                      className="bg-accent relative rounded-lg p-3"
                    >
                      <div className="grid grid-cols-[auto_1fr] gap-2 pr-24">
                        <FileText
                          className={cn("size-5", getFileTypeColor(doc.type))}
                        />
                        <div className="grid space-y-1 truncate">
                          <p className="truncate text-sm font-medium">
                            {doc.condition}
                          </p>
                          <div className="text-muted-foreground flex items-center gap-2 text-xs">
                            {doc.issuer && <span>{doc.issuer}</span>}
                            {doc.documentDate && (
                              <span>
                                {formatDate(
                                  new Date(doc.documentDate),
                                  "dd MMM yyyy",
                                )}
                              </span>
                            )}
                          </div>
                          {doc.description && (
                            <p className="truncate text-xs">
                              {doc.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="absolute inset-y-0 right-0 m-4 flex items-center gap-2">
                        {onViewFile && doc.file?.url && (
                          <BetterTooltip content="Ver documento" side="top">
                            <EyeButton
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                onViewFile({
                                  url: doc.file?.url,
                                  name: doc.file?.name || "documento",
                                });
                              }}
                              className="bg-background size-8 hover:opacity-100 [&_svg]:size-3.5!"
                            >
                              <span className="sr-only">Ver</span>
                            </EyeButton>
                          </BetterTooltip>
                        )}
                        <BetterTooltip content="Descargar documento" side="top">
                          <DownloadButton
                            variant="outline"
                            size="icon"
                            className="bg-background size-8 hover:opacity-100 [&_svg]:size-3.5!"
                          >
                            <span className="sr-only">Descargar</span>
                          </DownloadButton>
                        </BetterTooltip>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

        {onSaveNotes && (
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-medium">Mis notas</h4>
            <div className="space-y-2">
              <Textarea
                placeholder="Añade tus notas personales sobre esta recomendación..."
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="dark:border-alternative md:dark:border-border md:border-border min-h-24 resize-none"
              />
              <Button radius="full" size="sm" onClick={onSaveNotes}>
                Guardar notas
              </Button>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
          <h4 className="mb-1 text-sm font-medium">Acciones recomendadas</h4>
          <ul className="list-inside list-disc space-y-1 text-sm">
            {recommendation.priority === "high" ? (
              <>
                <li>
                  Consulta con tu médico lo antes posible sobre esta
                  recomendación
                </li>
                <li>
                  Considera programar una cita de seguimiento en las próximas
                  semanas
                </li>
              </>
            ) : recommendation.priority === "medium" ? (
              <>
                <li>Discute esta recomendación en tu próxima visita médica</li>
                <li>Mantén un registro de cualquier síntoma relacionado</li>
              </>
            ) : (
              <>
                <li>
                  Ten en cuenta esta información para tu bienestar general
                </li>
                <li>
                  Considera incluirla en tu próxima revisión médica rutinaria
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
          <BadgeAlert
            variant="success"
            className="mb-0 size-7 [&_svg]:size-4!"
          />
          <p className="text-sm">
            Esta recomendación fue generada por IA basada en tu historial
            médico. Siempre consulta con profesionales de la salud antes de
            tomar decisiones médicas.
          </p>
        </div>
      </div>

      {isFromSavedRecommendations && (
        <>
          {isMobile ? (
            <DrawerFooter>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <DrawerClose asChild>
                  <Button variant="mobile" className="justify-center">
                    Cerrar
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          ) : (
            <DialogFooter isSecondary>
              <DialogClose asChild>
                <Button radius="full" variant="outline">
                  Cerrar
                </Button>
              </DialogClose>
            </DialogFooter>
          )}
        </>
      )}
    </>
  );
};
