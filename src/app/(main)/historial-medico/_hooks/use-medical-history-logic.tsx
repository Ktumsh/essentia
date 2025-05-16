import { useSession } from "next-auth/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

import { useTrial } from "@/hooks/use-trial";
import { useUserProfile } from "@/hooks/use-user-profile";
import { fetcher } from "@/lib/utils";

import { useCanUploadFile } from "./use-can-upload-files";
import { useMedicalFolders } from "./use-medical-folders";
import { useMedicalHistoryActions } from "./use-medical-history-actions";
import { useRecommendationsActions } from "./use-recommendations-actions";

import type { AIRecommendationType } from "../_components/ai-recommendation";
import type { FeatureType } from "@/components/ui/payment/payment-modal";
import type {
  MedicalFileType,
  MedicalHistoryWithTags,
} from "@/db/querys/medical-history-querys";
import type { MedicalTag } from "@/db/schema";
import type { MedicalHistoryActivity } from "@/lib/types";

export function useMedicalHistoryLogic() {
  const { user } = useUserProfile();
  const { data: session } = useSession();
  const userId = user?.id || (session?.user?.id as string);
  const isPremium = user?.isPremium;
  const { isTrialUsed } = useTrial();

  const { uploadStatus, refreshUploadStatus } = useCanUploadFile(userId);
  const { folders = [] } = useMedicalFolders();

  const { data: medicalTags = [] } = useSWR<MedicalTag[]>(
    "/api/medical-tags",
    fetcher,
    { fallbackData: [] },
  );
  const {
    data: medicalHistory = [],
    isLoading: isHistoryLoading,
    mutate,
  } = useSWR<MedicalHistoryWithTags[]>("/api/medical-history", fetcher);
  const { data: activities = [], mutate: mutateActivities } = useSWR<
    MedicalHistoryActivity[]
  >("/api/medical-activity", fetcher);
  const {
    data: savedRecommendations = [],
    isLoading: isRecommendationsLoading,
    mutate: mutateSavedRecommendations,
  } = useSWR(isPremium ? "/api/ai-recommendations" : null, fetcher, {
    fallbackData: [],
  });
  const [currentItem, setCurrentItem] = useState<MedicalHistoryWithTags | null>(
    null,
  );
  const [editingItem, setEditingItem] = useState<MedicalHistoryWithTags | null>(
    null,
  );
  const [itemToDelete, setItemToDelete] =
    useState<MedicalHistoryWithTags | null>(null);
  const [fileToView, setFileToView] = useState<{
    url?: string | null;
    name: string;
  } | null>(null);
  const [recommendationsToShare, setRecommendationsToShare] = useState<
    AIRecommendationType[]
  >([]);
  const [selectedItemsForAI, setSelectedItemsForAI] = useState<string[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [documentCategoryFilter, setDocumentCategoryFilter] = useState<
    MedicalFileType | "all"
  >("all");
  const [visibilityFilter, setVisibilityFilter] = useState<
    "all" | "shared" | "private"
  >("all");
  const [documentTypeFilter, setDocumentTypeFilter] = useState<
    "all" | "recent" | "shared" | "private"
  >("all");
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [hasNewActivity, setHasNewActivity] = useState(false);

  const { createRecord, updateRecord, deleteRecord, restoreDocument } =
    useMedicalHistoryActions({
      userId,
      refreshUploadStatus,
      mutate,
      activitiesMutate: mutateActivities,
      setHasNewActivity,
    });

  const {
    saveRecommendation,
    deleteRecommendation,
    updateRecommendationNotes,
  } = useRecommendationsActions({ userId, mutateSavedRecommendations });

  const filteredHistory = useMemo(() => {
    let filtered = medicalHistory;

    if (selectedTags.length) {
      filtered = filtered.filter((item) =>
        selectedTags.some((tag) => item.tags.includes(tag)),
      );
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          [item.condition, item.description, item.issuer, item.notes]
            .filter(Boolean)
            .some((text) => text!.toLowerCase().includes(term)) ||
          item.tags.some((tag) => tag.toLowerCase().includes(term)),
      );
    }
    if (documentCategoryFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.type === documentCategoryFilter,
      );
    }
    if (visibilityFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.visibility === visibilityFilter,
      );
    }
    if (activeFolderId) {
      filtered = filtered.filter((item) => item.folderId === activeFolderId);
    }

    return filtered;
  }, [
    medicalHistory,
    selectedTags,
    searchTerm,
    documentCategoryFilter,
    visibilityFilter,
    activeFolderId,
  ]);

  const getTagCount = useCallback(
    (tag: string) =>
      medicalHistory.filter((item) => item.tags.includes(tag)).length,
    [medicalHistory],
  );

  const handleCreate = useCallback(
    async (data: any) => {
      try {
        setIsSubmitting(true);
        if (!uploadStatus?.allowed) {
          const isUnlimited = uploadStatus?.max === null;
          toast.error("Límite alcanzado", {
            description: isUnlimited
              ? "No se ha podido verificar tu límite de documentos"
              : `Tu plan permite hasta ${uploadStatus?.max} documentos médicos`,
          });
          setIsSubmitting(false);
          return;
        }
        await createRecord(data);
        setDialogs((prev) => ({ ...prev, isAddDialogOpen: false }));
      } catch {
        toast.error("No se ha podido crear el documento", {
          description: "Por favor, intenta nuevamente",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [createRecord, uploadStatus],
  );

  const handleUpdate = useCallback(
    async (data: any) => {
      if (!editingItem) return;
      try {
        setIsSubmitting(true);
        await updateRecord(editingItem, data);
        setDialogs((prev) => ({ ...prev, isEditDialogOpen: false }));
        setEditingItem(null);
      } catch {
        toast.error("No se ha podido actualizar el documento", {
          description: "Por favor, intenta nuevamente",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [editingItem, updateRecord],
  );

  const handleDelete = useCallback(async () => {
    if (!itemToDelete) return;
    try {
      setIsSubmitting(true);
      await deleteRecord(itemToDelete);
      setItemToDelete(null);
    } catch {
      toast.error("No se ha podido eliminar el documento", {
        description: "Por favor, intenta nuevamente",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [itemToDelete, deleteRecord]);

  const handleRestore = useCallback(
    async (id: string) => {
      await restoreDocument(id, medicalHistory);
    },
    [restoreDocument, medicalHistory],
  );

  const clearFilters = useCallback(() => {
    setSelectedTags([]);
    setSearchTerm("");
    setDocumentCategoryFilter("all");
    setVisibilityFilter("all");
    setActiveFolderId(null);
  }, []);

  const handleShareRecommendation = useCallback(
    (rec: AIRecommendationType | AIRecommendationType[]) => {
      const list = Array.isArray(rec) ? rec : [rec];
      setRecommendationsToShare(list);
      setDialogs((prev) => ({ ...prev, isShareDialogOpen: true }));
    },
    [],
  );

  const openAIRecommendationsForAll = () => {
    if (!isPremium) {
      setPremiumFeatureType("ai-recommendations");
      setDialogs((prev) => ({ ...prev, isPremiumModal: true }));
      return;
    }
    setSelectedItemsForAI([]);
    setDialogs((prev) => ({ ...prev, isAIDialogOpen: true }));
  };

  const openAIRecommendationsForSelected = (ids: string[]) => {
    if (!isPremium) {
      setPremiumFeatureType("ai-recommendations");
      setDialogs((prev) => ({ ...prev, isPremiumModal: true }));
      return;
    }
    setSelectedItemsForAI(ids);
    setDialogs((prev) => ({ ...prev, isAIDialogOpen: true }));
  };

  const handleViewDocumentFromActivity = useCallback(
    (id: string) => {
      const doc = medicalHistory.find((d) => d.id === id);
      if (!doc) return;
      setCurrentItem(doc);
      setDialogs((prev) => ({ ...prev, isViewDialogOpen: true }));
    },
    [medicalHistory],
  );

  const handleDownload = async (fileData: {
    url?: string | null;
    name: string;
  }) => {
    if (!fileData.url) return;
    try {
      const response = await fetch(fileData.url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileData.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error descargando el archivo:", error);
    }
  };

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
      setPremiumFeatureType("ai-recommendations");
      setDialogs((prev) => ({
        ...prev,
        isPremiumModal: true,
        isViewDialogOpen: false,
      }));
      setCurrentItem(null);
    },
  };

  const listHandlers = {
    onView: (item: MedicalHistoryWithTags) => {
      setCurrentItem(item);
      setDialogs((prev) => ({ ...prev, isViewDialogOpen: true }));
    },
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
    onAIClick: (item: MedicalHistoryWithTags) => {
      setSelectedItemsForAI([item.id]);
      setDialogs((prev) => ({ ...prev, isAIDialogOpen: true }));
    },
    onViewFile: (fileData: { url?: string | null; name: string }) => {
      setFileToView(fileData);
      setDialogs((prev) => ({ ...prev, isFileViewerOpen: true }));
    },
    onDownload: (fileData: { url?: string | null; name: string }) => {
      handleDownload(fileData);
    },
    onAddDocument: () => {
      setDialogs((prev) => ({ ...prev, isAddDialogOpen: true }));
    },
    onOpenOptions: (item: MedicalHistoryWithTags | null) => {
      setCurrentItem(item);
      setIsOpenOptions(!!item);
    },
  };

  const loading = isHistoryLoading || isRecommendationsLoading;

  return {
    userId,
    isTrialUsed,
    uploadStatus,

    // Datos
    medicalTags,
    folders,
    medicalHistory,
    filteredHistory,
    activities,
    savedRecommendations,

    // Estados
    currentItem,
    editingItem,
    itemToDelete,
    fileToView,
    selectedItemsForAI,
    recommendationsToShare,
    searchTerm,
    selectedTags,
    documentCategoryFilter,
    documentTypeFilter,
    dialogs,
    premiumFeatureType,
    hasNewActivity,

    // Flags
    isSubmitting,
    isOpenOptions,
    loading,

    // Handlers compuestos
    documentViewHandlers,
    listHandlers,

    // Funciones de acción directa
    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
    handleShareRecommendation,
    handleViewDocumentFromActivity,
    saveRecommendation,
    deleteRecommendation,
    updateRecommendationNotes,
    openAIRecommendationsForAll,
    openAIRecommendationsForSelected,
    clearFilters,
    getTagCount,

    // Setters usados directamente
    setDialogs,
    setPremiumFeatureType,
    setDocumentTypeFilter,
    setDocumentCategoryFilter,
    setSearchTerm,
    setSelectedTags,
    setIsOpenOptions,
    setEditingItem,
    setFileToView,
  };
}
