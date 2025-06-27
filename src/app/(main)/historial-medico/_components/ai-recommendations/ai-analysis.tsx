"use client";

import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { ArrowRightButton } from "@/components/button-kit/arrow-right-button";
import { CheckCheckButton } from "@/components/button-kit/check-check-button";
import { SaveButton } from "@/components/button-kit/save-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

import AIDisclaimer from "./ai-disclaimer";
import AnalysisDetails from "./analysis-details";
import MethodSelectionStep from "./method-selection-step";
import ProcessingStep from "./processing-step";
import RecommendationsStep from "./recommendations-step";
import SelectionStep from "./selection-step";
import StepIndicator from "./step-indicator";
import { useDisclaimer } from "../../_hooks/use-disclaimer";
import {
  getDocsToAnalyze,
  groupDocumentsCountByCategory,
} from "../../_lib/utils";
import { generateAiMedicalRecommendations } from "../../actions";

import type { MedicalHistory } from "@/db/querys/medical-history-querys";
import type {
  AIRecommendation,
  AnalysisMethod,
  AnalysisStep,
  SavedRecommendation,
} from "@/lib/types";

interface AIRecommendationProps {
  isOpen: boolean;
  onClose: () => void;
  documents: Array<MedicalHistory>;
  selectedItems?: string[];
  selectedTags?: string[];
  savedRecommendations: Array<SavedRecommendation>;
  onSaveRecommendation: (
    recommendation: SavedRecommendation | Array<SavedRecommendation>,
  ) => void;
  isRecommendationSaved: (
    rec: SavedRecommendation,
    savedList: Array<SavedRecommendation>,
  ) => boolean;
  toggleRecommendation: (
    recommendation: SavedRecommendation,
    savedList: Array<SavedRecommendation>,
  ) => Promise<void>;
  onShareRecommendation: (
    recommendation: SavedRecommendation | Array<SavedRecommendation>,
  ) => void;
}

const AIAnalysis = ({
  isOpen,
  onClose,
  documents,
  selectedItems = [],
  selectedTags = [],
  savedRecommendations,
  onSaveRecommendation,
  isRecommendationSaved,
  toggleRecommendation,
  onShareRecommendation,
}: AIRecommendationProps) => {
  const isMobile = useIsMobile();
  const { showDisclaimer, dismissDisclaimer } = useDisclaimer(isOpen);
  const [currentStep, setCurrentStep] = useState<AnalysisStep>("method");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [analysisMethod, setAnalysisMethod] = useState<AnalysisMethod>("all");
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customQuery, setCustomQuery] = useState("");
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(
    [],
  );
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<AIRecommendation | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const categoriesWithCounts = groupDocumentsCountByCategory(documents);
  const categoryCount = Object.keys(categoriesWithCounts).length;

  const [isLoading, setIsLoading] = useState(false);
  const [savedRecom, setSavedRecom] = useState<boolean>(false);

  // Actualiza la selección al recibir nuevas props
  useEffect(() => setSelectedDocuments(selectedItems), [selectedItems]);
  useEffect(() => setSelectedCategories(selectedTags), [selectedTags]);

  useEffect(() => {
    if (selectedRecommendation) {
      if (isRecommendationSaved(selectedRecommendation, savedRecommendations)) {
        setSavedRecom(true);
      } else {
        setSavedRecom(false);
      }
    } else {
      setSavedRecom(false);
    }
  }, [selectedRecommendation, savedRecommendations, isRecommendationSaved]);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setAnalysisMethod("categories");
    } else if (selectedTags.length > 0) {
      setAnalysisMethod("categories");
    } else {
      setAnalysisMethod("all");
    }
  }, [selectedItems, selectedTags]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep("method");
      setCompletedSteps([]);
      setAnalysisMethod("all");
      setSelectedDocuments([]);
      setSelectedCategories([]);
      setCustomQuery("");
      setRecommendations([]);
      setSelectedRecommendation(null);
      setDontShowAgain(false);
    }
  }, [isOpen]);

  const handleMethodSelect = (method: AnalysisMethod) => {
    setAnalysisMethod(method);
  };

  const handleContinueFromMethod = () => {
    setCurrentStep("selection");
    setCompletedSteps(["method"]);
  };

  const handleCategoryToggle = (documentIds: string[]) => {
    setSelectedDocuments((prev) => {
      const currentlySelected = documentIds.filter((id) => prev.includes(id));

      if (currentlySelected.length === documentIds.length) {
        return prev.filter((id) => !documentIds.includes(id));
      } else {
        const newSelection = new Set([...prev, ...documentIds]);
        return Array.from(newSelection);
      }
    });
  };

  const handleCategorySelectorToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleDocumentToggle = (documentId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId)
        ? prev.filter((id) => id !== documentId)
        : [...prev, documentId],
    );
  };

  const handleBackToMethod = () => {
    setCurrentStep("method");
    setCompletedSteps([]);
    setRecommendations([]);
    setSelectedRecommendation(null);
  };

  const handleBackToSelection = () => {
    setCurrentStep("selection");
    setCompletedSteps(["method"]);
    setRecommendations([]);
    setSelectedRecommendation(null);
  };

  const handleViewRecommendationDetails = (
    recommendation: AIRecommendation,
  ) => {
    setSelectedRecommendation(recommendation);
  };

  const handleBackToRecommendations = () => {
    setSelectedRecommendation(null);
  };

  const handleStartAnalysis = async () => {
    const docsToAnalyze = getDocsToAnalyze({
      documents,
      analysisMethod,
      selectedDocuments,
      selectedCategories,
    });

    if (docsToAnalyze.length === 0) {
      toast.error("No hay datos para analizar");
      return;
    }

    setIsLoading(true);
    setCurrentStep("processing");
    setCompletedSteps(["method", "selection"]);

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
        question: customQuery.trim() || null,
      };

      const response = await generateAiMedicalRecommendations(payload);

      if ("error" in response) {
        toast.error(response.error);
        setCurrentStep("method");
        setCompletedSteps(["method"]);
        return;
      }

      setRecommendations(response);
      setCurrentStep("recommendations");
      setCompletedSteps(["method", "selection", "processing"]);
    } catch (error) {
      console.error("Error al solicitar recomendaciones:", error);
      toast.error("Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedRecommendation(null);
  };

  const handleDisclaimerAccept = () => {
    dismissDisclaimer(dontShowAgain);
  };

  const renderContent = () => {
    if (selectedRecommendation) {
      return (
        <AnalysisDetails
          documents={documents}
          recommendation={selectedRecommendation}
        />
      );
    }

    switch (currentStep) {
      case "selection":
        return (
          <SelectionStep
            analysisMethod={analysisMethod}
            documents={documents}
            categories={categoriesWithCounts}
            selectedDocuments={selectedDocuments}
            selectedCategories={selectedCategories}
            customQuery={customQuery}
            setCustomQuery={setCustomQuery}
            onDocumentToggle={handleDocumentToggle}
            onCategoryToggle={handleCategoryToggle}
            onCategorySelectorToggle={handleCategorySelectorToggle}
          />
        );
      case "processing":
        return <ProcessingStep isLoading={isLoading} />;
      case "recommendations":
        return (
          <RecommendationsStep
            analysisMethod={analysisMethod}
            docCount={documents.length}
            selectedDocuments={selectedDocuments}
            selectedCategories={selectedCategories}
            recommendations={recommendations}
            savedRecommendations={savedRecommendations}
            onViewDetails={handleViewRecommendationDetails}
            onToggleSave={toggleRecommendation}
            onShareRecommendation={onShareRecommendation}
            onSaveRecommendation={onSaveRecommendation}
            onStartAnalysis={handleStartAnalysis}
            isSaved={isRecommendationSaved}
          />
        );
      default:
        return (
          <MethodSelectionStep
            analysisMethod={analysisMethod}
            documentCount={documents.length}
            categoryCount={categoryCount}
            onMethodSelect={handleMethodSelect}
          />
        );
    }
  };

  const renderFooter = () => {
    if (showDisclaimer) {
      return isMobile ? (
        <>
          <div className="text-center">
            <p className="text-muted-foreground text-xs">
              Al continuar, confirmas que has leído y entendido este aviso
            </p>
          </div>
          <CheckCheckButton
            variant="mobile-primary"
            onClick={handleDisclaimerAccept}
          >
            Entendido, continuar
          </CheckCheckButton>
        </>
      ) : (
        <>
          <div className="text-center">
            <p className="text-muted-foreground text-xs">
              Al continuar, confirmas que has leído y entendido este aviso
            </p>
          </div>
          <CheckCheckButton
            className="rounded-full"
            onClick={handleDisclaimerAccept}
          >
            Entendido, continuar
          </CheckCheckButton>
        </>
      );
    }

    if (selectedRecommendation && !showDisclaimer) {
      return (
        <>
          {isMobile ? (
            <>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <ArrowLeftButton
                  variant="mobile"
                  onClick={handleBackToRecommendations}
                  className="justify-center rounded-xl"
                >
                  Atrás
                </ArrowLeftButton>
              </div>
              <SaveButton
                disabled={savedRecom}
                onClick={() => {
                  onSaveRecommendation(selectedRecommendation);
                  handleBackToRecommendations();
                }}
                className="h-12! gap-5 rounded-xl"
              >
                {savedRecom
                  ? "Recomendación guardada"
                  : "Guardar recomendación"}
              </SaveButton>
            </>
          ) : (
            <>
              <SaveButton
                disabled={savedRecom}
                onClick={() => {
                  onSaveRecommendation(selectedRecommendation);
                  handleBackToRecommendations();
                }}
                className="rounded-full"
              >
                {savedRecom
                  ? "Recomendación guardada"
                  : "Guardar recomendación"}
              </SaveButton>
              <ArrowLeftButton
                variant="outline"
                onClick={handleBackToRecommendations}
                className="bg-background rounded-full"
              >
                Atrás
              </ArrowLeftButton>
            </>
          )}
        </>
      );
    }

    switch (currentStep) {
      case "method":
        return (
          <>
            {isMobile ? (
              <>
                <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                  <Button
                    variant="mobile"
                    onClick={handleClose}
                    className="bg-background justify-center"
                  >
                    Cancelar
                  </Button>
                </div>
                <ArrowRightButton
                  variant="mobile-primary"
                  onClick={handleContinueFromMethod}
                  className="flex-row-reverse"
                >
                  Continuar
                </ArrowRightButton>
              </>
            ) : (
              <>
                <ArrowRightButton
                  onClick={handleContinueFromMethod}
                  className="flex-row-reverse rounded-full"
                >
                  Continuar
                </ArrowRightButton>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="bg-background rounded-full"
                >
                  Cancelar
                </Button>
              </>
            )}
          </>
        );
      case "selection":
        return isMobile ? (
          <>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <ArrowLeftButton variant="mobile" onClick={handleBackToMethod}>
                Cambiar método
              </ArrowLeftButton>
            </div>
            <SparklesButton
              size="default"
              onClick={handleStartAnalysis}
              disabled={
                isLoading ||
                (analysisMethod === "specific" &&
                  selectedDocuments.length === 0) ||
                (analysisMethod === "categories" &&
                  selectedCategories.length === 0)
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
            <SparklesButton
              variant="premium"
              size="default"
              disabled={
                isLoading ||
                (analysisMethod === "specific" &&
                  selectedDocuments.length === 0) ||
                (analysisMethod === "categories" &&
                  selectedCategories.length === 0)
              }
              onClick={handleStartAnalysis}
              className="rounded-full"
            >
              {recommendations.length > 0
                ? "Recomendaciones generadas"
                : isLoading
                  ? "Analizando..."
                  : "Generar recomendaciones"}
            </SparklesButton>
            <ArrowLeftButton
              variant="outline"
              onClick={handleBackToMethod}
              className="bg-background rounded-full"
            >
              Cambiar método
            </ArrowLeftButton>
          </>
        );
      case "recommendations":
        return isMobile ? (
          <>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <ArrowLeftButton variant="mobile" onClick={handleBackToSelection}>
                Volver a selección
              </ArrowLeftButton>
            </div>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <Button variant="mobile" onClick={handleClose}>
                Cerrar
              </Button>
            </div>
          </>
        ) : (
          <>
            <ArrowLeftButton
              variant="outline"
              onClick={handleBackToSelection}
              className="bg-background rounded-full"
            >
              Volver a selección
            </ArrowLeftButton>
            <Button
              variant="outline"
              onClick={handleClose}
              className="bg-background rounded-full"
            >
              Cerrar
            </Button>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onOpenChange={onClose}
        direction={isMobile ? "bottom" : "right"}
        handleOnly={!isMobile}
      >
        <DrawerContent className="md:bg-background via-background! bg-linear-to-r/shorter from-indigo-100 to-fuchsia-100 data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-screen data-[vaul-drawer-direction=right]:max-w-md data-[vaul-drawer-direction=right]:rounded-none data-[vaul-drawer-direction=right]:p-0 md:border-l dark:from-indigo-950/50 dark:to-fuchsia-950/50">
          <AnimatePresence mode="wait">
            {showDisclaimer ? (
              <DrawerHeader key="header-disclaimer" className="sr-only">
                <DrawerTitle>Recomendaciones con IA</DrawerTitle>
                <DrawerDescription className="sr-only">
                  Genera recomendaciones personalizadas para tu historial médico
                  utilizando inteligencia artificial. Selecciona el método de
                  análisis, los documentos relevantes y obtén sugerencias
                  basadas en tus datos.
                </DrawerDescription>
              </DrawerHeader>
            ) : (
              <DrawerHeader
                key={
                  selectedRecommendation
                    ? "header-details"
                    : `header-${currentStep}`
                }
                className="items-center md:gap-2 md:p-4"
              >
                <div className="flex items-center gap-2">
                  <DrawerTitle className="bg-premium flex items-center gap-2 truncate bg-clip-text text-transparent md:max-w-full md:p-0 md:text-lg md:leading-normal">
                    Recomendaciones con IA
                    <Sparkles className="text-secondary size-4" />
                  </DrawerTitle>
                </div>

                <DrawerDescription className="sr-only">
                  Genera recomendaciones personalizadas para tu historial médico
                  utilizando inteligencia artificial. Selecciona el método de
                  análisis, los documentos relevantes y obtén sugerencias
                  basadas en tus datos.
                </DrawerDescription>

                {!selectedRecommendation && (
                  <StepIndicator
                    currentStep={currentStep}
                    completedSteps={completedSteps}
                  />
                )}
              </DrawerHeader>
            )}

            <div
              key={
                showDisclaimer
                  ? "content-disclaimer"
                  : selectedRecommendation
                    ? `content-details-${selectedRecommendation.id}`
                    : `content-${currentStep}`
              }
              className="flex flex-1 overflow-y-auto p-4"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-1"
              >
                {showDisclaimer ? (
                  <AIDisclaimer
                    dontShowAgain={dontShowAgain}
                    setDontShowAgain={setDontShowAgain}
                  />
                ) : (
                  renderContent()
                )}
              </motion.div>
            </div>
            <DrawerFooter
              key={
                showDisclaimer
                  ? "footer-disclaimer"
                  : selectedRecommendation
                    ? "footer-details"
                    : `footer-${currentStep}`
              }
              className="md:gap-2"
            >
              {renderFooter()}
            </DrawerFooter>
          </AnimatePresence>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AIAnalysis;
