"use client";

import { toast } from "sonner";

import {
  saveAiMedicalRecommendation,
  deleteAiRecommendation,
  updateAiRecommendationNotes,
  SavedAIRecommendation,
} from "@/db/querys/ai-recommendations-querys";

import type { AIRecommendationType } from "../_components/ai-recommendation";

interface RecommendationOpsOptions {
  userId: string;
  mutateSavedRecommendations: () => void;
}

export function useRecommendationsActions({
  userId,
  mutateSavedRecommendations,
}: RecommendationOpsOptions) {
  async function saveRecommendation(
    recOrList: AIRecommendationType | AIRecommendationType[],
  ) {
    const list = Array.isArray(recOrList) ? recOrList : [recOrList];

    if (list.length === 1) {
      try {
        const rec = list[0];
        const result = await saveAiMedicalRecommendation({
          userId,
          type: rec.type,
          title: rec.title,
          description: rec.description,
          priority: rec.priority,
          relatedDocuments: rec.relatedDocuments || [],
          relatedTags: rec.relatedTags || [],
        });

        if (result.isNew) {
          toast.success("Recomendación guardada 😊");
        } else {
          toast.info("¡Ups! 😶", {
            description: "Esta recomendación ya ha sido guardada.",
          });
        }
        mutateSavedRecommendations();
      } catch {
        toast.error("Error al guardar la recomendación");
      }
      return;
    }

    const results = await Promise.allSettled(
      list.map((rec) =>
        saveAiMedicalRecommendation({
          userId,
          type: rec.type,
          title: rec.title,
          description: rec.description,
          priority: rec.priority,
          relatedDocuments: rec.relatedDocuments || [],
          relatedTags: rec.relatedTags || [],
        }),
      ),
    );

    const savedCount = results.filter(
      (r) =>
        r.status === "fulfilled" &&
        (r as PromiseFulfilledResult<any>).value?.isNew,
    ).length;
    const duplicatedCount = results.filter(
      (r) =>
        r.status === "fulfilled" &&
        !(r as PromiseFulfilledResult<any>).value?.isNew,
    ).length;
    const errorCount = results.filter((r) => r.status === "rejected").length;

    if (savedCount > 0) {
      toast.success(
        `Guardadas ${savedCount} recomendación${savedCount > 1 ? "es" : ""} 😊`,
      );
    }

    if (duplicatedCount > 0) {
      toast.info("Algunas recomendaciones ya estaban guardadas 😶");
    }

    if (errorCount > 0) {
      toast.error("Error al guardar una o más recomendaciones");
    }

    mutateSavedRecommendations();
  }

  async function deleteRecommendation(recommendationId: string) {
    try {
      await deleteAiRecommendation({
        userId,
        recommendationId,
      });
      toast.success("Recomendación eliminada");
      mutateSavedRecommendations();
    } catch {
      toast.error("Error al eliminar la recomendación");
    }
  }

  async function updateRecommendationNotes(rec: SavedAIRecommendation) {
    try {
      await updateAiRecommendationNotes({
        userId,
        recommendationId: rec.id,
        notes: rec.notes || "",
      });
      toast.success("Notas actualizadas");
      mutateSavedRecommendations();
    } catch {
      toast.error("Error al actualizar las notas");
    }
  }

  return {
    saveRecommendation,
    deleteRecommendation,
    updateRecommendationNotes,
  };
}
