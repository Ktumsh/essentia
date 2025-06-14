import { CoreMessage, LanguageModelV1StreamPart } from "ai";

import { TEST_PROMPTS } from "./basic";

export function compareMessages(
  firstMessage: CoreMessage,
  secondMessage: CoreMessage,
): boolean {
  if (firstMessage.role !== secondMessage.role) return false;

  if (
    !Array.isArray(firstMessage.content) ||
    !Array.isArray(secondMessage.content)
  ) {
    return false;
  }

  if (firstMessage.content.length !== secondMessage.content.length) {
    return false;
  }

  for (let i = 0; i < firstMessage.content.length; i++) {
    const item1 = firstMessage.content[i];
    const item2 = secondMessage.content[i];

    if (item1.type !== item2.type) return false;

    if (item1.type === "image" && item2.type === "image") {
      // if (item1.image.toString() !== item2.image.toString()) return false;
      // if (item1.mimeType !== item2.mimeType) return false;
    } else if (item1.type === "text" && item2.type === "text") {
      if (item1.text !== item2.text) return false;
    } else if (item1.type === "tool-result" && item2.type === "tool-result") {
      if (item1.toolCallId !== item2.toolCallId) return false;
    } else {
      return false;
    }
  }

  return true;
}

const textToDeltas = (text: string): LanguageModelV1StreamPart[] =>
  text.split(" ").map((word) => ({
    type: "text-delta",
    textDelta: `${word} `,
  }));

const reasoningToDeltas = (text: string): LanguageModelV1StreamPart[] =>
  text.split(" ").map((word) => ({
    type: "reasoning",
    textDelta: `${word} `,
  }));

export const getResponseChunksByPrompt = (
  prompt: CoreMessage[],
  isReasoningEnabled: boolean = false,
): Array<LanguageModelV1StreamPart> => {
  const recentMessage = prompt.at(-1);
  if (!recentMessage) throw new Error("No recent message found!");

  if (isReasoningEnabled) {
    if (compareMessages(recentMessage, TEST_PROMPTS.USUARIO_ANIMO)) {
      return [
        ...reasoningToDeltas(
          "El desánimo puede deberse a múltiples factores como estrés o agotamiento emocional.",
        ),
        ...textToDeltas(
          "Intentar pequeñas acciones agradables cada día puede marcar una gran diferencia.",
        ),
        {
          type: "finish",
          finishReason: "stop",
          usage: { promptTokens: 8, completionTokens: 25 },
        },
      ];
    }
  }

  if (compareMessages(recentMessage, TEST_PROMPTS.USUARIO_ESTRES)) {
    return [
      ...textToDeltas(
        "Podés reducir el estrés con técnicas de respiración, pausas activas o caminatas al aire libre.",
      ),
      {
        type: "finish",
        finishReason: "stop",
        usage: { promptTokens: 8, completionTokens: 18 },
      },
    ];
  }

  if (compareMessages(recentMessage, TEST_PROMPTS.USUARIO_GRACIAS)) {
    return [
      ...textToDeltas("¡Estoy aquí para ayudarte siempre que lo necesites! 💙"),
      {
        type: "finish",
        finishReason: "stop",
        usage: { promptTokens: 4, completionTokens: 10 },
      },
    ];
  }

  if (compareMessages(recentMessage, TEST_PROMPTS.USUARIO_IMAGE_ATTACHMENT)) {
    return [
      ...textToDeltas(
        "Esta pintura es de Claude Monet, un artista del impresionismo.",
      ),
      {
        type: "finish",
        finishReason: "stop",
        usage: { promptTokens: 6, completionTokens: 12 },
      },
    ];
  }

  if (compareMessages(recentMessage, TEST_PROMPTS.USUARIO_TEXT_ARTIFACT)) {
    return [
      {
        type: "tool-call",
        toolCallId: "call_001",
        toolName: "createDocument",
        toolCallType: "function",
        args: JSON.stringify({
          title: "Ensayo sobre salud mental",
          kind: "text",
        }),
      },
      {
        type: "finish",
        finishReason: "stop",
        usage: { promptTokens: 5, completionTokens: 6 },
      },
    ];
  }

  if (
    compareMessages(recentMessage, TEST_PROMPTS.CREATE_DOCUMENT_TEXT_RESULT)
  ) {
    return [
      {
        type: "text-delta",
        textDelta:
          "El documento se ha guardado correctamente y está disponible en tu historial.",
      },
      {
        type: "finish",
        finishReason: "tool-calls",
        usage: { promptTokens: 2, completionTokens: 10 },
      },
    ];
  }

  if (compareMessages(recentMessage, TEST_PROMPTS.GET_WEATHER_CALL)) {
    return [
      {
        type: "tool-call",
        toolCallId: "call_456",
        toolName: "getWeather",
        toolCallType: "function",
        args: JSON.stringify({ latitude: -33.45, longitude: -70.66 }),
      },
      {
        type: "finish",
        finishReason: "stop",
        usage: { promptTokens: 3, completionTokens: 4 },
      },
    ];
  }

  if (compareMessages(recentMessage, TEST_PROMPTS.GET_WEATHER_RESULT)) {
    return [
      ...textToDeltas(
        "Hoy en Santiago se espera una temperatura de 13°C con cielo nublado.",
      ),
      {
        type: "finish",
        finishReason: "stop",
        usage: { promptTokens: 3, completionTokens: 11 },
      },
    ];
  }

  return [
    {
      type: "text-delta",
      textDelta: "¡No encontré una respuesta para ese mensaje!",
    },
  ];
};
