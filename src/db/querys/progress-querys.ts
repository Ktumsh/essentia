"use server";

import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  review,
  lesson,
  route,
  stage,
  UserRouteProgress,
  userRouteProgress,
  userReviewProgress,
  userLessonProgress,
  userStageProgress,
} from "../schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function initializeRouteProgress(userId: string, routeId: string) {
  try {
    const stages = await db
      .select()
      .from(stage)
      .where(eq(stage.routeId, routeId));

    const stageIds = stages.map((s) => s.id);

    const existingRouteProgress = await db
      .select()
      .from(userRouteProgress)
      .where(
        and(
          eq(userRouteProgress.userId, userId),
          eq(userRouteProgress.routeId, routeId),
        ),
      )
      .limit(1);

    if (existingRouteProgress.length === 0) {
      await db.insert(userRouteProgress).values({
        userId,
        routeId,
        completed: false,
        progress: 0,
        startedAt: new Date(),
      });
    }

    const existingStages = await db
      .select({ stageId: userStageProgress.stageId })
      .from(userStageProgress)
      .where(
        and(
          eq(userStageProgress.userId, userId),
          inArray(userStageProgress.stageId, stageIds),
        ),
      );

    const existingStageIds = existingStages.map((s) => s.stageId);
    const newStages = stageIds.filter((id) => !existingStageIds.includes(id));

    if (newStages.length > 0) {
      const insertStages = newStages.map((id) => ({
        userId,
        stageId: id,
        routeId,
        completed: false,
        progress: 0,
      }));
      await db.insert(userStageProgress).values(insertStages);
    }

    const lessons = await db
      .select()
      .from(lesson)
      .where(inArray(lesson.stageId, stageIds));

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
        stageId: les.stageId,
        completed: false,
      }));
      await db.insert(userLessonProgress).values(insertLessons);
    }

    const reviews = await db
      .select()
      .from(review)
      .where(inArray(review.stageId, stageIds));

    const reviewIds = reviews.map((r) => r.id);
    const existingReviews = await db
      .select({ reviewId: userReviewProgress.reviewId })
      .from(userReviewProgress)
      .where(
        and(
          eq(userReviewProgress.userId, userId),
          inArray(userReviewProgress.reviewId, reviewIds),
        ),
      );

    const existingReviewIds = existingReviews.map((r) => r.reviewId);
    const newReviews = reviews.filter((r) => !existingReviewIds.includes(r.id));

    if (newReviews.length > 0) {
      const insertReviews = newReviews.map((r) => ({
        userId,
        reviewId: r.id,
        stageId: r.stageId,
        completed: false,
      }));
      await db.insert(userReviewProgress).values(insertReviews);
    }

    console.log("Progreso de ruta inicializado correctamente.");
  } catch (error) {
    console.error("Error al inicializar el progreso de la ruta:", error);
    throw error;
  }
}

export async function checkRouteProgress(
  userId: string,
  routeId: string,
): Promise<{ completed: boolean; progress: number }> {
  try {
    const progress = await getRouteProgress(userId, routeId);

    if (progress) {
      return {
        completed: progress.completed,
        progress: progress.progress,
      };
    }

    return { completed: false, progress: 0 };
  } catch (error) {
    console.error("Error al verificar el progreso de la ruta:", error);
    throw error;
  }
}

export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  routeId: string,
) {
  const existing = await db
    .select()
    .from(userLessonProgress)
    .where(
      and(
        eq(userLessonProgress.userId, userId),
        eq(userLessonProgress.lessonId, lessonId),
      ),
    );

  if (existing[0]?.completed) return;

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

  const stageId = lessonRecord[0].stageId;

  await updateStageProgress(userId, stageId, routeId);
  await updateRouteProgress(userId, routeId);
}

export async function updateStageProgress(
  userId: string,
  stageId: string,
  routeId: string,
) {
  try {
    const lessons = await db
      .select({ id: lesson.id })
      .from(lesson)
      .where(eq(lesson.stageId, stageId));

    const total = lessons.length;

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

    const done = completedLessons.length;
    const progress = total > 0 ? Math.floor((done / total) * 100) : 0;
    const completed = progress === 100;

    await db
      .update(userStageProgress)
      .set({
        progress,
        completed,
        completedAt: completed ? new Date() : null,
      })
      .where(
        and(
          eq(userStageProgress.userId, userId),
          eq(userStageProgress.stageId, stageId),
        ),
      );

    console.log(`Progreso de etapa actualizado: ${progress}%`);

    await updateRouteProgress(userId, routeId);
  } catch (error) {
    console.error("Error al actualizar etapa:", error);
    throw error;
  }
}

export async function getLastCompletedLesson(userId: string, routeId: string) {
  const result = await db
    .select({
      lessonSlug: lesson.slug,
      stageSlug: stage.slug,
    })
    .from(userLessonProgress)
    .innerJoin(lesson, eq(userLessonProgress.lessonId, lesson.id))
    .innerJoin(stage, eq(lesson.stageId, stage.id))
    .where(
      and(
        eq(userLessonProgress.userId, userId),
        eq(userLessonProgress.completed, true),
        eq(stage.routeId, routeId),
      ),
    )
    .orderBy(desc(userLessonProgress.completedAt))
    .limit(1);

  return result[0] || null;
}

export async function getRouteProgress(
  userId: string,
  routeId: string,
): Promise<UserRouteProgress | null> {
  try {
    const result = await db
      .select()
      .from(userRouteProgress)
      .where(
        and(
          eq(userRouteProgress.userId, userId),
          eq(userRouteProgress.routeId, routeId),
        ),
      )
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Error al obtener progreso de la ruta:", error);
    throw error;
  }
}

export async function updateRouteProgress(
  userId: string,
  routeId: string,
): Promise<void> {
  try {
    const stages = await db
      .select()
      .from(stage)
      .where(eq(stage.routeId, routeId));

    const stageIds = stages.map((s) => s.id);
    const totalStages = stageIds.length;

    if (totalStages === 0) {
      await db
        .update(userRouteProgress)
        .set({ progress: 0 })
        .where(
          and(
            eq(userRouteProgress.userId, userId),
            eq(userRouteProgress.routeId, routeId),
          ),
        );
      return;
    }

    const stageProgresses = await db
      .select()
      .from(userStageProgress)
      .where(
        and(
          eq(userStageProgress.userId, userId),
          inArray(userStageProgress.stageId, stageIds),
        ),
      );

    const totalProgress = stageProgresses.reduce(
      (acc, item) => acc + (item?.progress ?? 0),
      0,
    );

    const progress = Math.floor(totalProgress / totalStages);

    await db
      .update(userRouteProgress)
      .set({ progress })
      .where(
        and(
          eq(userRouteProgress.userId, userId),
          eq(userRouteProgress.routeId, routeId),
        ),
      );

    console.log(`Progreso de ruta actualizado: ${progress}%`);
  } catch (error) {
    console.error("Error al actualizar progreso de ruta:", error);
    throw error;
  }
}

export async function getAllRoutesProgress(userId: string) {
  try {
    const progress = await db
      .select({
        routeId: userRouteProgress.routeId,
        routeName: route.name,
        routeSlug: route.slug,
        progress: userRouteProgress.progress,
        completed: userRouteProgress.completed,
        startedAt: userRouteProgress.startedAt,
        completedAt: userRouteProgress.completedAt,
      })
      .from(userRouteProgress)
      .innerJoin(route, eq(userRouteProgress.routeId, route.id))
      .where(eq(userRouteProgress.userId, userId))
      .orderBy(asc(userRouteProgress.progress));

    return progress;
  } catch (error) {
    console.error("Error al obtener el progreso de todas las rutas:", error);
    throw error;
  }
}

export async function markRouteAsCompleted(
  userId: string,
  routeId: string,
): Promise<void> {
  try {
    const existingProgress = await db
      .select()
      .from(userRouteProgress)
      .where(
        and(
          eq(userRouteProgress.userId, userId),
          eq(userRouteProgress.routeId, routeId),
        ),
      )
      .limit(1);

    if (existingProgress.length === 0) {
      await db.insert(userRouteProgress).values({
        userId,
        routeId,
        completed: true,
        progress: 100,
        completedAt: new Date(),
      });
    } else {
      if (!existingProgress[0].completed) {
        await db
          .update(userRouteProgress)
          .set({
            completed: true,
            progress: 100,
            completedAt: new Date(),
          })
          .where(
            and(
              eq(userRouteProgress.userId, userId),
              eq(userRouteProgress.routeId, routeId),
            ),
          );
      }
    }

    console.log("Ruta marcada como completada.");
  } catch (error) {
    console.error("Error al marcar la ruta como completada:", error);
    throw error;
  }
}

export async function completeRoute(userId: string, routeId: string) {
  try {
    const routeProgress = await getRouteProgress(userId, routeId);
    if (routeProgress?.completed) {
      console.log("La ruta ya está completada.");
      return;
    }

    const stages = await db
      .select()
      .from(stage)
      .where(eq(stage.routeId, routeId));

    for (const s of stages) {
      const lessons = await db
        .select()
        .from(lesson)
        .where(eq(lesson.stageId, s.id));

      const lessonIds = lessons.map((l) => l.id);

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
        throw new Error("No has completado todas las lecciones de la ruta.");
      }
    }

    await markRouteAsCompleted(userId, routeId);
  } catch (error) {
    console.error("Error al completar la ruta:", error);
    throw error;
  }
}

export async function areAllPreviousLessonsCompleted(
  userId: string,
  routeId: string,
): Promise<boolean> {
  try {
    const stages = await db
      .select()
      .from(stage)
      .where(eq(stage.routeId, routeId));

    for (const s of stages) {
      const lessons = await db
        .select()
        .from(lesson)
        .where(eq(lesson.stageId, s.id));

      const lessonIds = lessons.map((l) => l.id);

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

export async function getStageProgress(userId: string, stageId: string) {
  try {
    const result = await db
      .select({
        progress: userStageProgress.progress,
        completed: userStageProgress.completed,
      })
      .from(userStageProgress)
      .where(
        and(
          eq(userStageProgress.userId, userId),
          eq(userStageProgress.stageId, stageId),
        ),
      )
      .limit(1);

    return result[0];
  } catch (error) {
    console.error("Error al obtener el progreso de la etapa:", error);
    throw error;
  }
}
