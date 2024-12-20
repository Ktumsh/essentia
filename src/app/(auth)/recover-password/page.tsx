import { Metadata } from "next";

import RecoverPass from "@/modules/auth/components/recover-password/recover-pass";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
};

const RecoverPasswordPage = async () => {
  return <RecoverPass />;
};

export default RecoverPasswordPage;
