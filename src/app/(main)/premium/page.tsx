import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getUserCurrentPlan } from "@/modules/payment/pay/actions";
import FAQ from "@/modules/premium/components/faq";
import PricingCards from "@/modules/premium/components/pricing-cards";
import { Session } from "@/types/session";

export const metadata: Metadata = {
  title: "Premium",
};

const PremiumPage = async () => {
  const session = (await auth()) as Session;
  const currentPriceId = session ? await getUserCurrentPlan(session) : null;
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <div className="flex-1">
        <div className="w-full">
          <PricingCards session={session} currentPriceId={currentPriceId} />
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
