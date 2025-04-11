"use client";

import { Session } from "next-auth";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/kit/select";
import { siteConfig } from "@/config/site.config";
import {
  SUBSCRIPTION_PLANS,
  SubscriptionPlanType,
} from "@/consts/subscriptions-plans";

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
  const { premium } = siteConfig.plan;

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType>(
    SUBSCRIPTION_PLANS.find((plan) => plan.id === currentPriceId) ||
      SUBSCRIPTION_PLANS[0],
  );

  return (
    <>
      <div className="mb-4">
        <Select
          aria-label="Selecciona un plan"
          value={selectedPlan?.id}
          onValueChange={(value) => {
            const plan = SUBSCRIPTION_PLANS.find((p) => p.id === value);
            if (plan) setSelectedPlan(plan);
          }}
        >
          <SelectTrigger>
            <SelectValue>{selectedPlan?.name}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SUBSCRIPTION_PLANS.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  <div className="flex items-center gap-2">
                    <span>{plan.name}</span>
                    <span className="text-muted-foreground text-xs font-medium">
                      {plan.label}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <PricingCard
        session={session}
        isCurrentPlan={currentPriceId === selectedPlan.id}
        isPremiumPlan={selectedPlan.id === premium}
        isPremium={isPremium}
        plan={selectedPlan}
      />
    </>
  );
};

export default PricingSelector;
