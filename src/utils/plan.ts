import { siteConfig } from "@/config/site.config";

export const getPlanName = (planId: string): string => {
  switch (planId) {
    case siteConfig.plan.free:
      return "Gratis";
    case siteConfig.plan.premium:
      return "Premium";
    case siteConfig.plan.premiumPlus:
      return "Premium Plus";
    default:
      return "Plan";
  }
};

export const getPlanPrice = (plan: string) => {
  switch (plan) {
    case siteConfig.plan.free:
      return siteConfig.priceId.free;
    case siteConfig.plan.premium:
      return siteConfig.priceId.premium;
    case siteConfig.plan.premiumPlus:
      return siteConfig.priceId.premiumPlus;
    default:
      return siteConfig.priceId.free;
  }
};

export const getPlanNumericValue = (plan: string): number => {
  switch (plan) {
    case siteConfig.plan.free:
      return 0;
    case siteConfig.plan.premium:
      return 1;
    case siteConfig.plan.premiumPlus:
      return 2;
    default:
      return 0;
  }
};

export function calculatePremiumExpiresAt(currentPeriodEnd: number): Date {
  return new Date(currentPeriodEnd * 1000);
}
