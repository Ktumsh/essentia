"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  initializeRouteProgress,
  getLastCompletedLesson,
} from "@/db/querys/progress-querys";

interface UseRouteProgressProps {
  userId?: string;
  routeId?: string;
  slug?: string;
  firstStage?: string;
  firstLesson?: string;
}

export const useRouteProgress = ({
  userId,
  routeId,
  slug,
  firstStage,
  firstLesson,
}: UseRouteProgressProps) => {
  const [processing, setProcessing] = useState(false);

  const router = useRouter();

  const startRoute = async () => {
    try {
      if (!routeId || !userId) return;

      setProcessing(true);

      toast.promise(
        (async () => {
          await initializeRouteProgress(userId, routeId);

          setProcessing(false);

          router.push(`/${slug}/${firstStage}/${firstLesson}`);
        })(),
        {
          loading: "¡El curso está por comenzar!",
          success: "¡Curso iniciado!",
          error: "Error al iniciar el curso",
        },
      );
    } catch (error) {
      console.error("Error al iniciar el curso:", error);
    }
  };

  const continueRoute = async () => {
    try {
      if (!userId || !routeId) return;

      setProcessing(true);

      const lastLesson = await getLastCompletedLesson(userId, routeId);

      if (lastLesson) {
        router.push(
          `/${slug}/${lastLesson.stageSlug}/${lastLesson.lessonSlug}`,
        );
      } else {
        router.push(`/${slug}/${firstStage}/${firstLesson}`);
      }
    } catch (error) {
      console.error("Error al continuar el curso:", error);
    } finally {
      setProcessing(false);
    }
  };

  return {
    processing,
    startRoute,
    continueRoute,
  };
};
