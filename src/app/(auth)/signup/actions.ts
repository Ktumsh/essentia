"use server";

import { AuthError } from "next-auth";

import { createUser } from "@/db/querys/user-querys";
import { registerSchema } from "@/modules/auth/lib/form";
import { ResultCode } from "@/utils/code";

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
    const { email, password, username, firstName, lastName, birthdate } =
      parsedCredentials.data;

    try {
      const result = await createUser(
        email,
        password,
        username,
        firstName,
        lastName,
        birthdate,
      );

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
