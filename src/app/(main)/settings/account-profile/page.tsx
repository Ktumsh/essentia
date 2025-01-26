import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import AccountStgWrp from "@/modules/settings/components/account-stg-wrp";
import { getUserProfileData } from "@/utils/profile";

export const metadata: Metadata = {
  title: "Configuración / Cuenta y perfil",
  alternates: {
    canonical: "/settings/account-profile",
  },
};

const AccountStgPage = async () => {
  const session = await auth();

  if (!session?.user) return null;

  const userData = session ? await getUserProfileData({ session }) : null;

  return <AccountStgWrp user={userData} />;
};

export default AccountStgPage;
