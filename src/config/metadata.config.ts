import { siteConfig } from "./site.config";

import type { Metadata } from "next";

const { name, url, description, keywords, appId } = siteConfig;

export const metadataConfig: Metadata = {
  metadataBase: new URL(url),
  title: {
    template: `%s - ${name}`,
    default: name,
  },
  description: description,
  manifest: "manifest.ts",
  alternates: {
    canonical: "/",
  },
  applicationName: name,
  appLinks: {
    android: {
      url: url,
      package: "com.essentia.web",
    },
    ipad: {
      url: url,
      app_store_id: appId,
    },
    iphone: {
      url: url,
      app_store_id: appId,
    },
    windows: {
      url: url,
      app_id: appId,
      app_name: name,
    },
    windows_phone: {
      url: url,
      app_id: appId,
      app_name: name,
    },
    windows_universal: {
      url: url,
      app_id: appId,
      app_name: name,
    },
    ios: [
      {
        url: url,
        app_store_id: appId,
      },
    ],
    web: {
      url: url,
    },
  },
  appleWebApp: {
    title: name,
    startupImage: "/apple-icon.png",
  },
  keywords: keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: name,
    description: description,
    type: "website",
    url: url,
    siteName: name,
    images: [
      {
        url: "/essentia-1200x630.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: name,
    description: description,
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
  verification: {
    google: "YtzV3W2iele_xb5WQZafjCKxTKKZ79RhjD1MgFk2kx4",
  },
};
