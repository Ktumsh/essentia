import type { CoreMessage } from "ai";

export const TEST_PROMPTS: Record<string, CoreMessage> = {
  USUARIO_ANIMO: {
    role: "user",
    content: [
      {
        type: "text",
        text: "Últimamente me he sentido desanimado, ¿qué puedo hacer?",
      },
    ],
  },
  USUARIO_ESTRES: {
    role: "user",
    content: [
      {
        type: "text",
        text: "¿Cómo puedo manejar mejor el estrés en mi día a día?",
      },
    ],
  },
  USUARIO_GRACIAS: {
    role: "user",
    content: [{ type: "text", text: "Gracias por tu ayuda" }],
  },
  USUARIO_IMAGEN_PINTURA: {
    role: "user",
    content: [
      { type: "text", text: "¿Sabes quién pintó esto?" },
      { type: "image", image: "..." },
    ],
  },
  USUARIO_RECOMENDACION_EJERCICIO: {
    role: "user",
    content: [
      {
        type: "text",
        text: "¿Podrías sugerirme una rutina de ejercicios para mejorar mi salud cardiovascular?",
      },
    ],
  },
  USUARIO_DOCUMENTO_NUTRICION_CALL: {
    role: "user",
    content: [
      {
        type: "text",
        text: "Plan nutricional semanal para mantener energía y concentración",
      },
    ],
  },
  DOCUMENTO_NUTRICION_RESULTADO: {
    role: "tool",
    content: [
      {
        type: "tool-result",
        toolCallId: "call_001",
        toolName: "createDocument",
        result: {
          id: "essentia-doc-nutricion-001",
          title: "Plan nutricional semanal",
          kind: "text",
          content:
            "Se ha creado un plan nutricional personalizado visible ahora en tu historial.",
        },
      },
    ],
  },
  USUARIO_CONSULTA_TIEMPO: {
    role: "user",
    content: [{ type: "text", text: "¿Qué clima hará hoy en Santiago?" }],
  },
  RESPUESTA_CLIMA: {
    role: "tool",
    content: [
      {
        type: "tool-result",
        toolCallId: "call_002",
        toolName: "getWeather",
        result: {
          latitude: -33.4489,
          longitude: -70.6693,
          timezone: "America/Santiago",
          elevation: 520,
          current_units: {
            temperature_2m: "°C",
            time: "iso8601",
            interval: "minutes",
          },
          current: {
            time: "2025-06-12T09:00",
            interval: 60,
            temperature_2m: 13,
          },
          daily_units: {
            time: "iso8601",
            sunrise: "iso8601",
            sunset: "iso8601",
          },
          daily: {
            time: ["2025-06-12"],
            sunrise: ["2025-06-12T07:35"],
            sunset: ["2025-06-12T17:45"],
          },
        },
      },
    ],
  },
};
