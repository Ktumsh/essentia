"use server";

import { nanoid } from "nanoid";

import {
  getVerificationCode,
  insertEmailSendsCode,
  updateEmailSends,
} from "@/db/querys/email-querys";
import { getUserByEmail } from "@/db/querys/user-querys";
import { sendEmailAction } from "@/modules/auth/lib/email-action";
import { generateVerificationCode } from "@/modules/core/lib/utils";

export async function verifyCode(
  code: string,
  actionType: "email_verification" | "password_recovery" | "email_change",
): Promise<{ success: boolean; message: string }> {
  try {
    const [verification] = await getVerificationCode(code, actionType);

    if (!verification) {
      return { success: false, message: "Código no encontrado" };
    }

    const { expiresAt, userId } = verification;
    const currentDate = new Date();

    if (currentDate > expiresAt) {
      return { success: false, message: "El código ha expirado" };
    }

    await updateEmailSends(userId, actionType);

    return {
      success: true,
      message:
        actionType === "email_verification"
          ? "¡Tu correo ha sido verificado!"
          : actionType === "password_recovery"
            ? "Código verificado"
            : "Se ha cambiado tu correo electrónico",
    };
  } catch (error) {
    console.error("Error al verificar el correo:", error);
    return {
      success: false,
      message:
        actionType === "email_verification"
          ? "Error interno al verificar el correo"
          : "Error interno al verificar el código",
    };
  }
}

export async function sendRecoveryEmail(
  email: string,
): Promise<{ status: string; message: string }> {
  try {
    const [user] = await getUserByEmail(email);

    if (!user) {
      return { status: "error", message: "Correo inválido." };
    }

    const userId = user.id;

    const code = generateVerificationCode();
    const token = nanoid(64);

    await insertEmailSendsCode(userId, code, "password_recovery");

    const emailResult = await sendEmailAction("password_recovery", {
      email,
      code,
      token,
    });

    if (!emailResult) {
      return { status: "error", message: "Error al enviar el correo" };
    }

    return { status: "success", message: "Correo enviado" };
  } catch (error) {
    console.error("Error al enviar el correo de recuperación:", error);
    throw error;
  }
}

export async function sendChangeEmail(
  currentEmail: string,
  newEmail: string,
): Promise<{ status: string; message: string }> {
  try {
    const [user] = await getUserByEmail(currentEmail);

    if (!user) {
      return { status: "error", message: "Correo inválido." };
    }

    const userId = user.id;

    const code = generateVerificationCode();
    const token = nanoid(64);

    await insertEmailSendsCode(userId, code, "email_change");

    const emailResult = await sendEmailAction("email_change", {
      currentEmail,
      newEmail,
      code,
      token,
    });

    if (!emailResult) {
      return { status: "error", message: "Error al enviar el correo" };
    }

    return { status: "success", message: "Correo enviado" };
  } catch (error) {
    console.error("Error al enviar el correo de recuperación:", error);
    throw error;
  }
}
