"use client";

import Link from "next/link";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { siteConfig } from "@/config/site.config";
import { SubscriptionPlan } from "@/types/auth";

import { LinkIcon } from "../icons/action";

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
        <TabsList className="border-border border">
          {subscriptionPlans.map((plan) => (
            <TabsTrigger key={plan.id} value={plan.id}>
              {plan.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {subscriptionPlans.map((plan, index) => (
          <TabsContent key={plan.id} value={plan.id}>
            <div className="dark:bg-accent/50 border-border flex h-44 flex-col gap-4 rounded-md border bg-slate-50 p-4 text-sm">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-foreground/80 text-sm">{plan.description}</p>
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
      <p className="text-foreground/80 mt-3 text-center text-sm md:text-start">
        Mira más detalles sobre los planes en nuestra{" "}
        <Link
          className="inline-flex items-center gap-x-1 font-semibold text-blue-500"
          href="/pricing"
        >
          página de precios <LinkIcon />
        </Link>
      </p>
    </>
  );
};
