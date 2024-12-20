"use server";

import {
  getVerificationCode,
  updateEmailVerified,
} from "@/db/querys/email-querys";

export async function verifyEmail(
  code: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const [verification] = await getVerificationCode(code);

    if (!verification) {
      return { success: false, message: "Código no encontrado" };
    }

    const { expiresAt, userId } = verification;
    const currentDate = new Date();

    if (currentDate > expiresAt) {
      return { success: false, message: "El código ha expirado" };
    }

    await updateEmailVerified(userId);

    return { success: true, message: "¡Tu correo ha sido verificado!" };
  } catch (error) {
    console.error("Error al verificar el correo:", error);
    return { success: false, message: "Error interno al verificar el correo" };
  }
}
