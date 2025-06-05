"use server";

import { createAvatar } from "@dicebear/core";
import * as icons from "@dicebear/icons";
import { compare, genSaltSync, hashSync } from "bcrypt-ts";
import { and, desc, eq, lt, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

import { sendEmailAction } from "@/app/(auth)/_lib/email-action";
import {
  user,
  type User,
  userProfile,
  subscription,
  userTrial,
  plan,
  Subscription,
  Plan,
  userFeedback,
} from "@/db/schema";
import { generateVerificationCode } from "@/utils";

import { insertEmailSendsCode } from "./email-querys";
import { createNotification } from "./notification-querys";
import { db } from "../db";

export async function createUser(
  email: string,
  password: string,
  username: string,
  firstName: string,
  lastName: string,
  birthdate: Date | null,
) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    const avatar = createAvatar(icons, {
      seed: username,
      backgroundType: ["gradientLinear", "solid"],
    });

    const avatarSvg = avatar.toDataUri();

    const userResult = await db
      .insert(user)
      .values({
        email,
        username,
        password: hash,
      })
      .returning();

    const userId = userResult[0].id;

    await db.insert(userProfile).values({
      userId,
      firstName,
      lastName,
      birthdate,
      profileImage: avatarSvg,
    });

    await db.insert(subscription).values({
      userId,
      isPremium: false,
    });

    const code = generateVerificationCode();
    const token = nanoid(64);

    await insertEmailSendsCode(userId, code, "email_verification");

    const emailResult = await sendEmailAction("email_verification", {
      email,
      code,
      token,
    });

    if (!emailResult.success) {
      throw new Error("Error al enviar el email de verificación");
    }

    await createNotification({
      userId,
      title: "¡Bienvenid@!",
      message:
        "Gracias por registrarte en Essentia. ¡Comienza a explorar nuestro contenido!",
      url: "/",
    });

    return;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
}

export async function getUserById(id: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.id, id));
  } catch (error) {
    console.error("Error al obtener el usuario por ID:", error);
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    console.error("Error al obtener el usuario por email:", error);
    throw error;
  }
}

export async function getUserByUsername(
  username: string,
): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.username, username));
  } catch (error) {
    console.error("Error al obtener el usuario por username:", error);
    throw error;
  }
}

export async function getExistingEmail(email: string): Promise<boolean> {
  try {
    const [existingEmail] = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    return !!existingEmail;
  } catch (error) {
    console.error("Error al obtener el email existente:", error);
    throw error;
  }
}

export async function updateUserEmail(id: string, email: string) {
  try {
    return await db.update(user).set({ email }).where(eq(user.id, id));
  } catch (error) {
    console.error("Error al actualizar el email del usuario:", error);
    throw error;
  }
}

export async function updateUserPassword(id: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    return await db
      .update(user)
      .set({
        password: hash,
      })
      .where(eq(user.id, id));
  } catch (error) {
    console.error("Error al actualizar la contraseña del usuario:", error);
    throw error;
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const [userToDelete] = await getUserById(id);
    if (!userToDelete) {
      throw new Error("USER_NOT_FOUND");
    }

    if (userToDelete.role === "admin") {
      const adminCount = await getAdminCount();
      if (adminCount <= 1) {
        throw new Error("CANNOT_DELETE_LAST_ADMIN");
      }
    }

    await db.update(user).set({ status: "disabled" }).where(eq(user.id, id));
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw new Error("DELETE_USER_ERROR");
  }
}

export async function getUserState(id: string): Promise<string> {
  try {
    const [userData] = await db
      .select({ status: user.status })
      .from(user)
      .where(eq(user.id, id));

    return userData.status;
  } catch (error) {
    console.error("Error al obtener el estado del usuario:", error);
    throw error;
  }
}

export async function verifySamePassword(
  userId: string,
  newPassword: string,
): Promise<boolean> {
  const [user] = await getUserById(userId);

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  return await compare(newPassword, user.password);
}

export async function getAdminCount(): Promise<number> {
  try {
    const admins = await db
      .select()
      .from(user)
      .where(and(eq(user.role, "admin"), eq(user.status, "enabled")));
    return admins.length;
  } catch (error) {
    console.error("Error al obtener el conteo de administradores:", error);
    throw error;
  }
}

export async function startUserTrial(
  userId: string,
  ip: string = "",
): Promise<{
  success: boolean;
  message: string;
}> {
  const [existing] = await db
    .select()
    .from(userTrial)
    .where(eq(userTrial.userId, userId));

  if (existing?.hasUsed) {
    return {
      success: false,
      message: "Ya has utilizado tu prueba gratuita.",
    };
  }
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  await db.insert(userTrial).values({
    userId,
    startedAt: now,
    expiresAt,
    isActive: true,
    hasUsed: true,
    ip,
  });

  return {
    success: true,
    message: "Prueba gratuita activada por 7 días.",
  };
}

export async function cancelUserTrial(userId: string): Promise<void> {
  try {
    await db
      .update(userTrial)
      .set({
        isActive: false,
        hasUsed: true,
      })
      .where(eq(userTrial.userId, userId));
  } catch (error) {
    console.error("Error al cancelar la prueba gratuita del usuario:", error);
    throw error;
  }
}

export async function getUserTrialStatus(userId: string): Promise<{
  hasUsed: boolean;
  isActive: boolean;
  expiresAt: Date | null;
}> {
  const [trial] = await db
    .select()
    .from(userTrial)
    .where(eq(userTrial.userId, userId));

  return {
    hasUsed: trial?.hasUsed ?? false,
    isActive: trial?.isActive ?? false,
    expiresAt: trial?.expiresAt ?? null,
  };
}

export type UserTrialStatusType = Awaited<
  ReturnType<typeof getUserTrialStatus>
>;

export async function deactivateExpiredTrials() {
  const now = new Date();
  await db
    .update(userTrial)
    .set({ isActive: false })
    .where(and(lt(userTrial.expiresAt, now), eq(userTrial.isActive, true)));
}

export async function getUserSubscriptionInfo(userId: string): Promise<{
  trial: UserTrialStatusType;
  subscription: {
    subscription: Subscription;
    plan: Plan | null;
  } | null;
}> {
  const [trialStatus, [subscriptionData]] = await Promise.all([
    getUserTrialStatus(userId),
    db
      .select()
      .from(subscription)
      .leftJoin(plan, eq(subscription.type, plan.id))
      .where(eq(subscription.userId, userId)),
  ]);

  return {
    trial: trialStatus ?? { hasUsed: false, isActive: false, expiresAt: null },
    subscription: subscriptionData ?? null,
  };
}

export type UserSubscriptionInfo = Awaited<
  ReturnType<typeof getUserSubscriptionInfo>
>;

type SaveFeedbackParams = {
  comment: string;
  reaction: "love" | "happy" | "neutral" | "frustrated" | "angry";
  context?: string;
  device?: string;
  ip?: string;
  userId?: string | null;
};

export async function saveUserFeedback({
  comment,
  reaction,
  context,
  device,
  ip,
  userId,
}: SaveFeedbackParams): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await db.insert(userFeedback).values({
      comment,
      reaction,
      context,
      device,
      ip,
      userId: userId ?? sql`NULL`,
    });

    return {
      success: true,
      message: "Feedback guardado con éxito.",
    };
  } catch (error) {
    console.error("Error al guardar el feedback:", error);
    return {
      success: false,
      message: "Ocurrió un error al guardar el feedback.",
    };
  }
}

export async function getFeedbackPaginated({
  limit = 20,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}) {
  try {
    return await db
      .select()
      .from(userFeedback)
      .orderBy(desc(userFeedback.createdAt))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("Error al obtener feedback paginado:", error);
    return [];
  }
}

export type UserFeedback = Awaited<ReturnType<typeof getFeedbackPaginated>>;

export async function getFeedbackCount(): Promise<number> {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(userFeedback);
  return result?.[0]?.count ?? 0;
}
