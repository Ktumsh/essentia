"use client";

import { useSession } from "next-auth/react";
import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import useSWR from "swr";

import PaymentModal, {
  FeatureType,
} from "@/components/ui/payment/payment-modal";
import { MedicalTag } from "@/db/schema";
import { useTrial } from "@/hooks/use-trial";
import { useUserProfile } from "@/hooks/use-user-profile";
import { fetcher } from "@/lib/utils";

import ActivityFullView from "./activity-full-view";
import ActivitySection from "./activity-section";
import AIRecommendation, { AIRecommendationType } from "./ai-recommendation";
import DeleteConfirmationDialog from "./delete-confirmation-dialog";
import DocumentViewDialog from "./document-view-dialog";
import FileViewer from "./file-viewer";
import MedicalHistoryFilters from "./medical-history-filters";
import MedicalHistoryForm, {
  MedicalHistoryFormData,
} from "./medical-history-form";
import MedicalHistoryHeader from "./medical-history-header";
import MedicalHistoryList from "./medical-history-list";
import SavedRecommendations from "./saved-recommendation";
import ShareDialog from "./share-dialog";
import StorageLimitIndicator from "./storage-limit-indicator";
import StorageLimitLoading from "./storage-limit-loading";
import { useCanUploadFile } from "../_hooks/use-can-upload-files";
import { useMedicalHistoryActions } from "../_hooks/use-medical-history-actions";
import { useRecommendationsActions } from "../_hooks/use-recommendations-actions";

import type {
  MedicalFileType,
  MedicalHistoryWithTags,
} from "@/db/querys/medical-history-querys";

const MedicalHistory = () => {
  // Datos globales y obtenidos mediante SWR
  const { user } = useUserProfile();
  const { data: session } = useSession();
  const { data: medicalTags } = useSWR<MedicalTag[]>(
    "/api/medical-tags",
    fetcher,
    { fallbackData: [] },
  );
  const {
    data: medicalHistory,
    isLoading: isHistoryLoading,
    mutate,
  } = useSWR<MedicalHistoryWithTags[]>("/api/medical-history", fetcher, {
    fallbackData: [],
  });
  const { data: activities, mutate: activitiesMutate } = useSWR(
    "/api/medical-activity",
    fetcher,
    { fallbackData: [] },
  );

  const userId = user ? user.id : (session?.user?.id as string);
  const { uploadStatus, refreshUploadStatus } = useCanUploadFile(userId);
  const { isTrialUsed } = useTrial();
  const isPremium = user?.isPremium;

  const {
    data: savedRecommendations,
    isLoading: isRecommendationsLoading,
    mutate: mutateSavedRecommendations,
  } = useSWR(userId && isPremium ? `/api/ai-recommendations` : null, fetcher, {
    fallbackData: [],
  });

  // Estados para diálogos y vistas (agrupados)
  const [dialogs, setDialogs] = useState({
    isPremiumModal: false,
    isAddDialogOpen: false,
    isEditDialogOpen: false,
    isViewDialogOpen: false,
    isDeleteDialogOpen: false,
    isAIDialogOpen: false,
    isFileViewerOpen: false,
    isActivityFullViewOpen: false,
    isShareDialogOpen: false,
  });
  const [premiumFeatureType, setPremiumFeatureType] =
    useState<FeatureType>("general");
  const [currentItem, setCurrentItem] = useState<MedicalHistoryWithTags | null>(
    null,
  );
  const [editingItem, setEditingItem] = useState<MedicalHistoryWithTags | null>(
    null,
  );
  const [itemToDelete, setItemToDelete] =
    useState<MedicalHistoryWithTags | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [documentTypeFilter, setDocumentTypeFilter] = useState<
    "all" | "recent" | "shared" | "private"
  >("all");
  const [documentCategoryFilter, setDocumentCategoryFilter] = useState<
    MedicalFileType | "all"
  >("all");

  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [selectedItemsForAI, setSelectedItemsForAI] = useState<string[]>([]);
  const [fileToView, setFileToView] = useState<{
    url?: string | null;
    name: string;
  } | null>(null);
  const [hasNewActivity, setHasNewActivity] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendationsToShare, setRecommendationsToShare] = useState<
    AIRecommendationType[]
  >([]);

  // Extracción de funciones de acciones a partir de hooks
  const { createRecord, updateRecord, deleteRecord, restoreDocument } =
    useMedicalHistoryActions({
      userId,
      refreshUploadStatus,
      mutate,
      activitiesMutate,
      setHasNewActivity,
    });
  const {
    saveRecommendation,
    deleteRecommendation,
    updateRecommendationNotes,
  } = useRecommendationsActions({
    userId,
    mutateSavedRecommendations,
  });

  // Filtrado de historial y conteo por etiquetas
  const filteredHistory = useMemo(() => {
    let filtered = medicalHistory || [];

    if (selectedTags.length > 0) {
      filtered = filtered.filter((item) =>
        selectedTags.some((tag) => item.tags.includes(tag)),
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.condition.toLowerCase().includes(term) ||
          (item.description && item.description.toLowerCase().includes(term)) ||
          (item.issuer && item.issuer.toLowerCase().includes(term)) ||
          (item.notes && item.notes.toLowerCase().includes(term)) ||
          item.tags.some((tag) => tag.toLowerCase().includes(term)),
      );
    }

    if (documentCategoryFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.type === documentCategoryFilter,
      );
    }

    return filtered;
  }, [medicalHistory, selectedTags, searchTerm, documentCategoryFilter]);

  const getTagCount = useCallback(
    (tag: string): number =>
      (medicalHistory || []).filter((item) => item.tags.includes(tag)).length,
    [medicalHistory],
  );

  // Handlers para formularios de creación y edición
  const handleCreateRecord = useCallback(
    async (data: MedicalHistoryFormData) => {
      setIsSubmitting(true);
      if (!uploadStatus?.allowed) {
        toast.error("Has alcanzado tu límite de archivos", {
          description: `Tu plan permite hasta ${uploadStatus?.max} documentos médicos.`,
        });
        setIsSubmitting(false);
        return;
      }
      await createRecord(data);
      setDialogs((prev) => ({ ...prev, isAddDialogOpen: false }));
      setIsSubmitting(false);
    },
    [createRecord, uploadStatus],
  );

  const handleUpdateRecord = useCallback(
    async (data: MedicalHistoryFormData) => {
      if (!editingItem) return;
      setIsSubmitting(true);
      await updateRecord(editingItem, data);
      setDialogs((prev) => ({ ...prev, isEditDialogOpen: false }));
      setEditingItem(null);
      setIsSubmitting(false);
    },
    [editingItem, updateRecord],
  );

  const handleDelete = useCallback(async () => {
    if (!itemToDelete) return;
    setIsSubmitting(true);
    await deleteRecord(itemToDelete);
    setDialogs((prev) => ({ ...prev, isDeleteDialogOpen: false }));
    setItemToDelete(null);
    if (currentItem && currentItem.id === itemToDelete.id) {
      setDialogs((prev) => ({ ...prev, isViewDialogOpen: false }));
      setCurrentItem(null);
    }
    setIsSubmitting(false);
  }, [itemToDelete, currentItem, deleteRecord]);

  const handleRestoreDocument = useCallback(
    async (documentId: string) => {
      await restoreDocument(documentId, medicalHistory);
      setDialogs((prev) => ({ ...prev, isActivityFullViewOpen: false }));
    },
    [restoreDocument, medicalHistory],
  );

  // Handlers para recomendaciones IA
  const handleSaveRecommendation = useCallback(
    async (recOrList: AIRecommendationType | AIRecommendationType[]) => {
      await saveRecommendation(recOrList);
    },
    [saveRecommendation],
  );

  const handleDeleteRecommendation = useCallback(
    async (recommendationId: string) => {
      await deleteRecommendation(recommendationId);
    },
    [deleteRecommendation],
  );

  const handleUpdateRecommendationNotes = useCallback(
    async (rec: any) => {
      await updateRecommendationNotes(rec);
    },
    [updateRecommendationNotes],
  );

  const clearFilters = useCallback(() => {
    setSelectedTags([]);
    setSearchTerm("");
    setDocumentTypeFilter("all");
    setDocumentCategoryFilter("all");
  }, []);

  // Handler para ver un documento (utilizado en ActivitySection)
  const handleViewItem = (item: MedicalHistoryWithTags) => {
    setCurrentItem(item);
    setDialogs((prev) => ({
      ...prev,
      isViewDialogOpen: true,
      isActivityFullViewOpen: false,
    }));
    setIsOpenOptions(false);
  };

  const handleViewDocumentFromActivity = (documentId: string) => {
    const item = medicalHistory?.find((item) => item.id === documentId);
    if (item) {
      handleViewItem(item);
    }
  };

  const handleShareRecommendation = (
    recommendation: AIRecommendationType | AIRecommendationType[],
  ) => {
    const recs = Array.isArray(recommendation)
      ? recommendation
      : [recommendation];
    setRecommendationsToShare(recs);
    setDialogs((prev) => ({ ...prev, isShareDialogOpen: true }));
  };

  // Agrupación de handlers para limpiar las props de los componentes

  // _Handlers_ para la lista de documentos
  const listHandlers = {
    onView: handleViewItem,
    onEdit: (item: MedicalHistoryWithTags) => {
      setEditingItem(item);
      setDialogs((prev) => ({ ...prev, isEditDialogOpen: true }));
      setIsOpenOptions(false);
    },
    onDelete: (item: MedicalHistoryWithTags) => {
      setItemToDelete(item);
      setDialogs((prev) => ({ ...prev, isDeleteDialogOpen: true }));
      setIsOpenOptions(false);
    },
    onAIClick: (item: MedicalHistoryWithTags) =>
      openAIRecommendationsForItem(item.id),
    onViewFile: (fileData: { url?: string | null; name: string }) => {
      setFileToView(fileData);
      setDialogs((prev) => ({ ...prev, isFileViewerOpen: true }));
      setIsOpenOptions(false);
    },
    onAddDocument: () =>
      setDialogs((prev) => ({ ...prev, isAddDialogOpen: true })),
    onOpenOptions: (item: MedicalHistoryWithTags | null) => {
      setCurrentItem(item);
      setIsOpenOptions(!!item);
    },
  };

  // _Handlers_ para el diálogo de vista de documento
  const documentViewHandlers = {
    onEdit: (item: MedicalHistoryWithTags) => {
      setEditingItem(item);
      setDialogs((prev) => ({ ...prev, isEditDialogOpen: true }));
    },
    onDelete: (item: MedicalHistoryWithTags) => {
      setItemToDelete(item);
      setDialogs((prev) => ({ ...prev, isDeleteDialogOpen: true }));
    },
    onAIClick: (item: MedicalHistoryWithTags) => {
      setSelectedItemsForAI([item.id]);
      setDialogs((prev) => ({ ...prev, isAIDialogOpen: true }));
    },
    onViewFile: (fileData: { url?: string | null; name: string }) => {
      setFileToView(fileData);
      setDialogs((prev) => ({ ...prev, isFileViewerOpen: true }));
    },
    onOpenPremiumModal: () => {
      setDialogs((prev) => ({
        ...prev,
        isPremiumModal: true,
        isViewDialogOpen: false,
      }));
      setPremiumFeatureType("ai-recommendations");
      setCurrentItem(null);
    },
  };

  // _Handlers_ para las recomendaciones en la vista de documentos guardados
  const recommendationHandlers = {
    onDeleteRecommendation: handleDeleteRecommendation,
    onUpdateRecommendation: handleUpdateRecommendationNotes,
    onShareRecommendation: handleShareRecommendation,
    onViewFile: (fileData: { url?: string | null; name: string }) => {
      setFileToView(fileData);
      setDialogs((prev) => ({ ...prev, isFileViewerOpen: true }));
    },
    onOpenPremiumModal: () => {
      setDialogs((prev) => ({ ...prev, isPremiumModal: true }));
      setPremiumFeatureType("saved-recommendations");
    },
  };

  // Handlers para apertura de modales de recomendaciones
  const openAIRecommendationsForAll = () => {
    if (!isPremium) {
      setPremiumFeatureType("ai-recommendations");
      setDialogs((prev) => ({ ...prev, isPremiumModal: true }));
      return;
    }
    setSelectedItemsForAI([]);
    setDialogs((prev) => ({ ...prev, isAIDialogOpen: true }));
  };

  const openAIRecommendationsForSelected = (itemIds: string[]) => {
    if (!isPremium) {
      setPremiumFeatureType("ai-recommendations");
      setDialogs((prev) => ({ ...prev, isPremiumModal: true }));
      return;
    }
    setSelectedItemsForAI(itemIds);
    setDialogs((prev) => ({ ...prev, isAIDialogOpen: true }));
  };

  const openAIRecommendationsForItem = (itemId: string) => {
    if (!isPremium) {
      setPremiumFeatureType("ai-recommendations");
      setDialogs((prev) => ({ ...prev, isPremiumModal: true }));
      return;
    }
    setSelectedItemsForAI([itemId]);
    setDialogs((prev) => ({ ...prev, isAIDialogOpen: true }));
    setIsOpenOptions(false);
  };

  return (
    <div className="@container/header w-full space-y-6">
      {/* Encabezado */}
      <MedicalHistoryHeader
        openAIRecommendationsForAll={openAIRecommendationsForAll}
        uploadStatus={uploadStatus}
        setPremiumFeatureType={setPremiumFeatureType}
        setDialogs={setDialogs}
      />

      {isHistoryLoading || isRecommendationsLoading ? (
        <StorageLimitLoading />
      ) : (
        medicalHistory && (
          <StorageLimitIndicator
            totalDocuments={medicalHistory.length}
            onOpenPayment={() => {
              setPremiumFeatureType("upload-limit");
              setDialogs((prev) => ({ ...prev, isPremiumModal: true }));
            }}
            className="mt-4"
          />
        )
      )}

      {/* Actividad reciente */}
      <ActivitySection
        activities={activities || []}
        onViewDocument={handleViewDocumentFromActivity}
        onRestoreDocument={handleRestoreDocument}
        hasNewActivity={hasNewActivity}
        onViewAll={() =>
          setDialogs((prev) => ({ ...prev, isActivityFullViewOpen: true }))
        }
      />

      <ActivityFullView
        isOpen={dialogs.isActivityFullViewOpen}
        onClose={() =>
          setDialogs((prev) => ({ ...prev, isActivityFullViewOpen: false }))
        }
        activities={activities || []}
        onViewDocument={handleViewDocumentFromActivity}
        onRestoreDocument={handleRestoreDocument}
      />

      {/* Filtros y búsqueda */}
      <MedicalHistoryFilters
        medicalTags={medicalTags || []}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        clearFilters={clearFilters}
        getTagCount={getTagCount}
        filteredHistory={filteredHistory}
        onAIClick={openAIRecommendationsForSelected}
      />

      <MedicalHistoryList
        filteredHistory={filteredHistory}
        documentTypeFilter={documentTypeFilter}
        setDocumentTypeFilter={setDocumentTypeFilter}
        documentCategoryFilter={documentCategoryFilter}
        setDocumentCategoryFilter={setDocumentCategoryFilter}
        clearFilters={clearFilters}
        currentItem={currentItem}
        isOpen={isOpenOptions}
        setIsOpen={setIsOpenOptions}
        isHistoryLoading={isHistoryLoading}
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        {...listHandlers}
      />

      {/* Recomendaciones guardadas */}
      <div className="mt-8">
        <SavedRecommendations
          medicalHistory={medicalHistory || []}
          savedRecommendations={savedRecommendations}
          {...recommendationHandlers}
          isRecommendationLoading={isRecommendationsLoading}
        />
      </div>

      {/* Diálogo de vista de documento */}
      <DocumentViewDialog
        isOpen={dialogs.isViewDialogOpen}
        onClose={() =>
          setDialogs((prev) => ({ ...prev, isViewDialogOpen: false }))
        }
        currentItem={currentItem}
        {...documentViewHandlers}
      />

      {/* Diálogo de añadir documento */}
      <MedicalHistoryForm
        isOpen={dialogs.isAddDialogOpen}
        setIsOpen={(isOpen) =>
          setDialogs((prev) => ({ ...prev, isAddDialogOpen: isOpen }))
        }
        tags={medicalTags || []}
        onSubmit={handleCreateRecord}
        onCancel={() =>
          setDialogs((prev) => ({ ...prev, isAddDialogOpen: false }))
        }
        isSubmitting={isSubmitting}
      />

      {/* Diálogo de edición */}
      <MedicalHistoryForm
        key={editingItem?.id}
        isEditMode
        isOpen={dialogs.isEditDialogOpen}
        setIsOpen={(isOpen) =>
          setDialogs((prev) => ({ ...prev, isEditDialogOpen: isOpen }))
        }
        tags={medicalTags || []}
        initialValues={editingItem || undefined}
        onSubmit={handleUpdateRecord}
        onCancel={() =>
          setDialogs((prev) => ({ ...prev, isEditDialogOpen: false }))
        }
        isSubmitting={isSubmitting}
      />

      {/* Diálogo de confirmación para eliminar */}
      <DeleteConfirmationDialog
        isOpen={dialogs.isDeleteDialogOpen}
        setIsOpen={(isOpen) =>
          setDialogs((prev) => ({ ...prev, isDeleteDialogOpen: isOpen }))
        }
        item={itemToDelete}
        onDelete={handleDelete}
      />

      {/* Diálogo de recomendaciones IA */}
      <AIRecommendation
        isOpen={dialogs.isAIDialogOpen}
        onClose={() =>
          setDialogs((prev) => ({ ...prev, isAIDialogOpen: false }))
        }
        medicalHistory={medicalHistory || []}
        selectedItems={selectedItemsForAI}
        selectedTags={selectedTags}
        savedRecommendations={savedRecommendations || []}
        onSaveRecommendation={handleSaveRecommendation}
        onShareRecommendation={handleShareRecommendation}
      />

      {/* Visor de archivos */}
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

      {/* Modal de pago */}
      <PaymentModal
        featureType={premiumFeatureType}
        isOpen={dialogs.isPremiumModal}
        setIsOpen={(isOpen) =>
          setDialogs((prev) => ({ ...prev, isPremiumModal: isOpen }))
        }
        mode={!isTrialUsed ? "trial" : "upgrade"}
      />
    </div>
  );
};

export default MedicalHistory;
