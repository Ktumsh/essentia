import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
// eslint-disable-next-line import/no-unresolved
import { GeistSans } from "geist/font/sans";
import { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import { Toaster } from "sonner";

import { auth } from "@/app/(auth)/auth";
import { fontMotiva, spaceGrotesk, spaceMono, dmSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "@/modules/core/components/ui/providers";
import TailwindIndicator from "@/modules/core/components/ui/utils/tailwind-indicator";
import { getUserCurrentPlan } from "@/modules/payment/pay/actions";
import { Session } from "@/types/session";
import { cn } from "@/utils/common";

import { PreloadResources } from "./preload-resources";

export const metadata: Metadata = {
  metadataBase: new URL("https://essentia-web.vercel.app"),
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "essentia",
    "salud",
    "nutricion",
    "alimentacion",
    "bienestar",
    "ejercicios",
    "salud mental",
    "esencial",
    "salud rapida",
  ],
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
    description:
      "Tu recurso de información esencial y confiable para una vida más saludable y equilibrada",
    type: "website",
    url: "https://essentia-web.vercel.app",
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
    description:
      "Tu recurso de información esencial y confiable para una vida más saludable y equilibrada",
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
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
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
          fontMotiva.variable,
          spaceGrotesk.variable,
          spaceMono.variable,
          dmSans.variable,
          GeistSans.variable,
          "font-dmsans",
        )}
      >
        <PreloadResources />
        <Toaster
          position="top-center"
          toastOptions={{
            className:
              "bg-white dark:bg-full-dark border-gray-200 dark:border-dark text-main dark:text-main-dark",
          }}
        />
        <Providers currentPlan={currentPlan} defaultOpen={!isCollapsed}>
          <div className="relative flex size-full min-h-dvh flex-col md:flex-row">
            {children}
          </div>
          <TailwindIndicator />
        </Providers>
        <SpeedInsights />
        <Script src="https://js.stripe.com/v3/" strategy="lazyOnload" />
      </body>
    </html>
  );
}
