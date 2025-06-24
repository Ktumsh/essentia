import { siteConfig } from "@/config/site.config";

import type { CallbackStatus } from "@/lib/types";

export const PLAN_COLORS = {
  [siteConfig.plan.premium]: "premium",
  [siteConfig.plan.premiumPlus]: "premiumPlus",
} as const;

export const STATUS_BACKGROUNDS = {
  success: "from-green-50 via-white to-blue-50",
  canceled: "from-orange-50 via-white to-yellow-50",
  failure: "from-red-50 via-white to-orange-50",
  loading: "from-blue-50 via-white to-purple-50",
} as const;

export const ANIMATION_DELAYS = {
  icon: 0.1,
  title: 0.2,
  message: 0.3,
  card: 0.4,
  details: [0.1, 0.2, 0.3],
  total: 0.5,
  button: 0.6,
} as const;

export const getTitleStatus = (title: string): CallbackStatus => {
  const lowerCaseTitle = title.toLowerCase();
  if (lowerCaseTitle.includes("gracias")) {
    return "success";
  } else if (lowerCaseTitle.includes("cancelada")) {
    return "canceled";
  } else {
    return "failure";
  }
};

export const formatCurrency = (amount: number, currency: string): string => {
  return `$${amount.toLocaleString("es-CL")} ${currency.toUpperCase()}`;
};

export const getPlanDisplayName = (plan: string): string => {
  return plan.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
};
