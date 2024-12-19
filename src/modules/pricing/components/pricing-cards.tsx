"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Session } from "next-auth";
import { useCallback, useRef, useState } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { usePlan } from "@/modules/core/hooks/use-current-plan";

import PricingCard from "./pricing-card";
import PricingSelector from "./pricing-selector";
import useScrollCheck from "../hooks/use-scroll-check";
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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasScroll, setHasScroll] = useState(false);

  const { currentPlan } = usePlan();

  const isMobile = useIsMobile();

  useScrollCheck(containerRef, setHasScroll);

  const handleScroll = useCallback(
    (direction: "left" | "right") => {
      const SCROLL_DISTANCE = 352;
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: direction === "left" ? -SCROLL_DISTANCE : SCROLL_DISTANCE,
          behavior: "smooth",
        });
      }
    },
    [containerRef],
  );

  return (
    <div className="w-full pb-12 md:pb-16">
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
          <div
            ref={containerRef}
            className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 scrollbar-hide"
          >
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
          {hasScroll && (
            <div className="flex justify-between">
              <Button
                size="icon"
                radius="full"
                variant="outline"
                onClick={() => handleScroll("left")}
              >
                <ArrowLeft />
                <span className="sr-only">Anterior</span>
              </Button>
              <Button
                size="icon"
                radius="full"
                variant="outline"
                onClick={() => handleScroll("right")}
              >
                <ArrowRight />
                <span className="sr-only">Siguiente</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PricingCards;
