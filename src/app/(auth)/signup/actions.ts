"use server";

import { set } from "date-fns";
import { AuthError } from "next-auth";

import { createUser } from "@/db/querys/user-querys";
import { RegisterFormData, registerSchema } from "@/modules/auth/lib/form";
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
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const birthdateStr = formData.get("birthdate") as string;
  const birthdate = new Date(birthdateStr);

  const normalizedBirthdate = set(birthdate, {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const registerData: RegisterFormData = {
    email,
    password,
    username,
    firstName,
    lastName,
    birthdate: normalizedBirthdate,
  };

  const parsedCredentials = registerSchema.safeParse(registerData);

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
