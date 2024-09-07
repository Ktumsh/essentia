import LoginWrapper from "@/modules/auth/components/login-wrapper";
import { Session } from "@/types/session";
import { auth } from "@@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
