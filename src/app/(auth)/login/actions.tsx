"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/app/(auth)/auth";
import { getUserByEmail } from "@/db/querys/user-querys";
import { LoginFormData } from "@/lib/form-schemas";
import { ResultCode } from "@/utils/errors";

interface Result {
  type: string;
  resultCode: ResultCode;
  redirectUrl?: string;
  errors?: Record<string, string>;
}

export async function authenticate(
  data: LoginFormData,
): Promise<Result | undefined> {
  try {
    const { email, password } = data;

    const [user] = await getUserByEmail(email);

    if (!user) {
      return {
        type: "error",
        resultCode: ResultCode.INVALID_CREDENTIALS,
      };
    }

    if (!user.emailVerified) {
      return {
        type: "error",
        resultCode: ResultCode.EMAIL_NOT_VERIFIED,
        redirectUrl: `/verify-email?email=${email}`,
      };
    }

    if (user.status === "disabled") {
      return {
        type: "error",
        resultCode: ResultCode.INVALID_CREDENTIALS,
      };
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        type: "error",
        resultCode: ResultCode.INVALID_CREDENTIALS,
      };
    }

    return {
      type: "success",
      resultCode: ResultCode.USER_LOGGED_IN,
    };
  } catch (error: any) {
    if (error.message === "EMAIL_NOT_VERIFIED") {
      return {
        type: "error",
        resultCode: ResultCode.EMAIL_NOT_VERIFIED,
        redirectUrl: `/verify-email?email=${data.email}`,
      };
    } else if (error instanceof AuthError) {
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
