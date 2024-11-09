import { Metadata } from "next";
import dynamic from "next/dynamic";

import { auth } from "@/app/(auth)/auth";
import DesktopFooter from "@/modules/core/components/ui/layout/desktop-footer";
import { getUserCurrentPlan } from "@/modules/payment/pay/actions";
import PricingCards from "@/modules/premium/components/pricing-cards";
import { Session } from "@/types/session";

const FAQ = dynamic(() => import("@/modules/premium/components/faq"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Premium",
};

const PremiumPage = async () => {
  const session = (await auth()) as Session;
  const currentPriceId = session ? await getUserCurrentPlan(session) : null;
  return (
    <>
      <div className="flex min-h-dvh w-full flex-col pt-14">
        <div className="flex-1">
          <div className="w-full">
            <PricingCards session={session} currentPriceId={currentPriceId} />
            <FAQ />
          </div>
        </div>
      </div>
      <DesktopFooter />
    </>
  );
};

export default PremiumPage;
