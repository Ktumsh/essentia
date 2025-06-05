import { useSession } from "next-auth/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

import { type MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { useTrial } from "@/hooks/use-trial";
import { useUserProfile } from "@/hooks/use-user-profile";
import { fetcher } from "@/utils";

import { useCanUploadFile } from "./use-can-upload-files";
import { useMedicalDialogs } from "./use-medical-dialogs";
import { useMedicalHistoryActions } from "./use-medical-history-actions";
import { useRecommendationsActions } from "./use-recommendations-actions";

import type { DocumentFormSchema } from "../_components/document-form";
import type { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";
import type { MedicalTag } from "@/db/schema";
import type { MedicalFileType, MedicalHistoryActivity } from "@/lib/types";

export function useMedicalHistoryLogic() {
  const { user } = useUserProfile();
  const { data: session } = useSession();
  const userId = user?.id || (session?.user?.id as string);
  const isPremium = user?.isPremium;
  const { isTrialUsed } = useTrial();

  const { uploadStatus, refreshUploadStatus } = useCanUploadFile(userId);

  const { data: medicalTags = [] } = useSWR<MedicalTag[]>(
    "/api/medical-tags",
    fetcher,
    { fallbackData: [] },
  );
  const {
    data: medicalHistory = [],
    isLoading: isHistoryLoading,
    mutate: mutateHistory,
  } = useSWR<MedicalHistoryWithTags[]>("/api/medical-history", fetcher);
  const {
    data: activities = [],
    mutate: mutateActivities,
    isLoading: activitiesLoading,
  } = useSWR<MedicalHistoryActivity[]>("/api/medical-activity", fetcher);
  const {
    data: savedRecommendations = [],
    isLoading: isRecommendationsLoading,
    mutate: mutateSavedRecommendations,
  } = useSWR<SavedAIRecommendation[]>(
    isPremium ? "/api/ai-recommendations" : null,
    fetcher,
    {
      fallbackData: [],
    },
  );

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [documentCategoryFilter, setDocumentCategoryFilter] = useState<
    MedicalFileType | "all"
  >("all");
  const [documentTypeFilter, setDocumentTypeFilter] = useState<
    "updated" | "recent" | "old"
  >("updated");
  const [visibilityFilter, setVisibilityFilter] = useState<
    "all" | "shared" | "private"
  >("all");
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [hasNewActivity, setHasNewActivity] = useState(false);

  const {
    createRecord,
    updateRecord,
    deleteRecord,
    restoreDocument,
    deleteDocuments,
  } = useMedicalHistoryActions({
    userId,
    refreshUploadStatus,
    mutate: mutateHistory,
    activitiesMutate: mutateActivities,
    setHasNewActivity,
  });

  const {
    saveRecommendation,
    deleteRecommendation,
    updateRecommendationNotes,
    deleteRecommendations,
    isSaved: isRecommendationSaved,
    toggleRecommendation,
  } = useRecommendationsActions({
    userId,
    mutateSavedRecommendations: async () => {
      await mutateSavedRecommendations();
    },
  });

  const { closeDialog, editingItem, itemToDelete } = useMedicalDialogs();

  const filteredHistory = useMemo(() => {
    let items = medicalHistory;
    if (selectedTags.length) {
      items = items.filter((it) =>
        selectedTags.some((t) => it.tags.includes(t)),
      );
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(
        (it) =>
          [it.condition, it.description, it.issuer, it.notes]
            .filter(Boolean)
            .some((txt) => txt!.toLowerCase().includes(term)) ||
          it.tags.some((t) => t.toLowerCase().includes(term)),
      );
    }
    if (documentCategoryFilter !== "all") {
      items = items.filter((it) => it.type === documentCategoryFilter);
    }
    if (visibilityFilter !== "all") {
      items = items.filter((it) => it.visibility === visibilityFilter);
    }
    if (activeFolderId) {
      items = items.filter((it) => it.folderId === activeFolderId);
    }
    return items;
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
      medicalHistory.filter((it) => it.tags.includes(tag)).length,
    [medicalHistory],
  );
  const clearFilters = useCallback(() => {
    setSelectedTags([]);
    setSearchTerm("");
    setDocumentCategoryFilter("all");
    setVisibilityFilter("all");
    setActiveFolderId(null);
  }, []);

  const handleCreate = useCallback(
    async (data: DocumentFormSchema) => {
      setIsSubmitting(true);
      try {
        if (!uploadStatus?.allowed) {
          const isUnlimited = uploadStatus?.max === null;
          toast.error("Límite alcanzado", {
            description: isUnlimited
              ? "No se ha podido verificar tu límite de documentos"
              : `Tu plan permite hasta ${uploadStatus?.max} documentos médicos`,
          });
          return;
        }
        await createRecord(data);
        closeDialog("isAddDialogOpen");
      } catch {
        toast.error("No se pudo crear el documento. Intenta nuevamente");
      } finally {
        setIsSubmitting(false);
      }
    },
    [createRecord, uploadStatus, closeDialog],
  );

  const handleUpdate = useCallback(
    async (data: DocumentFormSchema) => {
      if (!editingItem) return;
      setIsSubmitting(true);
      try {
        await updateRecord(editingItem, data);
        closeDialog("isEditDialogOpen");
      } catch {
        toast.error("No se pudo actualizar el documento. Intenta nuevamente");
      } finally {
        setIsSubmitting(false);
      }
    },
    [editingItem, updateRecord, closeDialog],
  );

  const handleDelete = useCallback(async () => {
    if (!itemToDelete) return;
    setIsSubmitting(true);
    try {
      await deleteRecord(itemToDelete);
      closeDialog("isDeleteDialogOpen");
    } catch {
      toast.error("No se pudo eliminar el documento. Intenta nuevamente");
    } finally {
      setIsSubmitting(false);
    }
  }, [itemToDelete, deleteRecord, closeDialog]);

  const handleRestore = useCallback(
    async (id: string) => {
      await restoreDocument(id, medicalHistory);
    },
    [restoreDocument, medicalHistory],
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

  const handleDeleteDocuments = useCallback(
    async (documentIds: string[]) => {
      setIsSubmitting(true);
      try {
        await deleteDocuments(userId, documentIds);
        closeDialog("isMultiDeleteDocsDialogOpen");
      } catch (error) {
        console.error("Error eliminando documentos:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [deleteDocuments, closeDialog, userId],
  );

  const handleDeleteRecommendations = useCallback(
    async (recommendationIds: string[]) => {
      setIsSubmitting(true);
      try {
        await deleteRecommendations(userId, recommendationIds);
        closeDialog("isMultiDeleteRecomsDialogOpen");
      } catch (error) {
        console.error("Error eliminando recomendaciones:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [deleteRecommendations, closeDialog, userId],
  );

  const loading = isHistoryLoading || isRecommendationsLoading;

  return {
    userId,
    isTrialUsed,

    uploadStatus,
    medicalTags,
    medicalHistory,
    filteredHistory,
    activities,
    savedRecommendations,

    selectedTags,
    setSelectedTags,
    searchTerm,
    setSearchTerm,
    documentCategoryFilter,
    setDocumentCategoryFilter,
    documentTypeFilter,
    setDocumentTypeFilter,
    visibilityFilter,
    setVisibilityFilter,
    activeFolderId,
    setActiveFolderId,
    isOpenOptions,
    setIsOpenOptions,
    hasNewActivity,
    clearFilters,

    isSubmitting,
    loading,
    activitiesLoading,

    handleCreate,
    handleUpdate,
    handleDelete,
    handleRestore,
    handleDownload,
    handleDeleteDocuments,

    saveRecommendation,
    deleteRecommendation,
    handleDeleteRecommendations,
    updateRecommendationNotes,
    isRecommendationSaved,
    toggleRecommendation,

    getTagCount,
  };
}
