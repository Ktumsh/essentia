import ExcerciseFitness from "@/app/(main)/(resources)/_components/excercise-fitness";
import ForAllAges from "@/app/(main)/(resources)/_components/for-all-ages";
import HealthWellness from "@/app/(main)/(resources)/_components/health-wellness";
import Nutrition from "@/app/(main)/(resources)/_components/nutrition";
import SexEducation from "@/app/(main)/(resources)/_components/sex-education";
import Wellbeing from "@/app/(main)/(resources)/_components/wellbeing";

export const RESOURCE_DATA = [
  {
    slug: "salud-y-bienestar",
    name: "Salud y Bienestar",
    label: "Para tu salud",
    quote:
      "El mayor tesoro es la salud, y el conocimiento es la llave para preservarla.",
    videoTitle: "¿Qué es Salud y Bienestar?",
    videoLink: "ErfB8ga-PfA",
    component: HealthWellness,
  },
  {
    slug: "ejercicios-y-fitness",
    name: "Ejercicios y Fitness",
    label: "Para tu físico",
    quote:
      "El movimiento es una medicina para crear el cambio físico, emocional y mental.",
    videoTitle: "¿Cómo Mejorar tu Condición Física?",
    videoLink: "XrcPlkvysEY",
    component: ExcerciseFitness,
  },
  {
    slug: "nutricion-y-alimentacion",
    name: "Nutrición y Alimentación",
    label: "Para tu dieta",
    quote: "Que tu alimento sea tu medicina y que tu medicina sea tu alimento.",
    videoTitle: "¿Qué es una Alimentación Saludable?",
    videoLink: "Hrk9ivVbuso",
    component: Nutrition,
  },
  {
    slug: "bienestar-emocional",
    name: "Bienestar Emocional",
    label: "Para tu mente",
    quote:
      "La paz interior comienza en el momento en que eliges no permitir que otra persona o evento controle tus emociones.",
    videoTitle: "¿Cómo Mejorar Tu Bienestar Emocional?",
    videoLink: "KI3o-4hI0kw",
    component: Wellbeing,
  },
  {
    slug: "salud-y-educacion-sexual",
    name: "Salud y Educación Sexual",
    label: "Para tu sexualidad",
    quote:
      "La educación es el arma más poderosa para cambiar el mundo, incluida nuestra comprensión de la salud sexual.",
    videoTitle: "¿Qué es la Salud Sexual?",
    videoLink: "2G0QKNHH9KI",
    component: SexEducation,
  },
  {
    slug: "salud-en-todas-las-edades",
    name: "Salud en Todas las Edades",
    label: "Para tu bienestar",
    quote:
      "La salud es un regalo, y mantenerla es una de las mayores recompensas que podemos dar a nosotros mismos en cada etapa de la vida.",
    videoTitle: "¿Cómo Cuidar Tu Salud a Cualquier Edad?",
    videoLink: "vvsxRdfAtTA",
    component: ForAllAges,
  },
];

export type ResourceDataType = (typeof RESOURCE_DATA)[number];
