import {
  AdditionalFillIcon,
  AIFillIcon,
  DumbbellFillIcon,
  HandHeartFillIcon,
  HealthCentersFillIcon,
  WellbeingFillIcon,
} from "@/components/icons/interface";
import { FruitIcon, HeartbeatIcon } from "@/components/icons/miscellaneus";
import { CLOUDINARY_BASE_URL } from "@/lib/consts";

import { SUGGESTED_ACTION_DATA } from "./suggested-action-data";

const nutritionalPlan = SUGGESTED_ACTION_DATA[4].action;
const healthRisk = SUGGESTED_ACTION_DATA[5].action;

const BASE_URL = `${CLOUDINARY_BASE_URL}/maincap`;

export const MAIN_HERO_DATA = [
  {
    id: 1,
    title: "Explora nuestras herramientas inteligentes",
    description:
      "Crea planes nutricionales personalizados, diseña rutinas diarias, recibe recomendaciones de actividades de bienestar y utiliza nuestro seguidor de ánimo. ¡Descubre lo que podemos hacer por ti!",
    link: "/aeris",
    image: `${BASE_URL}/m-01`,
    icon: AIFillIcon,
    requiresPremium: false,
  },
  {
    id: 2,
    title: "Diseña tu plan nutricional personalizado",
    description:
      "Genera un plan adaptado a tus necesidades y objetivos gracias a nuestra tecnología avanzada. ¡Empieza hoy mismo!",
    link: `/aeris?q=${encodeURIComponent(nutritionalPlan)}`,
    image: `${BASE_URL}/m-02`,
    icon: FruitIcon,
    requiresPremium: true,
  },
  {
    id: 3,
    title: "Identifica posibles riesgos para tu salud",
    description:
      "Obtén un análisis detallado de tus riesgos de salud con recomendaciones específicas para mejorar tu bienestar.",
    link: `/aeris?q=${encodeURIComponent(healthRisk)}`,
    image: `${BASE_URL}/m-03`,
    icon: HeartbeatIcon,
    requiresPremium: true,
  },
  {
    id: 4,
    title: "Encuentra centros de salud cerca de ti",
    description:
      "Ubica fácilmente centros de salud cercanos con nuestra herramienta práctica y rápida.",
    link: "/centros-de-salud",
    image: `${BASE_URL}/m-04`,
    icon: HealthCentersFillIcon,
    requiresPremium: false,
  },
  {
    id: 5,
    title: "Prioriza tu bienestar emocional",
    description:
      "Encuentra recursos y herramientas para cuidar tu salud mental, mejorar tu estado de ánimo y enfrentar los desafíos diarios.",
    link: "/bienestar-emocional",
    image: `${BASE_URL}/m-05`,
    icon: WellbeingFillIcon,
    requiresPremium: false,
  },
  {
    id: 6,
    title: "Accede a recursos gratuitos",
    description:
      "Explora guías, recomendaciones y herramientas gratuitas diseñadas para mejorar tu bienestar.",
    link: "/herramientas",
    image: `${BASE_URL}/m-06`,
    icon: AdditionalFillIcon,
    requiresPremium: false,
  },
  {
    id: 7,
    title: "Crea una rutina diaria a tu medida",
    description:
      "Organiza tu día con una rutina personalizada que combine hábitos saludables, ejercicios y momentos de descanso.",
    link: `/aeris?q=${encodeURIComponent("Crear rutina diaria personalizada")}`,
    image: `${BASE_URL}/m-07`,
    icon: DumbbellFillIcon,
    requiresPremium: true,
  },
  {
    id: 8,
    title: "Mejora tu estado de ánimo con IA",
    description:
      "Recibe sugerencias personalizadas según tu historial emocional para sentirte mejor día a día.",
    link: `/aeris?q=${encodeURIComponent("Actividades para mejorar mi ánimo")}`,
    image: `${BASE_URL}/m-08`,
    icon: HandHeartFillIcon,
    requiresPremium: true,
  },
];

export type MainHeroType = (typeof MAIN_HERO_DATA)[number];
