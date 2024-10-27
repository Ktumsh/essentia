import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import AuthWrapper from "@/modules/auth/components/auth-wrapper";
import { Session } from "@/types/session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as Session;

  if (session) {
    redirect("/");
  }
  return <AuthWrapper>{children}</AuthWrapper>;
}
