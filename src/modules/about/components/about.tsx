"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { ABOUT_SECTIONS } from "@/consts/about-sections";
import { StarsIcon } from "@/modules/icons/common";
import { AboutCrop } from "@/modules/icons/miscellaneus";
import { ArrowAnimateIcon } from "@/modules/icons/navigation";
import { Session } from "@/types/session";

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
    <article className="size-full bg-white break-words font-normal text-main z-40 text-clip">
      <div className="relative flex flex-col items-center justify-center px-5 pt-24 sm:pt-56 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center pl-6 sm:pl-0 text-center space-y-6">
          <h1 className="font-semibold tracking-tight text-4xl sm:text-5xl md:text-7xl max-w-4xl">
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
            radius="sm"
            variant="light"
            disableRipple
            onPress={scrollToSection}
            className="btn_mktg border border-gray-200"
            endContent={
              <ArrowAnimateIcon className="size-4 inline-block arrow-symbol-mktg" />
            }
          >
            Comenzar
          </Button>
        </div>
      </div>

      <article className="relative size-full break-words font-normal text-main dark:text-main-dark-h bg-[url('/extras/essentia-bg-page.png')] bg-center bg-no-repeat">
        <div className="abolute w-full top-0 left-0 overflow-hidden">
          <AboutCrop className="absolute block w-full h-28 z-10" />
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
            className="relative size-full px-5 sm:px-10 py-28 pb-64 lg:pb-80 lg:py-40"
          >
            <div className="size-full max-w-[1250px] mx-auto">
              <div className="flex flex-col items-center max-w-xs sm:max-w-4xl mx-auto mb-20">
                <h2 className="flex flex-col text-lg sm:text-3xl font-black tracking-wider uppercase text-center text-main">
                  <span>Aprovecha al máximo las posibilidades con </span>
                  <span className="mt-8 text-3xl sm:text-6xl text-transparent bg-clip-text bg-dark-gradient-v2">
                    Essentia Premium
                  </span>
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center w-full sm:w-96 mx-auto gap-6 text-center">
                <Link
                  type="button"
                  aria-label="Autenticar usuario"
                  className="relative inline-flex items-center justify-center overflow-hidden w-full h-14 px-4 sm:px-8 font-medium text-lg rounded-full bg-light-gradient hover:shadow-[0_8px_8px_rgba(0,0,0,0.2)] active:scale-[.98] active:transition-none active:shadow-none active:brightness-90 text-white transition"
                  href="/premium"
                >
                  <span className="mr-2">
                    <StarsIcon
                      aria-hidden="true"
                      className="size-5 [&_*]:fill-white focus:outline-none"
                    />
                  </span>
                  Hazte premium
                </Link>
                {!session && (
                  <Link
                    type="button"
                    aria-label="Autenticar usuario"
                    className="relative inline-flex items-center justify-center overflow-hidden w-full h-14 px-4 sm:px-8 font-medium text-lg rounded-full bg-dark/40 hover:shadow-[0_8px_8px_rgba(0,0,0,0.2)] active:scale-[.98] active:transition-none active:shadow-none active:brightness-90 text-white transition"
                    href="/login"
                  >
                    Inicia sesión
                  </Link>
                )}
              </div>
            </div>
          </section>
          <AboutCrop className="absolute block w-full h-28 bottom-0 rotate-180" />
        </div>
      </article>
      <AboutFooter />
    </article>
  );
};

export default About;
