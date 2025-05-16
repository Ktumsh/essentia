"use client";

import PaymentModal from "@/components/ui/payment/payment-modal";

import ActivityFullView from "./activity-full-view";
import AIRecommendation from "./ai-recommendation";
import DeleteConfirmationDialog from "./delete-confirmation-dialog";
import DocumentViewDialog from "./document-view-dialog";
import FileViewer from "./file-viewer";
import MedicalHistoryForm from "./medical-history-form";
import MedicalHistoryTabs from "./medical-history-tabs";
import ShareDialog from "./share-dialog";
import { useMedicalHistoryLogic } from "../_hooks/use-medical-history-logic";
import MedicalFoldersPanel from "../carpetas/_components/medical-folders";

const MedicalHistory = () => {
  const {
    userId,
    isTrialUsed,

    medicalTags,
    folders,
    medicalHistory,
    filteredHistory,
    activities,
    savedRecommendations,

    currentItem,
    editingItem,
    itemToDelete,
    fileToView,
    recommendationsToShare,
    searchTerm,
    selectedTags,
    documentCategoryFilter,
    documentTypeFilter,
    dialogs,
    premiumFeatureType,

    isSubmitting,
    isOpenOptions,
    loading,

    setSearchTerm,
    setSelectedTags,
    setDocumentTypeFilter,
    setDocumentCategoryFilter,
    setIsOpenOptions,
    setDialogs,
    setPremiumFeatureType,
    setFileToView,
    openAIRecommendationsForAll,

    getTagCount,
    clearFilters,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
    handleShareRecommendation,
    handleViewDocumentFromActivity,
    deleteRecommendation,
    updateRecommendationNotes,
    /* openAIRecommendationsForSelected, */
    saveRecommendation,
    selectedItemsForAI,

    documentViewHandlers,
    listHandlers,
  } = useMedicalHistoryLogic();

  const handleRestoreDocument = async (id: string) => {
    await handleRestore(id);
    setDialogs((prev) => ({ ...prev, isActivityFullViewOpen: false }));
  };

  const recommendationHandlers = {
    onDeleteRecommendation: deleteRecommendation,
    onUpdateRecommendation: updateRecommendationNotes,
    onShareRecommendation: handleShareRecommendation,
    onViewFile: (fileData: { url?: string | null; name: string }) => {
      setFileToView(fileData);
      setDialogs((prev) => ({ ...prev, isFileViewerOpen: true }));
    },
    onOpenPremiumModal: () => {
      setPremiumFeatureType("saved-recommendations");
      setDialogs((prev) => ({ ...prev, isPremiumModal: true }));
    },
  };

  return (
    <>
      <ActivityFullView
        isOpen={dialogs.isActivityFullViewOpen}
        onClose={() =>
          setDialogs((prev) => ({ ...prev, isActivityFullViewOpen: false }))
        }
        activities={activities}
        onViewDocument={handleViewDocumentFromActivity}
        onRestoreDocument={handleRestoreDocument}
      />

      <MedicalFoldersPanel userId={userId} />

      <MedicalHistoryTabs
        filteredHistory={filteredHistory}
        documentTypeFilter={documentTypeFilter}
        setDocumentTypeFilter={setDocumentTypeFilter}
        documentCategoryFilter={documentCategoryFilter}
        setDocumentCategoryFilter={setDocumentCategoryFilter}
        currentItem={currentItem}
        isOpen={isOpenOptions}
        setIsOpen={setIsOpenOptions}
        isHistoryLoading={loading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags}
        clearFilters={clearFilters}
        medicalTags={medicalTags || []}
        setSelectedTags={setSelectedTags}
        getTagCount={getTagCount}
        medicalHistory={medicalHistory || []}
        recommendations={savedRecommendations || []}
        onOpenAIRecommendations={openAIRecommendationsForAll}
        {...listHandlers}
        {...recommendationHandlers}
      />

      <DocumentViewDialog
        isOpen={dialogs.isViewDialogOpen}
        onClose={() =>
          setDialogs((prev) => ({ ...prev, isViewDialogOpen: false }))
        }
        currentItem={currentItem}
        onDownload={listHandlers.onDownload}
        {...documentViewHandlers}
      />

      <MedicalHistoryForm
        isOpen={dialogs.isAddDialogOpen}
        setIsOpen={(isOpen) =>
          setDialogs((prev) => ({ ...prev, isAddDialogOpen: isOpen }))
        }
        tags={medicalTags || []}
        folders={folders}
        onSubmit={handleCreate}
        onCancel={() =>
          setDialogs((prev) => ({ ...prev, isAddDialogOpen: false }))
        }
        isSubmitting={isSubmitting}
      />

      <MedicalHistoryForm
        key={editingItem?.id}
        isEditMode
        isOpen={dialogs.isEditDialogOpen}
        setIsOpen={(isOpen) =>
          setDialogs((prev) => ({ ...prev, isEditDialogOpen: isOpen }))
        }
        tags={medicalTags || []}
        folders={folders}
        initialValues={editingItem || undefined}
        onSubmit={handleUpdate}
        onCancel={() =>
          setDialogs((prev) => ({ ...prev, isEditDialogOpen: false }))
        }
        isSubmitting={isSubmitting}
      />

      <AIRecommendation
        isOpen={dialogs.isAIDialogOpen}
        onClose={() =>
          setDialogs((prev) => ({ ...prev, isAIDialogOpen: false }))
        }
        medicalHistory={medicalHistory || []}
        selectedItems={selectedItemsForAI}
        selectedTags={selectedTags}
        savedRecommendations={savedRecommendations || []}
        onSaveRecommendation={saveRecommendation}
        onShareRecommendation={handleShareRecommendation}
      />

      <DeleteConfirmationDialog
        isOpen={dialogs.isDeleteDialogOpen}
        setIsOpen={(isOpen) =>
          setDialogs((prev) => ({ ...prev, isDeleteDialogOpen: isOpen }))
        }
        item={itemToDelete}
        onDelete={handleDelete}
      />

      {fileToView && (
        <FileViewer
          isOpen={dialogs.isFileViewerOpen}
          onClose={() =>
            setDialogs((prev) => ({ ...prev, isFileViewerOpen: false }))
          }
          fileUrl={fileToView.url || ""}
          fileName={fileToView.name}
        />
      )}

      <ShareDialog
        isOpen={dialogs.isShareDialogOpen}
        onClose={() =>
          setDialogs((prev) => ({ ...prev, isShareDialogOpen: false }))
        }
        recommendation={recommendationsToShare}
      />

      <PaymentModal
        featureType={premiumFeatureType}
        isOpen={dialogs.isPremiumModal}
        setIsOpen={(isOpen) =>
          setDialogs((prev) => ({ ...prev, isPremiumModal: isOpen }))
        }
        mode={!isTrialUsed ? "trial" : "upgrade"}
      />
    </>
  );
};

export default MedicalHistory;
