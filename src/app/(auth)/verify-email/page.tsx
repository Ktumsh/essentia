import { getUserByEmail } from "@/db/user-querys";
import VerifyEmail from "@/modules/auth/components/verify-email";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { email?: string };
};

const VerifyEmailPage = async ({ searchParams }: Props) => {
  const { email } = searchParams;

  if (!email) {
    return redirect("/login");
  }

  const user = email ? await getUserByEmail(email) : null;

  const userId = user?.id;

  if (!userId) {
    return redirect("/login");
  }

  return <VerifyEmail email={email} userId={userId} />;
};

export default VerifyEmailPage;
