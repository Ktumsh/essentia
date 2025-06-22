import { redirect } from "next/navigation";

import VerifyEmail from "./verify-email";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verificar correo electrónico",
  alternates: {
    canonical: "/verify-email",
  },
};

type VerifyEmailProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailProps) {
  const { email } = await searchParams;

  if (!email) {
    return redirect("/login");
  }

  return <VerifyEmail email={email} />;
}
