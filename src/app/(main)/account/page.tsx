import AccountHeader from "@/modules/account/components/account-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cuenta",
};

const AccountPage = () => {
  return <AccountHeader title="Cuenta" />;
};

export default AccountPage;
