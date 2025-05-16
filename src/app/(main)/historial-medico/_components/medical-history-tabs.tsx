"use client";

import { LayoutGrid, List, LockKeyhole } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

import { LockButton } from "@/components/button-kit/lock-button";
import { SmilePlusButton } from "@/components/button-kit/smile-plus-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Button } from "@/components/kit/button";
import { Card, CardContent } from "@/components/kit/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { BetterTooltip } from "@/components/kit/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn } from "@/lib/utils";

import DocumentEmptyState from "./document-empty-state";
import DocumentFilters from "./document-filters";
import DocumentSection from "./document-section";
import MedicalHistoryLoading from "./medical-history-loading";
import RecommendationEmptyState from "./recommendation-empty-state";
import RecommendationFilters from "./recommendation-filters";
import RecommendationSection from "./recommendation-section";
import SavedRecommendationsLoading from "./saved-recommendations-loading";
import { useViewMode } from "../_hooks/use-view-mode";

import type { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";
import type {
  MedicalFileType,
  MedicalHistoryWithTags,
} from "@/db/querys/medical-history-querys";

interface MedicalHistoryTabsProps {
  filteredHistory: MedicalHistoryWithTags[];
  documentTypeFilter: "all" | "recent" | "shared" | "private";
  setDocumentTypeFilter: (
    value: "all" | "recent" | "shared" | "private",
  ) => void;
  documentCategoryFilter: MedicalFileType | "all";
  setDocumentCategoryFilter: (value: MedicalFileType | "all") => void;
  onView: (item: MedicalHistoryWithTags) => void;
  onAIClick: (item: MedicalHistoryWithTags) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onDownload: (fileData: { url?: string | null; name: string }) => void;
  onEdit: (item: MedicalHistoryWithTags) => void;
  onDelete: (item: MedicalHistoryWithTags) => void;
  onAddDocument: () => void;
  onOpenOptions: (item: MedicalHistoryWithTags | null) => void;
  currentItem: MedicalHistoryWithTags | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  clearFilters: () => void;
  isHistoryLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  medicalTags: { id: string; name: string }[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  getTagCount: (tag: string) => number;
  recommendations: SavedAIRecommendation[];
  medicalHistory: MedicalHistoryWithTags[];
  onDeleteRecommendation: (id: string) => void;
  onUpdateRecommendation: (recommendation: SavedAIRecommendation) => void;
  onShareRecommendation: (recommendation: SavedAIRecommendation) => void;
  onOpenPremiumModal: () => void;
  onOpenAIRecommendations: () => void;
}

const MedicalHistoryTabs = ({
  filteredHistory,
  documentTypeFilter,
  setDocumentTypeFilter,
  documentCategoryFilter,
  setDocumentCategoryFilter,
  onView,
  onAIClick,
  onViewFile,
  onDownload,
  onEdit,
  onDelete,
  onAddDocument,
  onOpenOptions,
  currentItem,
  isOpen,
  setIsOpen,
  clearFilters,
  isHistoryLoading,
  searchTerm,
  setSearchTerm,
  medicalTags,
  selectedTags,
  setSelectedTags,
  getTagCount,
  recommendations,
  medicalHistory,
  onDeleteRecommendation,
  onUpdateRecommendation,
  onShareRecommendation,
  onOpenPremiumModal,
  onOpenAIRecommendations,
}: MedicalHistoryTabsProps) => {
  const [activeTab, setActiveTab] = useState<"documents" | "recommendations">(
    "documents",
  );
  const { viewMode, setViewMode } = useViewMode();
  const [inputValue, setInputValue] = useState(searchTerm);

  const debouncedSetSearchTerm = useDebounceCallback(setSearchTerm, 150);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchTerm(value);
  };

  const [recomSearchTerm, setRecomSearchTerm] = useState("");
  const [recomInputValue, setRecomInputValue] = useState(recomSearchTerm);

  const debouncedSetRecomSearchTerm = useDebounceCallback(
    setRecomSearchTerm,
    150,
  );

  const handleChangeRecommendation = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setRecomInputValue(value);
    debouncedSetRecomSearchTerm(value);
  };

  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "high" | "medium" | "low"
  >("all");

  const isMobile = useIsMobile();
  const { user } = useUserProfile();
  const isPremium = user?.isPremium;

  const getFilteredByVisibility = () => {
    if (documentTypeFilter === "recent") {
      return filteredHistory
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5);
    }
    if (documentTypeFilter === "shared" || documentTypeFilter === "private") {
      return filteredHistory.filter((i) => i.visibility === documentTypeFilter);
    }
    return filteredHistory;
  };

  const docs = getFilteredByVisibility();

  const toggleTagFilter = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filteredRecommendations = recommendations.filter((rec) => {
    const matchesSearch =
      recomSearchTerm === "" ||
      rec.title.toLowerCase().includes(recomSearchTerm.toLowerCase()) ||
      rec.description.toLowerCase().includes(recomSearchTerm.toLowerCase()) ||
      rec.relatedTags.some((tag) =>
        tag.toLowerCase().includes(recomSearchTerm.toLowerCase()),
      ) ||
      rec.notes?.toLowerCase().includes(recomSearchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" || rec.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const clearRecomFilters = () => {
    setRecomSearchTerm("");
    setPriorityFilter("all");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {activeTab === "documents" ? (
          <motion.div
            key="documents"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            <h3 className="text-base font-medium">Mis documentos</h3>
          </motion.div>
        ) : (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            <h3 className="text-base font-medium">Mis Recomendaciones</h3>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab as any}
        className="mt-3 w-full"
      >
        <div className="mb-3 flex flex-col gap-2">
          <TabsList className="bg-background border-border/40 rounded-xl border">
            <TabsTrigger
              value="documents"
              className={cn("data-[state=active]:bg-accent")}
            >
              Documentos
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className={cn("data-[state=active]:bg-accent")}
            >
              Recomendaciones
              {!isPremium && (
                <LockKeyhole className="size-3.5 text-fuchsia-500" />
              )}
            </TabsTrigger>
          </TabsList>

          <div className="bg-muted flex items-center justify-between rounded-xl p-3">
            {activeTab === "documents" ? (
              <BetterTooltip content="Añadir documento">
                <SmilePlusButton
                  size="icon"
                  variant="outline"
                  onClick={onAddDocument}
                  className="bg-background"
                >
                  <span className="sr-only">Añadir documento</span>
                </SmilePlusButton>
              </BetterTooltip>
            ) : (
              isPremium && (
                <BetterTooltip content="Recomendaciones IA">
                  <SparklesButton
                    size="icon"
                    onClick={onOpenAIRecommendations}
                  />
                </BetterTooltip>
              )
            )}
            <div
              className={cn(
                "flex flex-col items-center gap-2 md:flex-row",
                !isPremium && "ms-auto",
              )}
            >
              {activeTab === "documents" ? (
                <DocumentFilters
                  inputValue={inputValue}
                  onChange={handleChange}
                  documentTypeFilter={documentTypeFilter}
                  setDocumentTypeFilter={setDocumentTypeFilter}
                  documentCategoryFilter={documentCategoryFilter}
                  setDocumentCategoryFilter={setDocumentCategoryFilter}
                  medicalTags={medicalTags}
                  selectedTags={selectedTags}
                  onToggleTagFilter={toggleTagFilter}
                  getTagCount={getTagCount}
                  clearFilters={clearFilters}
                />
              ) : (
                <RecommendationFilters
                  inputValue={recomInputValue}
                  onChange={handleChangeRecommendation}
                  priorityFilter={priorityFilter}
                  setPriorityFilter={setPriorityFilter}
                />
              )}
              {!isMobile && (
                <div className="bg-background flex items-center space-x-1 rounded-full border p-1">
                  <BetterTooltip content="Vista en grilla">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setViewMode("grid")}
                      className={cn(
                        "size-7",
                        viewMode === "grid" && "bg-accent",
                      )}
                      aria-label="Vista en grilla"
                    >
                      <LayoutGrid className="size-3.5!" />
                    </Button>
                  </BetterTooltip>
                  <BetterTooltip content="Vista en lista">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "size-7",
                        viewMode === "list" && "bg-accent",
                      )}
                      aria-label="Vista en lista"
                    >
                      <List className="size-3.5!" />
                    </Button>
                  </BetterTooltip>
                </div>
              )}
            </div>
          </div>
          <TabsContent value="documents" className="@container/list">
            {isHistoryLoading ? (
              <MedicalHistoryLoading viewMode={isMobile ? "grid" : viewMode} />
            ) : docs.length === 0 ? (
              <DocumentEmptyState
                hasFilters={
                  documentTypeFilter !== "all" ||
                  documentCategoryFilter !== "all" ||
                  searchTerm.trim() !== "" ||
                  selectedTags.length > 0
                }
                onClearFilters={clearFilters}
                onAddDocument={onAddDocument}
              />
            ) : (
              <DocumentSection
                docs={docs}
                viewMode={viewMode}
                onView={onView}
                onAIClick={onAIClick}
                onViewFile={onViewFile}
                onDownload={onDownload}
                onEdit={onEdit}
                onDelete={onDelete}
                currentDoc={currentItem}
                open={isOpen}
                setOpen={setIsOpen}
                onOpenOptions={onOpenOptions}
              />
            )}
          </TabsContent>
          <TabsContent value="recommendations" className="@container/list">
            {!isPremium ? (
              <Card className="border border-dashed border-indigo-200 dark:border-indigo-900">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <LockKeyhole className="mb-4 size-16 text-amber-400 opacity-50 dark:text-amber-300" />
                  <p className="text-foreground text-sm font-medium">
                    Contenido Premium Bloqueado
                  </p>
                  <p className="text-muted-foreground mt-2 max-w-md text-center text-sm">
                    Suscríbete a Premium para acceder a todas tus
                    recomendaciones guardadas y desbloquear funciones avanzadas.
                  </p>
                  <LockButton
                    size="sm"
                    variant="gradient"
                    onClick={onOpenPremiumModal}
                    className="mt-4"
                  >
                    Desbloquear Premium
                  </LockButton>
                </CardContent>
              </Card>
            ) : isHistoryLoading ? (
              <SavedRecommendationsLoading
                viewMode={isMobile ? "grid" : viewMode}
              />
            ) : filteredRecommendations.length === 0 ? (
              <RecommendationEmptyState
                searchTerm={recomSearchTerm}
                priorityFilter={priorityFilter}
                onClearFilters={clearRecomFilters}
              />
            ) : (
              <RecommendationSection
                recommendations={filteredRecommendations}
                medicalHistory={medicalHistory}
                onDeleteRecommendation={onDeleteRecommendation}
                onUpdateRecommendation={onUpdateRecommendation}
                onShareRecommendation={onShareRecommendation}
                onViewFile={onViewFile}
                viewMode={viewMode}
              />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
};

export default MedicalHistoryTabs;
