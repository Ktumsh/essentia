"use server";

import { and, eq, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { nanoid } from "nanoid";
import postgres from "postgres";

import { user, emailVerification, type EmailVerification } from "@/db/schema";
import { sendEmailVerification } from "@/modules/auth/lib/send-email-verification";
import { generateVerificationCode } from "@/modules/core/lib/utils";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function insertEmailVerificationToken(
  userId: string,
  code: string,
) {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  try {
    return await db.insert(emailVerification).values({
      userId,
      code,
      expiresAt,
    });
  } catch (error) {
    console.error("Error al insertar el código de verificación:", error);
    throw error;
  }
}

export async function getVerificationCode(
  code: string,
): Promise<{ success: boolean; record?: EmailVerification; error?: string }> {
  try {
    console.log({ code });
    const verificationCodeRecord = await db
      .select()
      .from(emailVerification)
      .where(eq(emailVerification.code, code))
      .limit(1);

    console.log({ verificationCodeRecord });

    if (verificationCodeRecord.length === 0) {
      return { success: false, error: "Código no encontrado" };
    }

    const { expiresAt } = verificationCodeRecord[0];
    const currentDate = new Date();

    if (currentDate > expiresAt) {
      return { success: false, error: "El código ha expirado" };
    }

    return { success: true, record: verificationCodeRecord[0] };
  } catch (error) {
    console.error("Error al obtener el código de verificación:", error);
    return { success: false, error: "Error interno al validar el código" };
  }
}

export async function resendEmailVerification(userId: string, email: string) {
  const newCode = generateVerificationCode();
  const newToken = nanoid(64);

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  try {
    const userResult = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (userResult.length === 0) {
      return {
        status: "error",
        message: "Correo inválido.",
      };
    }

    if (userResult[0].emailVerified) {
      return {
        status: "error",
        message: "El correo ya está verificado.",
      };
    }

    await db
      .update(emailVerification)
      .set({
        code: newCode,
        expiresAt: expiresAt,
      })
      .where(eq(emailVerification.userId, userId));

    await sendEmailVerification(email, newCode, newToken);
    return {
      status: "success",
      message: "Se ha enviado un nuevo código de verificación.",
    };
  } catch (error) {
    console.error("Error al reenviar el código de verificación:", error);
    return {
      status: "error",
      message: "Ocurrio un error al reenviar el código de verificación.",
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

export async function deleteVerificationToken(code: string) {
  try {
    await db
      .update(emailVerification)
      .set({ code: null })
      .where(eq(emailVerification.code, code));
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
  const promises = users.map(async (user) => {
    try {
      const newCode = generateVerificationCode();
      const newToken = nanoid(64);

      const result = await sendEmailVerification(user.email, newCode, newToken);

      if (result.success) {
        console.log(`Recordatorio enviado a ${user.email}.`);
      } else {
        console.error(
          `Error al enviar recordatorio a ${user.email}:`,
          result.error,
        );
      }
    } catch (error) {
      console.error(
        `Error inesperado al enviar recordatorio a ${user.email}:`,
        error,
      );
    }
  });

  await Promise.all(promises);
}
