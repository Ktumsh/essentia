export const FEATURE_PLAN_DATA = {
  free: {
    name: "Gratis",
    description: "Plan básico con acceso limitado a funcionalidades.",
    subname: "Predeterminado",
    feature: [
      "Recursos principales",
      "Buscador de centros de salud",
      "Herramientas de apoyo",
      "Acceso a contenido educativo limitado (1 curso)",
      "Recomendaciones básicas de salud",
    ],
  },
  premium: {
    name: "Premium",
    description:
      "Plan mensual que incluye acceso completo a todas las funcionalidades de Essentia AI.",
    subname: "Recomendado",
    feature: [
      "Todo lo del plan básico +",
      "Acceso a todo el contenido educativo (6 cursos)",
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
  "premium-plus": {
    name: "Premium Plus",
    description:
      "Plan anual con todas las funcionalidades de Essentia AI y algunos beneficios adicionales.",
    subname: "Ahorra más",
    feature: [
      "Todo lo del plan mensual +",
      "Ahorro del 20% respecto al plan mensual",
      "Prioridad en soporte",
    ],
  },
};

export type FeaturePlanData = typeof FEATURE_PLAN_DATA;
