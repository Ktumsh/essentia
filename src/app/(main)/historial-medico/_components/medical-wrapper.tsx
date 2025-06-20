"use client";

import PageWrapper from "@/components/layout/page-wrapper";

import MedicalDialogsContainer from "./medical-dialogs-container";
import MedicalHistoryHeader from "./medical-history-header";
import MedicalOverview from "./medical-overview";
import { useMedicalDialogs } from "../_hooks/use-medical-dialogs";
import { useMedicalFoldersDialog } from "../_hooks/use-medical-folder-dialogs";
import { useMedicalFolders } from "../_hooks/use-medical-folders";
import { useMedicalHistoryLogic } from "../_hooks/use-medical-history-logic";
import FolderForm from "../carpetas/_components/folder-form";

const MedicalWrapper = ({ children }: { children: React.ReactNode }) => {
  const { open: openFolder, setOpen: setFolderOpen } =
    useMedicalFoldersDialog();
  const {
    folders,
    currentFolder,
    handleCreateFolder,
    handleUpdateFolder,
    isSubmitting: isFolderSubmitting,
  } = useMedicalFolders();

  const {
    isTrialUsed,
    isSubmitting,
    uploadStatus,
    loading,
    medicalTags,
    medicalHistory,
    savedRecommendations,
    selectedTags,
    activities,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
    saveRecommendation,
    isRecommendationSaved,
    toggleRecommendation,
    handleDownload,
  } = useMedicalHistoryLogic();

  const {
    openDialog,
    setEditingItem,
    setItemToDelete,
    setSelectedItemsForAI,
    setFileToView,
    setPremiumFeatureType,
    setCurrentItem,
  } = useMedicalDialogs();

  const handleViewDocumentFromActivity = (id: string) => {
    const doc = medicalHistory.find((d) => d.id === id);
    if (!doc) return;
    setCurrentItem(doc);
    openDialog("isViewDialogOpen");
  };

  return (
    <PageWrapper classNameContainer="max-w-full" className="pt-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 2xl:grid-cols-4">
        <section className="@container/medical col-span-1 w-full xl:col-span-2 2xl:col-span-3">
          <MedicalHistoryHeader
            loading={loading}
            uploadStatus={uploadStatus}
            onNewAIRecommendation={() => openDialog("isAIDialogOpen")}
            onNewFolder={() =>
              setFolderOpen({ ...openFolder, isFolderFormOpen: true })
            }
            onNewDocument={() => openDialog("isAddDialogOpen")}
          />
          {children}
        </section>
        <MedicalOverview />
      </div>

      <MedicalDialogsContainer
        tags={medicalTags}
        folders={folders}
        activities={activities}
        isTrialUsed={isTrialUsed}
        isSubmitting={isSubmitting}
        medicalHistory={medicalHistory}
        savedRecommendations={savedRecommendations}
        selectedTags={selectedTags}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleRestore={handleRestore}
        handleViewDocumentFromActivity={handleViewDocumentFromActivity}
        saveRecommendation={saveRecommendation}
        isRecommendationSaved={isRecommendationSaved}
        toggleRecommendation={toggleRecommendation}
        onDownload={handleDownload}
        documentViewHandlers={{
          onEdit: (item) => {
            setEditingItem(item);
            openDialog("isEditDialogOpen");
          },
          onDelete: (item) => {
            setItemToDelete(item);
            openDialog("isDeleteDialogOpen");
          },
          onAIClick: (item) => {
            setSelectedItemsForAI([item.id]);
            openDialog("isAIDialogOpen");
          },
          onViewFile: (file) => {
            setFileToView(file);
            openDialog("isFileViewerOpen");
          },
          onOpenPremiumModal: () => {
            setPremiumFeatureType("saved-recommendations");
            openDialog("isPremiumModal");
          },
        }}
      />

      <FolderForm
        isOpen={openFolder.isFolderFormOpen}
        initial={currentFolder || undefined}
        onClose={() =>
          setFolderOpen({ ...openFolder, isFolderFormOpen: false })
        }
        onSubmit={currentFolder ? handleUpdateFolder : handleCreateFolder}
        isSubmitting={isFolderSubmitting}
      />
    </PageWrapper>
  );
};

export default MedicalWrapper;
