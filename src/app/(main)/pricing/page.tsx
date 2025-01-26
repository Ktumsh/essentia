import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { getSubscription } from "@/db/querys/payment-querys";
import FAQ from "@/modules/pricing/components/faq";
import PricingCards from "@/modules/pricing/components/pricing-cards";
import PricingHeader from "@/modules/pricing/components/pricing-header";

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
    <div className="flex min-h-dvh w-full flex-col">
      <div className="flex-1">
        <div className="w-full pb-16 md:pb-0">
          <div className="mx-auto flex max-w-6xl flex-col px-6 lg:px-0">
            <PricingHeader />
            <PricingCards session={session} isPremium={isPremium} />
          </div>
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
