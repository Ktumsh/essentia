"use server";

import { z } from "zod";

import { auth } from "@/app/(auth)/auth";
import {
  getPasswordAndSaltById,
  updatePasswordAndSaltById,
} from "@/db/user-querys";
import { Session } from "@/types/session";
import { changePasswordSchema } from "@/utils/account";
import { ResultCode } from "@/utils/code";
import { getStringFromBuffer } from "@/utils/common";

type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export async function changePassword(input: ChangePasswordInput) {
  const parseResult = changePasswordSchema.safeParse(input);
  if (!parseResult.success) {
    return {
      success: false,
      message: ResultCode.VALIDATION_ERROR,
      errors: parseResult.error.errors,
    };
  }

  const { currentPassword, newPassword } = parseResult.data;

  try {
    const session = (await auth()) as Session;

    if (!session || !session.user?.id) {
      return { success: false, message: ResultCode.UNAUTHORIZED };
    }

    const userId = session.user.id;

    const userCredentials = await getPasswordAndSaltById(userId);

    if (
      !userCredentials ||
      !userCredentials.password ||
      !userCredentials.salt
    ) {
      return { success: false, message: ResultCode.USER_NOT_FOUND };
    }

    const { password: storedHashedPassword, salt } = userCredentials;

    const encoder = new TextEncoder();
    const saltedCurrentPassword = encoder.encode(currentPassword + salt);
    const hashedCurrentPasswordBuffer = await crypto.subtle.digest(
      "SHA-256",
      saltedCurrentPassword,
    );
    const hashedCurrentPassword = getStringFromBuffer(
      hashedCurrentPasswordBuffer,
    );

    if (hashedCurrentPassword !== storedHashedPassword) {
      return { success: false, message: ResultCode.INVALID_CURRENT_PASSWORD };
    }

    if (currentPassword === newPassword) {
      return {
        success: false,
        message: ResultCode.PASSWORD_CHANGE_FAILED,
      };
    }

    const newSalt = crypto.randomUUID();
    const saltedNewPassword = encoder.encode(newPassword + newSalt);
    const hashedNewPasswordBuffer = await crypto.subtle.digest(
      "SHA-256",
      saltedNewPassword,
    );
    const hashedNewPassword = getStringFromBuffer(hashedNewPasswordBuffer);

    const updateResult = await updatePasswordAndSaltById(
      userId,
      hashedNewPassword,
      newSalt,
    );

    if (updateResult.rowCount === 0) {
      return { success: false, message: ResultCode.USER_NOT_FOUND };
    }

    return { success: true, message: ResultCode.PASSWORD_CHANGED };
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return { success: false, message: ResultCode.UNKNOWN_ERROR };
  }
}
