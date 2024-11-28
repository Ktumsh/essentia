import { AdditionalFillIcon, AIFillIcon } from "@/modules/icons/interface";
import {
  FruitFillIcon,
  HealthCentersFillIcon,
  HeartbeatIcon,
} from "@/modules/icons/miscellaneus";

import { INITIAL_CHAT_MESSAGES } from "./initial-chat-messages";

import type { MaincapResources } from "@/types/resource";

const nutritionalPlan = INITIAL_CHAT_MESSAGES[4].action;
const healthRisk = INITIAL_CHAT_MESSAGES[5].action;

export const MAINCAP_RESOURCES: MaincapResources[] = [
  {
    id: 1,
    title: "Explora nuestras herramientas inteligentes",
    description:
      "Crea planes nutricionales personalizados, diseña rutinas diarias, recibe recomendaciones de actividades de bienestar y utiliza nuestro seguidor de ánimo. ¡Descubre lo que podemos hacer por ti!",
    link: "/essentia-ai",
    image: "/capsules/capsule-01.png",
    icon: AIFillIcon,
    requiresPremium: false,
  },
  {
    id: 2,
    title: "Diseña tu plan nutricional personalizado",
    description:
      "Genera un plan adaptado a tus necesidades y objetivos gracias a nuestra tecnología avanzada. ¡Empieza hoy mismo!",
    link: `/essentia-ai?search=${encodeURIComponent(nutritionalPlan)}`,
    image: "/extras/meal-nutritional-plan-top.jpg",
    icon: FruitFillIcon,
    requiresPremium: true,
  },
  {
    id: 3,
    title: "Identifica posibles riesgos para tu salud",
    description:
      "Obtén un análisis detallado de tus riesgos de salud con recomendaciones específicas para mejorar tu bienestar.",
    link: `/essentia-ai?search=${encodeURIComponent(healthRisk)}`,
    image: "/extras/health-risk-banner.jpg",
    icon: HeartbeatIcon,
    requiresPremium: true,
  },
  {
    id: 4,
    title: "Encuentra centros de salud cerca de ti",
    description:
      "Ubica fácilmente centros de salud cercanos con nuestra herramienta práctica y rápida.",
    link: "/centros-de-salud",
    image: "/capsules/capsule-03.webp",
    icon: HealthCentersFillIcon,
    requiresPremium: false,
  },
  {
    id: 5,
    title: "Prioriza tu bienestar emocional",
    description:
      "Encuentra recursos y herramientas para cuidar tu salud mental, mejorar tu estado de ánimo y enfrentar los desafíos diarios.",
    link: "/bienestar-emocional",
    image: "/extras/mood-tracking-top.webp",
    icon: HeartbeatIcon,
    requiresPremium: false,
  },
  {
    id: 6,
    title: "Accede a recursos gratuitos",
    description:
      "Explora guías, recomendaciones y herramientas gratuitas diseñadas para mejorar tu bienestar.",
    link: "/adicionales",
    image: "/capsules/capsule-04.webp",
    icon: AdditionalFillIcon,
    requiresPremium: false,
  },
];
