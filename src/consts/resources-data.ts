import ExcerciseFitness from "@/app/(main)/(resources)/_components/excercise-fitness";
import ForAllAges from "@/app/(main)/(resources)/_components/for-all-ages";
import HealthWellness from "@/app/(main)/(resources)/_components/health-wellness";
import Nutrition from "@/app/(main)/(resources)/_components/nutrition";
import SexEducation from "@/app/(main)/(resources)/_components/sex-education";
import Wellbeing from "@/app/(main)/(resources)/_components/wellbeing";

const BASE_URL =
  "https://res.cloudinary.com/dcub4itgg/image/upload/f_auto,q_auto/v1/essentia/resource";

export const RESOURCES_DATA = [
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
    imageFull: `${BASE_URL}/r-1-v2`,
    route: "salud-y-bienestar",
    component: HealthWellness,
    audience: [
      "Personas interesadas en mejorar su calidad de vida a través de hábitos saludables",
      "Quienes buscan estrategias para manejar el estrés y la ansiedad",
      "Profesionales del área de salud o bienestar que desean actualizar sus conocimientos",
      "Personas de todas las edades que quieren adoptar un estilo de vida más saludable",
      "No se requieren conocimientos previos, solo motivación por el autocuidado",
    ],
    benefits: [
      "Conocimientos prácticos para mejorar tu salud física y mental",
      "Herramientas para gestionar el estrés y la ansiedad",
      "Estrategias para crear y mantener hábitos saludables",
      "Mejor comprensión del vínculo entre cuerpo y mente",
      "Mayor conciencia de tu propio bienestar",
    ],
    learningOutcomes: [
      "Técnicas para mejorar tu bienestar físico y mental",
      "Estrategias para manejar el estrés y la ansiedad",
      "Hábitos alimenticios para una vida saludable",
      "Reconocimiento de señales de desbalance emocional",
    ],
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
    imageFull: `${BASE_URL}/r-2`,
    route: "ejercicios-y-fitness",
    component: ExcerciseFitness,
    audience: [
      "Personas que buscan mejorar su forma física o iniciar una vida más activa",
      "Quienes desean conocer cómo armar rutinas según su nivel y objetivos",
      "Estudiantes o instructores que buscan fundamentos teóricos del fitness",
      "Individuos con interés en entrenamiento funcional o muscular",
    ],
    benefits: [
      "Mejora del rendimiento físico y la energía diaria",
      "Conocimiento para crear rutinas personalizadas de ejercicio",
      "Técnicas seguras para prevenir lesiones",
      "Comprensión de la relación entre ejercicio y salud integral",
    ],
    learningOutcomes: [
      "Fundamentos del ejercicio físico y sus beneficios",
      "Diferencias entre tipos de entrenamiento (fuerza, cardio, etc.)",
      "Cómo diseñar rutinas personalizadas",
      "Técnicas para evitar lesiones y mantener la motivación",
    ],
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
    imageFull: `${BASE_URL}/r-3`,
    route: "nutricion-y-alimentacion",
    component: Nutrition,
    audience: [
      "Personas que quieren mejorar su dieta y aprender sobre alimentación balanceada",
      "Quienes desean bajar de peso o ganar masa muscular de forma saludable",
      "Padres, cuidadores o educadores interesados en alimentación infantil o familiar",
      "Estudiantes o entusiastas del área de la nutrición",
    ],
    benefits: [
      "Herramientas para planificar una dieta saludable",
      "Mejor comprensión de los grupos alimenticios y nutrientes",
      "Estrategias para mantener hábitos alimenticios sostenibles",
      "Conocimiento para prevenir enfermedades relacionadas con la alimentación",
    ],
    learningOutcomes: [
      "Cómo estructurar una dieta balanceada",
      "Qué son macronutrientes y micronutrientes",
      "Errores comunes al comer saludable",
      "Relación entre alimentación y bienestar físico/mental",
    ],
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
    imageFull: `${BASE_URL}/r-4`,
    route: "bienestar-emocional",
    component: Wellbeing,
    audience: [
      "Quienes enfrentan estrés, ansiedad o desmotivación frecuente",
      "Personas interesadas en el desarrollo personal y autocuidado emocional",
      "Educadores o profesionales que buscan cuidar su salud mental",
      "Cualquier persona que quiera mejorar su bienestar interior",
    ],
    benefits: [
      "Técnicas para manejar emociones difíciles",
      "Herramientas para cultivar una mente más positiva",
      "Estrategias de autocuidado y desarrollo emocional",
      "Mejor capacidad de adaptación y resiliencia",
    ],
    learningOutcomes: [
      "Cómo identificar y regular emociones",
      "Técnicas de respiración, journaling y mindfulness",
      "Hábitos para fortalecer la autoestima",
      "Estrategias para mejorar relaciones personales desde el autocuidado",
    ],
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
    imageFull: `${BASE_URL}/r-5`,
    route: "salud-y-educacion-sexual",
    component: SexEducation,
    audience: [
      "Adolescentes, jóvenes y adultos que deseen aprender sobre su sexualidad",
      "Docentes o profesionales de la salud que necesiten información clara y actual",
      "Personas LGBTQ+ y aliadas que busquen espacios seguros de aprendizaje",
      "Cualquiera que quiera cuidar su salud sexual con responsabilidad",
    ],
    benefits: [
      "Conocimiento sobre métodos anticonceptivos y ETS",
      "Desarrollo de una visión positiva y libre de prejuicios sobre la sexualidad",
      "Mayor seguridad para ejercer tu sexualidad con consentimiento y respeto",
      "Información basada en evidencia científica y actualizada",
    ],
    learningOutcomes: [
      "Conceptos clave de anatomía y salud sexual",
      "Métodos de protección y prevención",
      "Importancia del consentimiento y la comunicación",
      "Diversidad sexual, identidad de género y derechos sexuales",
    ],
  },
  {
    title: "Salud en Todas las Edades",
    subtitle: "Para tu bienestar",
    intro: `Desde la infancia hasta la vejez, nuestra sección **Salud en Todas las Edades** ofrece información relevante y específica para cada etapa de la vida. Encuentra consejos útiles y recursos para cuidar la salud en todas las etapas del desarrollo.`,
    description:
      "Salud en todas las edades se refiere a la **promoción de la salud y el bienestar** adaptados a cada etapa de la vida, desde la **niñez hasta la vejez**. Reconoce las **necesidades cambiantes** en cada fase y fomenta una **vida saludable en todas ellas**.",
    quote:
      "La salud es un regalo, y mantenerla es una de las mayores recompensas que podemos dar a nosotros mismos en cada etapa de la vida.",
    videoTitle: "¿Cómo Cuidar Tu Salud a Cualquier Edad?",
    videoLink: "vvsxRdfAtTA",
    videoImage: "/videos/miniatura-edades-1920x1080.webp",
    image: "/extras/edades-600x400.webp",
    imageFull: `${BASE_URL}/r-6`,
    route: "salud-en-todas-las-edades",
    component: ForAllAges,
    audience: [
      "Padres, madres y cuidadores de personas en distintas etapas de la vida",
      "Personas mayores que desean cuidar su salud de forma activa",
      "Quienes quieren aprender sobre prevención y cuidados por etapa",
      "Educadores y promotores de salud comunitaria",
    ],
    benefits: [
      "Información específica para cada etapa de la vida",
      "Consejos para promover salud desde la niñez hasta la vejez",
      "Estrategias de autocuidado según edad y contexto",
      "Mayor comprensión de los cambios naturales del cuerpo y la mente",
    ],
    learningOutcomes: [
      "Necesidades de salud en cada etapa de la vida",
      "Hábitos saludables según edad",
      "Prevención de enfermedades frecuentes en cada ciclo",
      "Cómo cuidar tu bienestar a largo plazo",
    ],
  },
];

export type LearningRoutes = (typeof RESOURCES_DATA)[number];
