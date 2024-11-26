import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

import { siteConfig } from "@/config/site";

export function formatDate(
  dateInput: string | Date | null | undefined,
  dateFormat: string = "dd MMMM yyyy",
): string | null {
  if (!dateInput) return null;

  const date =
    typeof dateInput === "string"
      ? parse(dateInput, "dd-MM-yyyy", new Date())
      : dateInput;

  if (isNaN(date.getTime())) {
    console.error("Fecha inválida:", dateInput);
    return null;
  }

  return format(date, dateFormat, { locale: es });
}

export function calculatePremiumExpiresAt(currentPeriodEnd: number): string {
  return new Date(currentPeriodEnd * 1000).toISOString();
}

export const getPlanName = (planId: string): string => {
  switch (planId) {
    case siteConfig.planPrices.free:
      return "Gratis";
    case siteConfig.planPrices.premium:
      return "Premium";
    case siteConfig.planPrices.premiumPlus:
      return "Premium Plus";
    default:
      return "Plan";
  }
};
