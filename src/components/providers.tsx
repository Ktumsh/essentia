"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProviderProps } from "next-themes";

import { UserSubscriptionInfo } from "@/db/querys/user-querys";
import { AccessibilityProvider } from "@/hooks/use-accesibility";
import { MobileProvider } from "@/hooks/use-mobile";
import { UserSubscriptionProvider } from "@/hooks/use-user-subscription";

import { ThemeProvider } from "../hooks/use-theme";

export function Providers({
  initialMobileState,
  initialUserSubscription,
  children,
}: {
  initialMobileState: boolean;
  initialUserSubscription: UserSubscriptionInfo;
  children: React.ReactNode;
} & ThemeProviderProps) {
  return (
    <SessionProvider>
      <MobileProvider initialMobileState={initialMobileState}>
        <ThemeProvider disableTransitionOnChange>
          <AccessibilityProvider>
            <UserSubscriptionProvider initialData={initialUserSubscription}>
              {children}
            </UserSubscriptionProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </MobileProvider>
    </SessionProvider>
  );
}
