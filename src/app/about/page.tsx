import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import { siteConfig } from "@/config/site";
import { getSubscription } from "@/db/querys/payment-querys";
import About from "@/modules/about/components/about";
import AboutHeader from "@/modules/about/components/about-header";
import ButtonUp from "@/modules/core/components/ui/buttons/button-up";

export const metadata: Metadata = {
  title: "Descubre " + siteConfig.name,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Desubre" + siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url + "/about",
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

const WelcomePage = async () => {
  const session = await auth();
  const [subscription] = session
    ? await getSubscription(session?.user?.id as string)
    : [];
  const isPremium = subscription ? subscription.isPremium : false;

  return (
    <>
      <AboutHeader session={session} isPremium={isPremium} />
      <About session={session} isPremium={isPremium} />
      <ButtonUp />
    </>
  );
};

export default WelcomePage;
