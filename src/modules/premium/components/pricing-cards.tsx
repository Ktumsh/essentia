"use client";

import { Session } from "next-auth";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { siteConfig } from "@/config/site";
import { usePlan } from "@/modules/core/hooks/use-current-plan";

import PricingCard from "./pricing-card";
import PricingSelector from "./pricing-selector";
import {
  getPlanDescription,
  getPlanFeatures,
  getPlanName,
  getPlanSubname,
} from "../lib/utils";

interface PricingCardsProps {
  session: Session | null;
  isPremium: boolean | null;
}

const PricingCards = ({ session, isPremium }: PricingCardsProps) => {
  const { free, premium, premiumPlus } = siteConfig.planPrices;
  const PLANS = [free, premium, premiumPlus];

  const { currentPlan } = usePlan();

  const isMobile = useIsMobile();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-3 py-10 md:gap-12 md:py-20 lg:px-6 xl:px-0">
      <div className="z-10 grid justify-items-center gap-3 md:gap-4">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-5xl">
          Precios
        </h1>
        <p className="max-w-md text-center text-sm text-main-h dark:text-main-dark-h md:max-w-[850px] md:text-base">
          Actualiza al plan Premium para obtener acceso a todas las
          funcionalidades de Essentia AI, diseñadas para brindarte una
          experiencia personalizada y ayudarte a alcanzar tus objetivos de
          bienestar, salud y fitness.
        </p>
      </div>
      <div className="w-full">
        {isMobile ? (
          <div className="mx-auto w-full max-w-[450px] md:hidden">
            <PricingSelector
              session={session}
              currentPriceId={currentPlan}
              isPremium={isPremium}
            />
          </div>
        ) : (
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-4 lg:gap-6 xl:gap-12">
              {PLANS.map((plan, index) => (
                <PricingCard
                  key={index}
                  session={session}
                  title={getPlanName(plan)}
                  subtitle={getPlanSubname(currentPlan, plan)}
                  description={getPlanDescription(plan)}
                  priceId={plan}
                  isCurrentPlan={currentPlan === plan}
                  price={plan === free ? 0 : plan === premium ? 9500 : 91200}
                  isPremiumPlan={plan === premium}
                  isPremiumPlusPlan={plan === premiumPlus}
                  isPremium={isPremium}
                  features={getPlanFeatures(plan)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCards;
