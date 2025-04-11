"use server";

import { and, asc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { Modules } from "@/types/resource";

import {
  exam,
  examQuestion,
  lesson,
  resourceModule,
  resource,
} from "../schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function getResourceBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(resource)
      .where(eq(resource.slug, slug));
    return result[0];
  } catch (error) {
    console.error("Error al obtener el recurso:", error);
    throw error;
  }
}

export async function getModuleByResource(resourceId: string) {
  try {
    return await db
      .select()
      .from(resourceModule)
      .where(eq(resourceModule.resourceId, resourceId));
  } catch (error) {
    console.error("Error al obtener los módulos:", error);
    throw error;
  }
}

export async function getModuleBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(resourceModule)
      .leftJoin(lesson, eq(resourceModule.id, lesson.moduleId))
      .where(eq(resourceModule.slug, slug));
    return result[0];
  } catch (error) {
    console.error("Error al obtener el módulo:", error);
    throw error;
  }
}

export async function getModules(resourceId: string): Promise<Array<Modules>> {
  try {
    const result = await db
      .select({
        module: resourceModule,
        lesson,
        exam,
      })
      .from(resourceModule)
      .leftJoin(lesson, eq(resourceModule.id, lesson.moduleId))
      .leftJoin(exam, eq(resourceModule.id, exam.moduleId))
      .where(eq(resourceModule.resourceId, resourceId))
      .orderBy(asc(resourceModule.order), asc(lesson.order))
      .execute();

    const modules: Array<Modules> = [];

    for (const row of result) {
      let existingModule = modules.find(
        (item) => item.module.title === row.module.title
      );

      if (!existingModule) {
        existingModule = {
          module: row.module,
          lessons: [],
          exam: row.exam,
        };
        modules.push(existingModule);
      }

      if (row.lesson?.title) {
        existingModule?.lessons.push(row.lesson);
      }
    }

    return modules;
  } catch (error) {
    console.error("Error al obtener el módulo:", error);
    throw error;
  }
}

export async function getLessonsByModule(moduleId: string) {
  try {
    return await db.select().from(lesson).where(eq(lesson.moduleId, moduleId));
  } catch (error) {
    console.error("Error al obtener las lecciones:", error);
    throw error;
  }
}

export async function getLessonBySlug(moduleId: string, lessonSlug: string) {
  const result = await db
    .select()
    .from(lesson)
    .where(and(eq(lesson.moduleId, moduleId), eq(lesson.slug, lessonSlug)))
    .limit(1);

  return result[0];
}

export async function getExamByModule(moduleId: string) {
  try {
    const result = await db
      .select()
      .from(exam)
      .where(eq(exam.moduleId, moduleId));

    return result[0];
  } catch (error) {
    console.error("Error al obtener el examen:", error);
    throw error;
  }
}

export async function getQuestionsByExam(examId: string) {
  try {
    return await db
      .select()
      .from(examQuestion)
      .where(eq(examQuestion.examId, examId));
  } catch (error) {
    console.error("Error al obtener las preguntas del examen:", error);
    throw error;
  }
}
