"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { SubscriptionPlan } from "@/types/session";

interface PlanSelectorProps {
  selectedPlanId: string;
  onSelect: (priceId: string) => void;
}

export const PlanSelector = ({
  selectedPlanId,
  onSelect,
}: PlanSelectorProps) => {
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: siteConfig.planPrices.free,
      name: "Gratis",
      description: "Plan básico, no incluye funcionalidades premium.",
      amount: 0,
      currency: "clp",
    },
    {
      id: siteConfig.planPrices.premium,
      name: "Premium",
      description: "Plan mensual con todas las funcionalidades de Essentia AI.",
      amount: 9500,
      currency: "clp",
    },
    {
      id: siteConfig.planPrices.premiumPlus,
      name: "Premium Plus",
      description: "Plan anual con todas las funcionalidades de Essentia AI.",
      amount: 91200,
      currency: "clp",
    },
  ];

  return (
    <Tabs value={selectedPlanId} onValueChange={(value) => onSelect(value)}>
      <TabsList className="border border-gray-200 dark:border-dark">
        {subscriptionPlans.map((plan) => (
          <TabsTrigger key={plan.id} value={plan.id}>
            {plan.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {subscriptionPlans.map((plan, index) => (
        <TabsContent key={plan.id} value={plan.id}>
          <div className="flex h-44 flex-col gap-4 rounded-md border border-gray-200 bg-gray-100 p-4 text-sm dark:border-dark dark:bg-dark/50">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-sm text-main-m dark:text-main-dark-m">
                {plan.description}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-sans text-xl font-semibold">
                ${plan.amount.toLocaleString("es-CL")}
              </span>
              <span className="align-text-bottom text-sm leading-7 text-main-m dark:text-main-dark-m">
                {index > 1 ? "/año" : "/mes"}
              </span>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
