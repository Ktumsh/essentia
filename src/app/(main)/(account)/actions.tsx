"use server";

import { auth } from "@/app/(auth)/auth";
import { getUserById, updateUserPassword } from "@/db/querys/user-querys";
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from "@/lib/form-schemas";

import type { ResultCode } from "@/utils/errors";
import type { ZodIssue } from "zod";

type ChangePasswordResult =
  | {
      type: "success";
      resultCode: "PASSWORD_CHANGED";
    }
  | {
      type: "error";
      resultCode: ResultCode;
      errors?: ZodIssue[];
    };

export async function changePassword(
  input: ChangePasswordFormData,
): Promise<ChangePasswordResult> {
  const parseResult = changePasswordSchema.safeParse(input);
  if (!parseResult.success) {
    return {
      type: "error",
      resultCode: "VALIDATION_ERROR",
      errors: parseResult.error.errors,
    };
  }

  const { currentPassword, newPassword } = parseResult.data;

  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return { type: "error", resultCode: "UNAUTHORIZED" };
    }

    const userId = session.user.id;
    const [user] = await getUserById(userId);

    if (!user || !user.password) {
      return { type: "error", resultCode: "USER_NOT_FOUND" };
    }

    if (currentPassword === newPassword) {
      return {
        type: "error",
        resultCode: "PASSWORD_CHANGE_FAILED",
      };
    }

    const updateResult = await updateUserPassword(userId, newPassword);

    if (updateResult.count === 0) {
      return { type: "error", resultCode: "USER_NOT_FOUND" };
    }

    return { type: "success", resultCode: "PASSWORD_CHANGED" };
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return { type: "error", resultCode: "UNKNOWN_ERROR" };
  }
}
