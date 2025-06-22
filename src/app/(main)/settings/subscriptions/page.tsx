import { auth } from "@/app/(auth)/auth";
import { getPaymentHistory } from "@/db/querys/payment-querys";

import SubscriptionsStgWrp from "./_components/subscriptions-stg-wrp";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración / Suscripciones",
  alternates: {
    canonical: "/settings/subscriptions",
  },
};

export default async function SubscriptionsSettingsPage() {
  const session = await auth();

  if (!session) return null;

  const userId = session?.user?.id as string;

  const paymentHistory = userId ? await getPaymentHistory(userId) : [];

  return <SubscriptionsStgWrp paymentHistory={paymentHistory} />;
}
