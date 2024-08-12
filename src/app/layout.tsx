import "./globals.css";
import { Metadata, Viewport } from "next";

import { fontMotiva, spaceGrotesk, spaceMono, dmSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

import { Providers } from "@/modules/core/components/providers";

import { Toaster } from "sonner";
import { cn } from "@/utils/common";

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
    icon: "/e-logomark-on-dark.webp",
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
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body
        className={cn(
          "bg-zinc-50 dark:bg-base-full-dark isolate antialiased",
          fontMotiva.variable,
          spaceGrotesk.variable,
          spaceMono.variable,
          dmSans.variable,
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
        <Providers disableTransitionOnChange>
          <div className="min-h-dvh size-full relative">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
