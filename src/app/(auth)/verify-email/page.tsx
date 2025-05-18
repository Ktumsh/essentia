import { Metadata } from "next";
import { redirect } from "next/navigation";

import VerifyEmail from "./verify-email";

export const metadata: Metadata = {
  title: "Verificar correo electrónico",
  alternates: {
    canonical: "/verify-email",
  },
};

type Props = {
  searchParams: Promise<{ email?: string }>;
};

const VerifyEmailPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const { email } = searchParams;

  if (!email) {
    return redirect("/login");
  }

  return <VerifyEmail email={email} />;
};

export default VerifyEmailPage;
