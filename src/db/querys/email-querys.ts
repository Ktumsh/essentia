"use server";

import { and, eq, gte, lte } from "drizzle-orm";
import { nanoid } from "nanoid";

import { sendEmailAction } from "@/app/(auth)/_lib/email-action";
import { generateVerificationCode } from "@/utils";

import { getUserByEmail } from "./user-querys";
import { db } from "../db";
import { type EmailSends, emailSends, user } from "../schema";

export async function insertEmailSendsCode(
  userId: string,
  code: string,
  actionType: "email_verification" | "password_recovery" | "email_change",
) {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  try {
    const verification = await getVerificationCode(code, actionType);

    if (verification.length > 0) {
      await deleteVerificationCode(code, actionType);
    }

    return await db.insert(emailSends).values({
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
  actionType: "email_verification" | "password_recovery" | "email_change",
): Promise<Array<EmailSends>> {
  try {
    return await db
      .select()
      .from(emailSends)
      .where(
        and(eq(emailSends.code, code), eq(emailSends.actionType, actionType)),
      )
      .limit(1);
  } catch (error) {
    console.error("Error al obtener el código de verificación:", error);
    throw new Error("Error interno al consultar el código de verificación.");
  }
}

export async function resendEmailSendsCode(
  email: string,
  actionType: "email_verification" | "password_recovery" | "email_change",
  newEmail?: string,
): Promise<{ status: boolean; message: string }> {
  const newCode = generateVerificationCode();
  const newToken = nanoid(64);

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 15);

  try {
    const user = await getUserByEmail(email);

    if (user.length === 0) {
      return {
        status: false,
        message: "Correo inválido.",
      };
    }

    if (actionType === "email_verification" && user[0].emailVerified) {
      return {
        status: false,
        message: "El correo ya está verificado",
      };
    }

    const userId = user[0].id;

    await db
      .update(emailSends)
      .set({
        code: newCode,
        expiresAt: expiresAt,
      })
      .where(
        and(
          eq(emailSends.userId, userId),
          eq(emailSends.actionType, actionType),
        ),
      );

    if (actionType === "email_verification") {
      await sendEmailAction("email_verification", {
        email,
        code: newCode,
        token: newToken,
      });
    } else if (actionType === "password_recovery") {
      await sendEmailAction("password_recovery", {
        email,
        code: newCode,
        token: newToken,
      });
    } else {
      if (newEmail !== undefined) {
        await sendEmailAction("email_change", {
          currentEmail: email,
          newEmail,
          code: newCode,
          token: newToken,
        });
      }
    }

    return {
      status: true,
      message: "Se ha enviado un nuevo código de verificación.",
    };
  } catch (error) {
    console.error("Error al reenviar el código de verificación:", error);
    return {
      status: false,
      message: "Ocurrio un error al reenviar el código de verificación.",
    };
  }
}

export async function updateEmailSends(
  userId: string,
  actionType: "email_verification" | "password_recovery" | "email_change",
) {
  try {
    if (actionType === "email_verification") {
      const existingUser = await db
        .select({ emailVerified: user.emailVerified })
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

      if (existingUser.length > 0 && existingUser[0].emailVerified) {
        return {
          success: false,
        };
      }

      await db
        .update(user)
        .set({ emailVerified: true, updatedAt: new Date() })
        .where(eq(user.id, userId));
    }

    await db
      .update(emailSends)
      .set({ verifiedAt: new Date() })
      .where(
        and(
          eq(emailSends.userId, userId),
          eq(emailSends.actionType, actionType),
        ),
      );
  } catch (error) {
    console.error("Error al marcar el correo como verificado:", error);
    throw error;
  }
}

export async function deleteVerificationCode(
  code: string,
  actionType: "email_verification" | "password_recovery" | "email_change",
) {
  try {
    await db
      .delete(emailSends)
      .where(
        and(eq(emailSends.code, code), eq(emailSends.actionType, actionType)),
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

      const result = await sendEmailAction("email_verification", {
        email: user.email,
        code: newCode,
        token: newToken,
      });

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
