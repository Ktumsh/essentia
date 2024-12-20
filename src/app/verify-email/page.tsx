import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getUserByEmail } from "@/db/querys/user-querys";
import VerifyEmail from "@/modules/auth/components/verify-email";

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

  const [user] = await getUserByEmail(email);

  const userId = user ? user.id : null;

  if (!userId) {
    return redirect("/login");
  }

  return <VerifyEmail email={email} userId={userId} />;
};

export default VerifyEmailPage;
