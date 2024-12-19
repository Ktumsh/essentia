"use server";

import { and, eq, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { nanoid } from "nanoid";
import postgres from "postgres";

import { user, emailVerification, type EmailVerification } from "@/db/schema";
import { sendEmailVerification } from "@/modules/auth/lib/send-email-verification";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function insertEmailVerificationToken(
  userId: string,
  token: string,
) {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  try {
    return await db.insert(emailVerification).values({
      userId,
      token,
      expiresAt,
    });
  } catch (error) {
    console.error("Error al insertar el token de verificación:", error);
    throw error;
  }
}

export async function getVerificationToken(
  token: string,
): Promise<Array<EmailVerification>> {
  try {
    const verificationRecord = await db
      .select()
      .from(emailVerification)
      .where(eq(emailVerification.token, token))
      .limit(1);

    if (verificationRecord.length === 0) {
      throw new Error("Token no encontrado");
    }

    const { expiresAt } = verificationRecord[0];
    const currentDate = new Date();

    if (currentDate > expiresAt) {
      throw new Error("El token ha expirado");
    }

    return verificationRecord;
  } catch (error) {
    console.error("Error al obtener el token de verificación:", error);
    throw error;
  }
}

export async function resendEmailVerification(userId: string, email: string) {
  const newToken = nanoid();

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  try {
    const userResult = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (userResult.length === 0 || userResult[0].emailVerified) {
      return {
        status: "error",
        message: "El correo ya está verificado.",
      };
    }

    await db
      .update(emailVerification)
      .set({
        token: newToken,
        expiresAt: expiresAt,
      })
      .where(eq(emailVerification.userId, userId));

    await sendEmailVerification(email, newToken);
    return {
      status: "success",
      message: "Se ha enviado un nuevo correo de verificación.",
    };
  } catch (error) {
    console.error("Error al reenviar el correo de verificación:", error);
    return {
      status: "error",
      message: "Ocurrio un error al reenviar el correo de verificación.",
    };
  }
}

export async function updateEmailVerified(userId: string) {
  try {
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (userRecord.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    await db
      .update(user)
      .set({ emailVerified: true, updatedAt: new Date() })
      .where(eq(user.id, userId));

    await db
      .update(emailVerification)
      .set({ verifiedAt: new Date() })
      .where(eq(emailVerification.userId, userId));
  } catch (error) {
    console.error("Error al marcar el correo como verificado:", error);
    throw error;
  }
}

export async function deleteVerificationToken(token: string) {
  try {
    await db
      .update(emailVerification)
      .set({ token: null })
      .where(eq(emailVerification.token, token));
  } catch (error) {
    console.error("Error al eliminar el token de verificación:", error);
    throw error;
  }
}

export async function getUsersForReminder(startDate: Date, endDate: Date) {
  return db
    .select()
    .from(user)
    .where(
      and(
        eq(user.emailVerified, false),
        gte(user.createdAt, startDate),
        lte(user.createdAt, endDate),
      ),
    );
}

export async function sendVerificationReminderToUsers(users: Array<any>) {
  for (const user of users) {
    const verificationToken = user.id;
    const result = await sendEmailVerification(user.email, verificationToken);

    if (result.success) {
      console.log(`Recordatorio enviado a ${user.email}.`);
    } else {
      console.error(
        `Error al enviar recordatorio a ${user.email}:`,
        result.error,
      );
    }
  }
}
