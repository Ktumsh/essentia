import { siteConfig } from "@/config/site";

type PlanDetails = {
  name: string;
  description: string;
  subname: string;
  feature: string[];
};

export const planDetails: Record<string, PlanDetails> = {
  [siteConfig.planPrices.free]: {
    name: "Gratis",
    description: "Plan básico con acceso limitado a funcionalidades.",
    subname: "Predeterminado",
    feature: [
      "Recursos principales",
      "Buscador de centros de salud",
      "Recursos adicionales",
      "Acceso a contenido educativo limitado",
      "Recomendaciones básicas de salud",
    ],
  },
  [siteConfig.planPrices.premium]: {
    name: "Premium",
    description:
      "Plan mensual que incluye acceso completo a todas las funcionalidades de Essentia AI.",
    subname: "Recomendado",
    feature: [
      "Todo lo del plan básico +",
      "Acceso completo a Essentia AI",
      "Seguimiento de chats",
      "Interacción personalizada con la IA",
      "Rutinas de ejercicio personalizadas",
      "Planes nutricionales adaptados a tus necesidades",
      "Evaluación detallada de tu nivel de riesgo de salud",
      "Actividades diseñadas para mejorar tu bienestar",
      "Recomendaciones personalizadas basadas en tus objetivos",
    ],
  },
  [siteConfig.planPrices.premiumPlus]: {
    name: "Premium Plus",
    description:
      "Plan anual con todas las funcionalidades de Essentia AI y algunos beneficios adicionales.",
    subname: "Ahorra más",
    feature: [
      "Todo lo del plan mensual +",
      "Descuentos en futuras suscripciones",
      "Prioridad en soporte",
    ],
  },
};

export const getPlanName = (planId: string) => {
  return planDetails[planId].name;
};

export const getPlanSubname = (
  currentPriceId: string | null,
  priceId: string,
) => {
  return currentPriceId === priceId ? "Actual" : planDetails[priceId].subname;
};

export const getPlanDescription = (planId: string) => {
  return planDetails[planId].description;
};

export const getPlanFeatures = (planId: string) => {
  return planDetails[planId].feature || [];
};