import { Metadata } from "next";

import AccountHeader from "@/modules/account/components/account-header";

export const metadata: Metadata = {
  title: "Perfil",
  alternates: {
    canonical: "/profile",
  },
};

const ProfilePage = async () => {
  return <AccountHeader title="Perfil" />;
};

export default ProfilePage;
