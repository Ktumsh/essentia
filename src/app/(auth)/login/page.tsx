import { Metadata } from "next";

import LoginForm from "@/modules/auth/components/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default async function LoginPage() {
  return <LoginForm />;
}
