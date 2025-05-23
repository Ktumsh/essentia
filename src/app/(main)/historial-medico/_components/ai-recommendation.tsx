"use client";

import { Brain, Lightbulb, Tag, CheckCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { BookmarkButton } from "@/components/button-kit/bookmark-button";
import { CopyButton } from "@/components/button-kit/copy-button";
import { RefreshButton } from "@/components/button-kit/refresh-button";
import { SaveButton } from "@/components/button-kit/save-button";
import { ShareButton } from "@/components/button-kit/share-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { LoaderAIIcon } from "@/components/icons/status";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/kit/alert-dialog";
import { Badge } from "@/components/kit/badge";
import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import { Checkbox } from "@/components/kit/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { Label } from "@/components/kit/label";
import { ScrollArea } from "@/components/kit/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { Textarea } from "@/components/kit/textarea";
import { BetterTooltip } from "@/components/kit/tooltip";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { AiMedicalRecommendation } from "@/db/schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { getTagColor } from "../_lib/utils";
import { generateAiMedicalRecommendations } from "../actions";
import { AIRecommendationDetail } from "./ai-recommendation-detail";
import AIRecommendationsCard from "./ai-recommendations-card";

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

export type AIRecommendationType = Omit<
  AiMedicalRecommendation,
  "createdAt" | "isDeleted" | "userId" | "notes"
> & {
  relatedTags: string[];
  relatedDocuments?: string[];
};

interface AIRecommendationProps {
  isOpen: boolean;
  onClose: () => void;
  medicalHistory: MedicalHistoryWithTags[];
  selectedItems?: string[];
  selectedTags?: string[];
  savedRecommendations: AIRecommendationType[];
  onSaveRecommendation: (
    recommendation: AIRecommendationType | AIRecommendationType[],
  ) => void;
  isRecommendationSaved: (
    rec: AIRecommendationType,
    savedList: AIRecommendationType[],
  ) => boolean;
  toggleRecommendation: (
    recommendation: AIRecommendationType,
    savedList: AIRecommendationType[],
  ) => Promise<void>;
  onShareRecommendation: (
    recommendation: AIRecommendationType | AIRecommendationType[],
  ) => void;
}

const AIRecommendation = ({
  isOpen,
  onClose,
  medicalHistory,
  selectedItems = [],
  selectedTags = [],
  savedRecommendations,
  onSaveRecommendation,
  isRecommendationSaved,
  toggleRecommendation,
  onShareRecommendation,
}: AIRecommendationProps) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"select" | "results">("select");
  const [analysisType, setAnalysisType] = useState<"all" | "selected" | "tags">(
    "all",
  );

  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [selectedTagsForAnalysis, setSelectedTagsForAnalysis] = useState<
    string[]
  >([]);

  const [recommendations, setRecommendations] = useState<
    AIRecommendationType[]
  >([]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<AIRecommendationType | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const [secondaryIndex, setSecondaryIndex] = useState(
    Math.floor(Math.random() * secondaryMessages.length),
  );

  const [savedRecommendation, setSavedRecommendation] =
    useState<boolean>(false);

  const [, copyToClipboard] = useCopyToClipboard();

  // Actualiza la selección al recibir nuevas props
  useEffect(() => setSelectedDocuments(selectedItems), [selectedItems]);
  useEffect(() => setSelectedTagsForAnalysis(selectedTags), [selectedTags]);

  useEffect(() => {
    if (selectedRecommendation) {
      if (isRecommendationSaved(selectedRecommendation, savedRecommendations)) {
        setSavedRecommendation(true);
      } else {
        setSavedRecommendation(false);
      }
    } else {
      setSavedRecommendation(false);
    }
  }, [selectedRecommendation, savedRecommendations, isRecommendationSaved]);

  // Actualiza el tipo de análisis según las props de selección
  useEffect(() => {
    if (selectedItems.length > 0) {
      setAnalysisType("selected");
    } else if (selectedTags.length > 0) {
      setAnalysisType("tags");
    } else {
      setAnalysisType("all");
    }
  }, [selectedItems, selectedTags]);

  // Resetear estados al cerrar el diálogo
  useEffect(() => {
    if (!isOpen) {
      setRecommendations([]);
      setActiveTab("select");
      setCustomQuestion("");
    }
  }, [isOpen]);

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

  // Calcular documentos agrupados por tag
  const documentsByTag = useMemo(
    () =>
      medicalHistory.reduce(
        (acc, doc) => {
          doc.tags.forEach((tag) => {
            if (!acc[tag]) acc[tag] = [];
            acc[tag].push(doc);
          });
          return acc;
        },
        {} as Record<string, MedicalHistoryWithTags[]>,
      ),
    [medicalHistory],
  );

  // Lista de tags únicos
  const allTags = useMemo(
    () => Object.keys(documentsByTag).sort(),
    [documentsByTag],
  );

  // Función helper para obtener documentos a analizar según el tipo
  const getDocsToAnalyze = useCallback((): MedicalHistoryWithTags[] => {
    if (analysisType === "all") return medicalHistory;
    if (analysisType === "selected")
      return medicalHistory.filter((doc) => selectedDocuments.includes(doc.id));
    if (analysisType === "tags")
      return medicalHistory.filter((doc) =>
        doc.tags.some((tag) => selectedTagsForAnalysis.includes(tag)),
      );
    return [];
  }, [
    analysisType,
    medicalHistory,
    selectedDocuments,
    selectedTagsForAnalysis,
  ]);

  // Función para solicitar recomendaciones
  const requestRecommendations = async () => {
    const docsToAnalyze = getDocsToAnalyze();

    if (docsToAnalyze.length === 0) {
      toast.error("No hay datos para analizar");
      return;
    }

    setIsLoading(true);
    setActiveTab("results");

    try {
      const payload = {
        documents: docsToAnalyze.map((doc) => ({
          id: doc.id,
          condition: doc.condition,
          tags: doc.tags,
          description: doc.description || "",
          type: doc.type,
          issuer: doc.issuer || "",
          documentDate: doc.documentDate?.toString() || null,
          file: doc.file?.url
            ? {
                url: doc.file.url,
                contentType: doc.file.contentType || "application/pdf",
              }
            : undefined,
        })),
        question: customQuestion.trim() || null,
      };

      const response = await generateAiMedicalRecommendations(payload);

      if ("error" in response) {
        toast.error(response.error);
        setActiveTab("select");
        return;
      }

      setRecommendations(response);
      setActiveTab("results");
    } catch (error) {
      console.error("Error al solicitar recomendaciones:", error);
      toast.error("Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

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

  const toggleDocumentSelection = useCallback(
    (docId: string) =>
      setSelectedDocuments((prev) =>
        prev.includes(docId)
          ? prev.filter((id) => id !== docId)
          : [...prev, docId],
      ),
    [],
  );

  const toggleTagSelection = useCallback(
    (tag: string) =>
      setSelectedTagsForAnalysis((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      ),
    [],
  );

  const selectAllDocumentsForTag = useCallback(
    (tag: string) => {
      const docIds = documentsByTag[tag]?.map((doc) => doc.id) || [];
      setSelectedDocuments((prev) => Array.from(new Set([...prev, ...docIds])));
    },
    [documentsByTag],
  );

  const deselectAllDocumentsForTag = useCallback(
    (tag: string) => {
      const docIds = documentsByTag[tag]?.map((doc) => doc.id) || [];
      setSelectedDocuments((prev) => prev.filter((id) => !docIds.includes(id)));
    },
    [documentsByTag],
  );

  const handleClose = () => {
    const anySaved = recommendations.some((rec) =>
      isRecommendationSaved(rec, savedRecommendations),
    );

    if (recommendations.length > 0 && !anySaved) {
      setAlertOpen(true);
      return;
    }
    onClose();
    setSelectedRecommendation(null);
  };

  const allRecommendationsSaved = useMemo(() => {
    if (recommendations.length === 0) return false;
    return recommendations.every((rec) =>
      isRecommendationSaved(rec, savedRecommendations),
    );
  }, [recommendations, savedRecommendations, isRecommendationSaved]);

  const content = (
    <>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "select" | "results")}
        className="flex h-full flex-1 flex-col overflow-hidden"
      >
        <div className="px-4 pt-0 md:px-6 md:pt-6">
          <TabsList className="bg-background grid h-auto w-full grid-cols-2 rounded-full md:h-9">
            <TabsTrigger
              value="select"
              className="data-[state=active]:bg-accent text-xs! md:text-sm!"
            >
              Seleccionar datos
            </TabsTrigger>
            <TabsTrigger
              value="results"
              disabled={recommendations.length === 0 && !isLoading}
              className="data-[state=active]:bg-accent text-xs! md:text-sm!"
            >
              Resultados
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Contenido para selección */}
        <TabsContent
          value="select"
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex flex-1 flex-col space-y-4 overflow-hidden">
            <div className="no-scrollbar flex gap-2 overflow-y-auto px-4 md:px-6">
              <Button
                size="sm"
                radius="full"
                variant={analysisType === "all" ? "secondary" : "outline"}
                onClick={() => setAnalysisType("all")}
                className={cn(
                  "bg-background flex-1 border-0 text-xs md:text-sm",
                  analysisType === "all" && "bg-secondary",
                )}
              >
                Todo el historial
              </Button>
              <Button
                size="sm"
                radius="full"
                variant={analysisType === "selected" ? "secondary" : "outline"}
                onClick={() => setAnalysisType("selected")}
                className={cn(
                  "bg-background flex-1 border-0 text-xs md:text-sm",
                  analysisType === "selected" && "bg-secondary",
                )}
              >
                Documentos específicos
              </Button>
              <Button
                size="sm"
                radius="full"
                variant={analysisType === "tags" ? "secondary" : "outline"}
                onClick={() => setAnalysisType("tags")}
                className={cn(
                  "bg-background flex-1 border-0 text-xs md:text-sm",
                  analysisType === "tags" && "bg-secondary",
                )}
              >
                Por categorías
              </Button>
            </div>

            <div className="px-4 md:px-6">
              <ScrollArea className="bg-background h-72 flex-1 rounded-xl">
                {analysisType === "all" && (
                  <div className="space-y-4 p-4">
                    <p className="text-muted-foreground text-sm">
                      Se analizará todo tu historial médico para generar
                      recomendaciones personalizadas.
                    </p>
                    <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      <BadgeAlert
                        variant="warning"
                        className="mb-0 size-6 md:size-7 [&_svg]:size-3.5! md:[&_svg]:size-4!"
                      />
                      <div>
                        <p className="text-xs font-medium text-amber-900 md:text-sm dark:text-amber-200">
                          Información importante
                        </p>
                        <p className="text-xs md:text-sm">
                          El análisis incluirá todos tus documentos médicos (
                          {medicalHistory.length}). Si prefieres un análisis más
                          específico, selecciona “Documentos específicos” o “Por
                          categorías”.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {analysisType === "selected" && (
                  <div className="space-y-4 p-4">
                    <p className="text-muted-foreground text-sm">
                      Selecciona los documentos específicos que deseas incluir
                      en el análisis.
                    </p>
                    {allTags.map((tag) => (
                      <div key={tag} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge
                            className={cn(
                              "h-fit font-normal text-white",
                              getTagColor(tag),
                            )}
                          >
                            <Tag className="size-2.5!" />
                            {tag} ({documentsByTag[tag].length})
                          </Badge>
                          {!documentsByTag[tag].every((doc) =>
                            selectedDocuments.includes(doc.id),
                          ) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto h-6 w-fit text-xs"
                              onClick={() => selectAllDocumentsForTag(tag)}
                            >
                              Seleccionar todos
                            </Button>
                          )}
                          {documentsByTag[tag].every((doc) =>
                            selectedDocuments.includes(doc.id),
                          ) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto h-6 w-fit text-xs"
                              onClick={() => deselectAllDocumentsForTag(tag)}
                            >
                              Deseleccionar todos
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          {documentsByTag[tag].map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`doc-${doc.id}`}
                                checked={selectedDocuments.includes(doc.id)}
                                onCheckedChange={() =>
                                  toggleDocumentSelection(doc.id)
                                }
                                className="dark:border-alternative"
                              />
                              <div className="grid">
                                <label
                                  htmlFor={`doc-${doc.id}`}
                                  className="flex-1 cursor-pointer truncate text-sm"
                                >
                                  {doc.condition}
                                </label>
                                {doc.issuer && (
                                  <span className="text-muted-foreground ml-1 text-xs">
                                    ({doc.issuer})
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {selectedDocuments.length === 0 && (
                      <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        <BadgeAlert
                          variant="warning"
                          className="mb-0 size-6 md:size-7 [&_svg]:size-3.5! md:[&_svg]:size-4!"
                        />
                        <p className="text-xs md:text-sm">
                          Selecciona al menos un documento para continuar.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {analysisType === "tags" && (
                  <div className="space-y-4 p-4">
                    <p className="text-muted-foreground text-sm">
                      Selecciona las categorías que deseas incluir en el
                      análisis.
                    </p>
                    <div className="grid gap-2 md:grid-cols-2">
                      {allTags.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tag-${tag}`}
                            checked={selectedTagsForAnalysis.includes(tag)}
                            onCheckedChange={() => toggleTagSelection(tag)}
                            className="dark:border-alternative"
                          />
                          <label
                            htmlFor={`tag-${tag}`}
                            className="flex-1 cursor-pointer text-sm"
                          >
                            <Badge
                              className={cn(
                                "font-normal text-white",
                                getTagColor(tag),
                              )}
                            >
                              {tag} ({documentsByTag[tag].length})
                            </Badge>
                          </label>
                        </div>
                      ))}
                    </div>
                    {selectedTagsForAnalysis.length === 0 && (
                      <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        <BadgeAlert
                          variant="warning"
                          className="mb-0 size-6 md:size-7 [&_svg]:size-3.5! md:[&_svg]:size-4!"
                        />
                        <p className="text-xs md:text-sm">
                          Selecciona al menos una categoría para continuar.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </div>

            <div className="space-y-4 px-4 md:px-6">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="custom-question">
                  Pregunta personalizada (opcional)
                </Label>
                <Textarea
                  id="custom-question"
                  placeholder="Ej: ¿Qué puedo hacer para mejorar mi salud cardiovascular?"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  className="bg-background resize-none border-0"
                />
                <p className="text-muted-foreground text-xs">
                  Puedes hacer una pregunta específica relacionada con tu
                  historial médico.
                </p>
              </div>
              <ScrollArea className="bg-secondary/30 h-20 overflow-hidden rounded-lg text-sm">
                <div className="p-3">
                  <p className="text-secondary mb-1 font-medium">
                    Resumen del análisis
                  </p>
                  {analysisType === "all" && (
                    <p>
                      Se incluirán{" "}
                      <strong className="font-semibold">todos</strong> tus
                      documentos médicos ({medicalHistory.length} documentos).
                    </p>
                  )}
                  {analysisType === "selected" && (
                    <div>
                      Se analizarán <strong>{selectedDocuments.length}</strong>{" "}
                      documento
                      {selectedDocuments.length === 1 ? "" : "s"} seleccionado
                      {selectedDocuments.length > 0 && ":"}
                      {selectedDocuments.length > 0 && (
                        <ul className="ml-4 list-disc">
                          {medicalHistory
                            .filter((doc) => selectedDocuments.includes(doc.id))
                            .map((doc) => (
                              <li key={doc.id}>{doc.condition}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                  )}
                  {analysisType === "tags" && (
                    <div>
                      <div>
                        Se incluirán documentos con las siguientes{" "}
                        <strong>{selectedTagsForAnalysis.length}</strong>{" "}
                        categoría
                        {selectedTagsForAnalysis.length === 1 ? "" : "s"}{" "}
                        seleccionada
                        {selectedTagsForAnalysis.length > 0 && ":"}
                      </div>
                      <ul className="mt-1 ml-4 list-disc">
                        {selectedTagsForAnalysis.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>

        {/* Contenido para resultados */}
        <TabsContent
          value="results"
          className="flex flex-1 flex-col overflow-hidden"
        >
          {isLoading ? (
            <div className="m-4 flex flex-1 flex-col items-center justify-center rounded-lg bg-linear-to-r/shorter from-indigo-200 to-fuchsia-200 px-4 md:m-6 dark:from-indigo-900 dark:to-fuchsia-900">
              <LoaderAIIcon className="text-secondary mb-4 size-10" />

              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-base font-medium"
              >
                ✨ Preparando sugerencias para ti...
              </motion.p>
              <span className="loading-shimmer text-sm">
                {secondaryMessages[secondaryIndex]}
              </span>
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
                    onBack={() => setSelectedRecommendation(null)}
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
                          onClick={requestRecommendations}
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
                            onClick={() =>
                              onSaveRecommendation(recommendations)
                            }
                            className={cn(
                              "hover:bg-background",
                              allRecommendationsSaved && "fill-foreground",
                            )}
                          />
                        </BetterTooltip>
                      )}
                    </div>
                  </div>
                  <div className="overflow-y-auto">
                    <div className="space-y-4 px-4 md:px-6 md:pb-6">
                      {recommendations.map((rec, index) => (
                        <AIRecommendationsCard
                          key={index}
                          recommendation={rec}
                          medicalHistory={medicalHistory}
                          currentItem={selectedRecommendation}
                          savedRecommendations={savedRecommendations}
                          onViewDetails={() => setSelectedRecommendation(rec)}
                          onShare={onShareRecommendation}
                          isSaved={isRecommendationSaved}
                          toggleRecommendation={toggleRecommendation}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </TabsContent>
      </Tabs>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent isSecondary>
          <AlertDialogHeader isSecondary className="p-4 md:p-6">
            <BadgeAlert variant="warning" />
            <AlertDialogTitle>Confirmar cierre</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-1.5">
                <p>
                  Aún no has guardado ninguna recomendación. Si cierras,
                  perderás la actual y deberás generar una nueva 😅
                </p>
                <p className="font-semibold text-amber-500">
                  ¿Estás seguro de que deseas cerrar?
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter isSecondary className="justify-end!">
            <AlertDialogCancel asChild>
              <Button
                variant="outline"
                onClick={() => setAlertOpen(false)}
                className="rounded-full"
              >
                Cancelar
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  setAlertOpen(false);
                  setTimeout(() => {
                    setSelectedRecommendation(null);
                    onClose();
                  }, 100);
                }}
                className="rounded-full"
              >
                Confirmar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );

  return isMobile ? (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DrawerContent className="h-full">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-center gap-2">
            <Brain className="size-5 text-indigo-500" />
            Recomendaciones con IA
          </DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="p-4">
          Obtén recomendaciones personalizadas basadas en tu historial médico.
        </DrawerDescription>
        <div className="flex-1 overflow-y-auto">{content}</div>
        <DrawerFooter>
          {selectedRecommendation ? (
            <>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <ArrowLeftButton
                  variant="mobile"
                  onClick={() => setSelectedRecommendation(null)}
                  className="justify-center rounded-xl"
                >
                  Atrás
                </ArrowLeftButton>
              </div>
              <SaveButton
                disabled={savedRecommendation}
                onClick={() => {
                  onSaveRecommendation(selectedRecommendation);
                  setSelectedRecommendation(null);
                }}
                className="h-12! gap-5 rounded-xl"
              >
                {savedRecommendation
                  ? "Recomendación guardada"
                  : "Guardar recomendación"}
              </SaveButton>
            </>
          ) : activeTab === "select" ? (
            <>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <Button
                  variant="mobile"
                  onClick={handleClose}
                  className="justify-center"
                >
                  Cancelar
                </Button>
              </div>
              <SparklesButton
                size="default"
                onClick={requestRecommendations}
                disabled={
                  isLoading ||
                  (analysisType === "selected" &&
                    selectedDocuments.length === 0) ||
                  (analysisType === "tags" &&
                    selectedTagsForAnalysis.length === 0) ||
                  (analysisType === "all" && medicalHistory.length === 0) ||
                  recommendations.length > 0
                }
                className="h-12! gap-5 rounded-xl"
              >
                {recommendations.length > 0
                  ? "Recomendaciones generadas"
                  : isLoading
                    ? "Analizando..."
                    : "Generar recomendaciones"}
              </SparklesButton>
            </>
          ) : (
            <>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <ArrowLeftButton
                  variant="mobile"
                  onClick={() => setActiveTab("select")}
                  className="justify-center rounded-xl"
                >
                  Volver a selección
                </ArrowLeftButton>
              </div>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <Button
                  variant="mobile"
                  onClick={handleClose}
                  className="justify-center"
                >
                  Cerrar
                </Button>
              </div>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent
        isBlurred
        isSecondary
        className="border-secondary/50 h-full border-dashed bg-linear-to-br/shorter from-indigo-100 to-fuchsia-100 sm:max-w-2xl dark:from-indigo-950/50 dark:to-fuchsia-950/50"
      >
        <DialogHeader isSecondary>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="text-primary size-5" />
            Recomendaciones con IA
          </DialogTitle>
          <DialogDescription>
            Obtén recomendaciones personalizadas basadas en tu historial médico.
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter isSecondary className="border-background bg-secondary/10">
          {selectedRecommendation ? (
            <>
              <ArrowLeftButton
                variant="outline"
                onClick={() => setSelectedRecommendation(null)}
                className="bg-background rounded-full"
              >
                Atrás
              </ArrowLeftButton>
              <SaveButton
                disabled={savedRecommendation}
                onClick={() => {
                  onSaveRecommendation(selectedRecommendation);
                  setSelectedRecommendation(null);
                }}
                className="rounded-full"
              >
                {savedRecommendation
                  ? "Recomendación guardada"
                  : "Guardar recomendación"}
              </SaveButton>
            </>
          ) : activeTab === "select" ? (
            <>
              <Button
                radius="full"
                variant="outline"
                onClick={handleClose}
                className="bg-background"
              >
                Cancelar
              </Button>
              <SparklesButton
                disabled={
                  isLoading ||
                  (analysisType === "selected" &&
                    selectedDocuments.length === 0) ||
                  (analysisType === "tags" &&
                    selectedTagsForAnalysis.length === 0) ||
                  (analysisType === "all" && medicalHistory.length === 0) ||
                  recommendations.length > 0
                }
                onClick={requestRecommendations}
                className="rounded-full"
              >
                {recommendations.length > 0
                  ? "Recomendaciones generadas"
                  : isLoading
                    ? "Analizando..."
                    : "Generar recomendaciones"}
              </SparklesButton>
            </>
          ) : (
            <>
              <Button
                radius="full"
                variant="outline"
                onClick={() => setActiveTab("select")}
                className="bg-background"
              >
                Volver a selección
              </Button>
              <Button
                radius="full"
                variant="outline"
                onClick={handleClose}
                className="bg-background"
              >
                Cerrar
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIRecommendation;
