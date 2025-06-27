"use client";

import { FileText, FileX, Lightbulb, Tag } from "lucide-react";

import { DownloadButton } from "@/components/button-kit/download-button";
import { EyeButton } from "@/components/button-kit/eye-button";
import { Badge } from "@/components/ui/badge";
import { BadgeAlert } from "@/components/ui/badge-alert";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { BetterTooltip } from "@/components/ui/tooltip";
import { MedicalHistory } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, formatDate } from "@/utils";

import { useMedicalHistoryLogic } from "../_hooks/use-medical-history-logic";
import { getFileTypeColor, getPriorityBadge, getTagColor } from "../_lib/utils";

import type { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";

interface RecommendationViewProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: SavedAIRecommendation;
  medicalHistory: MedicalHistory[];
  editNotes?: string;
  setEditNotes?: (notes: string) => void;
  onSaveNotes?: () => void;
  onViewFile?: (fileData: { url?: string | null; name: string }) => void;
}

const RecommendationView = ({
  isOpen,
  onClose,
  recommendation,
  medicalHistory,
  editNotes = "",
  setEditNotes = () => {},
  onSaveNotes,
  onViewFile,
}: RecommendationViewProps) => {
  const isMobile = useIsMobile();
  const { handleDownload } = useMedicalHistoryLogic();
  const priorityBadge = getPriorityBadge(recommendation.priority);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onClose}
      direction={isMobile ? "bottom" : "right"}
      handleOnly={!isMobile}
    >
      <DrawerContent className="md:bg-background data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-screen data-[vaul-drawer-direction=right]:max-w-md data-[vaul-drawer-direction=right]:rounded-none data-[vaul-drawer-direction=right]:p-0 md:border-l">
        <DrawerHeader className="md:flex-row md:gap-2 md:p-4">
          <div className="mask mask-squircle hidden size-11 shrink-0 place-content-center bg-amber-50 md:grid dark:bg-amber-950">
            <Lightbulb className="size-5 text-amber-500" />
          </div>
          <div>
            <DrawerTitle className="flex items-center gap-2 truncate md:max-w-full md:p-0 md:text-base md:leading-normal">
              {recommendation.title}
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground sr-only md:not-sr-only">
              Basado en {recommendation.relatedTags.length} categorías y{" "}
              {recommendation.relatedDocuments?.length || 0} documentos.
            </DrawerDescription>
          </div>
        </DrawerHeader>

        <DrawerDescription className="text-muted-foreground px-4 md:sr-only">
          Basado en {recommendation.relatedTags.length} categorías y{" "}
          {recommendation.relatedDocuments?.length || 0} documentos.
        </DrawerDescription>

        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-4 p-4">
            <Badge variant="outline" className={priorityBadge.color}>
              {priorityBadge.icon}
              Prioridad {priorityBadge.label}
            </Badge>
            <div className="space-y-1 text-sm">
              <h4 className="mb-1 font-medium">Recomendación generada</h4>
              <div className="bg-background rounded-xl border p-4">
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
                          className="bg-accent relative rounded-xl p-3"
                        >
                          <div className="grid grid-cols-[auto_1fr] gap-2 pr-24">
                            <FileText
                              className={cn(
                                "size-5",
                                getFileTypeColor(doc.type),
                              )}
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
                              <BetterTooltip content="Vista previa" side="top">
                                <DrawerClose asChild>
                                  <EyeButton
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                      onViewFile({
                                        url: doc.file?.url,
                                        name: doc.file?.name || "documento",
                                      })
                                    }
                                    className="bg-background size-8 hover:opacity-100 [&_svg]:size-3.5!"
                                  />
                                </DrawerClose>
                              </BetterTooltip>
                            )}
                            <BetterTooltip
                              content="Descargar documento"
                              side="top"
                            >
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
                              />
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
                            Documento no encontrado
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            <div>
              <h4 className="mb-1 text-sm font-medium">
                Acciones recomendadas
              </h4>
              <div className="mb-2 rounded-xl bg-amber-50 p-3 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <ul className="list-inside list-disc space-y-1 text-sm">
                  {recommendation.priority === "high" ? (
                    <>
                      <li>Consulta con tu médico lo antes posible.</li>
                      <li>
                        Agenda una cita de seguimiento en las próximas semanas.
                      </li>
                    </>
                  ) : recommendation.priority === "medium" ? (
                    <>
                      <li>Discútelo en tu próxima visita médica.</li>
                      <li>Mantén un registro de síntomas relacionados.</li>
                    </>
                  ) : (
                    <>
                      <li>Ten en cuenta esta información para tu bienestar.</li>
                      <li>
                        Inclúyela en tu próxima revisión médica rutinaria.
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-green-50 p-3 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
                <BadgeAlert
                  variant="success"
                  className="mb-0 size-6 md:size-7"
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
        </div>

        <DrawerFooter className="md:gap-2">
          <DrawerClose asChild>
            <Button variant="outline" radius="full">
              Cerrar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RecommendationView;
