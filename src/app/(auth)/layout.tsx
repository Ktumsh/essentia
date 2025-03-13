import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";

import AuthWrapper from "./_components/auth-wrapper";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return <AuthWrapper>{children}</AuthWrapper>;
}
