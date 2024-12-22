"use server";

import { auth } from "@/app/(auth)/auth";
import { getUserById, updateUserPassword } from "@/db/querys/user-querys";
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from "@/modules/core/lib/form-schemas";
import { ResultCode } from "@/utils/code";

export async function changePassword(input: ChangePasswordFormData) {
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
    const session = await auth();

    if (!session || !session.user?.id) {
      return { success: false, message: ResultCode.UNAUTHORIZED };
    }

    const userId = session.user.id;

    const [user] = await getUserById(userId);

    if (!user || !user.password) {
      return { success: false, message: ResultCode.USER_NOT_FOUND };
    }

    if (currentPassword === newPassword) {
      return {
        success: false,
        message: ResultCode.PASSWORD_CHANGE_FAILED,
      };
    }

    const updateResult = await updateUserPassword(userId, newPassword);

    if (updateResult.count === 0) {
      return { success: false, message: ResultCode.USER_NOT_FOUND };
    }

    return { success: true, message: ResultCode.PASSWORD_CHANGED };
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return { success: false, message: ResultCode.UNKNOWN_ERROR };
  }
}
