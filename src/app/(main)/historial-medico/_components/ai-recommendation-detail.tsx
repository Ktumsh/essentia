"use client";

import { FileText, FileX, Lightbulb, Tag } from "lucide-react";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { DownloadButton } from "@/components/button-kit/download-button";
import { EyeButton } from "@/components/button-kit/eye-button";
import { Badge } from "@/components/ui/badge";
import { BadgeAlert } from "@/components/ui/badge-alert";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { BetterTooltip } from "@/components/ui/tooltip";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, formatDate } from "@/utils";

import { AIRecommendationType } from "./ai-recommendation";
import { useMedicalHistoryLogic } from "../_hooks/use-medical-history-logic";
import { getFileTypeColor, getPriorityBadge, getTagColor } from "../_lib/utils";

interface AIRecommendationDetailProps {
  recommendation: AIRecommendationType;
  medicalHistory: MedicalHistoryWithTags[];
  onBack?: () => void;
  onSaveNotes?: () => void;
  onViewFile?: (fileData: { url?: string | null; name: string }) => void;
  isFromSavedRecommendations?: boolean;
  editNotes?: string;
  setEditNotes?: (notes: string) => void;
}

export const AIRecommendationDetail = ({
  recommendation,
  medicalHistory,
  onBack,
  onSaveNotes,
  onViewFile,
  isFromSavedRecommendations = false,
  editNotes = "",
  setEditNotes = () => {},
}: AIRecommendationDetailProps) => {
  const isMobile = useIsMobile();

  const priorityBadge = getPriorityBadge(recommendation.priority);

  const { handleDownload } = useMedicalHistoryLogic();

  return (
    <>
      {onBack ? (
        <div className="space-y-2 px-4 md:mb-4 md:px-6">
          <ArrowLeftButton
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-background self-start font-normal [&_svg]:size-3.5!"
          >
            Volver a resultados
          </ArrowLeftButton>

          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-semibold">
              <Lightbulb className="size-5 shrink-0 text-amber-500" />
              {recommendation.title}
            </h3>
            <Badge variant="outline" className={priorityBadge.color}>
              {priorityBadge.icon}
              Prioridad {priorityBadge.label}
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
          <Badge variant="outline" className={priorityBadge.color}>
            {priorityBadge.icon}
            Prioridad {priorityBadge.label}
          </Badge>
        </DialogHeader>
      )}

      <div className="space-y-4 overflow-y-auto p-4 md:p-6 md:pt-0">
        <div className="space-y-1 text-sm">
          <h4 className="mb-1 font-medium">Recomendación generada</h4>
          <div
            className={cn(
              "space-y-1 rounded-xl border p-4",
              !isFromSavedRecommendations && "bg-background border-0",
            )}
          >
            <p>{recommendation.description}</p>
          </div>
        </div>

        {recommendation.relatedTags.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-medium">
              Categorías relacionadas
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {recommendation.relatedTags.map((tag) => (
                <Badge
                  key={tag}
                  className={cn("font-normal text-white", getTagColor(tag))}
                >
                  <Tag className="size-2.5!" />
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
                      className={cn(
                        "bg-accent relative rounded-xl p-3",
                        !isFromSavedRecommendations && "bg-background",
                      )}
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
                            onClick={() =>
                              handleDownload({
                                url: doc.file?.url,
                                name: doc.file?.name || "documento",
                              })
                            }
                            className="bg-background size-8 hover:opacity-100 [&_svg]:size-3.5!"
                          >
                            <span className="sr-only">Descargar</span>
                          </DownloadButton>
                        </BetterTooltip>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="bg-background flex flex-col items-center gap-2 rounded-md border border-dashed p-3"
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

        <div>
          <h4 className="mb-1 text-sm font-medium">Acciones recomendadas</h4>
          <div className="mb-2 rounded-xl bg-amber-50 p-3 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
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
                  <li>
                    Discute esta recomendación en tu próxima visita médica
                  </li>
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
          <div className="flex items-start gap-2 rounded-xl bg-green-50 p-3 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
            <BadgeAlert
              variant="success"
              className="mb-0 size-6 md:size-7 [&_svg]:size-3.5! md:[&_svg]:size-4!"
            />
            <p className="text-xs md:text-sm">
              Siempre consulta con profesionales de la salud antes de tomar
              decisiones médicas.
            </p>
          </div>
        </div>

        {onSaveNotes && (
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-medium">Mis notas</h4>
            <div className="space-y-2">
              <Textarea
                placeholder="Añade tus notas personales sobre esta recomendación..."
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="dark:border-alternative md:dark:border-border md:border-border min-h-20 resize-none"
              />
              <Button radius="full" size="sm" onClick={onSaveNotes}>
                Guardar notas
              </Button>
            </div>
          </div>
        )}
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
