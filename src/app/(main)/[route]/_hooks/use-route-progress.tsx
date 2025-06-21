"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  initializeRouteProgress,
  getLastCompletedLesson,
  getOrderedLessonsByRoute,
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
          loading: "¡La ruta está por comenzar!",
          success: "¡Ruta iniciada!",
          error: "No se pudo iniciar la ruta",
        },
      );
    } catch (error) {
      console.error("No se pudo iniciar la ruta:", error);
    }
  };

  const continueRoute = async () => {
    if (!userId || !routeId) return;

    setProcessing(true);

    try {
      const lastLesson = await getLastCompletedLesson(userId, routeId);
      const allLessons = await getOrderedLessonsByRoute(routeId);

      const lastIndex = allLessons.findIndex(
        (l) =>
          l.lessonSlug === lastLesson?.lessonSlug &&
          l.stageSlug === lastLesson?.stageSlug,
      );

      const nextLesson = allLessons[lastIndex + 1];

      if (nextLesson) {
        router.push(
          `/${slug}/${nextLesson.stageSlug}/${nextLesson.lessonSlug}`,
        );
      } else {
        toast.success("¡Ya completaste toda la ruta!");
      }
    } catch (error) {
      console.error("Error al continuar la ruta:", error);
      toast.error("Ocurrió un error al continuar la ruta.");
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
