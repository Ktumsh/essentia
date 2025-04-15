import "@/styles/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";
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
import { cn } from "@/lib/utils";
import { getUserProfileData } from "@/utils/profile";

import { auth } from "./(auth)/auth";

export const metadata: Metadata = metadataConfig;

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

  const userData = userId ? await getUserProfileData({ userId }) : null;

  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";

  const [subscription] = session ? await getSubscription(userId) : [];

  const [payment] = session ? await getPaymentDetails(userId) : [];

  const currentPlan = subscription ? subscription.type : "free";

  const initialTasks = session ? await getUserTasks(userId) : [];

  const isMobile = cookieStore.get("isMobile")?.value === "true";

  const medicalMode = cookieStore.get("view_mode_medical")?.value as
    | "grid"
    | "list";

  const savedMode = cookieStore.get("view_mode_saved")?.value as
    | "grid"
    | "list";

  const initialUserSubscription = userId
    ? await getUserSubscriptionInfo(userId)
    : {
        trial: { hasUsed: false, isActive: false, expiresAt: null },
        subscription: null,
      };

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
          initialModes={{
            medical: medicalMode || "grid",
            saved: savedMode || "grid",
          }}
        >
          <Toaster />
          <ProfileMessage user={userData} session={session} />
          <div className="relative flex size-full flex-col md:max-h-dvh md:min-h-dvh md:flex-row">
            {children}
          </div>
          <TailwindIndicator />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
