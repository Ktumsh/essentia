import ExcerciseFitness from "@/app/(main)/(resources)/_components/excercise-fitness";
import ForAllAges from "@/app/(main)/(resources)/_components/for-all-ages";
import HealthWellness from "@/app/(main)/(resources)/_components/health-wellness";
import Nutrition from "@/app/(main)/(resources)/_components/nutrition";
import SexEducation from "@/app/(main)/(resources)/_components/sex-education";
import Wellbeing from "@/app/(main)/(resources)/_components/wellbeing";

import type { Resources } from "@/types/resource";

const BASE_URL =
  "https://res.cloudinary.com/dcub4itgg/image/upload/f_auto,q_auto/v1/essentia/resource";

export const RESOURCES: Resources[] = [
  {
    title: "Salud y Bienestar",
    subtitle: "Para tu salud",
    intro: `Encuentra una amplia variedad de consejos sobre **hábitos saludables** hasta métodos para **potenciar tu salud mental y emocional**, encontrarás recursos variados para impulsar tu bienestar en todos los aspectos de la vida.`,
    description:
      "Salud y bienestar es la **condición general del cuerpo y la mente**, libre de enfermedad, donde una persona se siente **satisfecha y funcional**. Incluye la **práctica de hábitos saludables** y el mantenimiento de un **equilibrio físico, mental y emocional**.",
    quote:
      "El mayor tesoro es la salud, y el conocimiento es la llave para preservarla.",
    videoTitle: "¿Qué es Salud y Bienestar?",
    videoLink: "ErfB8ga-PfA",
    videoImage: "/videos/miniatura-salud-1920x1080.webp",
    image: "/extras/salud-600x400.webp",
    imageFull: `${BASE_URL}/r-01`,
    resource: "salud-y-bienestar",
    component: HealthWellness,
  },
  {
    title: "Ejercicios y Fitness",
    subtitle: "Para tu físico",
    intro: `Aprende a abordar nuevos deportes, **trabajar en tu propio físico** y llevar una vida más activa, adaptada a tus necesidades. Mejorarás tu rendimiento en las actividades diarias y **te sentirás más enérgico**.`,
    description:
      "Ejercicios y fitness implica la **actividad física realizada de manera planificada y regular** para mejorar o mantener la **condición física**, la **fuerza**, la **flexibilidad** y la **salud cardiovascular**. Incluye ejercicios aeróbicos, entrenamiento de fuerza y otras actividades físicas.",
    quote:
      "El movimiento es una medicina para crear el cambio físico, emocional y mental.",
    videoTitle: "¿Cómo Mejorar tu Condición Física?",
    videoLink: "XrcPlkvysEY",
    videoImage: "/videos/miniatura-fitness-1920x1080.webp",
    image: "/extras/ejercicio-600x400.webp",
    imageFull: `${BASE_URL}/r-02`,
    resource: "ejercicios-y-fitness",
    component: ExcerciseFitness,
  },
  {
    title: "Nutrición y Alimentación",
    subtitle: "Para tu dieta",
    intro: `Te brindamos soluciones para una **alimentación equilibrada** que te permitirán alcanzar tus objetivos, promoviendo un estilo de vida más **saludable y sostenible** a largo plazo.`,
    description:
      "Nutrición se refiere al **proceso de obtención y utilización de alimentos** para el **funcionamiento óptimo del cuerpo**. Involucra la **ingesta de macronutrientes y micronutrientes esenciales** para la **salud**, el **crecimiento** y la **prevención de enfermedades**.",
    quote: "Que tu alimento sea tu medicina y que tu medicina sea tu alimento.",
    videoTitle: "¿Qué es una Alimentación Saludable?",
    videoLink: "Hrk9ivVbuso",
    videoImage: "/videos/miniatura-nutricion-1920x1080.webp",
    image: "/extras/nutricion-600x400.webp",
    imageFull: `${BASE_URL}/r-03`,
    resource: "nutricion-y-alimentacion",
    component: Nutrition,
  },
  {
    title: "Bienestar Emocional",
    subtitle: "Para tu mente",
    intro: `En esta sección encontrarás consejos, métodos para **manejar el estrés** y **mejorar la salud mental**, promoviendo así la armonía emocional en tu día a día.`,
    description:
      "Bienestar emocional se refiere a la **capacidad de una persona para manejar sus emociones** y mantener una **perspectiva positiva y equilibrada en la vida**. Implica el **desarrollo de habilidades para gestionar el estrés** y promover **relaciones saludables**.",
    quote:
      "La paz interior comienza en el momento en que eliges no permitir que otra persona o evento controle tus emociones.",
    videoTitle: "¿Cómo Mejorar Tu Bienestar Emocional?",
    videoLink: "KI3o-4hI0kw",
    videoImage: "/videos/miniatura-bienestar-1920x1080.webp",
    image: "/extras/bienestar-600x400.webp",
    imageFull: `${BASE_URL}/r-04`,
    resource: "bienestar-emocional",
    component: Wellbeing,
  },
  {
    title: "Salud y Educación Sexual",
    subtitle: "Para tu sexualidad",
    intro: `Proveemos información y recursos educativos sobre sexualidad, incluyendo métodos anticonceptivos y **consejos de cuidado**, para fomentar el entendimiento y **cuidado de la diversidad y salud sexual**.`,
    description:
      "Salud y educación sexual abordan el **conocimiento y las prácticas necesarias** para **mantener la salud reproductiva** y **prevenir enfermedades de transmisión sexual**. Incluye educación sobre **anatomía, relaciones, consentimiento y protección**.",
    quote:
      "La educación es el arma más poderosa para cambiar el mundo, incluida nuestra comprensión de la salud sexual.",
    videoTitle: "¿Qué es la Salud Sexual?",
    videoLink: "2G0QKNHH9KI",
    videoImage: "/videos/miniatura-sexualidad-1920x1080.webp",
    image: "/extras/sexualidad-600x400.webp",
    imageFull: `${BASE_URL}/r-05`,
    resource: "salud-y-educacion-sexual",
    component: SexEducation,
  },
  {
    title: "Salud en Todas las Edades",
    subtitle: "Para un futuro saludable",
    intro: `Desde la infancia hasta la vejez, nuestra sección **Salud en Todas las Edades** ofrece información relevante y específica para cada etapa de la vida. Encuentra consejos útiles y recursos para cuidar la salud en todas las etapas del desarrollo.`,
    description:
      "Salud en todas las edades se refiere a la **promoción de la salud y el bienestar** adaptados a cada etapa de la vida, desde la **niñez hasta la vejez**. Reconoce las **necesidades cambiantes** en cada fase y fomenta una **vida saludable en todas ellas**.",
    quote:
      "La salud es un regalo, y mantenerla es una de las mayores recompensas que podemos dar a nosotros mismos en cada etapa de la vida.",
    videoTitle: "¿Cómo Cuidar Tu Salud a Cualquier Edad?",
    videoLink: "vvsxRdfAtTA",
    videoImage: "/videos/miniatura-edades-1920x1080.webp",
    image: "/extras/edades-600x400.webp",
    imageFull: `${BASE_URL}/r-06`,
    resource: "salud-en-todas-las-edades",
    component: ForAllAges,
  },
];
