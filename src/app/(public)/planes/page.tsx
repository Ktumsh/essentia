
import { auth } from "@/app/(auth)/auth";
import { getSubscription } from "@/db/querys/payment-querys";

import FAQ from "./_components/faq";
import PlanComparisonTable from "./_components/plan-comparison-table";
import PricingCards from "./_components/pricing-cards";
import PricingHeader from "./_components/pricing-header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planes y Precios",
  alternates: {
    canonical: "/pricing",
  },
};

const PricingPage = async () => {
  const session = await auth();
  const userId = session?.user?.id as string;
  const [subscription] = userId ? await getSubscription(userId) : [];
  const currentPlan = subscription?.type ?? "free";

  return (
    <div className="bg-muted mt-14 text-base">
      <PricingHeader />
      <PricingCards session={session} currentPlan={currentPlan} />
      <PlanComparisonTable />
      <FAQ />
    </div>
  );
};

export default PricingPage;
