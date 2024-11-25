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
    intro: `Encuentra una amplia variedad de consejos sobre **hábitos saludables** hasta métodos para **potenciar tu salud mental y emocional**, encontrarás recursos variados para impulsar tu bienestar en todos los aspectos de la vida.`,
    description:
      "Salud y bienestar se refiere a la **condición general del cuerpo y la mente**, en la que una persona está libre de enfermedad y se siente **satisfecha y funcional en su vida diaria**. Esto incluye la **práctica de hábitos saludables** y el mantenimiento de un **equilibrio físico, mental y emocional**.",
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
    intro: `Aprende a abordar nuevos deportes, **trabajar en tu propio físico** y llevar una vida más activa, adaptada a tus necesidades. Mejorarás tu rendimiento en las actividades diarias y **te sentirás más enérgico**.`,
    description:
      "Ejercicios y fitness implica la **actividad física realizada de manera planificada y regular** para mejorar o mantener la **condición física**, la **fuerza**, la **flexibilidad** y la **salud cardiovascular**. Incluye ejercicios aeróbicos, entrenamiento de fuerza y otras actividades físicas.",
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
    intro: `Te brindamos soluciones para una **alimentación equilibrada** que te permitirán alcanzar tus objetivos, promoviendo un estilo de vida más **saludable y sostenible** a largo plazo.`,
    description:
      "Nutrición se refiere al **proceso de obtención y utilización de alimentos** para el **funcionamiento óptimo del cuerpo**. Involucra la **ingesta de macronutrientes y micronutrientes esenciales** para la **salud**, el **crecimiento** y la **prevención de enfermedades**.",
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
    intro: `En esta sección encontrarás consejos, métodos para **manejar el estrés** y **mejorar la salud mental**, promoviendo así la armonía emocional en tu día a día.`,
    description:
      "Bienestar emocional se refiere a la **capacidad de una persona para manejar sus emociones** y mantener una **perspectiva positiva y equilibrada en la vida**. Implica el **desarrollo de habilidades para gestionar el estrés** y promover **relaciones saludables**.",
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
    intro: `Proveemos información y recursos educativos sobre sexualidad, incluyendo métodos anticonceptivos y **consejos de cuidado**, para fomentar el entendimiento y **cuidado de la diversidad y salud sexual**.`,
    description:
      "Salud y educación sexual abordan el **conocimiento y las prácticas necesarias** para **mantener la salud reproductiva** y **prevenir enfermedades de transmisión sexual**. Incluye educación sobre **anatomía, relaciones, consentimiento y protección**.",
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
    subtitle: "Para ti y para ellos",
    intro: `Desde la infancia hasta la vejez, nuestra sección **Salud para Todas las Edades** ofrece información relevante y específica para cada etapa de la vida. Encuentra consejos útiles y recursos para cuidar la salud en todas las etapas del desarrollo.`,
    description:
      "Salud para todas las edades se refiere a la **promoción de la salud y el bienestar** adaptados a cada etapa de la vida, desde la **niñez hasta la vejez**. Reconoce las **necesidades cambiantes** en cada fase y fomenta una **vida saludable en todas ellas**.",
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
