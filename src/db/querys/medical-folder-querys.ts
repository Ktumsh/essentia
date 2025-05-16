"use server";

import { and, eq, inArray, sql } from "drizzle-orm";

import { db } from "../db";
import {
  medicalTag,
  userMedicalFile,
  userMedicalFolder,
  userMedicalFolderActivity,
  userMedicalHistory,
  userMedicalHistoryTag,
} from "../schema";

import type { MedicalHistoryWithTags } from "./medical-history-querys";
import type { FolderIconType } from "@/lib/types";

export async function createMedicalFolder({
  userId,
  name,
  description,
  color = "gray",
  icon = "folder",
}: {
  userId: string;
  name: string;
  description?: string;
  color?: "gray" | "blue" | "green" | "pink" | "red" | "orange" | "purple";
  icon?: FolderIconType;
}) {
  try {
    const [existing] = await db
      .select()
      .from(userMedicalFolder)
      .where(
        and(
          eq(userMedicalFolder.userId, userId),
          eq(userMedicalFolder.name, name),
          eq(userMedicalFolder.isDeleted, false),
        ),
      );

    if (existing) {
      throw new Error("Ya existe una carpeta con ese nombre.");
    }

    const [folder] = await db
      .insert(userMedicalFolder)
      .values({
        userId,
        name,
        description: description || null,
        color,
        icon,
      })
      .returning();

    await db.insert(userMedicalFolderActivity).values({
      userId,
      folderId: folder.id,
      action: "created",
    });

    return folder;
  } catch (error) {
    console.error("Error al crear carpeta médica:", error);
    throw error;
  }
}

export async function updateMedicalFolder({
  userId,
  folderId,
  name,
  description,
  color,
  icon,
}: {
  userId: string;
  folderId: string;
  name?: string;
  description?: string;
  color?: "gray" | "blue" | "green" | "pink" | "red" | "orange" | "purple";
  icon?: FolderIconType;
}) {
  try {
    const [folder] = await db
      .select()
      .from(userMedicalFolder)
      .where(eq(userMedicalFolder.id, folderId))
      .limit(1);

    if (!folder) throw new Error("Carpeta no encontrada");
    if (folder.userId !== userId) throw new Error("Acceso denegado");

    await db
      .update(userMedicalFolder)
      .set({
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(color && { color }),
        ...(icon && { icon }),
        updatedAt: new Date(),
      })
      .where(eq(userMedicalFolder.id, folderId));

    const action = name !== folder.name ? "renamed" : "updated";

    await db.insert(userMedicalFolderActivity).values({
      userId,
      folderId,
      action,
    });

    return { success: true };
  } catch (error) {
    console.error("Error actualizando carpeta:", error);
    throw error;
  }
}

export async function deleteMedicalFolder({
  userId,
  folderId,
}: {
  userId: string;
  folderId: string;
}) {
  try {
    const [folder] = await db
      .select()
      .from(userMedicalFolder)
      .where(eq(userMedicalFolder.id, folderId))
      .limit(1);

    if (!folder) throw new Error("Carpeta no encontrada");
    if (folder.userId !== userId) throw new Error("Acceso denegado");

    await db
      .update(userMedicalFolder)
      .set({
        isDeleted: true,
        updatedAt: new Date(),
      })
      .where(eq(userMedicalFolder.id, folderId));

    await db.insert(userMedicalFolderActivity).values({
      userId,
      folderId,
      action: "deleted",
    });

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar carpeta:", error);
    throw error;
  }
}

export async function restoreMedicalFolder({
  userId,
  folderId,
}: {
  userId: string;
  folderId: string;
}) {
  try {
    const [folder] = await db
      .select()
      .from(userMedicalFolder)
      .where(eq(userMedicalFolder.id, folderId))
      .limit(1);

    if (!folder) throw new Error("Carpeta no encontrada");
    if (folder.userId !== userId) throw new Error("Acceso denegado");
    if (!folder.isDeleted) throw new Error("La carpeta no está eliminada");

    await db
      .update(userMedicalFolder)
      .set({
        isDeleted: false,
        updatedAt: new Date(),
      })
      .where(eq(userMedicalFolder.id, folderId));

    await db.insert(userMedicalFolderActivity).values({
      userId,
      folderId,
      action: "restored",
    });

    return { success: true };
  } catch (error) {
    console.error("Error al restaurar carpeta:", error);
    throw error;
  }
}

export async function moveDocumentToFolder({
  userId,
  documentId,
  folderId,
}: {
  userId: string;
  documentId: string;
  folderId: string | null;
}) {
  try {
    const [document] = await db
      .select()
      .from(userMedicalHistory)
      .where(eq(userMedicalHistory.id, documentId))
      .limit(1);

    if (!document) throw new Error("Documento no encontrado");
    if (document.userId !== userId) throw new Error("Acceso denegado");

    if (folderId) {
      const [folder] = await db
        .select()
        .from(userMedicalFolder)
        .where(eq(userMedicalFolder.id, folderId))
        .limit(1);

      if (!folder) throw new Error("Carpeta no encontrada");
      if (folder.userId !== userId)
        throw new Error("Acceso denegado a la carpeta");
    }

    await db
      .update(userMedicalHistory)
      .set({
        folderId,
        updatedAt: new Date(),
      })
      .where(eq(userMedicalHistory.id, documentId));

    await db.insert(userMedicalFolderActivity).values({
      userId,
      folderId: folderId ?? document.folderId!,
      targetDocumentId: documentId,
      action: folderId ? "document_added" : "document_removed",
    });

    return { success: true };
  } catch (error) {
    console.error("Error al mover documento:", error);
    throw error;
  }
}

export async function reorderDocumentsInFolder({
  userId,
  folderId,
  order,
}: {
  userId: string;
  folderId: string;
  order: { documentId: string; orderIndex: number }[];
}) {
  try {
    const [folder] = await db
      .select()
      .from(userMedicalFolder)
      .where(eq(userMedicalFolder.id, folderId))
      .limit(1);

    if (!folder) throw new Error("Carpeta no encontrada");
    if (folder.userId !== userId) throw new Error("Acceso denegado");

    for (const item of order) {
      const [doc] = await db
        .select()
        .from(userMedicalHistory)
        .where(
          and(
            eq(userMedicalHistory.id, item.documentId),
            eq(userMedicalHistory.folderId, folderId),
          ),
        )
        .limit(1);

      if (!doc || doc.userId !== userId) {
        throw new Error(
          `Acceso denegado o documento inválido: ${item.documentId}`,
        );
      }

      await db
        .update(userMedicalHistory)
        .set({ orderIndex: item.orderIndex })
        .where(eq(userMedicalHistory.id, item.documentId));
    }

    await db.insert(userMedicalFolderActivity).values({
      userId,
      folderId,
      action: "reordered",
    });

    return { success: true };
  } catch (error) {
    console.error("Error al reordenar documentos:", error);
    throw error;
  }
}

export async function getUserMedicalFolders(userId: string) {
  try {
    const folders = await db
      .select({
        id: userMedicalFolder.id,
        name: userMedicalFolder.name,
        description: userMedicalFolder.description,
        color: userMedicalFolder.color,
        icon: userMedicalFolder.icon,
        createdAt: userMedicalFolder.createdAt,
        documentCount: sql`COUNT(${userMedicalHistory.id})`.as(
          "document_count",
        ),
      })
      .from(userMedicalFolder)
      .leftJoin(
        userMedicalHistory,
        and(
          eq(userMedicalHistory.folderId, userMedicalFolder.id),
          eq(userMedicalHistory.isDeleted, false),
        ),
      )
      .where(
        and(
          eq(userMedicalFolder.userId, userId),
          eq(userMedicalFolder.isDeleted, false),
        ),
      )
      .groupBy(
        userMedicalFolder.id,
        userMedicalFolder.name,
        userMedicalFolder.description,
        userMedicalFolder.color,
        userMedicalFolder.createdAt,
      );

    return folders;
  } catch (error) {
    console.error("Error al obtener carpetas del usuario:", error);
    throw error;
  }
}

export async function getUserMedicalFolderActivity(userId: string) {
  try {
    const activity = await db
      .select({
        id: userMedicalFolderActivity.id,
        action: userMedicalFolderActivity.action,
        createdAt: userMedicalFolderActivity.createdAt,
        folder: {
          id: userMedicalFolder.id,
          name: userMedicalFolder.name,
          color: userMedicalFolder.color,
        },
        document: {
          id: userMedicalHistory.id,
          condition: userMedicalHistory.condition,
          type: userMedicalHistory.type,
        },
      })
      .from(userMedicalFolderActivity)
      .innerJoin(
        userMedicalFolder,
        eq(userMedicalFolderActivity.folderId, userMedicalFolder.id),
      )
      .leftJoin(
        userMedicalHistory,
        eq(userMedicalFolderActivity.targetDocumentId, userMedicalHistory.id),
      )
      .where(eq(userMedicalFolderActivity.userId, userId));

    return activity;
  } catch (error) {
    console.error("Error al obtener actividad de carpetas:", error);
    throw error;
  }
}

export type MedicalFolderActivity = Awaited<
  ReturnType<typeof getUserMedicalFolderActivity>
>[number];

export async function getDocumentsByFolderId({
  userId,
  folderId,
}: {
  userId: string;
  folderId: string;
}): Promise<MedicalHistoryWithTags[]> {
  const rawDocs = await db
    .select()
    .from(userMedicalHistory)
    .where(
      and(
        eq(userMedicalHistory.userId, userId),
        eq(userMedicalHistory.folderId, folderId),
        eq(userMedicalHistory.isDeleted, false),
      ),
    )
    .orderBy(userMedicalHistory.orderIndex);

  const docIds = rawDocs.map((d) => d.id);

  const tags = await db
    .select({
      medicalHistoryId: userMedicalHistoryTag.medicalHistoryId,
      tagName: medicalTag.name,
    })
    .from(userMedicalHistoryTag)
    .innerJoin(medicalTag, eq(userMedicalHistoryTag.tagId, medicalTag.id))
    .where(inArray(userMedicalHistoryTag.medicalHistoryId, docIds));

  const files = await db
    .select()
    .from(userMedicalFile)
    .where(inArray(userMedicalFile.medicalHistoryId, docIds));

  return rawDocs.map((doc) => ({
    ...doc,
    tags: tags
      .filter((t) => t.medicalHistoryId === doc.id)
      .map((t) => t.tagName),
    file: files.find((f) => f.medicalHistoryId === doc.id) || null,
  }));
}

export async function getFolderNameById(
  folderId: string,
): Promise<string | null> {
  const [folder] = await db
    .select({ name: userMedicalFolder.name })
    .from(userMedicalFolder)
    .where(eq(userMedicalFolder.id, folderId));

  return folder?.name ?? null;
}
