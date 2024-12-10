"use client";

import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { ABOUT_SECTIONS } from "@/consts/about-sections";
import { StarsIcon } from "@/modules/icons/common";
import { AboutCrop } from "@/modules/icons/miscellaneus";
import { ArrowAnimateIcon } from "@/modules/icons/navigation";

import AboutFooter from "./about-footer";
import Section from "./section";
import useBubbleAnimation from "../hooks/use-bubble-animation";
import useSmoothScroll from "../hooks/use-smooth-scroll";

interface AboutProps {
  session: Session | null;
}

const About = ({ session }: AboutProps) => {
  const scrollToSection = useSmoothScroll("#nuestros_recursos");

  const bubble1Ref = useRef<HTMLImageElement>(null);
  const bubble2Ref = useRef<HTMLImageElement>(null);
  const bubble3Ref = useRef<HTMLImageElement>(null);
  const bubble4Ref = useRef<HTMLImageElement>(null);
  const bubble5Ref = useRef<HTMLImageElement>(null);

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
  ];
  useBubbleAnimation(allBubbleRefs);

  return (
    <article className="z-40 size-full text-clip break-words bg-white font-normal text-main">
      <div className="relative mx-auto flex max-w-screen-xl flex-col items-center justify-center px-5 pt-24 sm:pt-56">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
            La Información de Salud Esencial para tu Bienestar
          </h1>
          <p className="max-w-md text-center text-lg text-main-h dark:text-main-dark-h md:max-w-[850px] md:text-2xl">
            Todo lo que necesitas para una vida{" "}
            <span className="text-orient-700">más saludable</span> y equilibrada
          </p>
        </div>
        <div className="flex py-32">
          <Button
            size="lg"
            radius="lg"
            variant="outline"
            onClick={scrollToSection}
            className="text-base"
          >
            Comenzar
            <ArrowAnimateIcon className="arrow-symbol-mktg inline-block size-4" />
          </Button>
        </div>
      </div>

      <article className="relative size-full break-words bg-[url('/extras/essentia-bg-page.png')] bg-center bg-no-repeat font-normal text-main dark:text-main-dark-h">
        <div className="abolute left-0 top-0 w-full overflow-hidden">
          <AboutCrop className="absolute z-10 block h-28 w-full" />
          {sections.map((section) => (
            <Section
              key={section.sectionId}
              sectionId={section.sectionId}
              classSection={section.classSection}
              wrapper={section.wrapper}
              inner={section.inner}
              sectionName={section.sectionName}
              title={section.title}
              description={section.description}
              img={section.img}
              imgAlt={section.imgAlt}
            >
              {section.bubbles.map((bubble, bubbleIndex) => (
                <Image
                  key={bubbleIndex}
                  ref={bubble.ref}
                  src={bubble.src}
                  alt={bubble.alt}
                  width={150}
                  height={150}
                  className={bubble.className}
                  aria-hidden="true"
                />
              ))}
            </Section>
          ))}
          <section
            id="premium"
            className="relative size-full px-5 py-28 pb-64 sm:px-10 lg:py-40 lg:pb-80"
          >
            <div className="mx-auto size-full max-w-[1250px]">
              <div className="mx-auto mb-20 flex max-w-xs flex-col items-center sm:max-w-4xl">
                <h2 className="flex flex-col text-center text-lg font-black uppercase tracking-wider text-main sm:text-3xl">
                  <span>Aprovecha al máximo las posibilidades con </span>
                  <span className="mt-8 bg-dark-gradient-v2 bg-clip-text text-3xl text-transparent sm:text-6xl">
                    Essentia Premium
                  </span>
                </h2>
              </div>
              <div className="mx-auto flex w-full flex-col items-center justify-center gap-6 text-center sm:w-96">
                <Link
                  type="button"
                  aria-label="Autenticar usuario"
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
                {!session && (
                  <Link
                    type="button"
                    aria-label="Autenticar usuario"
                    className="relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-dark/40 px-4 text-lg font-medium text-white transition hover:shadow-[0_8px_8px_rgba(0,0,0,0.2)] active:scale-[.98] active:shadow-none active:brightness-90 active:transition-none sm:px-8"
                    href="/login"
                  >
                    Inicia sesión
                  </Link>
                )}
              </div>
            </div>
          </section>
          <AboutCrop className="absolute bottom-0 block h-28 w-full rotate-180" />
        </div>
      </article>
      <AboutFooter />
    </article>
  );
};

export default About;
