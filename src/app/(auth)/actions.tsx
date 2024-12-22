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

type EmailBasePayload = {
  email: string;
};

type EmailChangePayload = {
  currentEmail: string;
  newEmail: string;
};

type Payload = EmailChangePayload | EmailBasePayload;

export async function onSendEmail(
  actionType: "password_recovery" | "email_change",
  payload: Payload,
): Promise<{ status: boolean; message: string }> {
  try {
    const isPasswordRecovery = actionType === "password_recovery";
    const basePayload = payload as EmailBasePayload;
    const changePayload = payload as EmailChangePayload;

    const emailToCheck = isPasswordRecovery
      ? basePayload.email
      : changePayload.currentEmail;

    if (!emailToCheck) {
      return {
        status: false,
        message: "Correo inválido.",
      };
    }

    const [user] = await getUserByEmail(emailToCheck);

    if (!user) {
      return {
        status: false,
        message: "Correo inválido.",
      };
    }

    if (isPasswordRecovery && user.status === "disabled") {
      return { status: false, message: "Usuario deshabilitado." };
    }

    if (!isPasswordRecovery && user.email === changePayload.newEmail) {
      return {
        status: false,
        message: "El correo electrónico nuevo no puede ser igual al actual.",
      };
    }

    const userId = user.id;
    const code = generateVerificationCode();
    const token = nanoid(64);

    await insertEmailSendsCode(userId, code, actionType);

    const emailResult = await sendEmailAction(actionType, {
      code,
      token,
      ...(actionType === "password_recovery"
        ? {
            email: basePayload.email,
          }
        : {
            currentEmail: changePayload.currentEmail,
            newEmail: changePayload.newEmail,
          }),
    });

    if (!emailResult) {
      return {
        status: false,
        message: "Error al enviar el correo",
      };
    }

    return {
      status: true,
      message: "Correo enviado",
    };
  } catch (error) {
    console.error(`Error al enviar el correo (${actionType}):`, error);
    throw error;
  }
}
