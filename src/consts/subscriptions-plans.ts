import { siteConfig } from "@/config/site.config";

const { free, premium, premiumPlus } = siteConfig.plan;

export const SUBSCRIPTION_PLANS = [
  {
    id: free,
    frequency: "Siempre",
    name: "Básico",
    description: "Comienza gratis con acceso limitado a funciones esenciales",
    label: "Predeterminado",
    other: "Sin costo",
    amount: 0,
    monthlyAmount: 0,
    currency: "clp",
    features: [
      "Guías y tutoriales sobre salud, nutrición y bienestar",
      "Rutas de aprendizaje con seguimiento de progreso",
      "Mapa con centros de salud cercanos",
      "Hasta 12 documentos médicos activos",
      "Perfil de usuario con historial médico básico",
      "Recomendaciones generales de salud",
      "Organización básica por tipo de documento",
    ],
  },
  {
    id: premium,
    frequency: "Mensual",
    name: "Premium",
    description:
      "Desbloquea IA, planes personalizados y herramientas avanzadas.",
    label: "Recomendado",
    other: "Cancela en cualquier momento",
    amount: 12000,
    monthlyAmount: 12000,
    currency: "clp",
    features: [
      "Todo lo del plan Básico +",
      "Hasta 50 documentos médicos activos",
      "Essentia AI: Asistente 24/7 con IA personalizada",
      "Hasta 15 mensajes diarios en el chat",
      "Recomendaciones con IA basadas en tus documentos médicos",
      "Hasta 15 recomendaciones activas con IA",
      "Rutinas de ejercicio y planes nutricionales personalizados",
      "Evaluación de riesgo de salud según tu perfil",
      "Actividades para mejorar tu bienestar",
    ],
  },
  {
    id: premiumPlus,
    frequency: "Mensual",
    name: "Premium Plus",
    description: "Todo sin límites, con IA avanzada y seguimiento completo.",
    label: "Máximo acceso",
    other: "Cancela en cualquier momento",
    amount: 20000,
    monthlyAmount: 20000,
    currency: "clp",
    features: [
      "Todo lo del plan Premium +",
      "Documentos médicos ilimitados",
      "Recomendaciones con IA ilimitadas",
      "Mensajes ilimitados en el chat Essentia AI",
      "Sugerencias automáticas según tu actividad y documentos",
      "Organización inteligente con filtros automáticos por tipo y fecha",
      "Seguimiento de hábitos y progreso agrupado por herramienta de IA",
    ],
  },
];

export type SubscriptionPlanType = (typeof SUBSCRIPTION_PLANS)[number];

export const PLAN_FEATURES_DETAILS = [
  {
    key: "educationalContent",
    name: "Recursos educativos",
    description:
      "Accede a guías, tutoriales y contenido sobre salud física, nutrición, bienestar emocional, salud sexual y más.",
    plans: {
      basico: true,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "learningRoutes",
    name: "Rutas de aprendizaje",
    description:
      "Accede a rutas de aprendizaje estructuradas con lecciones, etapas y seguimiento de progreso.",
    plans: {
      basico: true,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "healthMap",
    name: "Mapa de centros de salud",
    description:
      "Mapa interactivo con clínicas, hospitales, farmacias y servicios cercanos.",
    plans: {
      basico: true,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "fileUploads",
    name: "Gestión de documentos médicos",
    description:
      "Sube y organiza tus exámenes, recetas, informes u otros documentos médicos importantes.",
    plans: {
      basico: "Hasta 12 documentos",
      premium: "Hasta 50 documentos",
      premiumPlus: "Ilimitados",
    },
  },
  {
    key: "userProfile",
    name: "Perfil de usuario",
    description:
      "Centraliza tu información médica personal y permite organizar documentos y recomendaciones.",
    plans: {
      basico: true,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "essentiaAI",
    name: "Essentia AI",
    description:
      "Asistente de salud con IA que responde consultas y entrega recomendaciones basadas en tu actividad.",
    plans: {
      basico: false,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "chatLimit",
    name: "Mensajes en el chat Essentia AI",
    description:
      "Número de mensajes diarios permitidos en el chat con el asistente Essentia AI.",
    plans: {
      basico: false,
      premium: "Hasta 15 mensajes diarios",
      premiumPlus: "Mensajes ilimitados",
    },
  },
  {
    key: "aiProfileIntegration",
    name: "IA conectada a tus documentos",
    description:
      "La IA analiza los documentos que subes para generar recomendaciones personalizadas.",
    plans: {
      basico: false,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "aiRecommendations",
    name: "Recomendaciones con IA",
    description:
      "Recibe recomendaciones generadas por IA basadas en tus documentos médicos.",
    plans: {
      basico: false,
      premium: "Hasta 15 activas simultáneamente",
      premiumPlus: "Ilimitadas",
    },
  },
  {
    key: "personalPlans",
    name: "Rutinas y planes personalizados",
    description:
      "Incluye planes de nutrición y rutinas de ejercicio adaptadas a tu perfil y objetivos.",
    plans: {
      basico: false,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "riskAssessment",
    name: "Evaluación de salud",
    description: "Análisis de riesgo personalizado según tu perfil general.",
    plans: {
      basico: false,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "wellnessActivities",
    name: "Actividades de bienestar",
    description:
      "Actividades prácticas para mejorar tu salud emocional y mental.",
    plans: {
      basico: false,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "habitTracking",
    name: "Seguimiento de hábitos y progreso",
    description:
      "Historial agrupado por herramienta utilizada con IA para ver tu evolución y hábitos saludables.",
    plans: {
      basico: false,
      premium: false,
      premiumPlus: true,
    },
  },
];

export type PlanFeatureType = (typeof PLAN_FEATURES_DETAILS)[number];
