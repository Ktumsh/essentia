"use client";

import PaymentModal from "@/app/payment/_components/payment-modal";
import { useTrial } from "@/hooks/use-trial";
import { useUserSubscription } from "@/hooks/use-user-subscription";

import ActivityFullView from "./activity-full-view";
import DeleteAlert from "./delete-alert";
import DocumentForm, { type DocumentFormSchema } from "./document-form";
import DocumentView from "./document-view";
import FileViewer from "./file-viewer";
import ShareDialog from "./share-dialog";
import { useMedicalDialogs } from "../_hooks/use-medical-dialogs";
import AIAnalysis from "./ai-recommendations/ai-analysis";

import type { MedicalHistory } from "@/db/querys/medical-history-querys";
import type { MedicalTag } from "@/db/schema";
import type {
  Folder,
  MedicalHistoryActivity,
  SavedRecommendation,
} from "@/lib/types";

interface MedicalDialogsContainerProps {
  tags: MedicalTag[];
  folders: Folder[];
  activities: MedicalHistoryActivity[];
  isSubmitting: boolean;
  medicalHistory: MedicalHistory[];
  savedRecommendations: SavedRecommendation[];
  selectedTags: string[];
  handleCreate: (d: DocumentFormSchema) => Promise<void>;
  handleUpdate: (d: DocumentFormSchema) => Promise<void>;
  handleDelete: () => Promise<void>;
  handleRestore: (id: string) => Promise<void>;
  handleViewDocumentFromActivity: (id: string) => void;
  saveRecommendation: (
    rec: SavedRecommendation | SavedRecommendation[],
  ) => void;
  isRecommendationSaved: (
    rec: SavedRecommendation,
    savedList: SavedRecommendation[],
  ) => boolean;
  toggleRecommendation: (
    recommendation: SavedRecommendation,
    savedList: SavedRecommendation[],
  ) => Promise<void>;
  onDownload: (file: { url?: string | null; name: string }) => void;
  documentViewHandlers: {
    onEdit: (item: MedicalHistory) => void;
    onDelete: (item: MedicalHistory) => void;
    onAIClick: (item: MedicalHistory) => void;
    onViewFile: (f: { url?: string | null; name: string }) => void;
    onOpenPremiumModal: () => void;
  };
}

const MedicalDialogsContainer = ({
  tags,
  folders,
  activities,
  isSubmitting,
  medicalHistory,
  savedRecommendations,
  selectedTags,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleRestore,
  handleViewDocumentFromActivity,
  saveRecommendation,
  isRecommendationSaved,
  toggleRecommendation,
  onDownload,
  documentViewHandlers,
}: MedicalDialogsContainerProps) => {
  const { isTrialUsed } = useTrial();
  const { subscription } = useUserSubscription();

  const isPremium = subscription?.plan?.id === "premium";

  const {
    dialogs,
    openDialog,
    closeDialog,
    currentItem,
    editingItem,
    itemToDelete,
    fileToView,
    recommendationsToShare,
    setRecommendationsToShare,
    selectedItemsForAI,
    premiumFeatureType,
  } = useMedicalDialogs();

  const _handleRestoreActivity = async (id: string) => {
    await handleRestore(id);
    closeDialog("isActivityFullViewOpen");
  };

  return (
    <>
      <ActivityFullView
        isOpen={dialogs.isActivityFullViewOpen}
        onClose={() => closeDialog("isActivityFullViewOpen")}
        activities={activities}
        onViewDocument={handleViewDocumentFromActivity}
        onRestoreDocument={_handleRestoreActivity}
      />

      <DocumentForm
        isOpen={dialogs.isAddDialogOpen}
        onOpenChange={(open) =>
          open ? openDialog("isAddDialogOpen") : closeDialog("isAddDialogOpen")
        }
        tags={tags}
        folders={folders}
        onSubmit={handleCreate}
        onCancel={() => closeDialog("isAddDialogOpen")}
        isSubmitting={isSubmitting}
      />

      <DocumentForm
        key={editingItem?.id}
        isEditMode
        isOpen={dialogs.isEditDialogOpen}
        onOpenChange={(open) =>
          open
            ? openDialog("isEditDialogOpen")
            : closeDialog("isEditDialogOpen")
        }
        tags={tags}
        folders={folders}
        initialValues={editingItem}
        onSubmit={handleUpdate}
        onCancel={() => closeDialog("isEditDialogOpen")}
        isSubmitting={isSubmitting}
      />

      <AIAnalysis
        isOpen={dialogs.isAIDialogOpen}
        onClose={() => closeDialog("isAIDialogOpen")}
        documents={medicalHistory}
        selectedItems={selectedItemsForAI}
        selectedTags={selectedTags}
        savedRecommendations={savedRecommendations}
        onSaveRecommendation={(recommendation) => {
          const list = Array.isArray(recommendation)
            ? recommendation
            : [recommendation];
          list.forEach(saveRecommendation);
        }}
        isRecommendationSaved={isRecommendationSaved}
        toggleRecommendation={toggleRecommendation}
        onShareRecommendation={(r) => {
          const list = Array.isArray(r) ? r : [r];
          setRecommendationsToShare(list);
          openDialog("isShareDialogOpen");
        }}
      />

      <DeleteAlert
        isOpen={dialogs.isDeleteDialogOpen}
        setIsOpen={(open) =>
          open
            ? openDialog("isDeleteDialogOpen")
            : closeDialog("isDeleteDialogOpen")
        }
        item={itemToDelete}
        onDelete={handleDelete}
        isSubmitting={isSubmitting}
      />

      {fileToView && (
        <FileViewer
          isOpen={dialogs.isFileViewerOpen}
          onClose={() => closeDialog("isFileViewerOpen")}
          fileUrl={fileToView.url || ""}
          fileName={fileToView.name}
        />
      )}

      <DocumentView
        isOpen={dialogs.isViewDialogOpen}
        onClose={() => closeDialog("isViewDialogOpen")}
        currentItem={currentItem}
        onDownload={onDownload}
        {...documentViewHandlers}
      />

      <ShareDialog
        isOpen={dialogs.isShareDialogOpen}
        onClose={() => closeDialog("isShareDialogOpen")}
        recommendation={recommendationsToShare}
      />

      <PaymentModal
        featureType={premiumFeatureType}
        isOpen={dialogs.isPremiumModal}
        setIsOpen={(open) =>
          open ? openDialog("isPremiumModal") : closeDialog("isPremiumModal")
        }
        mode={!isTrialUsed && !isPremium ? "trial" : "upgrade"}
      />
    </>
  );
};

export default MedicalDialogsContainer;
