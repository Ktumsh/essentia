"use client";

import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { LinkIcon } from "@/modules/icons/action";
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
    <>
      <Tabs value={selectedPlanId} onValueChange={(value) => onSelect(value)}>
        <TabsList className="dark:border-dark border border-gray-200">
          {subscriptionPlans.map((plan) => (
            <TabsTrigger key={plan.id} value={plan.id}>
              {plan.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {subscriptionPlans.map((plan, index) => (
          <TabsContent key={plan.id} value={plan.id}>
            <div className="dark:border-dark dark:bg-dark/50 flex h-44 flex-col gap-4 rounded-md border border-gray-200 bg-gray-100 p-4 text-sm">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-main-h dark:text-main-dark-h text-sm">
                  {plan.description}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-sans text-xl font-semibold">
                  ${plan.amount.toLocaleString("es-CL")}
                </span>
                <span className="text-main-m dark:text-main-dark-m align-text-bottom text-sm leading-7">
                  {index > 1 ? "/año" : "/mes"}
                </span>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <p className="text-main-h dark:text-main-dark-h mt-3 text-center text-xs md:text-start md:text-sm">
        Mira más detalles sobre los planes en nuestra{" "}
        <Link
          className="inline-flex items-center gap-x-1 text-blue-600"
          href="/pricing"
        >
          página de precios <LinkIcon />
        </Link>
      </p>
    </>
  );
};
