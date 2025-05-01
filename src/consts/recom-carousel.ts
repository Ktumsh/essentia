import {
  AdditionalFillIcon,
  AIFillIcon,
} from "@/components/ui/icons/interface";
import {
  FruitFillIcon,
  HealthCentersFillIcon,
  HeartbeatIcon,
} from "@/components/ui/icons/miscellaneus";

import { INITIAL_CHAT_MESSAGES } from "./initial-chat-messages";

import type { MaincapResources } from "@/types/resource";

const nutritionalPlan = INITIAL_CHAT_MESSAGES[4].action;
const healthRisk = INITIAL_CHAT_MESSAGES[5].action;

const BASE_URL =
  "https://res.cloudinary.com/dcub4itgg/image/upload/f_auto,q_auto/v1/essentia/maincap";

export const MAINCAP_RESOURCES: MaincapResources[] = [
  {
    id: 1,
    title: "Explora nuestras herramientas inteligentes",
    description:
      "Crea planes nutricionales personalizados, diseña rutinas diarias, recibe recomendaciones de actividades de bienestar y utiliza nuestro seguidor de ánimo. ¡Descubre lo que podemos hacer por ti!",
    link: "/essentia-ai",
    image: `${BASE_URL}/cap-01`,
    icon: AIFillIcon,
    requiresPremium: false,
  },
  {
    id: 2,
    title: "Diseña tu plan nutricional personalizado",
    description:
      "Genera un plan adaptado a tus necesidades y objetivos gracias a nuestra tecnología avanzada. ¡Empieza hoy mismo!",
    link: `/essentia-ai?search=${encodeURIComponent(nutritionalPlan)}`,
    image: `${BASE_URL}/cap-02`,
    icon: FruitFillIcon,
    requiresPremium: true,
  },
  {
    id: 3,
    title: "Identifica posibles riesgos para tu salud",
    description:
      "Obtén un análisis detallado de tus riesgos de salud con recomendaciones específicas para mejorar tu bienestar.",
    link: `/essentia-ai?search=${encodeURIComponent(healthRisk)}`,
    image: `${BASE_URL}/cap-03`,
    icon: HeartbeatIcon,
    requiresPremium: true,
  },
  {
    id: 4,
    title: "Encuentra centros de salud cerca de ti",
    description:
      "Ubica fácilmente centros de salud cercanos con nuestra herramienta práctica y rápida.",
    link: "/centros-de-salud",
    image: `${BASE_URL}/cap-04`,
    icon: HealthCentersFillIcon,
    requiresPremium: false,
  },
  {
    id: 5,
    title: "Prioriza tu bienestar emocional",
    description:
      "Encuentra recursos y herramientas para cuidar tu salud mental, mejorar tu estado de ánimo y enfrentar los desafíos diarios.",
    link: "/bienestar-emocional",
    image: `${BASE_URL}/cap-05`,
    icon: HeartbeatIcon,
    requiresPremium: false,
  },
  {
    id: 6,
    title: "Accede a recursos gratuitos",
    description:
      "Explora guías, recomendaciones y herramientas gratuitas diseñadas para mejorar tu bienestar.",
    link: "/herramientas",
    image: `${BASE_URL}/cap-06`,
    icon: AdditionalFillIcon,
    requiresPremium: false,
  },
];
