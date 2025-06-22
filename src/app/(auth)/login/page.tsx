import LoginForm from "./login-form";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Iniciar sesión",
  alternates: {
    canonical: "/login",
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
