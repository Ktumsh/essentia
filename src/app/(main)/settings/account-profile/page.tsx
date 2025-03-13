import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getUserProfileData } from "@/utils/profile";

import AccountStgWrp from "../_components/account-stg-wrp";

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
