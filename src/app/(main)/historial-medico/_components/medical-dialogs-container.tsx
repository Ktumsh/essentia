"use client";

import PaymentModal from "@/components/ui/payment/payment-modal";
import { useUserSubscription } from "@/hooks/use-user-subscription";

import ActivityFullView from "./activity-full-view";
import AIRecommendation, {
  type AIRecommendationType,
} from "./ai-recommendation";
import DeleteAlert from "./delete-alert";
import DocumentViewDialog from "./document-view-dialog";
import FileViewer from "./file-viewer";
import MedicalHistoryForm, {
  type MedicalHistoryFormSchema,
} from "./medical-history-form";
import ShareDialog from "./share-dialog";
import { useMedicalDialogs } from "../_hooks/use-medical-dialogs";

import type { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import type { MedicalTag } from "@/db/schema";
import type { Folder, MedicalHistoryActivity } from "@/lib/types";

interface MedicalDialogsContainerProps {
  tags: MedicalTag[];
  folders: Folder[];
  activities: MedicalHistoryActivity[];
  isTrialUsed: boolean;
  isSubmitting: boolean;
  medicalHistory: MedicalHistoryWithTags[];
  savedRecommendations: AIRecommendationType[];
  selectedTags: string[];
  handleCreate: (d: MedicalHistoryFormSchema) => Promise<void>;
  handleUpdate: (d: MedicalHistoryFormSchema) => Promise<void>;
  handleDelete: () => Promise<void>;
  handleRestore: (id: string) => Promise<void>;
  handleViewDocumentFromActivity: (id: string) => void;
  saveRecommendation: (r: AIRecommendationType) => void;
  isRecommendationSaved: (
    rec: AIRecommendationType,
    savedList: AIRecommendationType[],
  ) => boolean;
  toggleRecommendation: (
    recommendation: AIRecommendationType,
    savedList: AIRecommendationType[],
  ) => Promise<void>;
  onDownload: (file: { url?: string | null; name: string }) => void;
  documentViewHandlers: {
    onEdit: (item: MedicalHistoryWithTags) => void;
    onDelete: (item: MedicalHistoryWithTags) => void;
    onAIClick: (item: MedicalHistoryWithTags) => void;
    onViewFile: (f: { url?: string | null; name: string }) => void;
    onOpenPremiumModal: () => void;
  };
}

const MedicalDialogsContainer = ({
  tags,
  folders,
  activities,
  isTrialUsed,
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

      <MedicalHistoryForm
        isOpen={dialogs.isAddDialogOpen}
        setIsOpen={(open) =>
          open ? openDialog("isAddDialogOpen") : closeDialog("isAddDialogOpen")
        }
        tags={tags}
        folders={folders}
        onSubmit={handleCreate}
        onCancel={() => closeDialog("isAddDialogOpen")}
        isSubmitting={isSubmitting}
      />

      <MedicalHistoryForm
        key={editingItem?.id}
        isEditMode
        isOpen={dialogs.isEditDialogOpen}
        setIsOpen={(open) =>
          open
            ? openDialog("isEditDialogOpen")
            : closeDialog("isEditDialogOpen")
        }
        tags={tags}
        folders={folders}
        initialValues={editingItem || undefined}
        onSubmit={handleUpdate}
        onCancel={() => closeDialog("isEditDialogOpen")}
        isSubmitting={isSubmitting}
      />

      <AIRecommendation
        isOpen={dialogs.isAIDialogOpen}
        onClose={() => closeDialog("isAIDialogOpen")}
        medicalHistory={medicalHistory}
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

      <DocumentViewDialog
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
