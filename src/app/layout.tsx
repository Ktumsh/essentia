import "./globals.css";
import { Metadata, Viewport } from "next";

import { fontMotiva, spaceGrotesk, spaceMono, dmSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

import { Providers } from "@/modules/core/components/providers";

import { auth } from "@@/auth";

export const metadata: Metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
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
    icon: [
      {
        url: new URL(
          "/e-logomark-on-dark.webp",
          "https://essentia-web.vercel.app"
        ),
      },
    ],
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
  const session = await auth();
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body
        className={`bg-zinc-50 ${
          session ? "dark:bg-base-full-dark" : ""
        } isolate antialiased ${fontMotiva.variable} ${spaceGrotesk.variable} ${
          spaceMono.variable
        } ${dmSans.variable} font-dmsans`}
      >
        <Providers
          forcedTheme={!session ? "light" : undefined}
          disableTransitionOnChange
        >
          <div className="min-h-dvh size-full relative">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
