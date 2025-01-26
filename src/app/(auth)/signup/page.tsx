import { Metadata } from "next";

import SignupForm from "@/modules/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Registrarse",
  alternates: {
    canonical: "/signup",
  },
};

export default async function SignupPage() {
  return <SignupForm />;
}
