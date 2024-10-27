import { Metadata } from "next";

import LoginWrapper from "@/modules/auth/components/login-wrapper";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default async function LoginPage() {
  return <LoginWrapper />;
}
