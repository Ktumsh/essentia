import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
// eslint-disable-next-line import/no-unresolved
import { GeistSans } from "geist/font/sans";
import { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Session } from "next-auth";

import { auth } from "@/app/(auth)/auth";
import { Toaster } from "@/components/ui/sonner";
import { spaceGrotesk, spaceMono, dmSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "@/modules/core/components/ui/providers";
import TailwindIndicator from "@/modules/core/components/ui/utils/tailwind-indicator";
import { getUserCurrentPlan } from "@/modules/payment/pay/actions";
import { cn } from "@/utils/common";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  keywords: siteConfig.keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/essentia-1200x630.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: siteConfig.name,
    description: siteConfig.description,
    card: "summary_large_image",
    creator: "@essentia_cl",
    images: [
      {
        url: "/essentia-1200x630.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/logo-essentia.webp",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#030e1e" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([
    auth() as Promise<Session>,
    cookies(),
  ]);
  const isCollapsed = cookieStore.get("sidebar:state")?.value !== "true";
  const currentPlan = session ? await getUserCurrentPlan(session) : null;

  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body
        className={cn(
          "isolate bg-gray-50 antialiased dark:bg-full-dark",
          spaceGrotesk.variable,
          spaceMono.variable,
          dmSans.variable,
          GeistSans.variable,
          "font-sans",
        )}
      >
        <Toaster />
        <Providers currentPlan={currentPlan} defaultOpen={!isCollapsed}>
          <div className="relative flex size-full min-h-dvh flex-col md:flex-row">
            {children}
          </div>
          <TailwindIndicator />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
