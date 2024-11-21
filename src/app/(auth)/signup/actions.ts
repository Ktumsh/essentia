// src/modules/auth/lib/signup.ts
"use server";

import { createAvatar } from "@dicebear/core";
import * as icons from "@dicebear/icons";
import { sql } from "@vercel/postgres";
import { nanoid } from "nanoid";
import { AuthError } from "next-auth";

import { insertEmailVerificationToken } from "@/db/email-querys";
import { getUserByEmail, getUserByUsername } from "@/db/user-querys";
import { registerSchema } from "@/modules/auth/lib/form";
import { sendEmail } from "@/modules/auth/lib/send-email";
import { ResultCode } from "@/utils/code";
import { getStringFromBuffer } from "@/utils/common";

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

      const result = await sendEmail(email, verificationToken);

      if (result?.success) {
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
  formData: FormData,
): Promise<Result | undefined> {
  const entries = formData.entries();
  const parsedCredentials = registerSchema.safeParse(
    Object.fromEntries(entries),
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
      saltedPassword,
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
        birthdate: birthdate.toISOString(),
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
