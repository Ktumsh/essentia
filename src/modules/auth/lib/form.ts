import { z } from "zod";

import { getMessageFromCode, ResultCode } from "@/utils/code";

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
    message: getMessageFromCode(ResultCode.INVALID_LENGTH_PASSWORD),
  }),
  remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const emailSchema = z.object({
  email: z
    .string()
    .email({ message: getMessageFromCode(ResultCode.REQUIRED_EMAIL) }),
});

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
