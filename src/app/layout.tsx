import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Session } from "next-auth";

import { Toaster } from "@/components/kit/sonner";
import { Providers } from "@/components/providers";
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
import { cn } from "@/lib/utils";

import { auth } from "./(auth)/auth";

import "@/styles/globals.css";

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

  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";

  const [subscription] = session ? await getSubscription(userId) : [];

  const [payment] = session ? await getPaymentDetails(userId) : [];

  const currentPlan = subscription ? subscription.type : "free";

  const initialTasks = session ? await getUserTasks(userId) : [];

  const isMobile = cookieStore.get("isMobile")?.value === "true";

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
          currentPlan={currentPlan}
          defaultOpen={!isCollapsed}
          userId={userId}
          initialSubscription={subscription}
          initialPayment={payment}
          initialTasks={initialTasks}
          initialMobileState={isMobile}
        >
          <Toaster />
          <div className="relative flex size-full min-h-dvh flex-col md:max-h-dvh md:flex-row">
            {children}
          </div>
          <TailwindIndicator />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
