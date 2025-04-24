import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { siteConfig } from "@/config/site.config";
import { getSubscription } from "@/db/querys/payment-querys";

import AboutWrapper from "./_components/about-wrapper";

export const metadata: Metadata = {
  title: "Descubre " + siteConfig.name,
  alternates: {
    canonical: "/descubre-essentia",
  },
  openGraph: {
    title: "Desubre" + siteConfig.name,
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
  const session = await auth();
  const [subscription] = session
    ? await getSubscription(session?.user?.id as string)
    : [];
  const isPremium = subscription ? subscription.isPremium : false;

  return <AboutWrapper session={session} isPremium={isPremium} />;
}
