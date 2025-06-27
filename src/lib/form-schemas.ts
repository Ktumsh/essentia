import { z } from "zod";

import { resultMessages } from "@/utils/errors";

import { ACCEPTED_FILE_TYPES } from "./consts";

export const loginSchema = z.object({
  email: z.string().email({
    message: resultMessages["REQUIRED_EMAIL"],
  }),
  password: z.string().min(6, {
    message: resultMessages["REQUIRED_FIELD"],
  }),
  remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const emailSchema = z.object({
  email: z.string().email({
    message: resultMessages["REQUIRED_EMAIL"],
  }),
});

export type EmailFormData = z.infer<typeof emailSchema>;

export const infoSchema = z.object({
  email: z.string().email({
    message: resultMessages["REQUIRED_EMAIL"],
  }),
  username: z
    .string()
    .min(3, {
      message: resultMessages["INVALID_LENGTH_USERNAME"],
    })
    .max(20, {
      message: resultMessages["INVALID_LENGTH_USERNAME"],
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: resultMessages["INVALID_STRING_USERNAME"],
    })
    .regex(/^[a-zA-Z0-9]/, {
      message: resultMessages["INVALID_START_USERNAME"],
    })
    .regex(/[a-zA-Z0-9]$/, {
      message: resultMessages["INVALID_END_USERNAME"],
    }),
  firstName: z.string().min(1, {
    message: resultMessages["REQUIRED_NAME"],
  }),
  lastName: z.string().min(1, {
    message: resultMessages["REQUIRED_LASTNAME"],
  }),
  birthdate: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDifference = today.getMonth() - date.getMonth();
      const dayDifference = today.getDate() - date.getDate();

      if (date.getFullYear() < 1900 || date > today) {
        return false;
      }

      if (age > 13) return true;
      if (age === 13 && monthDifference > 0) return true;
      if (age === 13 && monthDifference === 0 && dayDifference >= 0) {
        return true;
      }

      return false;
    },
    {
      message: resultMessages["INVALID_BIRTHDATE"],
    },
  ),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: resultMessages["INVALID_LENGTH_PASSWORD"],
      })
      .regex(/[A-Z]/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      })
      .regex(/[a-z]/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      })
      .regex(/[0-9]/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      })
      .regex(/[^A-Za-z0-9]/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: resultMessages["PASSWORDS_DO_NOT_MATCH"],
    path: ["confirmPassword"],
  });

export type InfoFormData = z.infer<typeof infoSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;

export const registerSchema = z.object({
  email: z.string().email({
    message: resultMessages["REQUIRED_EMAIL"],
  }),
  password: z
    .string()
    .min(8, { message: resultMessages["INVALID_LENGTH_PASSWORD"] })
    .regex(/[A-Z]/, {
      message: resultMessages["INVALID_STRING_PASSWORD"],
    })
    .regex(/[a-z]/, {
      message: resultMessages["INVALID_STRING_PASSWORD"],
    })
    .regex(/[0-9]/, {
      message: resultMessages["INVALID_STRING_PASSWORD"],
    })
    .regex(/[^A-Za-z0-9]/, {
      message: resultMessages["INVALID_STRING_PASSWORD"],
    }),
  username: z
    .string()
    .min(3, { message: resultMessages["INVALID_LENGTH_USERNAME"] })
    .max(20, {
      message: resultMessages["INVALID_LENGTH_USERNAME"],
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: resultMessages["INVALID_STRING_USERNAME"],
    })
    .regex(/^[a-zA-Z0-9]/, {
      message: resultMessages["INVALID_START_USERNAME"],
    })
    .regex(/[a-zA-Z0-9]$/, {
      message: resultMessages["INVALID_END_USERNAME"],
    }),
  firstName: z.string().min(1, { message: resultMessages["REQUIRED_NAME"] }),
  lastName: z.string().min(1, { message: resultMessages["REQUIRED_LASTNAME"] }),
  birthdate: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDifference = today.getMonth() - date.getMonth();
      const dayDifference = today.getDate() - date.getDate();

      if (date.getFullYear() < 1900 || date > today) return false;
      if (age > 13) return true;
      if (age === 13 && monthDifference > 0) return true;
      if (age === 13 && monthDifference === 0 && dayDifference >= 0)
        return true;
      return false;
    },
    {
      message: resultMessages["INVALID_BIRTHDATE"],
    },
  ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, {
        message: resultMessages["INVALID_LENGTH_PASSWORD"],
      })
      .regex(/[A-Z]/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      })
      .regex(/[a-z]/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      })
      .regex(/[0-9]/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      })
      .regex(/[^A-Za-z0-9]/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: resultMessages["PASSWORDS_DO_NOT_MATCH"],
    path: ["confirmPassword"],
  });

export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: resultMessages["REQUIRED_FIELD"],
    }),
    newPassword: z
      .string()
      .min(8, {
        message: resultMessages["INVALID_LENGTH_PASSWORD"],
      })
      .regex(/[a-z]/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      })
      .regex(/[A-Z]/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      })
      .regex(/\d/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      })
      .regex(/[\W_]/, {
        message: resultMessages["INVALID_STRING_PASSWORD"],
      }),
    confirmPassword: z.string().min(8, {
      message: resultMessages["REQUIRED_FIELD"],
    }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: resultMessages["PASSWORDS_DO_NOT_MATCH"],
        path: ["confirmPassword"],
      });
    }
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const profileSchema = z.object({
  firstName: z.string().min(1, {
    message: resultMessages["REQUIRED_NAME"],
  }),
  lastName: z.string().min(1, {
    message: resultMessages["REQUIRED_LASTNAME"],
  }),
  username: z
    .string()
    .min(3, {
      message: resultMessages["INVALID_LENGTH_USERNAME"],
    })
    .max(20, {
      message: resultMessages["INVALID_LENGTH_USERNAME"],
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: resultMessages["INVALID_STRING_USERNAME"],
    }),
  bio: z
    .string()
    .max(2000, {
      message: resultMessages["INVALID_LENGTH_BIO"],
    })
    .optional(),
  genre: z.string().optional(),
  weight: z
    .number()
    .min(1, {
      message: resultMessages["INVALID_WEIGHT"],
    })
    .max(300, {
      message: resultMessages["INVALID_WEIGHT"],
    })
    .nullable(),
  height: z
    .number()
    .min(40, {
      message: resultMessages["INVALID_HEIGHT"],
    })
    .max(250, {
      message: resultMessages["INVALID_HEIGHT"],
    })
    .nullable(),
  location: z
    .string()
    .max(50, {
      message: resultMessages["INVALID_LENGTH_LOCATION"],
    })
    .optional(),
  birthdate: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDifference = today.getMonth() - date.getMonth();
      const dayDifference = today.getDate() - date.getDate();

      if (date.getFullYear() < 1900 || date > today) return false;
      if (age > 13) return true;
      if (age === 13 && monthDifference > 0) return true;
      if (age === 13 && monthDifference === 0 && dayDifference >= 0)
        return true;
      return false;
    },
    {
      message: resultMessages["INVALID_BIRTHDATE"],
    },
  ),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const taskSchema = z.object({
  frequency: z.enum([
    "No se repite",
    "Diariamente",
    "Semanalmente",
    "Mensualmente",
    "Anualmente",
  ]),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  exactDate: z.date().optional().nullable(),
  weekDay: z.string().optional().nullable(),
  monthDay: z.number().optional().nullable(),
  month: z.string().optional().nullable(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const cancelSubscriptionSchema = z.object({
  selectedReasons: z
    .array(z.string())
    .min(1, { message: "Debes seleccionar al menos una razón" })
    .max(3),
  otherReason: z.string().optional(),
});

export type CancelSubscriptionFormData = z.infer<
  typeof cancelSubscriptionSchema
>;

export const chatTitleSchema = z.object({
  chatTitle: z
    .string()
    .min(1, { message: resultMessages["REQUIRED_FIELD"] })
    .max(100, { message: resultMessages["INVALID_LENGTH_TITLE"] }),
});

export type ChatTitleFormData = z.infer<typeof chatTitleSchema>;

export const folderFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: resultMessages["FOLDER_NAME_MIN"] })
    .max(50, { message: resultMessages["FOLDER_NAME_MAX"] })
    .refine((val) => val.replace(/\s/g, "").length > 0, {
      message: resultMessages["FOLDER_NAME_INVALID"],
    }),
  description: z
    .string()
    .max(200, { message: resultMessages["FOLDER_DESCRIPTION_MAX"] })
    .optional()
    .or(z.literal("")),
  color: z.enum(["gray", "blue", "green", "pink", "red", "orange", "purple"]),
  icon: z.enum([
    "folder",
    "health",
    "document",
    "heart",
    "vaccine",
    "prescription",
    "exam",
    "xray",
    "lab",
    "surgery",
    "mental",
    "pregnancy",
    "dentist",
    "file",
  ]),
});

export type FolderFormData = z.infer<typeof folderFormSchema>;

export const renameFolderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: resultMessages["RENAME_FOLDER_MIN"] })
    .max(50, { message: resultMessages["RENAME_FOLDER_MAX"] })
    .refine((val) => val.replace(/\s/g, "").length > 0, {
      message: resultMessages["RENAME_FOLDER_INVALID"],
    }),
});

export type RenameFolderFormData = z.infer<typeof renameFolderSchema>;

export const medicalHistoryAddSchema = z.object({
  condition: z
    .string()
    .min(3, { message: resultMessages["MEDICAL_CONDITION_MIN"] })
    .max(100, { message: resultMessages["MEDICAL_CONDITION_MAX"] }),
  type: z.enum([
    "Examen",
    "Receta",
    "Informe",
    "Diagnóstico",
    "Imagenología",
    "Certificado",
    "Epicrisis",
    "Consentimiento",
    "Otro",
  ]),
  description: z
    .string()
    .max(500, { message: resultMessages["MEDICAL_DESCRIPTION_MAX"] })
    .optional(),
  issuer: z
    .string()
    .max(100, { message: resultMessages["MEDICAL_ISSUER_MAX"] })
    .optional(),
  documentDate: z
    .date({ required_error: resultMessages["MEDICAL_DATE_REQUIRED"] })
    .refine((date) => date <= new Date(), {
      message: resultMessages["MEDICAL_DATE_INVALID"],
    }),
  notes: z
    .string()
    .max(500, { message: resultMessages["MEDICAL_NOTES_MAX"] })
    .optional(),
  visibility: z.enum(["private", "shared"]),
  tags: z.array(z.string()).optional(),
  folderId: z.string().nullable().optional(),
  file: z
    .instanceof(File, {
      message: resultMessages["MEDICAL_FILE_REQUIRED"],
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: resultMessages["MEDICAL_FILE_INVALID_TYPE"],
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: resultMessages["MEDICAL_FILE_TOO_LARGE"],
    }),
});

export type MedicalHistoryAddSchema = z.infer<typeof medicalHistoryAddSchema>;

export const medicalHistoryEditSchema = medicalHistoryAddSchema.extend({
  file: z
    .instanceof(File)
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: resultMessages["MEDICAL_FILE_INVALID_TYPE"],
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: resultMessages["MEDICAL_FILE_TOO_LARGE"],
    })
    .optional(),
});

export type MedicalHistoryEditSchema = z.infer<typeof medicalHistoryEditSchema>;
