"use server";

import { and, eq, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { nanoid } from "nanoid";
import postgres from "postgres";

import { user, emailVerification, type EmailVerification } from "@/db/schema";
import { sendEmailRecoveryPass } from "@/modules/auth/lib/email-rec-pass";
import { sendEmailVerification } from "@/modules/auth/lib/email-verify";
import { generateVerificationCode } from "@/modules/core/lib/utils";

import { getUserByEmail } from "./user-querys";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function insertEmailVerificationCode(
  userId: string,
  code: string,
  actionType: "email_verification" | "password_recovery",
) {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  try {
    return await db.insert(emailVerification).values({
      userId,
      code,
      actionType,
      expiresAt,
    });
  } catch (error) {
    console.error("Error al insertar el código de verificación:", error);
    throw error;
  }
}

export async function getVerificationCode(
  code: string,
  actionType: "email_verification" | "password_recovery",
): Promise<Array<EmailVerification>> {
  try {
    return await db
      .select()
      .from(emailVerification)
      .where(
        and(
          eq(emailVerification.code, code),
          eq(emailVerification.actionType, actionType),
        ),
      )
      .limit(1);
  } catch (error) {
    console.error("Error al obtener el código de verificación:", error);
    throw new Error("Error interno al consultar el código de verificación.");
  }
}

export async function resendEmailVerification(
  email: string,
  actionType: "email_verification" | "password_recovery",
) {
  const newCode = generateVerificationCode();
  const newToken = nanoid(64);

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  try {
    const user = await getUserByEmail(email);

    if (user.length === 0) {
      return {
        status: "error",
        message: "Correo inválido.",
      };
    }

    if (actionType === "email_verification" && user[0].emailVerified) {
      return {
        status: "error",
        message: "El correo ya está verificado.",
      };
    }

    const userId = user[0].id;

    await db
      .update(emailVerification)
      .set({
        code: newCode,
        expiresAt: expiresAt,
      })
      .where(
        and(
          eq(emailVerification.userId, userId),
          eq(emailVerification.actionType, actionType),
        ),
      );

    if (actionType === "email_verification") {
      await sendEmailVerification(email, newCode, newToken);
    } else {
      await sendEmailRecoveryPass(email, newCode, newToken);
    }
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
      .where(
        and(
          eq(emailVerification.userId, userId),
          eq(emailVerification.actionType, "email_verification"),
        ),
      );
  } catch (error) {
    console.error("Error al marcar el correo como verificado:", error);
    throw error;
  }
}

export async function deleteVerificationCode(
  code: string,
  actionType: "email_verification" | "password_recovery",
) {
  try {
    await db
      .update(emailVerification)
      .set({ code: null })
      .where(
        and(
          eq(emailVerification.code, code),
          eq(emailVerification.actionType, actionType),
        ),
      );
  } catch (error) {
    console.error("Error al eliminar el code de verificación:", error);
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
