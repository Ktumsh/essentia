import SignupForm from "./_components/signup-form";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Registrarse",
  alternates: {
    canonical: "/signup",
  },
};

export default function SignupPage() {
  return <SignupForm />;
}
