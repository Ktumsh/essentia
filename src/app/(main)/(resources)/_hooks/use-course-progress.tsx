"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  initializeCourseProgress,
  getLastCompletedLesson,
} from "@/db/querys/progress-querys";

interface UseCourseProgressProps {
  userId?: string;
  resourceId?: string;
  slug?: string;
  firstModule?: string;
  firstLesson?: string;
}

export const useCourseProgress = ({
  userId,
  resourceId,
  slug,
  firstModule,
  firstLesson,
}: UseCourseProgressProps) => {
  const [processing, setProcessing] = useState(false);

  const router = useRouter();

  const startCourse = async () => {
    try {
      if (!resourceId || !userId) return;

      setProcessing(true);

      toast.promise(
        (async () => {
          await initializeCourseProgress(userId, resourceId);

          setProcessing(false);

          router.push(`/${slug}/${firstModule}/${firstLesson}`);
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

  const continueCourse = async () => {
    try {
      if (!userId || !resourceId) return;

      setProcessing(true);

      const lastLesson = await getLastCompletedLesson(userId, resourceId);

      if (lastLesson) {
        router.push(
          `/${slug}/${lastLesson.moduleSlug}/${lastLesson.lessonSlug}`,
        );
      } else {
        router.push(`/${slug}/${firstModule}/${firstLesson}`);
      }
    } catch (error) {
      console.error("Error al continuar el curso:", error);
    } finally {
      setProcessing(false);
    }
  };

  return {
    processing,
    startCourse,
    continueCourse,
  };
};
