import LoginForm from "@/modules/auth/components/login-form";
import SignFooter from "@/modules/auth/components/sign-footer";
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
  return (
    <main className="relative w-full">
      <LoginForm />
      <SignFooter />
    </main>
  );
}
