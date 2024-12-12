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
} from "@/components/ui/select";
import { siteConfig } from "@/config/site";

import PricingCard from "./pricing-card";
import {
  getPlanDescription,
  getPlanFeatures,
  getPlanName,
  getPlanSubname,
} from "../lib/utils";

interface PricingSelectorProps {
  session: Session | null;
  currentPriceId: string | null;
}

const PricingSelector = ({ session, currentPriceId }: PricingSelectorProps) => {
  const id = currentPriceId;
  const { free, premium, premiumPlus } = siteConfig.planPrices;
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
          <SelectTrigger className="border-0 md:border">
            <SelectValue>{getPlanName(selectedPlan)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {PLANS.map((plan) => (
                <SelectItem key={plan} value={plan}>
                  <div className="flex items-center gap-2">
                    <span>{getPlanName(plan)}</span>
                    <span className="text-xs font-medium text-main-m dark:text-main-dark-m">
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
        isPremium={isRecommended}
        isPremiumPlus={isAnual}
        features={getPlanFeatures(selectedPlan)}
      />
    </>
  );
};

export default PricingSelector;
