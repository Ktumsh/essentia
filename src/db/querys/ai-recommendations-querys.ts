"use server";

import { and, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  aiMedicalRecommendation,
  aiRecommendationDocument,
  aiRecommendationTag,
  medicalTag,
} from "../schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

type SaveAiMedicalRecommendationResult = {
  recommendation: typeof aiMedicalRecommendation.$inferSelect;
  isNew: boolean;
};

// Crear una nueva recomendación de IA
export async function saveAiMedicalRecommendation({
  userId,
  type,
  title,
  description,
  priority,
  relatedDocuments,
  relatedTags,
}: {
  userId: string;
  type: "general" | "preventive" | "lifestyle" | "followUp" | "medication";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  relatedDocuments: string[];
  relatedTags: string[];
}): Promise<SaveAiMedicalRecommendationResult> {
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

  return {
    recommendation: rec,
    isNew: true,
  };
}

export async function getSavedAiRecommendations(userId: string) {
  const recommendations = await db
    .select()
    .from(aiMedicalRecommendation)
    .where(
      and(
        eq(aiMedicalRecommendation.userId, userId),
        eq(aiMedicalRecommendation.isDeleted, false),
      ),
    );

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
}

export type SavedAIRecommendation = Awaited<
  ReturnType<typeof getSavedAiRecommendations>
>[number];

export async function deleteAiRecommendation({
  userId,
  recommendationId,
}: {
  userId: string;
  recommendationId: string;
}) {
  const [rec] = await db
    .select()
    .from(aiMedicalRecommendation)
    .where(eq(aiMedicalRecommendation.id, recommendationId));

  if (!rec) throw new Error("Recomendación no encontrada");
  if (rec.userId !== userId) throw new Error("Acceso denegado");

  await db
    .update(aiMedicalRecommendation)
    .set({ isDeleted: true })
    .where(eq(aiMedicalRecommendation.id, recommendationId));

  return { success: true };
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
}
