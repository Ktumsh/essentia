import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { getStringFromBuffer } from "@/utils/common";
import { getUserByEmail } from "@/db/actions";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);

          if (!user) return null;

          const encoder = new TextEncoder();
          const saltedPassword = encoder.encode(password + user.salt);
          const hashedPasswordBuffer = await crypto.subtle.digest(
            "SHA-256",
            saltedPassword
          );
          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

          if (hashedPassword === user.password_hash) {
            return user;
          } else {
            return null;
          }
        }

        return null;
      },
    }),
  ],
  trustHost: true,
});
