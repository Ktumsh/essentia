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
      "Puedes cambiar de plan cuando quieras",
      "Soporte estándar",
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
      "Todo lo del plan Básico +",
      "Acceso a todos los recursos educativos",
      "Essentia AI: Asistente 24/7 con IA personalizada",
      "IA integrada con tu perfil médico",
      "Hasta 50 documentos médicos activos",
      "Rutinas de ejercicio y planes nutricionales personalizados",
      "Evaluación de riesgo de salud basada en tu historial",
      "Seguimiento de hábitos y progreso",
      "Actividades para mejorar tu bienestar",
      "Soporte rápido",
    ],
  },
  {
    id: premiumPlus,
    frequency: "Anual",
    name: "Premium Plus",
    description:
      "Ahorra 20% al año, obtén soporte prioritario y espacio médico ilimitado.",
    label: "Ahorra más",
    other: "Pago único anual de 115.200 CLP",
    amount: 115200,
    monthlyAmount: 9600,
    currency: "clp",
    features: [
      "Todo lo del plan Premium +",
      "Documentos médicos ilimitados",
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
      "Guarda tus exámenes, recetas, informes y otros documentos importantes relacionados con tu salud.",
    plans: {
      basico: "Hasta 12 documentos",
      premium: "Hasta 50 documentos",
      premiumPlus: "Ilimitados*",
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
      "Asistente de salud con IA que entrega recomendaciones personalizadas basadas en tu información médica.",
    plans: {
      basico: false,
      premium: true,
      premiumPlus: true,
    },
  },
  {
    key: "aiProfileIntegration",
    name: "IA conectada a tu perfil",
    description:
      "La IA analiza tus documentos médicos y hábitos para darte recomendaciones de salud precisas.",
    plans: {
      basico: false,
      premium: true,
      premiumPlus: true,
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
    description:
      "Análisis de riesgo personalizado en base a tu historial y comportamiento registrado.",
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
    key: "support",
    name: "Soporte",
    description:
      "Accede a distintos niveles de soporte según tu plan: estándar (respuesta en 48h), rápido (respuesta en el mismo día hábil), y prioritario (respuesta preferente en menos de 12h).",
    plans: {
      basico: "Estándar 🕓",
      premium: "Rápido ⚡",
      premiumPlus: "Prioritario 🚀",
    },
  },
];

export type PlanFeatureType = (typeof PLAN_FEATURES_DETAILS)[number];
