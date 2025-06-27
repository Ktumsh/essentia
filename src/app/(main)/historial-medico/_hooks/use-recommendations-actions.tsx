"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

import {
  saveAiMedicalRecommendation,
  deleteAiRecommendation,
  updateAiRecommendationNotes,
  deleteManyAiRecommendations,
  type SavedAIRecommendation,
} from "@/db/querys/ai-recommendations-querys";

import useAIUsage from "./use-ai-usage";
import { isRecommendationSaved } from "../_lib/utils";

import type { SavedRecommendation } from "@/lib/types";

interface RecommendationOpsOptions {
  userId: string;
  mutateSavedRecommendations: () => Promise<void>;
}

export function useRecommendationsActions({
  userId,
  mutateSavedRecommendations,
}: RecommendationOpsOptions) {
  const { mutateAIUsage } = useAIUsage();

  const [overrideState, setOverrideState] = useState<Record<string, boolean>>(
    {},
  );

  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const latestIntent = useRef<Record<string, boolean>>({});

  const getOptimistic = useCallback(
    (id: string): boolean | undefined => overrideState[id],
    [overrideState],
  );

  const setOverride = (id: string, val: boolean) =>
    setOverrideState((o) => ({ ...o, [id]: val }));

  const clearOverride = (id: string) =>
    setOverrideState((o) => {
      const c = { ...o };
      delete c[id];
      return c;
    });

  const saveRecommendation = useCallback(
    async (recOrList: SavedRecommendation | SavedRecommendation[]) => {
      const list = Array.isArray(recOrList) ? recOrList : [recOrList];
      list.forEach((rec) => setOverride(rec.id, true));

      let results: PromiseSettledResult<any>[] = [];

      try {
        results = await Promise.allSettled(
          list.map((rec) =>
            saveAiMedicalRecommendation({
              userId,
              id: rec.id,
              type: rec.type,
              title: rec.title,
              description: rec.description,
              priority: rec.priority,
              relatedDocuments: rec.relatedDocuments ?? [],
              relatedTags: rec.relatedTags ?? [],
            }),
          ),
        );

        const errCount = results.filter((r) => r.status === "rejected").length;

        if (errCount === list.length) {
          toast.error("No se pudo guardar ninguna recomendación");
        } else if (errCount > 0) {
          toast.error(
            `No se pudieron guardar ${errCount} ${errCount === 1 ? "recomendación" : "recomendaciones"}`,
          );
        }
      } catch {
        toast.error("Ocurrió un problema al guardar recomendaciones");
      } finally {
        results.forEach((r, i) => {
          const rec = list[i];
          const ok =
            r.status === "fulfilled" &&
            (r as PromiseFulfilledResult<any>).value.isNew;
          if (!ok) {
            setOverride(rec.id, false);
          }
        });

        await mutateSavedRecommendations();
        await mutateAIUsage();

        list.forEach((rec) => {
          if (latestIntent.current[rec.id] === true) {
            clearOverride(rec.id);
          }
        });
      }
    },
    [userId, mutateSavedRecommendations, mutateAIUsage],
  );

  const deleteRecommendation = useCallback(
    async (recommendationId: string, isToggle: boolean = false) => {
      try {
        await deleteAiRecommendation({ userId, recommendationId });

        if (!isToggle) {
          toast.success("Recomendación eliminada");
        }
      } catch {
        toast.error("No se pudo eliminar la recomendación");
      } finally {
        await mutateSavedRecommendations();
        await mutateAIUsage();

        if (latestIntent.current[recommendationId] === false) {
          clearOverride(recommendationId);
        }
      }
    },
    [userId, mutateSavedRecommendations, mutateAIUsage],
  );

  const updateRecommendationNotes = useCallback(
    async (rec: SavedAIRecommendation) => {
      try {
        await updateAiRecommendationNotes({
          userId,
          recommendationId: rec.id,
          notes: rec.notes ?? "",
        });
        toast.success("Notas actualizadas");
        await mutateSavedRecommendations();
        await mutateAIUsage();
      } catch {
        toast.error("No se pudieron actualizar las notas");
      }
    },
    [userId, mutateSavedRecommendations, mutateAIUsage],
  );

  const deleteRecommendations = useCallback(
    async (userId: string, ids: string[]) => {
      if (ids.length === 0) return;

      const promise = deleteManyAiRecommendations({ userId, ids });

      try {
        toast.promise(promise, {
          loading:
            ids.length === 1
              ? "Eliminando recomendación..."
              : "Eliminando recomendaciones...",
          success:
            ids.length === 1
              ? "Recomendación eliminada correctamente."
              : "Recomendaciones eliminadas correctamente.",
          error: "Error al eliminar recomendaciones.",
        });

        const res = await promise;

        if (!res.success) {
          toast.error(
            `${res.failed.length} recomendaciones no se pudieron eliminar.`,
          );
          console.warn("Fallos:", res.failed);
        }

        await mutateSavedRecommendations();
        await mutateAIUsage();
      } catch (err) {
        console.error("Error en eliminación:", err);
        toast.error("Error inesperado al eliminar recomendaciones.");
      }
    },
    [mutateSavedRecommendations, mutateAIUsage],
  );

  const toggleRecommendation = useCallback(
    async (rec: SavedRecommendation, savedList: SavedRecommendation[]) => {
      const id = rec.id;
      const reallySaved = isRecommendationSaved(rec, savedList);
      const optim = getOptimistic(id);
      const current = optim !== undefined ? optim : reallySaved;
      const target = !current;

      latestIntent.current[id] = target;
      setOverride(id, target);

      if (debounceTimers.current[id]) {
        clearTimeout(debounceTimers.current[id]);
      }

      debounceTimers.current[id] = setTimeout(async () => {
        if (latestIntent.current[id] !== target) return;

        try {
          if (target) {
            await saveRecommendation(rec);
          } else {
            await deleteRecommendation(id, true);
          }
        } catch {
          setOverride(id, current);
        } finally {
          await mutateSavedRecommendations();
          await mutateAIUsage();
          clearOverride(id);
          delete debounceTimers.current[id];
        }
      }, 350);
    },
    [
      saveRecommendation,
      deleteRecommendation,
      mutateSavedRecommendations,
      mutateAIUsage,
      getOptimistic,
    ],
  );

  const isSaved = useCallback(
    (rec: SavedRecommendation, savedList: SavedRecommendation[]): boolean => {
      const optim = getOptimistic(rec.id);
      return optim !== undefined
        ? optim
        : isRecommendationSaved(rec, savedList);
    },
    [getOptimistic],
  );

  return {
    saveRecommendation,
    deleteRecommendation,
    updateRecommendationNotes,
    deleteRecommendations,
    toggleRecommendation,
    isSaved,
  };
}
