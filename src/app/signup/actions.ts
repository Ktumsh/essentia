"use server";

import { z } from "zod";
import { kv } from "@vercel/kv";
import { ErrorMessages } from "@/modules/auth/lib/error-message";
import { getStringFromBuffer } from "@/utils/common";
import { getUser } from "../login/actions";
import { ResultCode } from "@/utils/code";
import { signIn } from "@@/auth";
import { AuthError } from "next-auth";

const registerSchema = z.object({
  email: z.string().email(ErrorMessages.REQUIRED_EMAIL),
  password: z
    .string()
    .min(8, ErrorMessages.REQUIRED_PASSWORD)
    .regex(/[A-Z]/, ErrorMessages.INVALID_PASSWORD)
    .regex(/[a-z]/, ErrorMessages.INVALID_PASSWORD)
    .regex(/[0-9]/, ErrorMessages.INVALID_PASSWORD)
    .regex(/[^A-Za-z0-9]/, ErrorMessages.INVALID_PASSWORD),
  username: z.string().min(3, ErrorMessages.REQUIRED_USERNAME),
  name: z.string().min(1, ErrorMessages.REQUIRED_NAME),
  lastname: z.string().min(1, ErrorMessages.REQUIRED_LASTNAME),
  birthdate: z.string().refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      const dayDifference = today.getDate() - birthDate.getDate();

      if (birthDate.getFullYear() < 1900 || birthDate > today) {
        return false;
      }

      if (age > 13) return true;
      if (age === 13 && monthDifference > 0) return true;
      if (age === 13 && monthDifference === 0 && dayDifference >= 0)
        return true;
      return false;
    },
    {
      message: ErrorMessages.INVALID_BIRTHDATE,
    }
  ),
});

interface CreateUserProps {
  email: string;
  hashedPassword: string;
  salt: string;
  username: string;
  name: string;
  lastname: string;
  birthdate: string;
}

export async function createUser({
  email,
  hashedPassword,
  salt,
  username,
  name,
  lastname,
  birthdate,
}: CreateUserProps) {
  const existingUser = await getUser(email);

  if (existingUser) {
    return {
      type: "error",
      resultCode: ResultCode.UserAlreadyExists,
      errors: { email: "Este correo ya está registrado." },
    };
  } else {
    const user = {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      salt,
      username,
      name,
      lastname,
      birthdate,
    };

    await kv.hmset(`user:${email}`, user);

    return {
      type: "success",
      resultCode: ResultCode.UserCreated,
    };
  }
}

interface Result {
  type: string;
  resultCode: ResultCode;
  errors?: Record<string, string>;
}

export async function signup(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  const entries = formData.entries();
  const parsedCredentials = registerSchema.safeParse(
    Object.fromEntries(entries)
  );

  if (parsedCredentials.success) {
    const password = parsedCredentials.data.password;
    const salt = crypto.randomUUID();

    const encoder = new TextEncoder();
    const saltedPassword = encoder.encode(password + salt);
    const hashedPasswordBuffer = await crypto.subtle.digest(
      "SHA-256",
      saltedPassword
    );
    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

    try {
      const { email, username, name, lastname, birthdate } =
        parsedCredentials.data;

      const result = await createUser({
        email,
        hashedPassword,
        salt,
        username,
        name,
        lastname,
        birthdate,
      });

      if (result.resultCode === ResultCode.UserCreated) {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      }

      return result;
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              type: "error",
              resultCode: ResultCode.InvalidCredentials,
              errors: { general: "Error de autenticación." },
            };
          default:
            return {
              type: "error",
              resultCode: ResultCode.UnknownError,
              errors: { general: "Error desconocido." },
            };
        }
      } else {
        return {
          type: "error",
          resultCode: ResultCode.UnknownError,
          errors: { general: "Error desconocido." },
        };
      }
    }
  } else {
    // Convierte los errores de string[] a string
    const flattenedErrors: Record<string, string> = Object.fromEntries(
      Object.entries(parsedCredentials.error.flatten().fieldErrors).map(
        ([key, value]) => [key, value?.join(", ") || ""]
      )
    );

    return {
      type: "error",
      resultCode: ResultCode.InvalidCredentials,
      errors: flattenedErrors,
    };
  }
}
