import { AboutSection } from "@/types/common";

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    sectionId: "nuestros_recursos",
    classSection: "pt-60 pb-40",
    wrapper: "lg:pr-14 slideleft",
    inner: "lg:flex-row-reverse",
    sectionName: "Nuestros recursos",
    title:
      "Infórmate, aprende y descubre todo sobre tu salud y la de otros en un sólo lugar",
    description:
      "Descubre cómo tener una vida saludable, visualiza tutoriales para ejercicios, información de nutrición, consejos sobre el bienestar emocional, tu salud sexual y aborda las necesidades específicas según tú edad o la de otros.",
    img: "/screenshots/essentia-screenshot-2.png",
    imgAlt: "Recursos de Essentia",
    bubbles: [
      {
        ref: null,
        src: "/surface-01.svg",
        alt: "bubble1",
        className:
          "absolute left-[-30%] sm:left-[-10%] lg:left-[11%] top-[18%] opacity-90 w-[250px] blur-xl",
      },
      {
        ref: null,
        src: "/surface-03.svg",
        alt: "bubble2",
        className:
          "absolute right-[-30%] sm:right-[-15%] lg:right-[9%] bottom-[35%] w-[300px] blur-xl",
      },
    ],
  },
  {
    sectionId: "nuestro_metodo",
    classSection: "py-28 lg:py-40",
    wrapper: "lg:pl-14 slideright",
    inner: "lg:flex-row",
    sectionName: "Nuestro método",
    title: "Promovemos la salud y el bienestar de forma rápida y amigable",
    description:
      "Creemos que la salud es invaluable y todos, sin importar la situación, merecen disfrutar de una vida plena. Es por eso que nos enfocamos en proporcionarte información basándonos en lo fundamental, lo relevante y lo esencial.",
    img: "/screenshots/essentia-screenshot-7.png",
    imgAlt: "Método de Essentia",
    bubbles: [
      {
        ref: null,
        src: "/surface-02.svg",
        alt: "bubble3",
        className:
          "absolute left-[-5%] lg:left-[14%] top-[4%] w-[200px] blur-xl",
      },
    ],
  },
  {
    sectionId: "essentia_ai",
    classSection: "py-28 lg:py-40",
    wrapper: "lg:pl-14 slideleft",
    inner: "lg:flex-row",
    sectionName: "Essentia AI",
    title: "Descubre nuestra asistencia automatizada",
    description:
      "¡Obtén respuestas rápidas y precisas sobre salud y bienestar! Nuestro asistente virtual te ofrece orientación personalizada al instante. Accede a información confiable sobre diversos temas de salud, respaldada por evidencia científica, para tomar decisiones informadas. Descubre soluciones precisas y confiables para todas tus dudas.",
    img: "/screenshots/essentia-screenshot-6.png",
    imgAlt: "Inteligencia Artificial de Essentia",
    bubbles: [
      {
        ref: null,
        src: "/surface-01.svg",
        alt: "bubble4",
        className:
          "absolute left-[-30%] sm:left-[-10%] lg:left-[40%] bottom-[20%] opacity-90 w-[200px] blur-xl",
      },
      {
        ref: null,
        src: "/surface-02.svg",
        alt: "bubble5",
        className:
          "absolute right-[-5%] lg:right-[28%] top-[-5%] w-[150px] blur-xl",
      },
    ],
  },
];
