import RecoverPass from "./_components/recover-pass";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Recuperar contraseña",
};

export default function RecoverPasswordPage() {
  return <RecoverPass />;
}
