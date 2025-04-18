"use client";

import { useEffect, useState } from "react";

import { getStages, getRouteBySlug } from "@/db/querys/resource-querys";

const useLessonName = (
  routeSlug: string | null,
  stageSlug: string | null,
  lessonSlug: string | null,
) => {
  const [lessonName, setLessonName] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessonName = async () => {
      try {
        if (!routeSlug || !stageSlug || !lessonSlug) {
          setLessonName(null);
          return;
        }

        const resource = await getRouteBySlug(routeSlug);
        if (!resource) {
          setLessonName(null);
          return;
        }

        const modules = await getStages(resource.id);
        const currentModule = modules.find(
          (mod) => mod.stage.slug === stageSlug,
        );

        if (!currentModule) {
          setLessonName(null);
          return;
        }

        const lesson = currentModule.lessons.find(
          (lesson) => lesson.slug === lessonSlug,
        );

        if (lesson) {
          setLessonName(lesson.title);
        } else {
          setLessonName("Lección desconocida");
        }
      } catch (error) {
        console.error("Error al obtener el nombre de la lección:", error);
        setLessonName("Lección desconocida");
      }
    };

    fetchLessonName();
  }, [routeSlug, stageSlug, lessonSlug]);

  return lessonName;
};

export default useLessonName;
