import { Metadata } from "next";

import AccountHeader from "@/modules/account/components/account-header";

export const metadata: Metadata = {
  title: "Suscripción y Facturación",
  alternates: {
    canonical: "/account/billing",
  },
};

const BillingPage = () => {
  return <AccountHeader title="Suscripción y Facturación" />;
};

export default BillingPage;
