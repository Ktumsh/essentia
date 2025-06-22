import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cookies } from "next/headers";
import { Session } from "next-auth";
import { unstable_ViewTransition as ViewTransition } from "react";

import TailwindIndicator from "@/components/layout/tailwind-indicator";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import {
  grotesk,
  merriweather,
  poppins,
  spaceMono,
} from "@/config/fonts.config";
import { metadataConfig } from "@/config/metadata.config";
import { getUserSubscriptionInfo } from "@/db/querys/user-querys";
import { cn } from "@/utils";

import { auth } from "./(auth)/auth";

import type { Viewport } from "next";

export const metadata = metadataConfig;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#030e1e" },
  ],
  colorScheme: "light dark",
  maximumScale: 1,
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

  const userSubscription = userId
    ? await getUserSubscriptionInfo(userId)
    : {
        trial: { hasUsed: false, isActive: false, expiresAt: null },
        subscription: null,
      };

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
          key={userId}
          initialMobileState={isMobile}
          initialUserSubscription={userSubscription}
        >
          <Toaster />
          <ViewTransition name="page">{children}</ViewTransition>
          <TailwindIndicator />
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
