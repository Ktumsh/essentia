// eslint-disable-next-line
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    username?: string;
    lastname?: string;
    birthdate?: string;
  }
}
