"use server";

import { set } from "date-fns";
import { AuthError } from "next-auth";

import { createUser } from "@/db/querys/user-querys";
import { RegisterFormData } from "@/lib/form-schemas";
import { ResultCode } from "@/utils/errors";

interface Result {
  type: string;
  resultCode: ResultCode;
  errors?: Record<string, string>;
  redirectUrl?: string;
}

export async function signup(data: RegisterFormData): Promise<Result> {
  const { email, password, username, firstName, lastName, birthdate } = data;

  const normalizedBirthdate = set(birthdate, {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  try {
    await createUser(
      email,
      password,
      username,
      firstName,
      lastName,
      normalizedBirthdate,
    );

    return {
      type: "success",
      resultCode: "USER_CREATED",
      redirectUrl: `/verify-email?email=${email}`,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            type: "error",
            resultCode: "INVALID_CREDENTIALS",
          };
        default:
          return {
            type: "error",
            resultCode: "UNKNOWN_ERROR",
          };
      }
    }

    return {
      type: "error",
      resultCode: "UNKNOWN_ERROR",
    };
  }
}
