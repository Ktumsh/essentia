import { Metadata } from "next";
import SignFooter from "@/modules/auth/components/sign-footer";
import SignUpForm from "@/modules/auth/components/signup-form";
import { auth } from "@@/auth";
import { Session } from "@/types/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Registrarse",
};

export default async function LoginPage() {
  const session = (await auth()) as Session;

  if (session) {
    redirect("/");
  }
  return (
    <main className="relative w-full">
      <SignUpForm />
      <SignFooter />
    </main>
  );
}
