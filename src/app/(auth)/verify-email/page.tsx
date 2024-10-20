import { getUserByEmail } from "@/db/actions";
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

  const user = await getUserByEmail(email);
  const userId = user?.id;

  console.log("Email:", email);
  console.log("UserId:", user?.id);

  if (!userId) {
    return redirect("/login");
  }

  return <VerifyEmail email={email} userId={userId} />;
};

export default VerifyEmailPage;
