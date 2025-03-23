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

import PricingCard from "./pricing-card";
import {
  getPlanDescription,
  getPlanFeatures,
  getPlanName,
  getPlanSubname,
} from "../_lib/utils";

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
  const id = currentPriceId;
  const { free, premium, premiumPlus } = siteConfig.plan;
  const PLANS = [free, premium, premiumPlus];

  const [selectedPlan, setSelectedPlan] = useState<string>(
    id === free ? premium : id || free,
  );

  const isRecommended = selectedPlan === premium;
  const isAnual = selectedPlan === premiumPlus;
  const planPrice =
    selectedPlan === free ? 0 : selectedPlan === premium ? 9500 : 91200;

  return (
    <>
      <div className="mb-4">
        <Select
          aria-label="Selecciona un plan"
          value={selectedPlan}
          onValueChange={(value) => setSelectedPlan(value)}
        >
          <SelectTrigger>
            <SelectValue>{getPlanName(selectedPlan)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {PLANS.map((plan) => (
                <SelectItem key={plan} value={plan}>
                  <div className="flex items-center gap-2">
                    <span>{getPlanName(plan)}</span>
                    <span className="text-muted-foreground text-xs font-medium">
                      {getPlanSubname(id, plan)}
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
        title={getPlanName(selectedPlan)}
        subtitle={getPlanSubname(id, selectedPlan)}
        description={getPlanDescription(selectedPlan)}
        priceId={selectedPlan}
        isCurrentPlan={id === selectedPlan}
        price={planPrice}
        isPremiumPlan={isRecommended}
        isPremiumPlusPlan={isAnual}
        isPremium={isPremium}
        features={getPlanFeatures(selectedPlan)}
      />
    </>
  );
};

export default PricingSelector;
