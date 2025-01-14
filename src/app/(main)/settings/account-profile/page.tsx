import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import AccountSettingsWrapper from "@/modules/settings/components/account-settings-wrapper";
import { getUserProfileData } from "@/utils/profile";

export const metadata: Metadata = {
  title: "Configuración / Cuenta y perfil",
  alternates: {
    canonical: "/settings/account-profile",
  },
};

const AccountSettingsPage = async () => {
  const session = await auth();

  const userData = session ? await getUserProfileData({ session }) : null;

  return <AccountSettingsWrapper user={userData} />;
};

export default AccountSettingsPage;
