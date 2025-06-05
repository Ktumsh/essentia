import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getPaymentHistory } from "@/db/querys/payment-querys";

import SubscriptionsStgWrp from "./_components/subscriptions-stg-wrp";

export const metadata: Metadata = {
  title: "Configuración / Suscripciones",
  alternates: {
    canonical: "/settings/subscriptions",
  },
};

const SubscriptionsSettingsPage = async () => {
  const session = await auth();

  if (!session) return null;

  const userId = session?.user?.id as string;

  const paymentHistory = session ? await getPaymentHistory(userId) : [];

  return <SubscriptionsStgWrp paymentHistory={paymentHistory} />;
};

export default SubscriptionsSettingsPage;
