import { Metadata } from "next";

import SignupWrapper from "@/modules/auth/components/signup-wrapper";

export const metadata: Metadata = {
  title: "Registrarse",
};

export default async function LoginPage() {
  return <SignupWrapper />;
}
