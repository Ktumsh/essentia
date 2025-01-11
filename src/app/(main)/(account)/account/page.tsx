import { Metadata } from "next";

import AccountHeader from "@/modules/account/components/account-header";

export const metadata: Metadata = {
  title: "Cuenta",
  alternates: {
    canonical: "/account",
  },
};

const AccountPage = async () => {
  return <AccountHeader title="Cuenta" />;
};

export default AccountPage;
