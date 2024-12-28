"use server";

import { and, desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  exam,
  lesson,
  resourceModule,
  userExamProgress,
  userLessonProgress,
  userModuleProgress,
} from "../schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function initializeCourseProgress(
  userId: string,
  resourceId: string,
) {
  try {
    const modules = await db
      .select()
      .from(resourceModule)
      .where(eq(resourceModule.resourceId, resourceId));

    for (const mod of modules) {
      const existingModule = await db
        .select()
        .from(userModuleProgress)
        .where(
          eq(userModuleProgress.userId, userId) &&
            eq(userModuleProgress.moduleId, mod.id),
        );

      if (existingModule.length === 0) {
        await db.insert(userModuleProgress).values({
          userId,
          moduleId: mod.id,
          completed: false,
        });
      }

      const lessons = await db
        .select()
        .from(lesson)
        .where(eq(lesson.moduleId, mod.id));

      for (const les of lessons) {
        const existingLesson = await db
          .select()
          .from(userLessonProgress)
          .where(
            eq(userLessonProgress.userId, userId) &&
              eq(userLessonProgress.lessonId, les.id),
          );

        if (existingLesson.length === 0) {
          await db.insert(userLessonProgress).values({
            userId,
            lessonId: les.id,
            completed: false,
          });
        }
      }

      const exams = await db
        .select()
        .from(exam)
        .where(eq(exam.moduleId, mod.id));

      for (const ex of exams) {
        const existingExam = await db
          .select()
          .from(userExamProgress)
          .where(
            eq(userExamProgress.userId, userId) &&
              eq(userExamProgress.examId, ex.id),
          );

        if (existingExam.length === 0) {
          await db.insert(userExamProgress).values({
            userId,
            examId: ex.id,
            completed: false,
          });
        }
      }
    }

    console.log("Progreso inicializado correctamente.");
  } catch (error) {
    console.error("Error al inicializar el progreso:", error);
    throw error;
  }
}

export async function checkCourseProgress(
  userId: string,
  resourceId: string,
): Promise<boolean> {
  const modules = await db
    .select({ id: resourceModule.id })
    .from(resourceModule)
    .where(eq(resourceModule.resourceId, resourceId));

  const moduleIds = modules.map((mod) => mod.id);

  const result = await db
    .select()
    .from(userModuleProgress)
    .where(
      and(
        eq(userModuleProgress.userId, userId),
        inArray(userModuleProgress.moduleId, moduleIds),
      ),
    );

  return result.length > 0;
}

export async function updateLessonProgress(userId: string, lessonId: string) {
  const existingProgress = await db
    .select()
    .from(userLessonProgress)
    .where(
      and(
        eq(userLessonProgress.userId, userId),
        eq(userLessonProgress.lessonId, lessonId),
      ),
    );

  if (existingProgress[0]?.completed) return;

  await db
    .update(userLessonProgress)
    .set({
      completed: true,
      completedAt: new Date(),
    })
    .where(
      and(
        eq(userLessonProgress.userId, userId),
        eq(userLessonProgress.lessonId, lessonId),
      ),
    );
}

export async function checkLessonCompleted(
  userId: string,
  lessonIds: string[],
) {
  const result = await db
    .select({ lessonId: userLessonProgress.lessonId })
    .from(userLessonProgress)
    .where(
      and(
        eq(userLessonProgress.userId, userId),
        eq(userLessonProgress.completed, true),
        inArray(userLessonProgress.lessonId, lessonIds),
      ),
    );

  return result.map((row) => row.lessonId);
}

export async function updateModuleProgress(userId: string, moduleId: string) {
  try {
    const lessons = await db
      .select({ id: lesson.id })
      .from(lesson)
      .where(eq(lesson.moduleId, moduleId));

    const totalCount = lessons.length;

    const completedLessons = await db
      .select({ lessonId: userLessonProgress.lessonId })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, userId),
          eq(userLessonProgress.completed, true),
          inArray(
            userLessonProgress.lessonId,
            lessons.map((l) => l.id),
          ),
        ),
      );

    const completedCount = completedLessons.length;

    const progress =
      totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0;

    const isCompleted = progress === 100;

    await db
      .update(userModuleProgress)
      .set({
        progress,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : null,
      })
      .where(
        and(
          eq(userModuleProgress.userId, userId),
          eq(userModuleProgress.moduleId, moduleId),
        ),
      );

    console.log(`Progreso actualizado: ${progress}%`);
  } catch (error) {
    console.error("Error al actualizar el progreso del módulo:", error);
    throw error;
  }
}

export async function getLastCompletedLesson(
  userId: string,
  resourceId: string,
) {
  const result = await db
    .select({
      lessonSlug: lesson.slug,
      moduleSlug: resourceModule.slug,
    })
    .from(userLessonProgress)
    .innerJoin(lesson, eq(userLessonProgress.lessonId, lesson.id))
    .innerJoin(resourceModule, eq(lesson.moduleId, resourceModule.id))
    .where(
      and(
        eq(userLessonProgress.userId, userId),
        eq(userLessonProgress.completed, true),
        eq(resourceModule.resourceId, resourceId),
      ),
    )
    .orderBy(desc(userLessonProgress.completedAt))
    .limit(1);

  return result[0] || null;
}

export async function getLessonProgress(lessonId: string) {
  try {
    const progress = await db
      .select({
        completed: userLessonProgress.completed,
      })
      .from(userLessonProgress)
      .where(eq(userLessonProgress.lessonId, lessonId))
      .limit(1);

    return progress[0] || { completed: false };
  } catch (error) {
    console.error("Error al obtener el progreso de la lección:", error);
    throw error;
  }
}

export async function getCompletedLessons(userId: string, lessonIds: string[]) {
  try {
    const result = await db
      .select({ lessonId: userLessonProgress.lessonId })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, userId),
          eq(userLessonProgress.completed, true),
          inArray(userLessonProgress.lessonId, lessonIds),
        ),
      );

    return result.map((row) => row.lessonId);
  } catch (error) {
    console.error("Error al obtener las lecciones completadas:", error);
    return [];
  }
}

export async function getModuleProgress(userId: string, moduleId: string) {
  try {
    const result = await db
      .select({
        progress: userModuleProgress.progress,
        completed: userModuleProgress.completed,
      })
      .from(userModuleProgress)
      .where(
        and(
          eq(userModuleProgress.userId, userId),
          eq(userModuleProgress.moduleId, moduleId),
        ),
      )
      .limit(1);

    return result[0];
  } catch (error) {
    console.error("Error al obtener el progreso del módulo:", error);
    throw error;
  }
}
