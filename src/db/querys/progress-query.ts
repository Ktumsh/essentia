"use server";

import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  exam,
  lesson,
  resource,
  resourceModule,
  UserCourseProgress,
  userCourseProgress,
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

    const moduleIds = modules.map((mod) => mod.id);

    const existingCourseProgress = await db
      .select()
      .from(userCourseProgress)
      .where(
        and(
          eq(userCourseProgress.userId, userId),
          eq(userCourseProgress.courseId, resourceId),
        ),
      )
      .limit(1);

    if (existingCourseProgress.length === 0) {
      await db.insert(userCourseProgress).values({
        userId,
        courseId: resourceId,
        completed: false,
        progress: 0,
        startedAt: new Date(),
      });
    }

    // 3. Inserta el progreso de los módulos
    const existingModules = await db
      .select({ moduleId: userModuleProgress.moduleId })
      .from(userModuleProgress)
      .where(
        and(
          eq(userModuleProgress.userId, userId),
          inArray(userModuleProgress.moduleId, moduleIds),
        ),
      );

    const existingModuleIds = existingModules.map((m) => m.moduleId);
    const newModules = moduleIds.filter(
      (id) => !existingModuleIds.includes(id),
    );

    // Al insertar nuevos módulos, se agrega además courseId (resourceId)
    if (newModules.length > 0) {
      const insertModules = newModules.map((id) => ({
        userId,
        moduleId: id,
        courseId: resourceId,
        completed: false,
        progress: 0,
      }));
      await db.insert(userModuleProgress).values(insertModules);
    }

    const lessons = await db
      .select()
      .from(lesson)
      .where(inArray(lesson.moduleId, moduleIds));

    const lessonIds = lessons.map((les) => les.id);
    const existingLessons = await db
      .select({ lessonId: userLessonProgress.lessonId })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, userId),
          inArray(userLessonProgress.lessonId, lessonIds),
        ),
      );

    const existingLessonIds = existingLessons.map((l) => l.lessonId);
    const newLessons = lessons.filter(
      (les) => !existingLessonIds.includes(les.id),
    );

    if (newLessons.length > 0) {
      const insertLessons = newLessons.map((les) => ({
        userId,
        lessonId: les.id,
        moduleId: les.moduleId,
        completed: false,
      }));
      await db.insert(userLessonProgress).values(insertLessons);
    }

    const exams = await db
      .select()
      .from(exam)
      .where(inArray(exam.moduleId, moduleIds));

    const examIds = exams.map((ex) => ex.id);
    const existingExams = await db
      .select({ examId: userExamProgress.examId })
      .from(userExamProgress)
      .where(
        and(
          eq(userExamProgress.userId, userId),
          inArray(userExamProgress.examId, examIds),
        ),
      );

    const existingExamIds = existingExams.map((e) => e.examId);
    const newExams = exams.filter((ex) => !existingExamIds.includes(ex.id));

    if (newExams.length > 0) {
      const insertExams = newExams.map((ex) => ({
        userId,
        examId: ex.id,
        moduleId: ex.moduleId,
        completed: false,
      }));
      await db.insert(userExamProgress).values(insertExams);
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
): Promise<{ completed: boolean; progress: number }> {
  try {
    const courseProgress = await getCourseProgress(userId, resourceId);

    if (courseProgress) {
      return {
        completed: courseProgress.completed,
        progress: courseProgress.progress,
      };
    }

    return { completed: false, progress: 0 };
  } catch (error) {
    console.error("Error al verificar el progreso del curso:", error);
    throw error;
  }
}

export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  courseId: string,
) {
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

  const lessonRecord = await db
    .select()
    .from(lesson)
    .where(eq(lesson.id, lessonId))
    .limit(1);

  if (lessonRecord.length === 0) {
    throw new Error("Lección no encontrada.");
  }

  const moduleId = lessonRecord[0].moduleId;

  await updateModuleProgress(userId, moduleId, courseId);

  await updateCourseProgress(userId, courseId);
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

export async function updateModuleProgress(
  userId: string,
  moduleId: string,
  courseId: string,
) {
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

    await updateCourseProgress(userId, courseId);
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

export async function getLessonProgress(
  userId: string,
  lessonId: string,
): Promise<boolean> {
  try {
    const progress = await db
      .select()
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.lessonId, lessonId),
          eq(userLessonProgress.userId, userId),
        ),
      )
      .limit(1);

    return progress[0]?.completed || false;
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

export async function updateCourseProgress(
  userId: string,
  courseId: string,
): Promise<void> {
  try {
    const modules = await db
      .select()
      .from(resourceModule)
      .where(eq(resourceModule.resourceId, courseId));

    const moduleIds = modules.map((mod) => mod.id);
    const totalModules = moduleIds.length;

    if (totalModules === 0) {
      await db
        .update(userCourseProgress)
        .set({ progress: 0 })
        .where(
          and(
            eq(userCourseProgress.userId, userId),
            eq(userCourseProgress.courseId, courseId),
          ),
        );
      return;
    }

    const moduleProgresses = await db
      .select()
      .from(userModuleProgress)
      .where(
        and(
          eq(userModuleProgress.userId, userId),
          inArray(userModuleProgress.moduleId, moduleIds),
        ),
      );

    const totalProgress = moduleProgresses.reduce(
      (acc, mod) => acc + (mod?.progress ?? 0),
      0,
    );
    const progress = Math.floor(totalProgress / totalModules);

    await db
      .update(userCourseProgress)
      .set({ progress })
      .where(
        and(
          eq(userCourseProgress.userId, userId),
          eq(userCourseProgress.courseId, courseId),
        ),
      );

    console.log(`Progreso del curso actualizado: ${progress}%`);
  } catch (error) {
    console.error("Error al actualizar el progreso del curso:", error);
    throw error;
  }
}

export async function getCourseProgress(
  userId: string,
  courseId: string,
): Promise<UserCourseProgress | null> {
  try {
    const progress = await db
      .select()
      .from(userCourseProgress)
      .where(
        and(
          eq(userCourseProgress.userId, userId),
          eq(userCourseProgress.courseId, courseId),
        ),
      )
      .limit(1);

    return progress[0] || null;
  } catch (error) {
    console.error("Error al obtener el progreso del curso:", error);
    throw error;
  }
}

export async function getAllCoursesProgress(userId: string) {
  try {
    const progress = await db
      .select({
        courseId: userCourseProgress.courseId,
        courseName: resource.name,
        courseSlug: resource.slug,
        progress: userCourseProgress.progress,
        completed: userCourseProgress.completed,
        startedAt: userCourseProgress.startedAt,
        completedAt: userCourseProgress.completedAt,
      })
      .from(userCourseProgress)
      .innerJoin(resource, eq(userCourseProgress.courseId, resource.id))
      .where(eq(userCourseProgress.userId, userId))
      .orderBy(asc(userCourseProgress.progress));

    return progress;
  } catch (error) {
    console.error("Error al obtener el progreso de todos los cursos:", error);
    throw error;
  }
}

export async function markCourseAsCompleted(
  userId: string,
  courseId: string,
): Promise<void> {
  try {
    const existingProgress = await db
      .select()
      .from(userCourseProgress)
      .where(
        and(
          eq(userCourseProgress.userId, userId),
          eq(userCourseProgress.courseId, courseId),
        ),
      )
      .limit(1);

    if (existingProgress.length === 0) {
      await db.insert(userCourseProgress).values({
        userId,
        courseId,
        completed: true,
        progress: 100,
        completedAt: new Date(),
      });
    } else {
      if (!existingProgress[0].completed) {
        await db
          .update(userCourseProgress)
          .set({
            completed: true,
            progress: 100,
            completedAt: new Date(),
          })
          .where(
            and(
              eq(userCourseProgress.userId, userId),
              eq(userCourseProgress.courseId, courseId),
            ),
          );
      }
    }

    console.log("Curso marcado como completado.");
  } catch (error) {
    console.error("Error al marcar el curso como completado:", error);
    throw error;
  }
}

export async function completeCourse(userId: string, courseId: string) {
  try {
    const courseProgress = await getCourseProgress(userId, courseId);
    if (courseProgress?.completed) {
      console.log("El curso ya está completado.");
      return;
    }

    const modules = await db
      .select()
      .from(resourceModule)
      .where(eq(resourceModule.resourceId, courseId));

    for (const mod of modules) {
      const lessons = await db
        .select()
        .from(lesson)
        .where(eq(lesson.moduleId, mod.id));

      const lessonIds = lessons.map((les) => les.id);

      const completedLessons = await db
        .select()
        .from(userLessonProgress)
        .where(
          and(
            eq(userLessonProgress.userId, userId),
            eq(userLessonProgress.completed, true),
            inArray(userLessonProgress.lessonId, lessonIds),
          ),
        );

      if (completedLessons.length !== lessons.length) {
        throw new Error("No has completado todas las lecciones del curso.");
      }
    }

    await markCourseAsCompleted(userId, courseId);
  } catch (error) {
    console.error("Error al completar el curso:", error);
    throw error;
  }
}

export async function areAllPreviousLessonsCompleted(
  userId: string,
  courseId: string,
): Promise<boolean> {
  try {
    const modules = await db
      .select()
      .from(resourceModule)
      .where(eq(resourceModule.resourceId, courseId));

    for (const mod of modules) {
      const lessons = await db
        .select()
        .from(lesson)
        .where(eq(lesson.moduleId, mod.id));

      const lessonIds = lessons.map((les) => les.id);

      const completedLessons = await db
        .select()
        .from(userLessonProgress)
        .where(
          and(
            eq(userLessonProgress.userId, userId),
            eq(userLessonProgress.completed, true),
            inArray(userLessonProgress.lessonId, lessonIds),
          ),
        );

      if (completedLessons.length !== lessons.length) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error al verificar lecciones completadas:", error);
    throw error;
  }
}
