import { Metadata } from "next";

import AccountHeader from "@/modules/account/components/account-header";

export const metadata: Metadata = {
  title: "Suscripción",
  alternates: {
    canonical: "/suscripcion",
  },
};

const SubscriptionPage = () => {
  return <AccountHeader title="Suscripción" />;
};

export default SubscriptionPage;
