import { Metadata } from "next";

import { auth } from "@/app/(auth)/auth";
import About from "@/modules/about/components/about";
import AboutHeader from "@/modules/about/components/about-header";
import ButtonUp from "@/modules/core/components/ui/buttons/button-up";
import { Session } from "@/types/session";

export const metadata: Metadata = {
  title: "Bienvenida",
  openGraph: {
    title: "Bienvenida - Essentia",
    description:
      "Tu recurso de información esencial y confiable para una vida más saludable y equilibrada",
    url: "https://essentia-web.vercel.app/bienvenida",
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
    title: "Bienvenida - Essentia",
    description:
      "Tu recurso de información esencial y confiable para una vida más saludable y equilibrada",
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
  const session = (await auth()) as Session;
  return (
    <>
      <AboutHeader session={session} />
      <About session={session} />
      <ButtonUp />
    </>
  );
};

export default WelcomePage;
