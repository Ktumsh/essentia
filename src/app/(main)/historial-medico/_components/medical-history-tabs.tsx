"use client";

import { LockKeyhole, SparklesIcon } from "lucide-react";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

import { LockButton } from "@/components/button-kit/lock-button";
import { Card, CardContent } from "@/components/kit/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn } from "@/lib/utils";

import DocumentEmptyState from "./document-empty-state";
import DocumentFilters from "./document-filters";
import DocumentSection from "./document-section";
import MedicalHistoryLoading from "./medical-history-loading";
import NewOptions from "./new-options";
import RecommendationEmptyState from "./recommendation-empty-state";
import RecommendationFilters from "./recommendation-filters";
import RecommendationSection from "./recommendation-section";
import SavedRecommendationsLoading from "./saved-recommendations-loading";
import SelectionHeader from "./section-header";
import ViewModeToggle from "./view-mode-toggle";
import { useMedicalDialogs } from "../_hooks/use-medical-dialogs";
import { useMedicalFoldersDialog } from "../_hooks/use-medical-folder-dialogs";
import { useMedicalHistoryLogic } from "../_hooks/use-medical-history-logic";
import { useMultiSelect } from "../_hooks/use-multi-select";
import { useViewMode } from "../_hooks/use-view-mode";

const MedicalHistoryTabs = () => {
  const {
    userId,
    filteredHistory,
    documentTypeFilter,
    setDocumentTypeFilter,
    documentCategoryFilter,
    setDocumentCategoryFilter,
    isOpenOptions,
    setIsOpenOptions,
    loading,
    searchTerm,
    setSearchTerm,
    selectedTags,
    clearFilters,
    medicalTags,
    setSelectedTags,
    getTagCount,
    medicalHistory,
    savedRecommendations,
    deleteRecommendation,
    updateRecommendationNotes,
    handleDownload,
    deleteDocuments,
    deleteRecommendations,
  } = useMedicalHistoryLogic();

  const {
    openDialog,
    setCurrentItem,
    editingItem,
    setEditingItem,
    setItemToDelete,
    setFileToView,
    setSelectedItemsForAI,
    setPremiumFeatureType,
    setRecommendationsToShare,
  } = useMedicalDialogs();

  const [activeTab, setActiveTab] = useState<"documents" | "recommendations">(
    "documents",
  );
  const { viewMode, setViewMode } = useViewMode();
  const [inputValue, setInputValue] = useState(searchTerm);
  const [recomSearchTerm, setRecomSearchTerm] = useState("");
  const [recomInputValue, setRecomInputValue] = useState("");

  const isMobile = useIsMobile();
  const { user } = useUserProfile();
  const isPremium = user?.isPremium;

  const { openFolderForm } = useMedicalFoldersDialog();

  const debouncedSetSearchTerm = useDebounceCallback(setSearchTerm, 150);
  const debouncedSetRecomSearchTerm = useDebounceCallback(
    setRecomSearchTerm,
    150,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedSetSearchTerm(e.target.value);
  };

  const handleChangeRecommendation = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRecomInputValue(e.target.value);
    debouncedSetRecomSearchTerm(e.target.value);
  };

  const toggleTagFilter = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const getFilteredDocs = () => {
    if (documentTypeFilter === "recent") {
      return [...filteredHistory]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5);
    }
    if (documentTypeFilter === "shared" || documentTypeFilter === "private") {
      return filteredHistory.filter((d) => d.visibility === documentTypeFilter);
    }
    return filteredHistory;
  };

  const docs = getFilteredDocs();

  const {
    selectedIds: selectedDocuments,
    handleSelect,
    handleToggle,
    clearSelection,
    setSelectedIds,
  } = useMultiSelect(docs);

  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "high" | "medium" | "low"
  >("all");

  const filteredRecommendations = savedRecommendations.filter((rec) => {
    const term = recomSearchTerm.toLowerCase();
    return (
      (priorityFilter === "all" || rec.priority === priorityFilter) &&
      (rec.title.toLowerCase().includes(term) ||
        rec.description.toLowerCase().includes(term) ||
        rec.relatedTags.some((tag) => tag.toLowerCase().includes(term)) ||
        rec.notes?.toLowerCase().includes(term))
    );
  });

  const {
    selectedIds: selectedRecommendations,
    handleSelect: handleSelectRecommendation,
    handleToggle: handleToggleRecommendation,
    clearSelection: clearRecommendationSelection,
    setSelectedIds: setSelectedRecommendations,
  } = useMultiSelect(filteredRecommendations);

  const clearRecomFilters = () => {
    setRecomSearchTerm("");
    setPriorityFilter("all");
  };

  const selectedDocCount = selectedDocuments.length;
  const isDocSelected = selectedDocCount > 0;

  const selectedRecomCount = selectedRecommendations.length;
  const isRecomSelected = selectedRecomCount > 0;

  return (
    <>
      <SelectionHeader
        activeTab={activeTab}
        isDocumentSelected={isDocSelected}
        isRecommendationSelected={isRecomSelected}
        documentCount={selectedDocCount}
        recommendationCount={selectedRecomCount}
        onClearDocuments={clearSelection}
        onClearRecommendations={clearRecommendationSelection}
        onDeleteDocuments={() => {
          deleteDocuments(userId, selectedDocuments);
          clearSelection();
        }}
        onDeleteRecommendations={() => {
          deleteRecommendations(userId, selectedRecommendations);
          clearRecommendationSelection();
        }}
      />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab as any}
        className="mt-3 w-full"
      >
        <div className="mb-3 flex flex-col">
          <TabsList className="bg-background mb-2 rounded-xl border">
            <TabsTrigger
              value="documents"
              className={cn("data-[state=active]:bg-accent")}
            >
              Documentos
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className={cn(
                "group/tab data-[state=active]:bg-secondary/10 text-secondary/70 data-[state=active]:text-secondary",
              )}
            >
              Recomendaciones
              {isPremium ? (
                <SparklesIcon className="group-data-[state=active]/tab:fill-secondary size-3.5" />
              ) : (
                <LockKeyhole className="text-secondary size-3.5" />
              )}
            </TabsTrigger>
          </TabsList>

          <div className="relative mb-3 flex w-full overflow-x-auto rounded-xl">
            <div className="bg-muted flex flex-1 items-center justify-between gap-2 p-3">
              <NewOptions
                isPremium={isPremium}
                disabled={loading}
                onNewAIRecommendation={() => openDialog("isAIDialogOpen")}
                onNewDocument={() => openDialog("isAddDialogOpen")}
                onNewFolder={() => openFolderForm()}
              />
              {isMobile && (
                <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
              )}
              <div
                className={cn(
                  "flex items-center gap-2",
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
                  <ViewModeToggle
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                  />
                )}
              </div>
            </div>
          </div>

          <TabsContent value="documents" className="@container/list">
            {loading ? (
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
                onAddDocument={() => openDialog("isAddDialogOpen")}
              />
            ) : (
              <DocumentSection
                docs={docs}
                viewMode={viewMode}
                onView={(item) => {
                  setCurrentItem(item);
                  openDialog("isViewDialogOpen");
                }}
                onAIClick={(item) => {
                  setSelectedItemsForAI([item.id]);
                  openDialog("isAIDialogOpen");
                }}
                onViewFile={(file) => {
                  setFileToView(file);
                  openDialog("isFileViewerOpen");
                }}
                onDownload={handleDownload}
                onEdit={(item) => {
                  setEditingItem(item);
                  openDialog("isEditDialogOpen");
                }}
                onDelete={(item) => {
                  setItemToDelete(item);
                  openDialog("isDeleteDialogOpen");
                }}
                currentDoc={editingItem}
                open={isOpenOptions}
                setOpen={setIsOpenOptions}
                onOpenOptions={(item) => {
                  setCurrentItem(item);
                  setIsOpenOptions(true);
                }}
                selectedDocs={selectedDocuments}
                onSelect={(e, id, index) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey) {
                    handleSelect(e, id, index);
                  } else {
                    handleToggle(id, index);
                  }
                }}
                onToggleSelectAll={() => {
                  if (selectedDocuments.length === docs.length) {
                    clearSelection();
                  } else {
                    setSelectedIds(docs.map((doc) => doc.id));
                  }
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="@container/list">
            {!isPremium ? (
              <Card className="border border-dashed border-indigo-200 dark:border-indigo-900">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <LockKeyhole className="mb-4 size-16 text-amber-400 opacity-50 dark:text-amber-300" />
                  <p className="text-foreground text-sm font-medium">
                    Recomendaciones con IA bloqueadas
                  </p>
                  <p className="text-muted-foreground mt-2 max-w-md text-center text-sm">
                    Suscríbete a Premium para acceder a todas tus
                    recomendaciones guardadas y desbloquear funciones avanzadas.
                  </p>
                  <LockButton
                    size="sm"
                    variant="gradient"
                    onClick={() => {
                      setPremiumFeatureType("saved-recommendations");
                      openDialog("isPremiumModal");
                    }}
                    className="mt-4"
                  >
                    Desbloquear Premium
                  </LockButton>
                </CardContent>
              </Card>
            ) : loading ? (
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
                onDeleteRecommendation={deleteRecommendation}
                onUpdateRecommendation={updateRecommendationNotes}
                onShareRecommendation={(r) => {
                  const list = Array.isArray(r) ? r : [r];
                  setRecommendationsToShare(list);
                  openDialog("isShareDialogOpen");
                }}
                onViewFile={(file) => {
                  setFileToView(file);
                  openDialog("isFileViewerOpen");
                }}
                viewMode={viewMode}
                open={isOpenOptions}
                setOpen={setIsOpenOptions}
                selectedRecom={selectedRecommendations}
                onSelect={(e, id, index) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey) {
                    handleSelectRecommendation(e, id, index);
                  } else {
                    handleToggleRecommendation(id, index);
                  }
                }}
                onToggleSelectAll={() => {
                  if (
                    selectedRecommendations.length ===
                    filteredRecommendations.length
                  ) {
                    clearRecommendationSelection();
                  } else {
                    setSelectedRecommendations(
                      filteredRecommendations.map((r) => r.id),
                    );
                  }
                }}
              />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
};

export default MedicalHistoryTabs;
