"use client";

import PageWrapper from "@/components/ui/layout/page-wrapper";
import PaymentModal from "@/components/ui/payment/payment-modal";

import AIRecommendation from "./ai-recommendation";
import DocumentViewDialog from "./document-view-dialog";
import MedicalHistoryAside from "./medical-history-aside";
import MedicalHistoryForm from "./medical-history-form";
import MedicalHistoryHeader from "./medical-history-header";
import { useMedicalHistoryLogic } from "../_hooks/use-medical-history-logic";

const MedicalWrapper = ({ children }: { children: React.ReactNode }) => {
  const {
    openAIRecommendationsForAll,
    uploadStatus,
    setPremiumFeatureType,
    setDialogs,
    loading,
    dialogs,
    currentItem,
    documentViewHandlers,
    isTrialUsed,
    medicalTags,
    folders,
    isSubmitting,
    handleCreate,
    handleShareRecommendation,
    saveRecommendation,
    selectedItemsForAI,
    medicalHistory,
    selectedTags,
    savedRecommendations,
    listHandlers,
  } = useMedicalHistoryLogic();

  return (
    <PageWrapper classNameContainer="max-w-full" className="pt-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 2xl:grid-cols-4">
        <section className="@container/medical col-span-1 w-full xl:col-span-2 2xl:col-span-3">
          <MedicalHistoryHeader
            openAIRecommendationsForAll={openAIRecommendationsForAll}
            uploadStatus={uploadStatus}
            setPremiumFeatureType={setPremiumFeatureType}
            setDialogs={setDialogs}
            loading={loading}
          />
          {children}
        </section>
        <MedicalHistoryAside />
      </div>

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

      <DocumentViewDialog
        isOpen={dialogs.isViewDialogOpen}
        onClose={() =>
          setDialogs((prev) => ({ ...prev, isViewDialogOpen: false }))
        }
        onDownload={listHandlers.onDownload}
        currentItem={currentItem}
        {...documentViewHandlers}
      />

      <PaymentModal
        featureType="upload-limit"
        isOpen={dialogs.isPremiumModal}
        setIsOpen={(isOpen) =>
          setDialogs((prev) => ({ ...prev, isPremiumModal: isOpen }))
        }
        mode={!isTrialUsed ? "trial" : "upgrade"}
      />
    </PageWrapper>
  );
};

export default MedicalWrapper;
