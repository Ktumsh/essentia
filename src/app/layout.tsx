import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cookies } from "next/headers";
import { Session } from "next-auth";

import { Toaster } from "@/components/kit/sonner";
import { Providers } from "@/components/providers";
import ProfileMessage from "@/components/ui/layout/profile-message";
import TailwindIndicator from "@/components/ui/layout/tailwind-indicator";
import {
  grotesk,
  merriweather,
  poppins,
  spaceMono,
} from "@/config/fonts.config";
import { metadataConfig } from "@/config/metadata.config";
import { getPaymentDetails, getSubscription } from "@/db/querys/payment-querys";
import { getUserTasks } from "@/db/querys/task-querys";
import { getUserSubscriptionInfo } from "@/db/querys/user-querys";
import { cn } from "@/utils";
import { getUserData } from "@/utils/profile";

import { auth } from "./(auth)/auth";

import type { Viewport } from "next";

export const metadata = metadataConfig;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#030e1e" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, cookieStore] = await Promise.all([
    auth() as Promise<Session>,
    cookies(),
  ]);

  const userId = session?.user?.id as string;

  const [subscription] = session ? await getSubscription(userId) : [];
  const [payment] = session ? await getPaymentDetails(userId) : [];

  const initialTasks = session ? await getUserTasks(userId) : [];
  const userData = userId ? await getUserData({ userId }) : null;
  const initialUserSubscription = userId
    ? await getUserSubscriptionInfo(userId)
    : {
        trial: { hasUsed: false, isActive: false, expiresAt: null },
        subscription: null,
      };

  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";
  const isMobile = cookieStore.get("isMobile")?.value === "true";
  const medicalMode =
    (cookieStore.get("view_mode")?.value as "grid" | "list") || "grid";

  const currentPlan = subscription?.type || "free";

  return (
    <html lang="es" suppressHydrationWarning className="md:overflow-hidden">
      <body
        className={cn(
          merriweather.variable,
          poppins.variable,
          spaceMono.variable,
          grotesk.variable,
          "antialiased md:subpixel-antialiased",
        )}
      >
        <Providers
          key={userId}
          currentPlan={currentPlan}
          defaultOpen={!isCollapsed}
          userId={userId}
          initialUserData={userData}
          initialSubscription={subscription}
          initialPayment={payment}
          initialTasks={initialTasks}
          initialMobileState={isMobile}
          initialUserSubscription={initialUserSubscription}
          initialMode={medicalMode}
        >
          <Toaster />
          <ProfileMessage user={userData} session={session} />
          {children}
          <TailwindIndicator />
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
