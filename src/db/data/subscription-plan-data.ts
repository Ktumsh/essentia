import { siteConfig } from "@/config/site.config";

const { free, premium, premiumPlus } = siteConfig.plan;

export const SUBSCRIPTION_PLAN_DATA = [
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

export type SubscriptionPlanType = (typeof SUBSCRIPTION_PLAN_DATA)[number];
