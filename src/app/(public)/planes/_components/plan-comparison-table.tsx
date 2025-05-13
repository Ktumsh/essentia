"use client";

import { Check, X } from "lucide-react";

import { PLAN_FEATURE_DATA } from "@/db/data/plan-feature-data";
import { SUBSCRIPTION_PLAN_DATA } from "@/db/data/subscription-plan-data";
import { cn } from "@/lib/utils";

type PlanKey = "basico" | "premium" | "premiumPlus";

const PLAN_ORDER: PlanKey[] = ["basico", "premium", "premiumPlus"];

const PLAN_LABELS: Record<PlanKey, string> = {
  basico: "Básico",
  premium: "Premium",
  premiumPlus: "Premium Plus",
};

const PlanComparisonTable = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:py-12">
      <h2 className="font-merriweather mb-3 text-center text-2xl font-bold md:text-3xl">
        Comparativa de Planes
      </h2>

      {/* 🖥 Tabla para desktop */}
      <div className="hidden overflow-x-auto rounded-xl border bg-white md:block">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-accent text-foreground text-base font-semibold">
            <tr>
              <th className="w-[240px] p-4">Funcionalidad</th>
              {PLAN_ORDER.map((plan) => (
                <th key={plan} className="p-4 text-center">
                  <span
                    className={cn("block", {
                      "bg-premium bg-clip-text text-transparent":
                        plan === "premium",
                      "bg-premium-plus bg-clip-text text-transparent":
                        plan === "premiumPlus",
                    })}
                  >
                    {PLAN_LABELS[plan]}
                  </span>
                  {PLAN_LABELS[plan] === "Básico" &&
                    SUBSCRIPTION_PLAN_DATA[0].monthlyAmount === 0 && (
                      <span className="text-muted-foreground text-sm font-medium">
                        Gratis
                      </span>
                    )}
                  {PLAN_LABELS[plan] === "Premium" && (
                    <span className="text-muted-foreground text-sm font-medium">
                      $
                      {SUBSCRIPTION_PLAN_DATA[1].monthlyAmount.toLocaleString(
                        "es-CL",
                      )}
                      /mes
                    </span>
                  )}
                  {PLAN_LABELS[plan] === "Premium Plus" && (
                    <span className="text-muted-foreground text-sm font-medium">
                      $
                      {SUBSCRIPTION_PLAN_DATA[2].amount.toLocaleString("es-CL")}
                      /año
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-muted-foreground/10 divide-y">
            {PLAN_FEATURE_DATA.map((feature) => (
              <tr
                key={feature.key}
                className="dark:hover:bg-accent/50 hover:bg-slate-50"
              >
                <td className="p-4 align-top">
                  <div className="font-medium">{feature.name}</div>
                  <div className="text-muted-foreground mt-1 text-xs">
                    {feature.description}
                  </div>
                </td>
                {PLAN_ORDER.map((plan) => {
                  const value = feature.plans[plan];
                  return (
                    <td key={plan} className="p-4 text-center align-top">
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check className="mx-auto text-green-500" />
                        ) : (
                          <X className="mx-auto text-rose-500" />
                        )
                      ) : (
                        <span className="text-sm">{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Cards para mobile */}
      <div className="flex flex-col gap-6 md:hidden">
        {PLAN_FEATURE_DATA.map((feature) => (
          <div
            key={feature.key}
            className="bg-background rounded-xl border p-4 shadow-sm"
          >
            <div className="mb-3">
              <div className="text-sm font-semibold">{feature.name}</div>
              <div className="text-muted-foreground text-xs">
                {feature.description}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {PLAN_ORDER.map((plan) => {
                const value = feature.plans[plan];
                return (
                  <div
                    key={plan}
                    className="flex items-center justify-between border-t pt-2 text-sm"
                  >
                    <span className="text-muted-foreground">
                      {PLAN_LABELS[plan]}
                    </span>
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="text-green-500" />
                      ) : (
                        <X className="text-rose-500" />
                      )
                    ) : (
                      <span className="font-medium">{value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanComparisonTable;
