import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getSubscription } from "@/db/querys/payment-querys";
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
  const subscription = session
    ? await getSubscription(session.user?.id as string)
    : null;

  const isPremium = subscription ? subscription[0].isPremium : false;

  return (
    <div className="flex min-h-dvh w-full flex-col">
      <div className="flex-1">
        <div className="w-full pb-16 md:pb-0">
          <PricingCards session={session} isPremium={isPremium} />
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
