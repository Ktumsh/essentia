"use client";

import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { ABOUT_SECTIONS } from "@/consts/about-sections";
import { StarsIcon } from "@/modules/icons/common";
import { AboutCrop } from "@/modules/icons/miscellaneus";
import { cn } from "@/utils/common";

import AboutFooter from "./about-footer";
import Section from "./section";
import useBubbleAnimation from "../hooks/use-bubble-animation";
import useSmoothScroll from "../hooks/use-smooth-scroll";

interface AboutProps {
  session: Session | null;
  isPremium: boolean | null;
}

const About = ({ session, isPremium }: AboutProps) => {
  const scrollToSection = useSmoothScroll("#nuestro_metodo");

  const bubble1Ref = useRef<HTMLImageElement>(null);
  const bubble2Ref = useRef<HTMLImageElement>(null);
  const bubble3Ref = useRef<HTMLImageElement>(null);
  const bubble4Ref = useRef<HTMLImageElement>(null);
  const bubble5Ref = useRef<HTMLImageElement>(null);
  const bubble6Ref = useRef<HTMLImageElement>(null);
  const bubble7Ref = useRef<HTMLImageElement>(null);
  const bubble8Ref = useRef<HTMLImageElement>(null);

  const sections = ABOUT_SECTIONS.map((section, index) => {
    const updatedBubbles = section.bubbles.map((bubble, bubbleIndex) => ({
      ...bubble,
      ref: [bubble1Ref, bubble2Ref, bubble3Ref, bubble4Ref, bubble5Ref][
        index * section.bubbles.length + bubbleIndex
      ],
    }));
    return { ...section, bubbles: updatedBubbles };
  });

  const allBubbleRefs = [
    bubble1Ref,
    bubble2Ref,
    bubble3Ref,
    bubble4Ref,
    bubble5Ref,
    bubble6Ref,
    bubble7Ref,
    bubble8Ref,
  ];
  useBubbleAnimation(allBubbleRefs);

  return (
    <article className="z-40 size-full overflow-hidden text-clip break-words bg-white font-normal text-main">
      <div className="relative mx-auto flex min-h-[80dvh] max-w-screen-xl px-6 pb-10 pt-36 md:min-h-[85dvh] md:pb-24 md:pt-48">
        <div className="m-auto flex h-full flex-col items-center justify-between gap-44 md:gap-14">
          <div className="flex flex-col items-center gap-14 text-center">
            <h1 className="max-w-5xl font-grotesk text-4xl font-semibold sm:text-5xl md:text-7xl">
              La Información de Salud Esencial para tu Bienestar
            </h1>
            <p className="max-w-md text-center text-lg text-main-h dark:text-main-dark-h md:max-w-[850px] md:text-2xl">
              Todo lo que necesitas para una vida{" "}
              <span className="text-blue-600">más saludable</span> y equilibrada
            </p>
          </div>
          <Button
            size="lg"
            radius="full"
            variant="outline"
            onClick={scrollToSection}
            className="w-full text-base md:w-auto"
          >
            Comenzar
            <ArrowDown />
          </Button>
        </div>
      </div>

      <article className="relative size-full break-words bg-[url('/extras/essentia-bg-page.png')] bg-center bg-no-repeat font-normal text-main dark:text-main-dark-h">
        <AboutCrop className="absolute z-10 block h-28 w-full" />
        {sections.map((section, index) => (
          <Section key={index} index={index} {...section}>
            {section.bubbles.map((bubble, bubbleIndex) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={bubbleIndex}
                ref={bubble.ref}
                src={bubble.src}
                aria-hidden="true"
                alt="bubble"
                className={cn(
                  bubble.className,
                  bubbleIndex % 2 === 0
                    ? "animate-float-up-down delay-200"
                    : "animate-float-wave",
                  "absolute blur-xl motion-reduce:animate-none",
                )}
              />
            ))}
          </Section>
        ))}
        <section
          id="premium"
          className="relative size-full px-5 py-28 pb-64 sm:px-10 lg:py-40 lg:pb-80"
        >
          <div className="mx-auto size-full max-w-7xl">
            <div className="mx-auto mb-20 flex flex-col items-center sm:max-w-4xl">
              <h2 className="flex flex-col text-center text-lg tracking-wider text-main sm:text-3xl">
                <span className="font-semibold">
                  Aprovecha al máximo las posibilidades con{" "}
                </span>
                <span className="mt-8 bg-dark-gradient-v2 bg-clip-text text-3xl font-black uppercase text-transparent sm:text-6xl">
                  Essentia Premium
                </span>
              </h2>
            </div>
            <div className="mx-auto flex w-full flex-col items-center justify-center gap-6 text-center sm:w-96">
              {!isPremium && (
                <Link
                  type="button"
                  className="relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-light-gradient px-4 text-lg font-medium text-white transition hover:shadow-[0_8px_8px_rgba(0,0,0,0.2)] active:scale-[.98] active:shadow-none active:brightness-90 active:transition-none sm:px-8"
                  href="/premium"
                >
                  <span className="mr-2">
                    <StarsIcon
                      aria-hidden="true"
                      className="size-5 focus:outline-none [&_*]:fill-white"
                    />
                  </span>
                  Hazte premium
                </Link>
              )}
              {!session && (
                <Link
                  type="button"
                  className="relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-dark/40 px-4 text-lg font-medium text-white transition hover:shadow-[0_8px_8px_rgba(0,0,0,0.2)] active:scale-[.98] active:shadow-none active:brightness-90 active:transition-none sm:px-8"
                  href="/signup"
                >
                  Regístrate
                </Link>
              )}
              {session && isPremium && (
                <Link
                  type="button"
                  className="relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-light-gradient px-4 text-lg font-medium text-white transition hover:shadow-[0_8px_8px_rgba(0,0,0,0.2)] active:scale-[.98] active:shadow-none active:brightness-90 active:transition-none sm:px-8"
                  href="/premium"
                >
                  Revisa tus beneficios
                </Link>
              )}
            </div>
          </div>
        </section>
        <AboutCrop className="absolute bottom-0 block h-28 w-full rotate-180" />
      </article>
      <AboutFooter />
    </article>
  );
};

export default About;
