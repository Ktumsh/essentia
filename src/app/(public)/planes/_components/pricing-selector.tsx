"use client";

import { Session } from "next-auth";
import { useState } from "react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/kit/tabs";
import { siteConfig } from "@/config/site.config";
import {
  SUBSCRIPTION_PLANS,
  SubscriptionPlanType,
} from "@/consts/subscriptions-plans";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { cn } from "@/lib/utils";

import PricingCard from "./pricing-card";

interface PricingSelectorProps {
  session: Session | null;
  currentPriceId: string | null;
  isPremium: boolean | null;
}

const PricingSelector = ({
  session,
  currentPriceId,
  isPremium,
}: PricingSelectorProps) => {
  const { premium, premiumPlus } = siteConfig.plan;
  const { trial } = useUserSubscription();

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType>(() => {
    const current = SUBSCRIPTION_PLANS.find(
      (plan) => plan.id === currentPriceId,
    );

    if (current && current.id === SUBSCRIPTION_PLANS[0].id) {
      return SUBSCRIPTION_PLANS[1];
    }

    return current || SUBSCRIPTION_PLANS[0];
  });

  return (
    <Tabs
      value={selectedPlan.id}
      onValueChange={(value) => {
        const plan = SUBSCRIPTION_PLANS.find((p) => p.id === value);
        if (plan) setSelectedPlan(plan);
      }}
      className="w-full"
    >
      <TabsList className="mb-4 w-full rounded-full">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <TabsTrigger
            key={plan.id}
            value={plan.id}
            className={cn(
              "flex-1 rounded-full",
              selectedPlan.id === plan.id &&
                plan.id === premium &&
                "bg-premium data-[state=active]:text-white",
              selectedPlan.id === plan.id &&
                plan.id === premiumPlus &&
                "bg-premium-plus data-[state=active]:text-white",
            )}
          >
            {plan.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {SUBSCRIPTION_PLANS.map((plan) => (
        <TabsContent key={plan.id} value={plan.id}>
          {selectedPlan.id === plan.id && (
            <PricingCard
              session={session}
              isCurrentPlan={
                (trial?.isActive && plan.id === premium) ||
                (!trial?.isActive && currentPriceId === plan.id)
              }
              isPremiumPlan={plan.id === premium}
              isPremium={isPremium}
              plan={plan}
            />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default PricingSelector;
