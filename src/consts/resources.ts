import ExcerciseFitness from "@/modules/resources/components/excercise-fitness";
import ForAllAges from "@/modules/resources/components/for-all-ages";
import HealthWellness from "@/modules/resources/components/health-wellness";
import Nutrition from "@/modules/resources/components/nutrition";
import SexEducation from "@/modules/resources/components/sex-education";
import Wellbeing from "@/modules/resources/components/wellbeing";

import type { Resources } from "@/types/resource";

export const RESOURCES: Resources[] = [
  {
    id: 1,
    title: "Salud y Bienestar",
    subtitle: "Para tu salud",
    intro: `Encuentra una amplia variedad de consejos sobre <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">hábitos saludables</strong> hasta métodos para <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">potenciar tu salud mental y emocional</strong>, encontrarás recursos variados para impulsar tu bienestar en todos los aspectos de la vida.`,
    quote:
      "El mayor tesoro es la salud, y el conocimiento es la llave para preservarla.",
    videoTitle: "¿Qué es Salud y Bienestar?",
    videoLink: "ErfB8ga-PfA",
    videoImage: "/videos/miniatura-salud-1920x1080.webp",
    image: "/extras/salud-600x400.webp",
    imageFull: "/extras/salud-1920x1280.webp",
    resource: "salud-y-bienestar",
    component: HealthWellness,
  },
  {
    id: 2,
    title: "Ejercicios y Fitness",
    subtitle: "Para tu físico",
    intro: `Aprende a abordar nuevos deportes, <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">trabajar en tu propio físico</strong> y llevar una vida más activa, adaptada a tus necesidades. Mejorarás tu rendimiento en las actividades diarias y <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">te sentirás más enérgico</strong>.`,
    quote:
      "El movimiento es una medicina para crear el cambio físico, emocional y mental.",
    videoTitle: "¿Cómo Mejorar tu Condición Física?",
    videoLink: "XrcPlkvysEY",
    videoImage: "/videos/miniatura-fitness-1920x1080.webp",
    image: "/extras/ejercicio-600x400.webp",
    imageFull: "/extras/ejercicio-1920x1280.webp",
    resource: "ejercicios-y-fitness",
    component: ExcerciseFitness,
  },
  {
    id: 3,
    title: "Nutrición y Alimentación",
    subtitle: "Para tu dieta",
    intro: `Te brindamos soluciones para una <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">alimentación equilibrada</strong> que te permitirán alcanzar tus objetivos, promoviendo un estilo de vida más <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">saludable y sostenible</strong> a largo plazo.`,
    quote: "Que tu alimento sea tu medicina y que tu medicina sea tu alimento.",
    videoTitle: "¿Qué es una Alimentación Saludable?",
    videoLink: "Hrk9ivVbuso",
    videoImage: "/videos/miniatura-nutricion-1920x1080.webp",
    image: "/extras/nutricion-600x400.webp",
    imageFull: "/extras/nutricion-1920x1280.webp",
    resource: "nutricion-y-alimentacion",
    component: Nutrition,
  },
  {
    id: 4,
    title: "Bienestar Emocional",
    subtitle: "Para tu mente",
    intro: `En esta sección encontrarás consejos, métodos para <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">manejar el estrés</strong> y <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">mejorar la salud mental</strong>, promoviendo así la armonía emocional en tu día a día.`,
    quote:
      "La paz interior comienza en el momento en que eliges no permitir que otra persona o evento controle tus emociones.",
    videoTitle: "¿Cómo Mejorar Tu Bienestar Emocional?",
    videoLink: "KI3o-4hI0kw",
    videoImage: "/videos/miniatura-bienestar-1920x1080.webp",
    image: "/extras/bienestar-600x400.webp",
    imageFull: "/extras/bienestar-1920x1280.webp",
    resource: "bienestar-emocional",
    component: Wellbeing,
  },
  {
    id: 5,
    title: "Salud y Educación Sexual",
    subtitle: "Para tu sexualidad",
    intro: `Proveemos información y recursos educativos sobre sexualidad, incluyendo métodos anticonceptivos y <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">consejos de cuidado</strong>, para fomentar el entendimiento y <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">cuidado de la diversidad y salud sexual</strong>.`,
    quote:
      "La educación es el arma más poderosa para cambiar el mundo, incluida nuestra comprensión de la salud sexual.",
    videoTitle: "¿Qué es la Salud Sexual?",
    videoLink: "2G0QKNHH9KI",
    videoImage: "/videos/miniatura-sexualidad-1920x1080.webp",
    image: "/extras/sexualidad-600x400.webp",
    imageFull: "/extras/sexualidad-1920x1280.webp",
    resource: "salud-y-educacion-sexual",
    component: SexEducation,
  },
  {
    id: 6,
    title: "Salud para Todas las Edades",
    subtitle: "Para ti y tus seres queridos",
    intro: `Desde la infancia hasta la vejez, nuestra sección <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">Salud para Todas las Edades</strong> ofrece información relevante y específica para cada etapa de la vida. Encuentra consejos útiles y recursos para cuidar la salud en todas las etapas del desarrollo.`,
    quote:
      "La salud es un regalo, y mantenerla es una de las mayores recompensas que podemos dar a nosotros mismos en cada etapa de la vida.",
    videoTitle: "¿Cómo Cuidar Tu Salud a Cualquier Edad?",
    videoLink: "vvsxRdfAtTA",
    videoImage: "/videos/miniatura-edades-1920x1080.webp",
    image: "/extras/edades-600x400.webp",
    imageFull: "/extras/edades-1920x1280.webp",
    resource: "salud-para-todas-las-edades",
    component: ForAllAges,
  },
];
