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

export async function signup(
  data: RegisterFormData,
): Promise<Result | undefined> {
  const { email, password, username, firstName, lastName, birthdate } = data;

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

  try {
    const { email, password, username, firstName, lastName, birthdate } =
      registerData;

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
}
