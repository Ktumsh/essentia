import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import LoginWrapper from "@/modules/auth/components/login-wrapper";
import { Session } from "@/types/session";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default async function LoginPage() {
  const session = (await auth()) as Session;

  if (session) {
    redirect("/");
  }
  return <LoginWrapper />;
}
