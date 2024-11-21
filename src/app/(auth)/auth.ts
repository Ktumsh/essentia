import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "@/db/user-querys";
import { getStringFromBuffer } from "@/utils/common";

import { authConfig } from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        const user = await getUserByEmail(email);

        if (!user) return null;

        if (!user.email_verified) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        const encoder = new TextEncoder();
        const saltedPassword = encoder.encode(password + user.salt);
        const hashedPasswordBuffer = await crypto.subtle.digest(
          "SHA-256",
          saltedPassword,
        );
        const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

        if (hashedPassword === user.password_hash) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { id } = token as { id: string };
        const { user } = session;

        session = { ...session, user: { ...user, id } };
      }

      return session;
    },
  },
  trustHost: true,
});
