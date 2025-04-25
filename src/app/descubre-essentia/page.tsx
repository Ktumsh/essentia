import { Metadata } from "next";

import { siteConfig } from "@/config/site.config";

import Discover from "./_components/discover";

export const metadata: Metadata = {
  title: "Descubre " + siteConfig.name,
  alternates: {
    canonical: "/descubre-essentia",
  },
  openGraph: {
    title: "Descubre " + siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url + "/descubre-essentia",
    type: "website",
    images: [
      {
        url: "/essentia-512x512.png",
        width: 512,
        height: 512,
      },
    ],
  },
  twitter: {
    title: "Desubre" + siteConfig.name,
    description: siteConfig.description,
    card: "summary_large_image",
    images: [
      {
        url: "/essentia-512x512.png",
        width: 512,
        height: 512,
      },
    ],
  },
};

export default async function AboutPage() {
  return <Discover />;
}
