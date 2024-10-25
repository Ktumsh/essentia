import { z } from "zod";

import { ResultCode } from "./code";

const passwordSchema = z
  .string()
  .min(8, { message: ResultCode.INVALID_LENGTH_PASSWORD })
  .regex(/[A-Z]/, { message: ResultCode.INVALID_STRING_PASSWORD })
  .regex(/[a-z]/, { message: ResultCode.INVALID_STRING_PASSWORD })
  .regex(/[0-9]/, { message: ResultCode.INVALID_STRING_PASSWORD })
  .regex(/[^A-Za-z0-9]/, { message: ResultCode.INVALID_STRING_PASSWORD });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "La contraseña actual es requerida."),
    newPassword: passwordSchema,
    confirmPassword: z
      .string()
      .min(8, "La confirmación de la contraseña es requerida."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las nuevas contraseñas no coinciden.",
    path: ["confirmPassword"],
  });
