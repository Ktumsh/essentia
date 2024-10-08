import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { fontMotiva, spaceGrotesk, spaceMono, dmSans } from "@/config/fonts";
import { GeistSans } from "geist/font/sans";
import { siteConfig } from "@/config/site";

import { Providers } from "@/modules/core/components/wrappers/providers";

import { Toaster } from "sonner";
import { cn } from "@/utils/common";
import TailwindIndicator from "@/modules/core/components/tailwind-indicator";
import { auth } from "@@/auth";
import { Session } from "@/types/session";
import { getUserCurrentPlan } from "@/modules/payment/pay/actions";

import { SpeedInsights } from "@vercel/speed-insights/next";

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
        url: "/essentia-512x512.png",
        width: 512,
        height: 512,
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
        url: "/essentia-512x512.png",
        width: 512,
        height: 512,
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
  const session = (await auth()) as Session;
  const currentPlan = session ? await getUserCurrentPlan(session) : null;

  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body
        className={cn(
          "bg-white dark:bg-base-full-dark isolate antialiased",
          fontMotiva.variable,
          spaceGrotesk.variable,
          spaceMono.variable,
          dmSans.variable,
          GeistSans.variable,
          "font-dmsans"
        )}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            className:
              "bg-white dark:bg-base-full-dark border-gray-200 dark:border-base-dark text-base-color dark:text-base-color-dark",
          }}
        />
        <Providers currentPlan={currentPlan} disableTransitionOnChange>
          <div className="min-h-dvh size-full relative">{children}</div>
          <TailwindIndicator />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
