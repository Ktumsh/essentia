import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
// eslint-disable-next-line import/no-unresolved
import { GeistSans } from "geist/font/sans";
import { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Session } from "next-auth";

import { auth } from "@/app/(auth)/auth";
import { Toaster as Sooner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { spaceGrotesk, spaceMono, dmSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { getSubscription } from "@/db/querys/payment-querys";
import { getUserTasks } from "@/db/querys/task-querys";
import { Providers } from "@/modules/core/components/providers";
import TailwindIndicator from "@/modules/core/components/ui/utils/tailwind-indicator";
import { cn } from "@/utils/common";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  manifest: "manifest.ts",
  alternates: {
    canonical: "/",
  },
  applicationName: siteConfig.name,
  appLinks: {
    android: {
      url: siteConfig.url,
      package: "com.essentia.web",
    },
    ipad: {
      url: siteConfig.url,
      app_store_id: siteConfig.appId,
    },
    iphone: {
      url: siteConfig.url,
      app_store_id: siteConfig.appId,
    },
    windows: {
      url: siteConfig.url,
      app_id: siteConfig.appId,
      app_name: siteConfig.name,
    },
    windows_phone: {
      url: siteConfig.url,
      app_id: siteConfig.appId,
      app_name: siteConfig.name,
    },
    windows_universal: {
      url: siteConfig.url,
      app_id: siteConfig.appId,
      app_name: siteConfig.name,
    },
    ios: [
      {
        url: siteConfig.url,
        app_store_id: siteConfig.appId,
      },
    ],
    web: {
      url: siteConfig.url,
    },
  },
  appleWebApp: {
    title: siteConfig.name,
    startupImage: "/apple-icon.png",
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
    icon: [
      {
        url: "/icon.png",
        rel: "icon",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        rel: "icon",
        type: "image/svg+xml",
      },
    ],
    shortcut: {
      url: "/favicon.ico",
    },
    apple: {
      url: "/apple-icon.png",
      rel: "apple-touch-icon",
    },
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
  const userId = session?.user?.id as string;

  const isCollapsed = cookieStore.get("sidebar:state")?.value !== "true";

  const subscription = session ? await getSubscription(userId) : null;

  const currentPlan = subscription ? subscription[0].type : "free";

  const initialTasks = session ? await getUserTasks(userId) : [];

  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body
        className={cn(
          "dark:bg-full-dark isolate bg-gray-50 antialiased",
          spaceGrotesk.variable,
          spaceMono.variable,
          dmSans.variable,
          GeistSans.variable,
          "font-sans",
        )}
      >
        <Providers
          currentPlan={currentPlan}
          defaultOpen={!isCollapsed}
          userId={userId}
          initialTasks={initialTasks}
        >
          <Toaster />
          <Sooner />
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
