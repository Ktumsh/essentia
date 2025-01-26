import { Metadata } from "next";

import LoginForm from "@/modules/auth/components/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  alternates: {
    canonical: "/login",
  },
};

export default async function LoginPage() {
  return <LoginForm />;
}
