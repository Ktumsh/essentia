"use client";

import { useEffect } from "react";

import HomeLine from "./home-line";
import Section from "./section";

import { LandingCrop } from "@/modules/icons/miscellaneus";

import Image from "next/image";
import Link from "next/link";
import Footer from "./footer";

import { $$ } from "@/utils/dom-selector";

const Landing = () => {
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
        (
          image as HTMLElement
        ).style.transform = `translate3d(0px, ${translateYValue}px, 0px)`;
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
    <article className="size-full break-words font-normal text-base-color z-40 overflow-clip">
      <div className="relative flex px-5 pt-24 sm:pt-52 max-w-screen-xl mx-auto">
        <HomeLine />
        <div className="flex flex-col pl-6 sm:pl-0">
          <div className="text-start">
            <h1 className="text-5xl sm:text-[72px] sm:leading-[76px] lg:text-[80px] lg:leading-[80px] tracking-tight font-medium mb-4 lg:ml-[-7px] max-w-4xl">
              <span className="text-4xl sm:text-5xl md:text-7xl">
                La Información de Salud Esencial para tu Bienestar
              </span>
            </h1>
            <p className="text-lg sm:text-2xl mb-4 sm:mb-24">
              Todo lo que necesitas para una vida{" "}
              <span className="text-orient-700">más saludable</span> y
              equilibrada
            </p>
          </div>
          <div className="flex flex-col sm:flex-row">
            <Link
              href="/signup"
              type="button"
              aria-label="Registrar usuario"
              className="btn_mktg relative inline-block py-4 px-6 text-[17px] leading-4 align-middle text-center whitespace-nowrap rounded-xl font-extrabold text-cerise-red-600 hover:text-cerise-red-800 shadow-[0_0_0_1px_rgb(201,53,96)] hover:shadow-[0_0_0_2px_rgb(142,35,73)] transition-shadow duration-200"
            >
              Únete a Essentia
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block arrow-symbol-mktg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
                ></path>
                <path
                  className="octicon-chevrow-stem"
                  stroke="currentColor"
                  d="M1.75 8H11"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="h-48"></div>
        </div>
      </div>

      <article className="relative size-full break-words font-normal text-base-color dark:text-base-color-dark-h bg-[url('/extras/essentia-bg-page.png')] bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-[url(https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/664f212db01d13abd533fda6_Texture%203.webp)] bg-no-repeat bg-[length:95.5%] bg-[100%_-33%] bg-scroll"></div>
        <div className="abolute w-full top-0 left-0">
          <LandingCrop className="absolute block w-full h-28 z-10" />
          <Section
            sectionId="nuestros_recursos"
            classSection="pt-60 pb-40"
            wrapper="lg:pr-14 slideleft"
            inner="lg:flex-row-reverse"
            sectionName="Nuestros recursos"
            title="Infórmate, aprende y descubre todo sobre tu salud y la de otros en un sólo lugar"
            description="Descubre cómo tener una vida saludable, visualiza tutoriales para ejercicios, información de nutrición, consejos sobre el bienestar emocional, tu salud sexual y aborda las necesidades específicas según tú edad o la de otros."
            img="/essentia-screenshot-2.png"
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
            img="/essentia-screenshot-7.png"
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
            sectionId="noticias_al_dia"
            classSection="py-28 lg:py-40"
            wrapper="lg:pr-14 slideleft"
            inner="lg:flex-row-reverse"
            sectionName="Noticias al día"
            title="Mantente al tanto de las actualizaciones en el mundo"
            description="Descubre avances médicos, consejos de expertos y descubrimientos en salud. Desde consejos prácticos sobre el bienestar hasta reportajes sobre el tema, encuentra artículos actualizados que te ayudarán a comprender los desafíos y soluciones en salud a nivel mundial."
            img="/essentia-screenshot-4.png"
            imgAlt="Noticias de Essentia"
          >
            <Image
              className="bubble absolute right-[-15%] sm:right-[-10%] lg:right-[10%] top-0 opacity-90 w-[150px] blur-xl"
              width={150}
              height={150}
              src="/surface-01.svg"
              alt="bubble1"
            />
            <Image
              className="bubble absolute left-[-30%] sm:left-[-15%] lg:left-[15%] bottom-[15%] w-[230px] blur-xl"
              width={150}
              height={150}
              src="/surface-03.svg"
              alt="bubble3"
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
            img="/essentia-screenshot-6.png"
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
            id="todo_y_mas"
            className="relative size-full px-5 sm:px-10 py-28 pb-64 lg:pb-80 lg:py-40"
          >
            <div className="size-full max-w-[1250px] mx-auto">
              <div className="flex flex-col items-center max-w-[1100px] mx-auto mb-10">
                <h2 className="text-3xl sm:text-6xl font-black tracking-wider uppercase text-center text-base-color">
                  Essentia contará con una versión
                  <span className="text-transparent bg-clip-text bg-dark-gradient-v2">
                    premium
                  </span>{" "}
                  próximamente...
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center w-full sm:w-96 mx-auto gap-6 text-center">
                <Link
                  type="button"
                  aria-label="Autenticar usuario"
                  className="relative inline-flex items-center justify-center overflow-hidden w-full h-14 px-4 sm:px-8 font-medium text-lg rounded-full bg-light-gradient hover:shadow-[0_8px_8px_rgba(0,0,0,0.2)] active:scale-[.98] active:transition-none active:shadow-none active:brightness-90 text-white transition"
                  href="/login"
                >
                  Unirse a Essentia
                </Link>
                <Link
                  type="button"
                  aria-label="Autenticar usuario"
                  className="relative inline-flex items-center justify-center overflow-hidden w-full h-14 px-4 sm:px-8 font-medium text-lg rounded-full bg-base-dark-40 hover:shadow-[0_8px_8px_rgba(0,0,0,0.2)] active:scale-[.98] active:transition-none active:shadow-none active:brightness-90 text-white transition"
                  href=""
                >
                  Echar vistazo a Essentia Plus
                </Link>
              </div>
            </div>
          </section>
          <LandingCrop className="absolute block w-full h-28 bottom-0 rotate-180" />
        </div>
      </article>
      <Footer />
    </article>
  );
};

export default Landing;
