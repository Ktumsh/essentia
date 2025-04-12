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
      "Mapa con centros de salud cercanos",
      "Hasta 6 archivos médicos activos",
      "Perfil de usuario con historial médico básico",
      "Recomendaciones generales de salud",
      "Puedes cambiar de plan cuando quieras",
    ],
  },
  {
    id: premium,
    frequency: "Mensual",
    name: "Premium",
    description:
      "Desbloquea IA, planes personalizados y más herramientas de salud.",
    label: "Recomendado",
    other: "Cancela en cualquier momento",
    amount: 12000,
    monthlyAmount: 12000,
    currency: "clp",
    features: [
      "Todo lo del plan básico +",
      "Acceso a todos los recursos educativos",
      "Essentia AI: Asistente 24/7 con IA personalizada",
      "IA integrada con tu perfil médico",
      "Hasta 24 archivos médicos activos",
      "Rutinas de ejercicio y planes nutricionales personalizados",
      "Evaluación de riesgo de salud basada en tu historial",
      "Seguimiento de hábitos y progreso",
      "Actividades para mejorar tu bienestar",
      "Soporte estándar con respuesta rápida",
    ],
  },
  {
    id: premiumPlus,
    frequency: "Anual",
    name: "Premium Plus",
    description:
      "Ahorra 20% al año y obtén soporte prioritario y más espacio médico.",
    label: "Ahorra más",
    other: "Pago único anual de 115.200 CLP",
    amount: 115200,
    monthlyAmount: 9600,
    currency: "clp",
    features: [
      "Todo lo del plan Premium +",
      "Hasta 60 archivos médicos activos",
      "Soporte prioritario",
      "Ahorro del 20% anual",
      "Paga una vez y despreocúpate por todo un año",
    ],
  },
];

export type SubscriptionPlanType = (typeof SUBSCRIPTION_PLANS)[number];

export const PLAN_FEATURES_DETAILS = [
  {
    key: "educationalContent",
    name: "Recursos educativos",
    description:
      "Accede a guías, tutoriales y contenido de salud y bienestar, salud física, nutrición, bienestar emocional, salud sexual y salud en todas las edades.",
    plans: {
      básico: true,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "healthMap",
    name: "Mapa de centros de salud",
    description:
      "Mapa interactivo con clínicas, hospitales, farmacias y servicios cercanos para facilitar tu atención presencial.",
    plans: {
      básico: true,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "fileUploads",
    name: "Carga de archivos médicos",
    description:
      "Guarda tus exámenes, diagnósticos y documentos importantes. El plan Básico permite hasta 6 archivos activos. Los planes pagos amplían este límite para ofrecer un historial médico más completo.",
    plans: {
      básico: "Hasta 6 archivos",
      premium: "Hasta 24 archivos",
      premiumPlus: "Hasta 60 archivos",
    },
  },
  {
    key: "userProfile",
    name: "Perfil de usuario",
    description:
      "Centraliza tu información médica personal y permite cargar documentos y exámenes en un solo lugar.",
    plans: {
      básico: true,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "essentiaAI",
    name: "Essentia AI",
    description:
      "Asistente de salud inteligente que entrega recomendaciones personalizadas basadas en tu perfil.",
    plans: {
      básico: false,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "aiProfileIntegration",
    name: "IA conectada a tu perfil",
    description:
      "La IA analiza tu historial médico y hábitos para darte recomendaciones precisas y personalizadas.",
    plans: {
      básico: false,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "personalPlans",
    name: "Rutinas y planes personalizados",
    description:
      "Incluye rutinas de ejercicio y planes nutricionales adaptados a tus necesidades.",
    plans: {
      básico: false,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "riskAssessment",
    name: "Evaluación de salud",
    description:
      "Análisis del riesgo de salud personalizado en base a tus datos médicos y hábitos.",
    plans: {
      básico: false,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "wellnessActivities",
    name: "Actividades de bienestar",
    description:
      "Actividades guiadas para ayudarte a mejorar tu salud física y emocional.",
    plans: {
      básico: false,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "support",
    name: "Soporte",
    description: "Acceso a soporte vía chat. Con prioridad en Premium Plus.",
    plans: {
      básico: false,
      premium: "Estándar",
      premiumPlus: "Prioritario",
    },
  },
];

export type PlanFeatureType = (typeof PLAN_FEATURES_DETAILS)[number];
