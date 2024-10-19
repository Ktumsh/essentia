import { Metadata } from "next";
import SignupWrapper from "@/modules/auth/components/signup-wrapper";
import { auth } from "@/app/(auth)/auth";
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
  return <SignupWrapper />;
}
