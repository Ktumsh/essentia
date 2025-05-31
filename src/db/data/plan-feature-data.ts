export const PLAN_FEATURE_DATA = [
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
    key: "aerisChat",
    name: "Habla con Aeris",
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
    name: "Mensajes en el chat con Aeris",
    description:
      "Número de mensajes diarios permitidos en el chat con la asistente Aeris.",
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

export type PlanFeatureType = (typeof PLAN_FEATURE_DATA)[number];
