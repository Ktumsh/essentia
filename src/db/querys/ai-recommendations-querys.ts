"use server";

import { and, desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  aiMedicalRecommendation,
  aiRecommendationDocument,
  aiRecommendationTag,
  medicalTag,
  plan,
  subscription,
  userAiRecommendationUsage,
  userTrial,
} from "../schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

// UTILITY
export async function getUserRecommendationLimit(
  userId: string,
): Promise<number> {
  try {
    const [trial] = await db
      .select()
      .from(userTrial)
      .where(eq(userTrial.userId, userId));

    const now = new Date();

    const isTrialActive =
      trial && trial.isActive && trial.expiresAt && trial.expiresAt > now;

    if (isTrialActive) return 15;

    const [sub] = await db
      .select({
        planId: subscription.type,
        max: plan.maxAiRecommendations,
        isUnlimited: plan.isUnlimited,
      })
      .from(subscription)
      .innerJoin(plan, eq(subscription.type, plan.id))
      .where(eq(subscription.userId, userId));

    if (!sub) return 0;

    if (sub.isUnlimited) return Infinity;

    return sub.max ?? 0;
  } catch (error) {
    console.error("Error al obtener el límite de recomendaciones:", error);
    throw error;
  }
}

export async function getUserAiRecommendationUsage(
  userId: string,
): Promise<number> {
  try {
    const [usage] = await db
      .select({ activeCount: userAiRecommendationUsage.activeCount })
      .from(userAiRecommendationUsage)
      .where(eq(userAiRecommendationUsage.userId, userId));

    return usage?.activeCount ?? 0;
  } catch (error) {
    console.error("Error al obtener el uso de recomendaciones AI:", error);
    throw error;
  }
}

type SaveAiMedicalRecommendationResult = {
  recommendation: typeof aiMedicalRecommendation.$inferSelect;
  isNew: boolean;
};

export async function saveAiMedicalRecommendation({
  userId,
  id,
  type,
  title,
  description,
  priority,
  relatedDocuments,
  relatedTags,
}: {
  userId: string;
  id: string;
  type: "general" | "preventive" | "lifestyle" | "followUp" | "medication";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  relatedDocuments: string[];
  relatedTags: string[];
}): Promise<SaveAiMedicalRecommendationResult> {
  try {
    const limit = await getUserRecommendationLimit(userId);

    const [usage] = await db
      .select()
      .from(userAiRecommendationUsage)
      .where(eq(userAiRecommendationUsage.userId, userId));

    const currentCount = usage?.activeCount ?? 0;

    if (limit !== null && currentCount >= limit) {
      throw new Error("Has alcanzado el límite de recomendaciones de tu plan.");
    }

    const existing = await db
      .select()
      .from(aiMedicalRecommendation)
      .where(
        and(
          eq(aiMedicalRecommendation.userId, userId),
          eq(aiMedicalRecommendation.title, title),
          eq(aiMedicalRecommendation.description, description),
          eq(aiMedicalRecommendation.type, type),
          eq(aiMedicalRecommendation.priority, priority),
          eq(aiMedicalRecommendation.isDeleted, false),
        ),
      );

    if (existing.length > 0) {
      return {
        recommendation: existing[0],
        isNew: false,
      };
    }

    const [rec] = await db
      .insert(aiMedicalRecommendation)
      .values({
        userId,
        id,
        type,
        title,
        description,
        priority,
      })
      .returning();

    if (relatedDocuments.length > 0) {
      await db.insert(aiRecommendationDocument).values(
        relatedDocuments.map((docId) => ({
          recommendationId: rec.id,
          documentId: docId,
        })),
      );
    }

    if (relatedTags.length > 0) {
      const tagRecords = await db
        .select()
        .from(medicalTag)
        .where(inArray(medicalTag.name, relatedTags));

      if (tagRecords.length > 0) {
        await db.insert(aiRecommendationTag).values(
          tagRecords.map((tag) => ({
            recommendationId: rec.id,
            tagId: tag.id,
          })),
        );
      }
    }

    await db
      .insert(userAiRecommendationUsage)
      .values({
        userId,
        activeCount: currentCount + 1,
      })
      .onConflictDoUpdate({
        target: userAiRecommendationUsage.userId,
        set: {
          activeCount: currentCount + 1,
          updatedAt: new Date(),
        },
      });

    return {
      recommendation: rec,
      isNew: true,
    };
  } catch (error) {
    console.error("Error al guardar la recomendación:", error);
    throw error;
  }
}

export async function getSavedAiRecommendations(userId: string) {
  try {
    const recommendations = await db
      .select()
      .from(aiMedicalRecommendation)
      .where(
        and(
          eq(aiMedicalRecommendation.userId, userId),
          eq(aiMedicalRecommendation.isDeleted, false),
        ),
      )
      .orderBy(desc(aiMedicalRecommendation.createdAt));

    const recIds = recommendations.map((r) => r.id);

    const docs = await db
      .select()
      .from(aiRecommendationDocument)
      .where(inArray(aiRecommendationDocument.recommendationId, recIds));

    const tags = await db
      .select({
        recommendationId: aiRecommendationTag.recommendationId,
        name: medicalTag.name,
      })
      .from(aiRecommendationTag)
      .innerJoin(medicalTag, eq(aiRecommendationTag.tagId, medicalTag.id))
      .where(inArray(aiRecommendationTag.recommendationId, recIds));

    return recommendations.map((rec) => ({
      ...rec,
      relatedDocuments: docs
        .filter((d) => d.recommendationId === rec.id)
        .map((d) => d.documentId),
      relatedTags: tags
        .filter((t) => t.recommendationId === rec.id)
        .map((t) => t.name),
    }));
  } catch (error) {
    console.error("Error al obtener recomendaciones guardadas:", error);
    throw error;
  }
}

export type SavedAIRecommendation = Awaited<
  ReturnType<typeof getSavedAiRecommendations>
>[number];

export async function deleteAiRecommendation({
  userId,
  recommendationId,
  skipUsageUpdate = false,
}: {
  userId: string;
  recommendationId: string;
  skipUsageUpdate?: boolean;
}) {
  try {
    const [rec] = await db
      .select()
      .from(aiMedicalRecommendation)
      .where(eq(aiMedicalRecommendation.id, recommendationId));

    if (!rec) throw new Error("Recomendación no encontrada");
    if (rec.userId !== userId) throw new Error("Acceso denegado");

    await db
      .delete(aiMedicalRecommendation)
      .where(eq(aiMedicalRecommendation.id, recommendationId));

    if (!skipUsageUpdate) {
      const [usage] = await db
        .select()
        .from(userAiRecommendationUsage)
        .where(eq(userAiRecommendationUsage.userId, userId));

      if (usage && usage.activeCount > 0) {
        await db
          .update(userAiRecommendationUsage)
          .set({
            activeCount: usage.activeCount - 1,
            updatedAt: new Date(),
          })
          .where(eq(userAiRecommendationUsage.userId, userId));
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar la recomendación:", error);
    throw error;
  }
}

export async function updateAiRecommendationNotes({
  userId,
  recommendationId,
  notes,
}: {
  userId: string;
  recommendationId: string;
  notes: string;
}) {
  try {
    const [rec] = await db
      .select()
      .from(aiMedicalRecommendation)
      .where(eq(aiMedicalRecommendation.id, recommendationId));

    if (!rec) throw new Error("Recomendación no encontrada");
    if (rec.userId !== userId) throw new Error("Acceso denegado");

    await db
      .update(aiMedicalRecommendation)
      .set({ notes })
      .where(eq(aiMedicalRecommendation.id, recommendationId));

    return { success: true };
  } catch (error) {
    console.error("Error al actualizar las notas de la recomendación:", error);
    throw error;
  }
}

export async function deleteManyAiRecommendations({
  userId,
  ids,
}: {
  userId: string;
  ids: string[];
}) {
  try {
    const results = await Promise.allSettled(
      ids.map((id) =>
        deleteAiRecommendation({
          userId,
          recommendationId: id,
          skipUsageUpdate: true,
        }),
      ),
    );

    const deleted = results
      .map((res, index) => (res.status === "fulfilled" ? ids[index] : null))
      .filter(Boolean) as string[];

    const failed = results
      .map((res, index) =>
        res.status === "rejected"
          ? {
              id: ids[index],
              error: res.reason?.message || "Error desconocido",
            }
          : null,
      )
      .filter(Boolean);

    if (deleted.length > 0) {
      const [usage] = await db
        .select()
        .from(userAiRecommendationUsage)
        .where(eq(userAiRecommendationUsage.userId, userId));

      if (usage && usage.activeCount > 0) {
        await db
          .update(userAiRecommendationUsage)
          .set({
            activeCount: Math.max(0, usage.activeCount - deleted.length),
            updatedAt: new Date(),
          })
          .where(eq(userAiRecommendationUsage.userId, userId));
      }
    }

    return {
      success: failed.length === 0,
      deleted,
      failed,
    };
  } catch (error) {
    console.error("Error al eliminar múltiples recomendaciones AI:", error);
    throw error;
  }
}
