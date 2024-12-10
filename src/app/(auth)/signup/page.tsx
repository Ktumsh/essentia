import { Metadata } from "next";

import SignupForm from "@/modules/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Registrarse",
};

export default async function LoginPage() {
  return <SignupForm />;
}
