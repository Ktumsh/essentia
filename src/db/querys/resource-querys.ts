"use server";

import { and, asc, eq, sql } from "drizzle-orm";

import { db } from "../db";
import {
  review,
  reviewQuestion,
  type ReviewQuestion,
  lesson,
  stage,
  route,
} from "../schema";

import type { Stages } from "@/lib/types";

export async function getRouteBySlug(slug: string) {
  try {
    const result = await db.select().from(route).where(eq(route.slug, slug));
    return result[0];
  } catch (error) {
    console.error("Error al obtener la ruta:", error);
    throw error;
  }
}

export async function getStagesByRoute(routeId: string) {
  try {
    return await db.select().from(stage).where(eq(stage.routeId, routeId));
  } catch (error) {
    console.error("Error al obtener las etapas:", error);
    throw error;
  }
}

export async function getStageBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(stage)
      .leftJoin(lesson, eq(stage.id, lesson.stageId))
      .where(eq(stage.slug, slug));
    return result[0];
  } catch (error) {
    console.error("Error al obtener la etapa:", error);
    throw error;
  }
}

export async function getStages(routeId: string): Promise<Array<Stages>> {
  try {
    const result = await db
      .select({
        stage,
        lesson,
        review: {
          ...review,
          questionCount:
            sql<number>`(SELECT COUNT(*) FROM review_question WHERE review_id = ${review.id})`.as(
              "question_count",
            ),
        },
      })
      .from(stage)
      .leftJoin(lesson, eq(stage.id, lesson.stageId))
      .leftJoin(review, eq(stage.id, review.stageId))
      .where(eq(stage.routeId, routeId))
      .orderBy(asc(stage.order), asc(lesson.order))
      .execute();

    const stages: Array<Stages> = [];

    for (const row of result) {
      let existingStage = stages.find(
        (item) => item.stage.title === row.stage.title,
      );

      if (!existingStage) {
        existingStage = {
          stage: row.stage,
          lessons: [],
          review: row.review
            ? {
                ...row.review,
                questionCount: (row.review as any).questionCount ?? 0,
              }
            : null,
        };
        stages.push(existingStage);
      }

      if (row.lesson?.title) {
        existingStage.lessons.push(row.lesson);
      }
    }

    return stages;
  } catch (error) {
    console.error("Error al obtener las etapas:", error);
    throw error;
  }
}

export async function getLessonsByStage(stageId: string) {
  try {
    return await db.select().from(lesson).where(eq(lesson.stageId, stageId));
  } catch (error) {
    console.error("Error al obtener las lecciones:", error);
    throw error;
  }
}

export async function getLessonBySlug(stageId: string, lessonSlug: string) {
  const result = await db
    .select()
    .from(lesson)
    .where(and(eq(lesson.stageId, stageId), eq(lesson.slug, lessonSlug)))
    .limit(1);

  return result[0];
}

export async function getReviewByStage(stageId: string) {
  try {
    const result = await db
      .select()
      .from(review)
      .where(eq(review.stageId, stageId));

    return result[0];
  } catch (error) {
    console.error("Error al obtener la revisión:", error);
    throw error;
  }
}

export type ParsedReviewQuestion = Omit<ReviewQuestion, "options"> & {
  options: string[];
};

export async function getQuestionsByReview(
  reviewId: string,
): Promise<ParsedReviewQuestion[]> {
  try {
    const result = await db
      .select()
      .from(reviewQuestion)
      .where(eq(reviewQuestion.reviewId, reviewId));

    return result.map((question) => ({
      ...question,
      options: question.options as string[],
    }));
  } catch (error) {
    console.error("Error al obtener las preguntas de la revisión:", error);
    throw error;
  }
}
