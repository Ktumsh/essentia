"use server";

import { toast } from "sonner";

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

export async function uploadFile(file: File, userId: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  const uploadPromise = fetch("/api/files/upload-profile", {
    method: "POST",
    body: formData,
  });

  return toast.promise(uploadPromise, {
    loading: "Subiendo foto de perfil...",
    success: async () => {
      const response = await uploadPromise;
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al subir la imagen");
      }

      return result.success || "Foto de perfil actualizada";
    },

    error: async () => {
      const response = await uploadPromise.catch(() => null);

      if (response) {
        const result = await response.json();
        return result.error || "Error desconocido al subir la foto";
      }

      return "Error al subir la imagen, revisa tu conexión";
    },
  });
}
