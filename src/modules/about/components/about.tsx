"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { StarsIcon } from "@/modules/icons/common";
import { AboutCrop } from "@/modules/icons/miscellaneus";
import { ArrowAnimateIcon } from "@/modules/icons/navigation";
import { Session } from "@/types/session";
import { $$ } from "@/utils/dom-selector";

import AboutFooter from "./about-footer";
import Section from "./section";
import useSmoothScroll from "../hooks/use-smooth-scroll";

interface AboutProps {
  session: Session | null;
}

const About = ({ session }: AboutProps) => {
  const scrollToSection = useSmoothScroll("#nuestros_recursos");

  useEffect(() => {
    const bubbles = $$(".bubble");
    const inView = new Map<Element, number>();
    const speed = 0.1;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      inView.forEach((initialScrollY, image) => {
        const deltaY = scrollY - initialScrollY;
        const translateYValue = deltaY > 0 ? deltaY * speed : 0;
        (image as HTMLElement).style.transform =
          `translate3d(0px, ${translateYValue}px, 0px)`;
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          inView.set(entry.target, window.scrollY);
        } else {
          inView.delete(entry.target);
          (entry.target as HTMLElement).style.transform = "";
        }
      });
    }, options);

    bubbles.forEach((image) => {
      observer.observe(image);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);
  return (
    <article className="size-full bg-white break-words font-normal text-base-color z-40 text-clip">
      <div className="relative flex flex-col items-center justify-center px-5 pt-24 sm:pt-52 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center pl-6 sm:pl-0 text-center">
          <h1 className="text-5xl sm:text-[72px] sm:leading-[76px] lg:text-[80px] lg:leading-[80px] tracking-tight font-medium mb-4 lg:ml-[-7px] max-w-4xl">
            <span className="font-semibold tracking-tight text-4xl sm:text-5xl md:text-7xl">
              La Información de Salud Esencial para tu Bienestar
            </span>
          </h1>
          <p className="text-lg sm:text-2xl mb-4 sm:mb-24">
            Todo lo que necesitas para una vida{" "}
            <span className="text-orient-700">más saludable</span> y equilibrada
          </p>
        </div>
        <div className="flex flex-col sm:flex-row">
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
          <div className="h-48"></div>
        </div>
      </div>

      <article className="relative size-full break-words font-normal text-base-color dark:text-base-color-dark-h bg-[url('/extras/essentia-bg-page.png')] bg-center bg-no-repeat">
        <div className="abolute w-full top-0 left-0 overflow-hidden">
          <AboutCrop className="absolute block w-full h-28 z-10" />
          <Section
            sectionId="nuestros_recursos"
            classSection="pt-60 pb-40"
            wrapper="lg:pr-14 slideleft"
            inner="lg:flex-row-reverse"
            sectionName="Nuestros recursos"
            title="Infórmate, aprende y descubre todo sobre tu salud y la de otros en un sólo lugar"
            description="Descubre cómo tener una vida saludable, visualiza tutoriales para ejercicios, información de nutrición, consejos sobre el bienestar emocional, tu salud sexual y aborda las necesidades específicas según tú edad o la de otros."
            img="/screenshots/essentia-screenshot-2.png"
            imgAlt="Recursos de Essentia"
          >
            <Image
              className="bubble absolute left-[-30%] sm:left-[-10%] lg:left-[11%] top-[18%] opacity-90 w-[250px] blur-xl"
              width={150}
              height={150}
              src="/surface-01.svg"
              alt="bubble1"
            />
            <Image
              className="bubble absolute right-[-30%] sm:right-[-15%] lg:right-[9%] bottom-[35%] w-[300px] blur-xl"
              width={150}
              height={150}
              src="/surface-03.svg"
              alt="bubble3"
            />
          </Section>
          <Section
            sectionId="nuestro_metodo"
            classSection="py-28 lg:py-40"
            wrapper="lg:pl-14 slideright"
            inner="lg:flex-row"
            sectionName="Nuestro método"
            title="Promovemos la salud y el bienestar de forma rápida y amigable"
            description="Creemos que la salud es invaluable y todos, sin importar la situación, merecen disfrutar de una vida plena. Es por eso que nos enfocamos en proporcionarte información basándonos en lo fundamental, lo relevante y lo esencial."
            img="/screenshots/essentia-screenshot-7.png"
            imgAlt="Metodo de Essentia"
          >
            <Image
              className="bubble absolute left-[-5%] lg:left-[14%] top-[4%] w-[200px] blur-xl"
              width={150}
              height={150}
              src="/surface-02.svg"
              alt="bubble2"
            />
          </Section>
          <Section
            sectionId="essentia_ai"
            classSection="py-28 lg:py-40"
            wrapper="lg:pl-14 slideright"
            inner="lg:flex-row"
            sectionName="Essentia AI"
            title="Descubre nuestra asistencia automatizada"
            description="¡Obtén respuestas rápidas y precisas sobre salud y bienestar! Nuestro asistente virtual te ofrece orientación personalizada al instante. Accede a información confiable sobre diversos temas de salud, respaldada por evidencia científica, para tomar decisiones informadas. Descubre soluciones precisas y confiables para todas tus dudas."
            img="/screenshots/essentia-screenshot-6.png"
            imgAlt="Inteligencia Artificial de Essentia"
          >
            <Image
              className="bubble absolute left-[-30%] sm:left-[-10%] lg:left-[40%] bottom-[20%] opacity-90 w-[200px] blur-xl"
              width={150}
              height={150}
              src="/surface-01.svg"
              alt="bubble1"
            />
            <Image
              className="bubble absolute right-[-5%] lg:right-[28%] top-[-5%] w-[150px] blur-xl"
              width={150}
              height={150}
              src="/surface-02.svg"
              alt="bubble2"
            />
            <Image
              className="absolute right-[-5%] lg:right-[15%] top-0 sm:top-[9%] w-[180px] sm:w-[200px] drop-shadow-[6px_15px_4px_rgba(0,0,0,0.3)] z-20"
              width={150}
              height={150}
              src="/extras/essentia-utils-01.png"
              alt="bubble2"
            />
          </Section>
          <section
            id="premium"
            className="relative size-full px-5 sm:px-10 py-28 pb-64 lg:pb-80 lg:py-40"
          >
            <div className="size-full max-w-[1250px] mx-auto">
              <div className="flex flex-col items-center max-w-4xl mx-auto mb-10">
                <h2 className="text-xl sm:text-3xl font-black tracking-wider uppercase text-center text-base-color">
                  Aprovecha al máximo las posibilidades con{" "}
                  <span className="text-6xl text-transparent bg-clip-text bg-dark-gradient-v2">
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
                    className="relative inline-flex items-center justify-center overflow-hidden w-full h-14 px-4 sm:px-8 font-medium text-lg rounded-full bg-base-dark-40 hover:shadow-[0_8px_8px_rgba(0,0,0,0.2)] active:scale-[.98] active:transition-none active:shadow-none active:brightness-90 text-white transition"
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
