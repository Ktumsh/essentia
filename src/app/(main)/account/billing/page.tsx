import AccountHeader from "@/modules/account/components/account-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suscripción y Facturación",
};

const BillingPage = () => {
  return <AccountHeader title="Suscripción y Facturación" />;
};

export default BillingPage;
