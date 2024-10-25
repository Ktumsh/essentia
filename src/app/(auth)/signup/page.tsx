import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import SignupWrapper from "@/modules/auth/components/signup-wrapper";
import { Session } from "@/types/session";


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
