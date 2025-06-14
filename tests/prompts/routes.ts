import { generateUUID } from "@/app/(main)/(chat)/_lib/utils";

export const TEST_PROMPTS = {
  ANIMO: {
    MESSAGE: {
      id: generateUUID(),
      createdAt: new Date().toISOString(),
      role: "user",
      content: "Últimamente me siento desanimado. ¿Qué puedo hacer?",
      parts: [
        {
          type: "text",
          text: "Últimamente me siento desanimado. ¿Qué puedo hacer?",
        },
      ],
    },
    OUTPUT_STREAM: [
      '0:"Lamento que te sientas así. "',
      '0:"Podrías intentar realizar actividades que disfrutes, "',
      '0:"hablar con alguien de confianza "',
      '0:"o practicar ejercicios de respiración. "',
      'e:{"finishReason":"stop","usage":{"promptTokens":8,"completionTokens":22},"isContinued":false}',
      'd:{"finishReason":"stop","usage":{"promptTokens":8,"completionTokens":22}}',
    ],
  },
  ESTRES: {
    MESSAGE: {
      id: generateUUID(),
      createdAt: new Date().toISOString(),
      role: "user",
      content: "¿Cómo puedo manejar mejor el estrés en mi rutina diaria?",
      parts: [
        {
          type: "text",
          text: "¿Cómo puedo manejar mejor el estrés en mi rutina diaria?",
        },
      ],
    },
    OUTPUT_STREAM: [
      '0:"Una buena gestión del estrés comienza con pausas conscientes. "',
      '0:"Puedes probar la meditación, actividad física regular, "',
      '0:"y establecer límites claros en tus horarios. "',
      'e:{"finishReason":"stop","usage":{"promptTokens":10,"completionTokens":20},"isContinued":false}',
      'd:{"finishReason":"stop","usage":{"promptTokens":10,"completionTokens":20}}',
    ],
  },
};
