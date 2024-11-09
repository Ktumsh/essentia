"use client";

import { Card } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { usePlan } from "@/modules/core/hooks/use-current-plan";
import { LinkIcon } from "@/modules/icons/action";
import { SubscriptionPlan } from "@/types/session";
import { cn } from "@/utils/common";

interface PlanSelectorProps {
  onSelect: (priceId: string) => void;
}

export const PlanSelector = ({ onSelect }: PlanSelectorProps) => {
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

  const { currentPlan } = usePlan();

  const isCurrentPlan = (priceId: string) => currentPlan === priceId;

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    siteConfig.planPrices.premium,
  );

  const handleSelect = (priceId: string) => {
    setSelectedPlanId(priceId);
    onSelect(priceId);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {subscriptionPlans.map((plan, index) => (
          <Card
            key={plan.id}
            isPressable
            disableRipple
            isDisabled={isCurrentPlan(plan.id)}
            shadow={selectedPlanId === plan.id ? "md" : "none"}
            onPress={() => handleSelect(plan.id)}
            className={cn(
              "relative flex flex-col gap-2 rounded-xl bg-white p-4 text-sm font-normal text-main data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-default data-[disabled=true]:opacity-100 dark:bg-full-dark dark:text-white",
              index === 0
                ? "border border-gray-200 dark:border-dark"
                : "bg-light-gradient-v2 after:absolute after:inset-[2px] after:rounded-[10px] after:bg-white after:content-[''] dark:bg-dark-gradient-v2 dark:text-white after:dark:bg-full-dark",
              selectedPlanId === plan.id &&
                "backdrop-blur backdrop-saturate-150 after:bg-white/70 dark:after:bg-full-dark/70",
            )}
          >
            <div className="z-10 flex w-full justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="font-medium">{plan.name}</h3>
                {isCurrentPlan(plan.id) && (
                  <div
                    className={cn(
                      index === 1 &&
                        "bg-light-gradient-v2 dark:bg-dark-gradient-v2",
                      "inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full px-1.5 text-xs font-medium text-white",
                    )}
                  >
                    Plan Actual
                  </div>
                )}
                {index === 0 && !isCurrentPlan(plan.id) && (
                  <div className="inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full bg-gray-200 px-1.5 text-xs font-medium text-main dark:bg-dark dark:text-main-dark">
                    Predeterminado
                  </div>
                )}
                {index === 1 && !isCurrentPlan(plan.id) && (
                  <div className="inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full bg-light-gradient-v2 px-1.5 text-xs font-medium text-white dark:bg-dark-gradient-v2">
                    Recomendado
                  </div>
                )}
                {index === 2 && !isCurrentPlan(plan.id) && (
                  <div
                    className={cn(
                      selectedPlanId === plan.id
                        ? "bg-white dark:bg-full-dark"
                        : "bg-gray-200 dark:bg-dark",
                      "inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full px-1.5 text-xs font-medium text-main dark:text-main-dark",
                    )}
                  >
                    Ahorra más
                  </div>
                )}
              </div>
              <div>
                <span className="font-sans text-base font-medium">
                  ${plan.amount.toLocaleString("es-CL")}
                </span>
                <span className="text-main-m dark:text-main-dark-m">
                  {index > 1 ? "/año" : "/mes"}
                </span>
              </div>
            </div>
            <p className="z-10 text-start text-main-h dark:text-main-dark-h">
              {plan.description}
            </p>
          </Card>
        ))}
      </div>

      <p className="flex gap-1 text-center text-sm text-main-m dark:text-main-dark-m">
        Ver más detalles en nuestra
        <Link
          className="flex items-center gap-x-1 text-orient-700"
          href="/premium"
        >
          página de precios <LinkIcon />
        </Link>
      </p>
    </>
  );
};
