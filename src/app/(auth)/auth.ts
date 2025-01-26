import { compare } from "bcrypt-ts";
import NextAuth, { Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "@/db/querys/user-querys";

import { authConfig } from "./auth.config";

interface ExtendedSession extends Session {
  user: User;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        const [user] = await getUserByEmail(email);

        if (!user) return null;

        if (!user.emailVerified) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        const passwordsMatch = await compare(password, user.password!);

        if (!passwordsMatch) return null;

        return user;
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
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
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
