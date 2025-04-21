export const SEXUALITY_EMERGENCY = [
  {
    id: 1,
    title: "Emergencias de Salud Sexual",
    steps: [
      {
        step: 1,
        title: "Reconocer la emergencia",
        description: [
          {
            type: "bold",
            content: "Violencia Sexual:",
          },
          {
            type: "text",
            content:
              " Si tú o alguien más ha sido víctima de violencia sexual, busca ayuda inmediatamente.",
          },
          {
            type: "bold",
            content: "Infecciones de Transmisión Sexual (ITS):",
          },
          {
            type: "text",
            content:
              " Síntomas como dolor, secreciones inusuales, erupciones, o llagas pueden ser signos de una ITS que requiere atención urgente.",
          },
          {
            type: "bold",
            content: "Reacción alérgica a métodos anticonceptivos:",
          },
          {
            type: "text",
            content:
              " Si experimentas dificultad para respirar, hinchazón severa o erupciones, busca atención médica de inmediato.",
          },
        ],
      },
      {
        step: 2,
        title: "Qué hacer",
        description: [
          {
            type: "bold",
            content: "Busca ayuda profesional:",
          },
          {
            type: "text",
            content:
              " Contacta a un médico, clínica de salud sexual, o servicio de emergencia local.",
          },
          {
            type: "bold",
            content: "Evita el auto diagnóstico:",
          },
          {
            type: "text",
            content:
              " No te automediques sin la orientación de un profesional.",
          },
          {
            type: "bold",
            content: "Acceso a profilaxis postexposición (PEP):",
          },
          {
            type: "text",
            content:
              " Si crees que has estado expuesto al VIH, es esencial iniciar la PEP dentro de las 72 horas posteriores a la exposición.",
          },
        ],
      },
      {
        step: 3,
        title: "Recursos de emergencia",
        description: [
          {
            type: "bold",
            content: "Línea de apoyo:",
          },
          {
            type: "text",
            content:
              " Contacta a la línea nacional de apoyo para víctimas de violencia sexual o salud sexual.",
          },
          {
            type: "bold",
            content: "Centros de atención:",
          },
          {
            type: "text",
            content:
              " Identifica el centro de salud sexual o sala de emergencias más cercano.",
          },
          {
            type: "bold",
            content: "Acceso a anticoncepción de emergencia:",
          },
          {
            type: "text",
            content:
              " Si necesitas anticoncepción de emergencia, consulta a un profesional de salud o acude a una farmacia.",
          },
        ],
      },
      {
        step: 4,
        title: "Prevención a futuro",
        description: [
          {
            type: "bold",
            content: "Consulta regular:",
          },
          {
            type: "text",
            content:
              " Mantén chequeos regulares con tu profesional de salud para monitorear tu bienestar sexual.",
          },
          {
            type: "bold",
            content: "Educación:",
          },
          {
            type: "text",
            content:
              " Infórmate sobre los métodos de prevención de ITS y violencia sexual.",
          },
          {
            type: "bold",
            content: "Apoyo psicológico:",
          },
          {
            type: "text",
            content:
              " Si has pasado por una emergencia de salud sexual, busca apoyo psicológico para ayudar en tu recuperación emocional.",
          },
        ],
      },
    ],
  },
];

export type SexualityEmergency = (typeof SEXUALITY_EMERGENCY)[number];

export const SEXUALITY_EMERGENCY_COLORS = {
  1: {
    bg: "bg-rose-50 dark:bg-rose-950",
    bgMuted: "bg-rose-100 dark:bg-rose-900",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-900/50",
    borderAccent: "border-l-rose-500!",
  },
};

export type SexualityEmergencyColors = (typeof SEXUALITY_EMERGENCY_COLORS)[1];
