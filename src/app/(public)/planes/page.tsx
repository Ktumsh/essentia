import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getSubscription } from "@/db/querys/payment-querys";

import FAQ from "./_components/faq";
import PlanComparisonTable from "./_components/plan-comparison-table";
import PricingCards from "./_components/pricing-cards";
import PricingHeader from "./_components/pricing-header";

export const metadata: Metadata = {
  title: "Planes y Precios",
  alternates: {
    canonical: "/pricing",
  },
};

const PricingPage = async () => {
  const session = await auth();
  const subscription = session
    ? await getSubscription(session.user?.id as string)
    : null;

  const isPremium = subscription ? subscription[0].isPremium : false;

  return (
    <div className="mt-14 bg-slate-50 text-base">
      <PricingHeader />
      <PricingCards session={session} isPremium={isPremium} />
      <PlanComparisonTable />
      <FAQ />
    </div>
  );
};

export default PricingPage;
