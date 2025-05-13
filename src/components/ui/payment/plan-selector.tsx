"use client";

import Link from "next/link";

import { LinkIcon } from "@/components/icons/action";
import { Badge } from "@/components/kit/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { SUBSCRIPTION_PLAN_DATA } from "@/db/data/subscription-plan-data";
import { cn } from "@/lib/utils";

interface PlanSelectorProps {
  selectedPlanId: string;
  onSelect: (priceId: string) => void;
  isUpgrade?: boolean;
}

export const PlanSelector = ({
  selectedPlanId,
  onSelect,
  isUpgrade,
}: PlanSelectorProps) => {
  return (
    <>
      <Tabs value={selectedPlanId} onValueChange={(value) => onSelect(value)}>
        <TabsList className="rounded-full border">
          {isUpgrade
            ? SUBSCRIPTION_PLAN_DATA.slice(2).map((plan) => (
                <TabsTrigger
                  key={plan.id}
                  value={plan.id}
                  className={cn(
                    "data-[state=active]:bg-premium rounded-full data-[state=active]:text-white",
                    {
                      "data-[state=active]:bg-premium-plus":
                        plan.name === "Premium Plus",
                    },
                  )}
                >
                  {plan.name}
                </TabsTrigger>
              ))
            : SUBSCRIPTION_PLAN_DATA.slice(1).map((plan) => (
                <TabsTrigger
                  key={plan.id}
                  value={plan.id}
                  className={cn(
                    "data-[state=active]:bg-premium rounded-full data-[state=active]:text-white",
                    {
                      "data-[state=active]:bg-premium-plus":
                        plan.name === "Premium Plus",
                    },
                  )}
                >
                  {plan.name}
                </TabsTrigger>
              ))}
        </TabsList>

        {SUBSCRIPTION_PLAN_DATA.slice(1).map((plan) => (
          <TabsContent key={plan.id} value={plan.id}>
            <div
              className={cn(
                "bg-accent after:bg-premium relative flex h-44 flex-col gap-4 rounded-[15px] p-4 text-sm after:absolute after:-inset-0.5 after:-z-1 after:rounded-xl after:content-['']",
                {
                  "after:bg-premium-plus": plan.name === "Premium Plus",
                },
              )}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {plan.name === "Premium Plus" && (
                    <Badge className="rounded-tr-lg rounded-bl-lg border-0 bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-0.5 text-white">
                      Máximo acceso
                    </Badge>
                  )}
                </div>
                <p className="text-foreground/80 text-sm">{plan.description}</p>
              </div>
              <div>
                <p className="font-merriweather mt-1 text-2xl font-bold">
                  ${plan.monthlyAmount.toLocaleString("es-CL")}
                  <span className="text-muted-foreground text-sm font-normal">
                    /mes
                  </span>
                </p>
                {plan.other.split(/(único)/gi).map((part, i) =>
                  part.toLowerCase() === "único" ? (
                    <span key={i} className="font-medium text-pink-500">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <p className="text-foreground/80 mt-3 text-center text-sm md:text-start">
        Mira más detalles sobre los beneficios en nuestra{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="/planes"
          className="inline-flex items-center gap-x-1 font-semibold text-green-500"
        >
          página de precios <LinkIcon />
        </Link>
      </p>
    </>
  );
};
