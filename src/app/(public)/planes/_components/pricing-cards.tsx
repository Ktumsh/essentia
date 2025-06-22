"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Session } from "next-auth";
import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";
import { SUBSCRIPTION_PLAN_DATA } from "@/db/data/subscription-plan-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserSubscription } from "@/hooks/use-user-subscription";

import PricingCard from "./pricing-card";
import PricingSelector from "./pricing-selector";
import useScrollCheck from "../_hooks/use-scroll-check";

interface PricingCardsProps {
  session: Session | null;
  currentPlan: string;
}

const PricingCards = ({ session, currentPlan }: PricingCardsProps) => {
  const { premium } = siteConfig.plan;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasScroll, setHasScroll] = useState(false);

  const { trial, subscription } = useUserSubscription();

  const isPremium = subscription?.subscription.isPremium || false;
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
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
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
            className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto py-4 xl:overflow-visible"
          >
            {SUBSCRIPTION_PLAN_DATA.map((plan, index) => (
              <PricingCard
                key={index}
                session={session}
                isCurrentPlan={
                  (trial?.isActive && plan.id === premium) ||
                  (!trial?.isActive && currentPlan === plan.id)
                }
                isPremiumPlan={plan.id === premium}
                isPremium={isPremium}
                plan={plan}
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
