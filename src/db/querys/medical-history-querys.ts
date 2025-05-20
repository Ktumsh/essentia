"use server";

import { del } from "@vercel/blob";
import { and, asc, eq, inArray, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  medicalTag,
  userMedicalFile,
  userMedicalHistory,
  userMedicalHistoryActivity,
  userMedicalHistoryTag,
} from "../schema";
import { getUserSubscriptionInfo } from "./user-querys";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export type MedicalFileType =
  | "Examen"
  | "Receta"
  | "Informe"
  | "Diagnóstico"
  | "Imagenología"
  | "Certificado"
  | "Epicrisis"
  | "Consentimiento"
  | "Otro";

export type MedicalFile = {
  url: string;
  name: string;
  size: number;
  contentType: string;
  uploadedAt: Date;
};

//////////////////////////////
// Helpers
//////////////////////////////

export async function deleteMedicalFile(fileUrl: string) {
  try {
    await del(fileUrl);
  } catch (error) {
    console.error("Error al eliminar archivo del blob:", error);
    throw new Error("No se pudo eliminar el archivo.");
  }
}

export async function logMedicalHistoryActivity(
  userId: string,
  medicalHistoryId: string,
  action: "created" | "updated" | "deleted" | "restored",
) {
  try {
    await db
      .insert(userMedicalHistoryActivity)
      .values({
        userId,
        medicalHistoryId,
        action,
      })
      .execute();
  } catch (error) {
    console.error("Error registrando actividad:", error);
    throw error;
  }
}

export async function canUploadMedicalFile(userId: string) {
  try {
    const { subscription, trial } = await getUserSubscriptionInfo(userId);

    const [{ total }] = await db
      .select({ total: sql<number>`COUNT(*)` })
      .from(userMedicalHistory)
      .where(
        and(
          eq(userMedicalHistory.userId, userId),
          eq(userMedicalHistory.isDeleted, false),
        ),
      );

    let maxDocuments = 12;
    let isPremium = false;
    let isUnlimited = false;

    if (subscription?.plan) {
      maxDocuments = subscription.plan.maxDocuments ?? Infinity;
      isPremium = subscription.subscription.isPremium;
      isUnlimited = subscription.plan.isUnlimited ?? false;
    } else if (trial?.isActive) {
      maxDocuments = 12;
    }

    const allowed = isUnlimited || total < maxDocuments;

    return {
      allowed,
      current: total,
      max: isUnlimited ? null : maxDocuments,
      isPremium,
      isUnlimited,
    };
  } catch (error) {
    console.error("Error verificando límite de documentos:", error);
    throw error;
  }
}

export type CanUploadMedicalFile = Awaited<
  ReturnType<typeof canUploadMedicalFile>
>;

//////////////////////////////
// CRUD Historial Médico
//////////////////////////////

type MedicalHistoryData = Partial<{
  condition?: string;
  description?: string | null;
  type?: MedicalFileType;
  tags?: string[];
  notes?: string | null;
  issuer?: string | null;
  documentDate?: Date | null;
  visibility?: "private" | "shared" | null;
  folderId?: string | null;
  orderIndex?: number;
}>;

export async function addMedicalHistoryWithTags({
  userId,
  data,
  file,
}: {
  userId: string;
  data: MedicalHistoryData;
  file?: MedicalFile;
}) {
  try {
    const [history] = await db
      .insert(userMedicalHistory)
      .values({
        userId,
        condition: data.condition!,
        description: data.description || null,
        type: data.type!,
        notes: data.notes || null,
        issuer: data.issuer || null,
        documentDate: data.documentDate || null,
        visibility: data.visibility || "private",
        folderId: data.folderId || null,
        orderIndex: data.orderIndex ?? 0,
      })
      .returning();

    if (file) {
      await db.insert(userMedicalFile).values({
        userId,
        medicalHistoryId: history.id,
        url: file.url,
        name: file.name,
        size: file.size,
        contentType: file.contentType,
        uploadedAt: file.uploadedAt,
      });
    }

    if (data.tags?.length) {
      await db.insert(userMedicalHistoryTag).values(
        data.tags.map((tagId) => ({
          userId,
          medicalHistoryId: history.id,
          tagId,
        })),
      );
    }

    await logMedicalHistoryActivity(userId, history.id, "created");

    return history;
  } catch (error) {
    console.error("Error al crear el historial médico:", error);
    throw error;
  }
}

export async function updateMedicalHistory({
  userId,
  id,
  data,
  file,
}: {
  userId: string;
  id: string;
  data: MedicalHistoryData;
  file?: MedicalFile;
}) {
  try {
    const [record] = await db
      .select()
      .from(userMedicalHistory)
      .where(eq(userMedicalHistory.id, id))
      .limit(1);

    if (!record) throw new Error("Registro no encontrado");
    if (record.userId !== userId) throw new Error("Acceso denegado");

    await db
      .update(userMedicalHistory)
      .set({
        ...(data.condition && { condition: data.condition }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.type && { type: data.type }),
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.issuer !== undefined && { issuer: data.issuer }),
        ...(data.documentDate !== undefined && {
          documentDate: data.documentDate,
        }),
        ...(data.visibility && { visibility: data.visibility }),
        ...(data.folderId !== undefined && { folderId: data.folderId ?? null }),
        ...(data.orderIndex !== undefined && { orderIndex: data.orderIndex }),
        updatedAt: new Date(),
      })
      .where(eq(userMedicalHistory.id, id));

    if (data.tags?.length) {
      await db
        .delete(userMedicalHistoryTag)
        .where(eq(userMedicalHistoryTag.medicalHistoryId, id));

      await db.insert(userMedicalHistoryTag).values(
        data.tags.map((tagId) => ({
          userId,
          medicalHistoryId: id,
          tagId,
        })),
      );
    }

    if (file) {
      await db
        .delete(userMedicalFile)
        .where(eq(userMedicalFile.medicalHistoryId, id));

      await db.insert(userMedicalFile).values({
        userId,
        medicalHistoryId: id,
        url: file.url,
        name: file.name,
        size: file.size,
        contentType: file.contentType,
        uploadedAt: file.uploadedAt,
      });
    }

    await logMedicalHistoryActivity(userId, id, "updated");

    return { success: true };
  } catch (error) {
    console.error("Error al actualizar el historial médico:", error);
    throw error;
  }
}

export async function deleteMedicalHistory({
  userId,
  id,
}: {
  userId: string;
  id: string;
}) {
  try {
    const [record] = await db
      .select()
      .from(userMedicalHistory)
      .where(eq(userMedicalHistory.id, id))
      .limit(1);

    if (!record) throw new Error("Registro no encontrado");
    if (record.userId !== userId) throw new Error("Acceso denegado");

    const [file] = await db
      .select()
      .from(userMedicalFile)
      .where(eq(userMedicalFile.medicalHistoryId, id));

    if (file) {
      await deleteMedicalFile(file.url);
      await db
        .delete(userMedicalFile)
        .where(eq(userMedicalFile.medicalHistoryId, id));
    }

    await db
      .update(userMedicalHistory)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(eq(userMedicalHistory.id, id));

    await logMedicalHistoryActivity(userId, id, "deleted");

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el historial médico:", error);
    throw error;
  }
}

export async function restoreMedicalHistory({
  userId,
  id,
}: {
  userId: string;
  id: string;
}) {
  try {
    const [record] = await db
      .select()
      .from(userMedicalHistory)
      .where(eq(userMedicalHistory.id, id))
      .limit(1);

    if (!record) throw new Error("Registro no encontrado");
    if (record.userId !== userId) throw new Error("Acceso denegado");
    if (!record.isDeleted) throw new Error("El registro no está eliminado");

    await db
      .update(userMedicalHistory)
      .set({ isDeleted: false, updatedAt: new Date() })
      .where(eq(userMedicalHistory.id, id));

    await logMedicalHistoryActivity(userId, id, "restored");

    return { success: true };
  } catch (error) {
    console.error("Error al restaurar el historial médico:", error);
    throw error;
  }
}

//////////////////////////////
// Consultas
//////////////////////////////
export async function getMedicalHistoryWithTags({
  userId,
}: {
  userId: string;
}) {
  try {
    const records = await db
      .select()
      .from(userMedicalHistory)
      .where(
        and(
          eq(userMedicalHistory.userId, userId),
          eq(userMedicalHistory.isDeleted, false),
        ),
      );

    const historyIds = records.map((r) => r.id);

    const tags = await db
      .select({
        medicalHistoryId: userMedicalHistoryTag.medicalHistoryId,
        tagName: medicalTag.name,
      })
      .from(userMedicalHistoryTag)
      .innerJoin(medicalTag, eq(userMedicalHistoryTag.tagId, medicalTag.id))
      .where(eq(userMedicalHistoryTag.userId, userId));

    const files = historyIds.length
      ? await db
          .select()
          .from(userMedicalFile)
          .where(inArray(userMedicalFile.medicalHistoryId, historyIds))
      : [];

    return records.map((record) => ({
      ...record,
      tags: tags
        .filter((tag) => tag.medicalHistoryId === record.id)
        .map((t) => t.tagName),
      file: files.find((f) => f.medicalHistoryId === record.id) || null,
    }));
  } catch (error) {
    console.error("Error al obtener el historial médico:", error);
    throw error;
  }
}

export type MedicalHistoryWithTags = Awaited<
  ReturnType<typeof getMedicalHistoryWithTags>
>[number];

export async function getMedicalHistoryActivityWithDetails({
  userId,
}: {
  userId: string;
}) {
  try {
    const result = await db
      .select({
        id: userMedicalHistoryActivity.id,
        userId: userMedicalHistoryActivity.userId,
        medicalHistoryId: userMedicalHistoryActivity.medicalHistoryId,
        action: userMedicalHistoryActivity.action,
        createdAt: userMedicalHistoryActivity.createdAt,
        medicalHistory: {
          condition: userMedicalHistory.condition,
          type: userMedicalHistory.type,
          isDeleted: userMedicalHistory.isDeleted,
        },
        file: {
          url: userMedicalFile.url,
        },
      })
      .from(userMedicalHistoryActivity)
      .innerJoin(
        userMedicalHistory,
        eq(userMedicalHistoryActivity.medicalHistoryId, userMedicalHistory.id),
      )
      .leftJoin(
        userMedicalFile,
        eq(userMedicalFile.medicalHistoryId, userMedicalHistory.id),
      )
      .where(eq(userMedicalHistoryActivity.userId, userId));

    return result;
  } catch (error) {
    console.error("Error obteniendo actividad:", error);
    throw error;
  }
}

export type MedicalHistoryActivityWithDetails = Awaited<
  ReturnType<typeof getMedicalHistoryActivityWithDetails>
>[number];

export async function getMedicalTags() {
  try {
    const tags = await db
      .select()
      .from(medicalTag)
      .orderBy(asc(medicalTag.name));

    return tags;
  } catch (error) {
    console.error("Error al obtener los tags médicos:", error);
    throw new Error("No se pudieron obtener los tags.");
  }
}

export async function deleteManyMedicalHistory({
  userId,
  ids,
}: {
  userId: string;
  ids: string[];
}) {
  try {
    const results = await Promise.allSettled(
      ids.map((id) => deleteMedicalHistory({ userId, id })),
    );

    const successes = results
      .map((res, index) => (res.status === "fulfilled" ? ids[index] : null))
      .filter(Boolean) as string[];

    const failures = results
      .map((res, index) =>
        res.status === "rejected"
          ? {
              id: ids[index],
              error: res.reason?.message || "Error desconocido",
            }
          : null,
      )
      .filter(Boolean);

    return {
      success: failures.length === 0,
      deleted: successes,
      failed: failures,
    };
  } catch (error) {
    console.error(
      "Error general al eliminar múltiples historiales médicos:",
      error,
    );
    throw error;
  }
}
