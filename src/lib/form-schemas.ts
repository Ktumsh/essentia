import { z } from "zod";

import { getMessageFromCode, ResultCode } from "@/utils/errors";

export const validateEmail = (value: string): boolean =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

export const validatePassword = (value: string): boolean => {
  return (
    value.length >= 8 &&
    /[A-Z]/.test(value) &&
    /[a-z]/.test(value) &&
    /[0-9]/.test(value) &&
    /[^A-Za-z0-9]/.test(value)
  );
};

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: getMessageFromCode(ResultCode.REQUIRED_EMAIL) }),
  password: z.string().min(6, {
    message: getMessageFromCode(ResultCode.REQUIRED_FIELD),
  }),
  remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const emailSchema = z.object({
  email: z
    .string()
    .email({ message: getMessageFromCode(ResultCode.REQUIRED_EMAIL) }),
});

export type EmailFormData = z.infer<typeof emailSchema>;

export const infoSchema = z.object({
  email: z
    .string()
    .email({ message: getMessageFromCode(ResultCode.REQUIRED_EMAIL) }),
  username: z
    .string()
    .min(3, { message: getMessageFromCode(ResultCode.INVALID_LENGTH_USERNAME) })
    .max(20, {
      message: getMessageFromCode(ResultCode.INVALID_LENGTH_USERNAME),
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: getMessageFromCode(ResultCode.INVALID_STRING_USERNAME),
    })
    .regex(/^[a-zA-Z0-9]/, {
      message: getMessageFromCode(ResultCode.INVALID_START_USERNAME),
    })
    .regex(/[a-zA-Z0-9]$/, {
      message: getMessageFromCode(ResultCode.INVALID_END_USERNAME),
    }),
  firstName: z
    .string()
    .min(1, { message: getMessageFromCode(ResultCode.REQUIRED_NAME) }),
  lastName: z
    .string()
    .min(1, { message: getMessageFromCode(ResultCode.REQUIRED_LASTNAME) }),
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
      message: getMessageFromCode(ResultCode.INVALID_BIRTHDATE),
    },
  ),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: getMessageFromCode(ResultCode.INVALID_LENGTH_PASSWORD),
      })
      .regex(/[A-Z]/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      })
      .regex(/[a-z]/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      })
      .regex(/[0-9]/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      })
      .regex(/[^A-Za-z0-9]/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: getMessageFromCode(ResultCode.PASSWORDS_DO_NOT_MATCH),
    path: ["confirmPassword"],
  });

export type InfoFormData = z.infer<typeof infoSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;

export const registerSchema = z.object({
  email: z.string().email({
    message: getMessageFromCode(ResultCode.REQUIRED_EMAIL),
  }),
  password: z
    .string()
    .min(8, { message: getMessageFromCode(ResultCode.INVALID_LENGTH_PASSWORD) })
    .regex(/[A-Z]/, {
      message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
    })
    .regex(/[a-z]/, {
      message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
    })
    .regex(/[0-9]/, {
      message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
    })
    .regex(/[^A-Za-z0-9]/, {
      message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
    }),
  username: z
    .string()
    .min(3, { message: getMessageFromCode(ResultCode.INVALID_LENGTH_USERNAME) })
    .max(20, {
      message: getMessageFromCode(ResultCode.INVALID_LENGTH_USERNAME),
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: getMessageFromCode(ResultCode.INVALID_STRING_USERNAME),
    })
    .regex(/^[a-zA-Z0-9]/, {
      message: getMessageFromCode(ResultCode.INVALID_START_USERNAME),
    })
    .regex(/[a-zA-Z0-9]$/, {
      message: getMessageFromCode(ResultCode.INVALID_END_USERNAME),
    }),
  firstName: z
    .string()
    .min(1, { message: getMessageFromCode(ResultCode.REQUIRED_NAME) }),
  lastName: z
    .string()
    .min(1, { message: getMessageFromCode(ResultCode.REQUIRED_LASTNAME) }),
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
      message: getMessageFromCode(ResultCode.INVALID_BIRTHDATE),
    },
  ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, {
        message: getMessageFromCode(ResultCode.INVALID_LENGTH_PASSWORD),
      })
      .regex(/[A-Z]/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      })
      .regex(/[a-z]/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      })
      .regex(/[0-9]/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      })
      .regex(/[^A-Za-z0-9]/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: getMessageFromCode(ResultCode.PASSWORDS_DO_NOT_MATCH),
    path: ["confirmPassword"],
  });

export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: getMessageFromCode(ResultCode.REQUIRED_FIELD) }),
    newPassword: z
      .string()
      .min(8, {
        message: getMessageFromCode(ResultCode.INVALID_LENGTH_PASSWORD),
      })
      .regex(/[a-z]/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      })
      .regex(/[A-Z]/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      })
      .regex(/\d/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      })
      .regex(/[\W_]/, {
        message: getMessageFromCode(ResultCode.INVALID_STRING_PASSWORD),
      }),
    confirmPassword: z
      .string()
      .min(8, { message: getMessageFromCode(ResultCode.REQUIRED_FIELD) }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: getMessageFromCode(ResultCode.PASSWORDS_DO_NOT_MATCH),
        path: ["confirmPassword"],
      });
    }
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: getMessageFromCode(ResultCode.REQUIRED_NAME) }),
  lastName: z
    .string()
    .min(1, { message: getMessageFromCode(ResultCode.REQUIRED_LASTNAME) }),
  username: z
    .string()
    .min(3, { message: getMessageFromCode(ResultCode.INVALID_LENGTH_USERNAME) })
    .max(20, {
      message: getMessageFromCode(ResultCode.INVALID_LENGTH_USERNAME),
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: getMessageFromCode(ResultCode.INVALID_STRING_USERNAME),
    }),
  bio: z
    .string()
    .max(2000, { message: getMessageFromCode(ResultCode.INVALID_LENGTH_BIO) })
    .optional(),
  genre: z.string().optional(),
  weight: z
    .number()
    .min(1, { message: getMessageFromCode(ResultCode.INVALID_WEIGHT) })
    .max(300, { message: getMessageFromCode(ResultCode.INVALID_WEIGHT) })
    .nullable(),
  height: z
    .number()
    .min(40, { message: getMessageFromCode(ResultCode.INVALID_HEIGHT) })
    .max(250, { message: getMessageFromCode(ResultCode.INVALID_HEIGHT) })
    .nullable(),
  location: z
    .string()
    .max(50, {
      message: getMessageFromCode(ResultCode.INVALID_LENGTH_LOCATION),
    })
    .optional(),
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
      message: getMessageFromCode(ResultCode.INVALID_BIRTHDATE),
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

export const validMedicalTagNames = [
  "Alergia",
  "Cirugía",
  "Consulta General",
  "Diagnóstico",
  "Enfermedad Crónica",
  "Examen de Laboratorio",
  "Examen de Imagenología",
  "Medicación",
  "Vacunación",
  "Salud Mental",
  "Nutrición",
  "Odontología",
  "Oftalmología",
  "Pediatría",
  "Cardiología",
  "Dermatología",
  "Neurología",
  "Certificado Médico",
  "Informe Médico",
  "Epicrisis",
  "Consentimiento Informado",
  "Receta Médica",
  "Rehabilitación",
  "Ginecología",
  "Otro",
] as const;

export const AIRecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      type: z.enum([
        "general",
        "preventive",
        "lifestyle",
        "followUp",
        "medication",
      ]),
      title: z.string(),
      description: z.string(),
      priority: z.enum(["high", "medium", "low"]),
      relatedTags: z.array(z.enum(validMedicalTagNames)),
      relatedDocuments: z.array(z.string()),
    }),
  ),
});

export const chatTitleSchema = z.object({
  chatTitle: z
    .string()
    .min(1, { message: getMessageFromCode(ResultCode.REQUIRED_FIELD) })
    .max(100, { message: getMessageFromCode(ResultCode.INVALID_LENGTH_TITLE) }),
});

export type ChatTitleFormData = z.infer<typeof chatTitleSchema>;

export const folderFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .refine((val) => val.replace(/\s/g, "").length > 0, {
      message: "El nombre no puede estar vacío o tener solo espacios",
    }),
  description: z
    .string()
    .max(200, "La descripción no puede exceder los 200 caracteres")
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
    .min(3, "Debe tener al menos 3 caracteres")
    .max(50, "No puede tener más de 50 caracteres")
    .refine((val) => val.replace(/\s/g, "").length > 0, {
      message: "No puede estar vacío o tener solo espacios",
    }),
});

export type RenameFolderFormData = z.infer<typeof renameFolderSchema>;

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const medicalHistoryAddSchema = z.object({
  condition: z
    .string()
    .min(3, "Debe tener al menos 3 caracteres")
    .max(100, "Máximo 100 caracteres"),
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
  description: z.string().max(500, "Máximo 500 caracteres").optional(),
  issuer: z.string().max(100, "Máximo 100 caracteres").optional(),
  documentDate: z
    .date({ required_error: "Debes seleccionar una fecha válida" })
    .refine((date) => date <= new Date(), {
      message: "La fecha no puede ser futura",
    }),
  notes: z.string().max(500, "Máximo 500 caracteres").optional(),
  visibility: z.enum(["private", "shared"]),
  tags: z.array(z.string()).optional(),
  folderId: z.string().nullable().optional(),
  file: z
    .instanceof(File)
    .refine((file) => ACCEPTED_TYPES.includes(file.type), {
      message: "Formato no permitido. Usa PDF, JPEG, PNG o WEBP",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "El archivo supera los 10MB permitidos",
    }),
});

export type MedicalHistoryAddSchema = z.infer<typeof medicalHistoryAddSchema>;

export const medicalHistoryEditSchema = medicalHistoryAddSchema.extend({
  file: z
    .instanceof(File)
    .refine((file) => ACCEPTED_TYPES.includes(file.type), {
      message: "Formato no permitido. Usa PDF, JPEG, PNG o WEBP",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "El archivo supera los 10MB permitidos",
    })
    .optional(),
});

export type MedicalHistoryEditSchema = z.infer<typeof medicalHistoryEditSchema>;
