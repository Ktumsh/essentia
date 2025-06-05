"use server";

import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "../db";
import {
  review,
  lesson,
  route,
  stage,
  userRouteProgress,
  type UserRouteProgress,
  userReviewProgress,
  userLessonProgress,
  userStageProgress,
  userReviewAnswer,
} from "../schema";

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
        startedAt: null,
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
        startedAt: null,
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

export async function getOrderedLessonsByRoute(routeId: string) {
  const results = await db
    .select({
      lessonId: lesson.id,
      lessonSlug: lesson.slug,
      stageSlug: stage.slug,
    })
    .from(lesson)
    .innerJoin(stage, eq(lesson.stageId, stage.id))
    .where(eq(stage.routeId, routeId))
    .orderBy(stage.order, lesson.order);

  return results;
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

export async function areAllLessonsInStageCompleted(
  userId: string,
  stageId: string,
): Promise<boolean> {
  const lessons = await db
    .select()
    .from(lesson)
    .where(eq(lesson.stageId, stageId));

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

  return completedLessons.length === lessons.length;
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

// /db/querys/progress-querys.ts
export async function getStageProgress(userId: string, stageId: string) {
  const [stageData] = await db
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

  const [reviewData] = await db
    .select({
      completed: userReviewProgress.completed,
      score: userReviewProgress.score,
    })
    .from(userReviewProgress)
    .where(
      and(
        eq(userReviewProgress.userId, userId),
        eq(userReviewProgress.stageId, stageId),
      ),
    )
    .limit(1);

  return {
    stageId,
    progress: stageData?.progress || 0,
    completed: stageData?.completed || false,
    reviewCompleted: reviewData?.completed || false,
    reviewScore: reviewData?.score ?? null,
  };
}

export type StageProgressType = Awaited<ReturnType<typeof getStageProgress>>;

export async function startReview({
  userId,
  reviewId,
}: {
  userId: string;
  reviewId: string;
}) {
  const startedAt = new Date();

  await db
    .update(userReviewProgress)
    .set({ startedAt })
    .where(
      and(
        eq(userReviewProgress.userId, userId),
        eq(userReviewProgress.reviewId, reviewId),
      ),
    );

  return startedAt;
}

export async function cancelReview({
  userId,
  reviewId,
}: {
  userId: string;
  reviewId: string;
}) {
  await db
    .update(userReviewProgress)
    .set({
      startedAt: null,
    })
    .where(
      and(
        eq(userReviewProgress.userId, userId),
        eq(userReviewProgress.reviewId, reviewId),
      ),
    );
}

export async function saveReviewProgress({
  userId,
  reviewId,
  score,
  answers,
}: {
  userId: string;
  reviewId: string;
  score: number;
  answers: Record<string, number>;
}) {
  if (!userId) throw new Error("No autorizado");

  await db
    .update(userReviewProgress)
    .set({
      completed: true,
      score,
      completedAt: new Date(),
    })
    .where(
      and(
        eq(userReviewProgress.userId, userId),
        eq(userReviewProgress.reviewId, reviewId),
      ),
    );

  const answerEntries = Object.entries(answers);
  if (answerEntries.length > 0) {
    await Promise.all(
      answerEntries.map(([questionId, selected]) =>
        db
          .insert(userReviewAnswer)
          .values({
            userId,
            reviewId,
            questionId,
            selected,
          })
          .onConflictDoUpdate({
            target: [userReviewAnswer.userId, userReviewAnswer.questionId],
            set: { selected },
          }),
      ),
    );
  }
}

export async function resetReviewProgress({
  userId,
  reviewId,
  routeSlug,
  stageSlug,
}: {
  userId: string;
  reviewId: string;
  routeSlug: string;
  stageSlug: string;
}) {
  if (!userId) throw new Error("No autorizado");

  await db
    .update(userReviewProgress)
    .set({
      completed: false,
      score: 0,
      completedAt: null,
    })
    .where(
      eq(userReviewProgress.userId, userId) &&
        eq(userReviewProgress.reviewId, reviewId),
    );

  revalidatePath(`/${routeSlug}/${stageSlug}/review`);
}

export async function checkReviewCompletion({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string;
}) {
  const result = await db
    .select()
    .from(userReviewProgress)
    .where(
      and(
        eq(userReviewProgress.reviewId, reviewId),
        eq(userReviewProgress.userId, userId),
      ),
    )
    .limit(1);

  return result[0] ?? null;
}

export async function getUserReviewAnswers({
  userId,
  reviewId,
}: {
  userId: string;
  reviewId: string;
}) {
  return await db
    .select({
      questionId: userReviewAnswer.questionId,
      selected: userReviewAnswer.selected,
    })
    .from(userReviewAnswer)
    .where(
      and(
        eq(userReviewAnswer.userId, userId),
        eq(userReviewAnswer.reviewId, reviewId),
      ),
    );
}
