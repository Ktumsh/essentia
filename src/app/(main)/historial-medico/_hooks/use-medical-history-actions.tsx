"use client";

import { toast } from "sonner";

import {
  addMedicalHistoryWithTags,
  updateMedicalHistory,
  deleteMedicalHistory,
  restoreMedicalHistory,
  type MedicalHistoryWithTags,
} from "@/db/querys/medical-history-querys";

import { uploadMedicalFile } from "../_lib/utils";

import type { MedicalHistoryFormData } from "../_components/medical-history-form";

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
  async function createRecord(data: MedicalHistoryFormData) {
    if (!data.file) return;
    try {
      const uploadedFile = await uploadMedicalFile(data.file);
      if (!uploadedFile) return;

      await addMedicalHistoryWithTags({
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
    } catch {
      toast.error("¡Ups! 😔", {
        description: "No se pudo agregar el documento. Intenta de nuevo.",
      });
    }
  }

  async function updateRecord(
    editingItem: MedicalHistoryWithTags,
    data: MedicalHistoryFormData,
  ) {
    let updatedFile = null;
    try {
      if (data.file) {
        const uploadedFile = await uploadMedicalFile(data.file);
        if (uploadedFile) {
          updatedFile = {
            url: uploadedFile.url,
            name: uploadedFile.name,
            size: uploadedFile.size,
            contentType: data.file.type,
            uploadedAt: uploadedFile.uploadedAt,
          };
        }
      }

      const res = await updateMedicalHistory({
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

      console.log("res", res);

      toast.success("Documento actualizado correctamente 😊");
      mutate();
      activitiesMutate();
      setHasNewActivity(true);
    } catch {
      toast.error("¡Ups! 😔", {
        description: "No se pudo actualizar el documento. Intenta de nuevo.",
      });
    }
  }

  async function deleteRecord(itemToDelete: MedicalHistoryWithTags) {
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
    } catch {
      toast.error("¡Ups! 😔", {
        description: "No se pudo eliminar el documento. Intenta de nuevo.",
      });
    }
  }

  async function restoreDocument(
    documentId: string,
    medicalHistory?: MedicalHistoryWithTags[],
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

  return {
    createRecord,
    updateRecord,
    deleteRecord,
    restoreDocument,
  };
}
