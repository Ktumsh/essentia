"use client";

import { useEffect, useState } from "react";

import { getModules, getResourceBySlug } from "@/db/querys/resource-querys";

const useLessonName = (
  resourceSlug: string | null,
  moduleSlug: string | null,
  lessonSlug: string | null,
) => {
  const [lessonName, setLessonName] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessonName = async () => {
      try {
        if (!resourceSlug || !moduleSlug || !lessonSlug) {
          setLessonName(null);
          return;
        }

        const resource = await getResourceBySlug(resourceSlug);
        if (!resource) {
          setLessonName(null);
          return;
        }

        const modules = await getModules(resource.id);
        const currentModule = modules.find(
          (mod) => mod.module.slug === moduleSlug,
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
  }, [resourceSlug, moduleSlug, lessonSlug]);

  return lessonName;
};

export default useLessonName;
