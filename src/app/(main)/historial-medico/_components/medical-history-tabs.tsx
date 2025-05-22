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
import DocumentLoading from "./document-loading";
import DocumentSection from "./document-section";
import MoveDocumentsDialog from "./move-documents-dialog";
import MultiDeleteAlert from "./multi-delete-alert";
import NewOptions from "./new-options";
import RecommendationEmptyState from "./recommendation-empty-state";
import RecommendationFilters from "./recommendation-filters";
import RecommendationLoading from "./recommendation-loading";
import RecommendationSection from "./recommendation-section";
import SelectionHeader from "./section-header";
import ViewModeToggle from "./view-mode-toggle";
import { useMedicalDialogs } from "../_hooks/use-medical-dialogs";
import { useMedicalFoldersDialog } from "../_hooks/use-medical-folder-dialogs";
import { useMedicalFolders } from "../_hooks/use-medical-folders";
import { useMedicalHistoryLogic } from "../_hooks/use-medical-history-logic";
import { useMultiSelect } from "../_hooks/use-multi-select";
import { useViewMode } from "../_hooks/use-view-mode";

import type { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";
import type { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";

const MedicalHistoryTabs = () => {
  const {
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
    handleDeleteDocuments,
    handleDeleteRecommendations,
    isSubmitting,
  } = useMedicalHistoryLogic();

  const {
    dialogs,
    openDialog,
    closeDialog,
    setCurrentItem,
    editingItem,
    setEditingItem,
    setItemToDelete,
    setFileToView,
    setSelectedItemsForAI,
    setPremiumFeatureType,
    setRecommendationsToShare,
  } = useMedicalDialogs();

  const { folders, handleMoveDocuments } = useMedicalFolders();

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
      return [...filteredHistory].sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime(),
      );
    }

    if (documentTypeFilter === "old") {
      return [...filteredHistory].sort(
        (a, b) =>
          new Date(a.createdAt ?? 0).getTime() -
          new Date(b.createdAt ?? 0).getTime(),
      );
    }

    return filteredHistory;
  };

  const docs = getFilteredDocs();

  const {
    containerRef: documentContainerRef,
    modalRef: documentModalRef,
    selectedIds: selectedDocuments,
    handleSelect,
    handleToggle,
    clearSelection,
    setSelectedIds,
    handlePointerDown,
    handlePointerUp,
  } = useMultiSelect<MedicalHistoryWithTags>("documents", docs);

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
    containerRef: recommendationContainerRef,
    modalRef: recommendationModalRef,
    selectedIds: selectedRecommendations,
    handleSelect: handleSelectRecommendation,
    handleToggle: handleToggleRecommendation,
    clearSelection: clearRecommendationSelection,
    setSelectedIds: setSelectedRecommendations,
    handlePointerDown: handleRecommendationPointerDown,
    handlePointerUp: handleRecommendationPointerUp,
  } = useMultiSelect<SavedAIRecommendation>(
    "recommendations",
    filteredRecommendations,
  );

  const clearRecomFilters = () => {
    setRecomSearchTerm("");
    setPriorityFilter("all");
  };

  const selectedDocCount = selectedDocuments.length;
  const isDocSelected = selectedDocCount > 0;

  const selectedRecomCount = selectedRecommendations.length;
  const isRecomSelected = selectedRecomCount > 0;

  const handleClickSelect = (
    e: React.MouseEvent,
    id: string,
    index: number,
  ) => {
    handleSelect(e, id, index);
  };

  const handleCheckboxToggle = (id: string, index: number) => {
    handleToggle(id, index);
  };

  const handleClickSelectRecommendation = (
    e: React.MouseEvent,
    id: string,
    index: number,
  ) => {
    handleSelectRecommendation(e, id, index);
  };

  const handleCheckboxToggleRecommendation = (id: string, index: number) => {
    handleToggleRecommendation(id, index);
  };

  return (
    <div
      ref={
        activeTab === "documents"
          ? documentContainerRef
          : recommendationContainerRef
      }
    >
      <SelectionHeader
        activeTab={activeTab}
        isDocumentSelected={isDocSelected}
        isRecommendationSelected={isRecomSelected}
        documentCount={selectedDocCount}
        recommendationCount={selectedRecomCount}
        onClearDocuments={clearSelection}
        onClearRecommendations={clearRecommendationSelection}
        onDeleteDocuments={() => openDialog("isMultiDeleteDocsDialogOpen")}
        onDeleteRecommendations={() =>
          openDialog("isMultiDeleteRecomsDialogOpen")
        }
        onMoveDocuments={() => openDialog("isMoveDocumentsDialogOpen")}
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
              <div
                className={cn(
                  "flex w-full items-center gap-2",
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
                <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
              </div>
            </div>
          </div>

          <TabsContent value="documents" className="@container/list">
            {loading ? (
              <DocumentLoading viewMode={isMobile ? "grid" : viewMode} />
            ) : docs.length === 0 ? (
              <DocumentEmptyState
                hasFilters={
                  documentTypeFilter !== "updated" ||
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
                  setEditingItem(item);
                  setCurrentItem(item);
                  setIsOpenOptions(true);
                }}
                selectedDocs={selectedDocuments}
                onClickSelect={handleClickSelect}
                onCheckboxToggle={handleCheckboxToggle}
                onToggleSelectAll={() => {
                  if (selectedDocuments.length === docs.length) {
                    clearSelection();
                  } else {
                    setSelectedIds(docs.map((doc) => doc.id));
                  }
                }}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
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
              <RecommendationLoading viewMode={isMobile ? "grid" : viewMode} />
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
                onClickSelect={handleClickSelectRecommendation}
                onCheckboxToggle={handleCheckboxToggleRecommendation}
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
                onPointerDown={handleRecommendationPointerDown}
                onPointerUp={handleRecommendationPointerUp}
              />
            )}
          </TabsContent>
        </div>
      </Tabs>

      <MultiDeleteAlert
        ref={documentModalRef}
        isOpen={dialogs.isMultiDeleteDocsDialogOpen}
        setIsOpen={(open) =>
          open
            ? openDialog("isMultiDeleteDocsDialogOpen")
            : closeDialog("isMultiDeleteDocsDialogOpen")
        }
        onDelete={() => {
          handleDeleteDocuments(selectedDocuments);
          clearSelection();
        }}
        isSubmitting={isSubmitting}
        type="document"
      />

      <MultiDeleteAlert
        ref={recommendationModalRef}
        isOpen={dialogs.isMultiDeleteRecomsDialogOpen}
        setIsOpen={(open) =>
          open
            ? openDialog("isMultiDeleteRecomsDialogOpen")
            : closeDialog("isMultiDeleteRecomsDialogOpen")
        }
        onDelete={() => {
          handleDeleteRecommendations(selectedRecommendations);
          clearRecommendationSelection();
        }}
        isSubmitting={isSubmitting}
        type="recommendation"
      />
      <MoveDocumentsDialog
        ref={documentModalRef}
        folders={folders}
        isOpen={dialogs.isMoveDocumentsDialogOpen}
        onClose={() => closeDialog("isMoveDocumentsDialogOpen")}
        onMove={(folderId) => {
          handleMoveDocuments(folderId, selectedDocuments);
          closeDialog("isMoveDocumentsDialogOpen");
        }}
        isSubmitting={isSubmitting}
        selectedCount={selectedDocuments.length}
      />
    </div>
  );
};

export default MedicalHistoryTabs;
