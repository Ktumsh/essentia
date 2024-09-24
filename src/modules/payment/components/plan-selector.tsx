"use client";

import { siteConfig } from "@/config/site";
import { usePlan } from "@/modules/core/hooks/use-current-plan";
import { LinkIcon } from "@/modules/icons/action";
import { SubscriptionPlan } from "@/types/session";
import { cn } from "@/utils/common";
import { Card } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

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
    siteConfig.planPrices.premium
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
              "relative flex flex-col gap-2 rounded-xl p-4 text-sm font-normal text-base-color dark:text-white bg-white dark:bg-base-full-dark data-[disabled=true]:opacity-100 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-default",
              index === 0
                ? "border border-gray-200 dark:border-base-dark"
                : "dark:text-white bg-light-gradient-v2 dark:bg-dark-gradient-v2 after:content-[''] after:absolute after:inset-[2px] after:rounded-[10px] after:bg-white after:dark:bg-base-full-dark",
              selectedPlanId === plan.id &&
                "after:bg-white/70 dark:after:bg-base-full-dark-70 backdrop-blur backdrop-saturate-150"
            )}
          >
            <div className="flex justify-between w-full z-10">
              <div className="flex items-center gap-1.5">
                <h3 className="font-medium">{plan.name}</h3>
                {isCurrentPlan(plan.id) && (
                  <div
                    className={cn(
                      index === 1 &&
                        "bg-light-gradient-v2 dark:bg-dark-gradient-v2",
                      "inline-flex shrink-0 items-center justify-center h-5 gap-1 px-1.5 font-medium text-white text-xs rounded-full"
                    )}
                  >
                    Plan Actual
                  </div>
                )}
                {index === 0 && !isCurrentPlan(plan.id) && (
                  <div className="inline-flex shrink-0 items-center justify-center h-5 gap-1 px-1.5 bg-gray-200 dark:bg-base-dark font-medium text-base-color dark:text-base-color-dark text-xs rounded-full">
                    Predeterminado
                  </div>
                )}
                {index === 1 && !isCurrentPlan(plan.id) && (
                  <div className="inline-flex shrink-0 items-center justify-center h-5 gap-1 px-1.5 font-medium text-white text-xs bg-light-gradient-v2 dark:bg-dark-gradient-v2 rounded-full">
                    Recomendado
                  </div>
                )}
                {index === 2 && !isCurrentPlan(plan.id) && (
                  <div
                    className={cn(
                      selectedPlanId === plan.id
                        ? "bg-white dark:bg-base-full-dark"
                        : "bg-gray-200 dark:bg-base-dark",
                      "inline-flex shrink-0 items-center justify-center h-5 gap-1 px-1.5 font-medium text-base-color dark:text-base-color-dark text-xs rounded-full"
                    )}
                  >
                    Ahorra más
                  </div>
                )}
              </div>
              <div>
                <span className="text-base font-medium font-sans">
                  ${plan.amount.toLocaleString("es-CL")}
                </span>
                <span className="text-base-color-m dark:text-base-color-dark-m">
                  {index > 1 ? "/año" : "/mes"}
                </span>
              </div>
            </div>
            <p className="text-start text-base-color-h dark:text-base-color-dark-h z-10">
              {plan.description}
            </p>
          </Card>
        ))}
      </div>

      <p className="flex gap-1 text-center text-sm text-base-color-m dark:text-base-color-dark-m">
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
