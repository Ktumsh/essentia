"use server";

import { signIn } from "@@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { ResultCode } from "@/utils/code";

interface Result {
  type: string;
  resultCode: ResultCode;
}

export async function authenticate(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const parsedCredentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      .safeParse({ email, password });

    if (parsedCredentials.success) {
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
    } else {
      return {
        type: "error",
        resultCode: ResultCode.INVALID_CREDENTIALS,
      };
    }
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
