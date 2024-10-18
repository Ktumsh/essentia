"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { ResultCode } from "@/utils/code";
import { AuthError } from "next-auth";
import { getStringFromBuffer } from "@/utils/common";
import {
  getUserByEmail,
  getUserByUsername,
  insertEmailVerificationToken,
} from "@/db/actions";

import { createAvatar } from "@dicebear/core";
import * as icons from "@dicebear/icons";
import { nanoid } from "nanoid";

const registerSchema = z.object({
  email: z.string().email(ResultCode.REQUIRED_EMAIL),
  password: z
    .string()
    .min(8, ResultCode.INVALID_LENGTH_PASSWORD)
    .regex(/[A-Z]/, ResultCode.INVALID_STRING_PASSWORD)
    .regex(/[a-z]/, ResultCode.INVALID_STRING_PASSWORD)
    .regex(/[0-9]/, ResultCode.INVALID_STRING_PASSWORD)
    .regex(/[^A-Za-z0-9]/, ResultCode.INVALID_STRING_PASSWORD),
  username: z
    .string()
    .min(3, ResultCode.INVALID_LENGTH_USERNAME)
    .max(20, ResultCode.INVALID_LENGTH_USERNAME)
    .regex(/^[a-zA-Z0-9_]+$/, ResultCode.INVALID_STRING_USERNAME)
    .regex(/^[a-zA-Z0-9]/, ResultCode.INVALID_START_USERNAME)
    .regex(/[a-zA-Z0-9]$/, ResultCode.INVALID_END_USERNAME),
  name: z.string().min(1, ResultCode.REQUIRED_NAME),
  lastname: z.string().min(1, ResultCode.REQUIRED_LASTNAME),
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
      message: ResultCode.INVALID_BIRTHDATE,
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
  const existingUserByEmail = await getUserByEmail(email);
  const existingUserByUsername = await getUserByUsername(username);

  if (existingUserByEmail) {
    return {
      type: "error",
      resultCode: ResultCode.EMAIL_EXISTS,
    };
  } else if (existingUserByUsername) {
    return {
      type: "error",
      resultCode: ResultCode.USERNAME_EXISTS,
    };
  } else {
    try {
      const userId = crypto.randomUUID();

      const avatar = createAvatar(icons, {
        seed: username,
        backgroundType: ["gradientLinear", "solid"],
      });

      const avatarSvg = avatar.toDataUri();

      await sql`
        INSERT INTO users (id, email, password_hash, salt, username, is_premium)
        VALUES (${userId}, ${email}, ${hashedPassword}, ${salt}, ${username}, FALSE);
      `;

      await sql`
        INSERT INTO user_profiles (user_id, first_name, last_name, birthdate, profile_image)
        VALUES (${userId}, ${name}, ${lastname}, ${birthdate}, ${avatarSvg});
      `;

      const verificationToken = nanoid();
      await insertEmailVerificationToken(userId, verificationToken);

      const result = await sendVerificationEmail(email, verificationToken);

      if (result.success) {
        return {
          type: "success",
          resultCode: ResultCode.USER_CREATED,
        };
      } else {
        return {
          type: "error",
          resultCode: ResultCode.UNKNOWN_ERROR,
        };
      }
    } catch (error) {
      console.error("Error inserting user into database:", error);
      return {
        type: "error",
        resultCode: ResultCode.UNKNOWN_ERROR,
      };
    }
  }
}

interface Result {
  type: string;
  resultCode: ResultCode;
  errors?: Record<string, string>;
  redirectUrl?: string;
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
    const { email, password, username, name, lastname, birthdate } =
      parsedCredentials.data;

    const existingUserByUsername = await getUserByUsername(username);
    if (existingUserByUsername) {
      return {
        type: "error",
        resultCode: ResultCode.USERNAME_EXISTS,
      };
    }

    const salt = crypto.randomUUID();
    const encoder = new TextEncoder();
    const saltedPassword = encoder.encode(password + salt);
    const hashedPasswordBuffer = await crypto.subtle.digest(
      "SHA-256",
      saltedPassword
    );
    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

    try {
      const result = await createUser({
        email,
        hashedPassword,
        salt,
        username,
        name,
        lastname,
        birthdate,
      });

      if (result.resultCode === ResultCode.USER_CREATED) {
        return {
          type: "success",
          resultCode: ResultCode.USER_CREATED,
          redirectUrl: `/verify-email?email=${email}`,
        };
      }

      return result;
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              type: "error",
              resultCode: ResultCode.INVALID_CREDENTIALS,
            };
          default:
            return {
              type: "error",
              resultCode: ResultCode.UNKNOWN_ERROR,
            };
        }
      } else {
        return {
          type: "error",
          resultCode: ResultCode.UNKNOWN_ERROR,
        };
      }
    }
  } else {
    const fieldErrors: Record<string, string> = {};

    parsedCredentials.error.errors.forEach((issue) => {
      if (issue.path.length > 0) {
        fieldErrors[issue.path[0]] = issue.message;
      }
    });
    return {
      type: "error",
      resultCode: ResultCode.ALL_FIELDS_REQUIRED,
      errors: fieldErrors,
    };
  }
}
