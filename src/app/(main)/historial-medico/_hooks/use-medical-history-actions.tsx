"use client";

import { toast } from "sonner";
import { useSWRConfig } from "swr";

import {
  addMedicalHistory,
  updateMedicalHistory,
  deleteMedicalHistory,
  restoreMedicalHistory,
  type MedicalHistory,
  deleteManyMedicalHistory,
} from "@/db/querys/medical-history-querys";

import { uploadMedicalFile } from "../_lib/utils";

import type { DocumentFormSchema } from "../_components/document-form";

export interface MedicalHistoryOpsOptions {
  userId: string;
  refreshUploadStatus: () => void;
  mutate: () => void;
  activitiesMutate: () => void;
  setHasNewActivity: (hasNew: boolean) => void;
}

export function useMedicalHistoryActions({
  userId,
  refreshUploadStatus,
  mutate,
  activitiesMutate,
  setHasNewActivity,
}: MedicalHistoryOpsOptions) {
  const { mutate: folderMutate } = useSWRConfig();
  async function createRecord(data: DocumentFormSchema) {
    try {
      if (!data.file) {
        throw new Error("No se ha seleccionado ningún archivo");
      }

      const uploadedFile = await uploadMedicalFile(data.file);
      if (!uploadedFile) {
        throw new Error("No se pudo subir el archivo");
      }

      await addMedicalHistory({
        userId,
        data: {
          condition: data.condition,
          description: data.description || null,
          type: data.type,
          notes: data.notes || null,
          issuer: data.issuer || null,
          documentDate: data.documentDate || null,
          visibility: data.visibility || "private",
          tags: data.tags,
          folderId: data.folderId || null,
        },
        file: {
          url: uploadedFile.url,
          name: uploadedFile.name,
          size: uploadedFile.size,
          contentType: data.file.type,
          uploadedAt: uploadedFile.uploadedAt,
        },
      });

      toast.success("Documento agregado correctamente 😊");
      mutate();
      activitiesMutate();
      setHasNewActivity(true);
      refreshUploadStatus();
      folderMutate("/api/medical-folders");
    } catch (error) {
      throw error;
    }
  }

  async function updateRecord(
    editingItem: MedicalHistory,
    data: DocumentFormSchema,
  ): Promise<void> {
    let updatedFile = null;
    try {
      if (data.file) {
        const uploadedFile = await uploadMedicalFile(data.file);
        if (!uploadedFile) {
          throw new Error("No se pudo subir el archivo");
        }

        updatedFile = {
          url: uploadedFile.url,
          name: uploadedFile.name,
          size: uploadedFile.size,
          contentType: data.file.type,
          uploadedAt: uploadedFile.uploadedAt,
        };
      }

      await updateMedicalHistory({
        userId,
        id: editingItem.id,
        data: {
          condition: data.condition,
          description: data.description || null,
          type: data.type,
          tags: data.tags,
          issuer: data.issuer || null,
          documentDate: data.documentDate ? new Date(data.documentDate) : null,
          notes: data.notes || null,
          visibility: data.visibility,
          folderId: data.folderId || null,
        },
        file: updatedFile || undefined,
      });

      toast.success("Documento actualizado correctamente 😊");
      mutate();
      activitiesMutate();
      setHasNewActivity(true);
      folderMutate("/api/medical-folders");
    } catch (error) {
      throw error;
    }
  }

  async function deleteRecord(itemToDelete: MedicalHistory) {
    try {
      await deleteMedicalHistory({
        userId,
        id: itemToDelete.id,
      });
      toast.success("Documento eliminado correctamente 😊");
      mutate();
      activitiesMutate();
      setHasNewActivity(true);
      refreshUploadStatus();
    } catch (error) {
      throw error;
    }
  }

  async function restoreDocument(
    documentId: string,
    medicalHistory?: MedicalHistory[],
  ) {
    const exists = medicalHistory?.some((item) => item.id === documentId);
    if (exists) {
      toast.info("¡Ups!", {
        description: "Este documento ya existe en tu historial 😊",
      });
      return;
    }

    try {
      await restoreMedicalHistory({
        userId,
        id: documentId,
      });
      mutate();
      activitiesMutate();
      setHasNewActivity(true);
      refreshUploadStatus();

      toast.success("Documento restaurado en tu historial 😊");
    } catch {
      toast.error("¡Ups! 😔", {
        description: "No se pudo restaurar el documento. Intenta de nuevo.",
      });
    }
  }

  async function deleteDocuments(userId: string, ids: string[]) {
    if (ids.length === 0) return;

    const promise = deleteManyMedicalHistory({ userId, ids });

    try {
      toast.promise(promise, {
        loading:
          ids.length === 1
            ? "Eliminando documento..."
            : "Eliminando documentos...",
        success:
          ids.length === 1
            ? "Documento eliminado correctamente."
            : "Documentos eliminados correctamente.",
        error: "Error al eliminar documentos.",
      });

      const res = await promise;

      if (!res.success) {
        toast.error(`${res.failed.length} documentos no se pudieron eliminar.`);
        console.warn("Fallos:", res.failed);
      }
      mutate();
      activitiesMutate();
      setHasNewActivity(true);
      refreshUploadStatus();
    } catch (err) {
      console.error("Error en eliminación:", err);
      toast.error("Error inesperado al eliminar documentos.");
    }
  }

  return {
    createRecord,
    updateRecord,
    deleteRecord,
    restoreDocument,
    deleteDocuments,
  };
}
