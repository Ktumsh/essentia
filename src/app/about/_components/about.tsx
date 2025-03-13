"use client";

import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import { useRef } from "react";

import { Button } from "@/components/kit/button";
import { StarsIcon } from "@/components/ui/icons/common";
import { AboutCrop } from "@/components/ui/icons/miscellaneus";
import { ABOUT_SECTIONS } from "@/consts/about-sections";
import { cn } from "@/lib/utils";

import AboutFooter from "./about-footer";
import Section from "./section";
import useBubbleAnimation from "../_hooks/use-bubble-animation";
import useSmoothScroll from "../_hooks/use-smooth-scroll";

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

  const buttonClass =
    "from-gradient-from via-gradient-via to-gradient-to relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r px-4 text-lg font-medium text-white transition duration-300 hover:shadow-lg active:scale-[.98] active:shadow-none active:saturate-150 active:duration-50 sm:px-8 border-2 border-white hover:scale-105";

  return (
    <main className="text-foreground z-40 size-full bg-white font-normal break-words text-clip">
      <div className="relative mx-auto flex min-h-[80dvh] max-w-7xl px-6 pt-36 pb-10 md:min-h-[85dvh] md:pt-48 md:pb-24">
        <div className="m-auto flex h-full flex-col items-center justify-between gap-44 md:gap-14">
          <div className="flex flex-col items-center gap-14">
            <h1 className="font-grotesk text-foreground/80 text-4xl font-semibold sm:text-5xl md:text-5xl xl:text-7xl">
              Lo{" "}
              <code className="rounded-xl bg-indigo-100 px-4 text-indigo-500">
                Esencial
              </code>{" "}
              para tu{" "}
              <code className="rounded-xl bg-rose-100 px-4 text-rose-500">
                Bienestar
              </code>
            </h1>
            <p className="text-foreground/80 max-w-md text-center text-lg md:max-w-[850px] md:text-2xl">
              Todo lo que necesitas para una vida{" "}
              <span className="font-medium text-lime-500">más saludable</span> y
              equilibrada
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

      <article className="text-foreground relative w-full bg-[url('/extras/essentia-bg-page.png')] bg-center bg-no-repeat font-normal break-words">
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
              <h2 className="text-foreground flex flex-col text-center tracking-wider">
                <span className="text-lg font-semibold sm:text-2xl">
                  Aprovecha al máximo las posibilidades con{" "}
                </span>
                <span className="mt-8 [background-image:var(--alternative-gradient)] bg-clip-text text-3xl font-bold text-transparent uppercase drop-shadow-md [-webkit-text-stroke-color:white] [-webkit-text-stroke-width:1px] sm:text-7xl">
                  Essentia Premium
                </span>
              </h2>
            </div>
            <div className="mx-auto flex w-full flex-col items-center justify-center gap-6 text-center sm:w-96">
              {!isPremium && (
                <Link type="button" className={buttonClass} href="/pricing">
                  <span className="mr-2">
                    <StarsIcon
                      aria-hidden="true"
                      className="size-5 **:fill-white focus:outline-hidden"
                    />
                  </span>
                  Hazte premium
                </Link>
              )}
              {!session && (
                <Link
                  type="button"
                  className="relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-white px-4 text-lg font-medium transition duration-300 hover:scale-105 hover:shadow-lg active:scale-[.98] active:shadow-none active:saturate-150 active:duration-50 sm:px-8"
                  href="/signup"
                >
                  Regístrate
                </Link>
              )}
              {session && isPremium && (
                <Link type="button" className={buttonClass} href="/pricing">
                  Revisa tus beneficios
                </Link>
              )}
            </div>
          </div>
        </section>
        <AboutCrop className="absolute bottom-0 block h-28 w-full rotate-180" />
      </article>
      <AboutFooter />
    </main>
  );
};

export default About;
