import DesktopFooter from "@/modules/core/components/ui/layout/desktop-footer";
import { getUserCurrentPlan } from "@/modules/payment/pay/actions";
import FAQ from "@/modules/premium/components/faq";
import PricingCards from "@/modules/premium/components/pricing-cards";
import { Session } from "@/types/session";
import { auth } from "@@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium",
};

const PremiumPage = async () => {
  const session = (await auth()) as Session;
  const currentPriceId = session ? await getUserCurrentPlan(session) : null;
  return (
    <>
      <div className="flex flex-col min-h-dvh w-full pt-14">
        <main className="flex-1">
          <div className="w-full">
            <PricingCards session={session} currentPriceId={currentPriceId} />
            <FAQ />
          </div>
        </main>
      </div>
      <DesktopFooter />
    </>
  );
};

export default PremiumPage;
