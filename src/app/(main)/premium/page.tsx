import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getUserCurrentPlan } from "@/modules/payment/pay/actions";
import FAQ from "@/modules/premium/components/faq";
import PricingCards from "@/modules/premium/components/pricing-cards";

export const metadata: Metadata = {
  title: "Premium",
  alternates: {
    canonical: "/premium",
  },
};

const PremiumPage = async () => {
  const session = await auth();
  const currentPriceId = session ? await getUserCurrentPlan(session) : null;
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <div className="flex-1">
        <div className="w-full pb-16 md:pb-0">
          <PricingCards session={session} currentPriceId={currentPriceId} />
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
