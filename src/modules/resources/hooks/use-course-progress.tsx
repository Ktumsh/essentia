"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import {
  initializeCourseProgress,
  checkCourseProgress,
  getLastCompletedLesson,
} from "@/db/querys/progress-query";

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
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userId || !resourceId) {
        setLoading(false);
        return;
      }

      try {
        const progress = await checkCourseProgress(userId, resourceId);
        setIsInitialized(progress);
      } catch (error) {
        console.error("Error al verificar el progreso:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [userId, resourceId]);

  const startCourse = async () => {
    try {
      if (!resourceId || !userId) return;

      setProcessing(true);

      toast.promise(
        (async () => {
          await initializeCourseProgress(userId, resourceId);
        })(),
        {
          loading: "¡El curso está por comenzar!",
          success: "¡Curso iniciado!",
          error: "Error al iniciar el curso",
        },
      );
      setIsInitialized(true);

      router.push(`/${slug}/${firstModule}/${firstLesson}`);
    } catch (error) {
      console.error("Error al iniciar el curso:", error);
    } finally {
      setProcessing(false);
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

  return { isInitialized, loading, processing, startCourse, continueCourse };
};
