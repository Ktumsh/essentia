import { convertToCoreMessages, Message, StreamData, streamText } from "ai";
import { z } from "zod";

import { auth } from "@/app/(auth)/auth";
import { generateTitleFromUserMessage } from "@/app/(main)/essentia-ai/chat/actions";
import { createSystemPrompt } from "@/config/chatbot-prompt";
import {
  deleteChatById,
  getChatById,
  saveChat,
  saveMessages,
} from "@/db/querys/chat-querys";
import { getSubscription } from "@/db/querys/payment-querys";
import { gptFlashModel } from "@/modules/chatbot/ai";
import {
  generateExerciseRoutine,
  generateMoodTracking,
  generateNutritionalPlan,
  generateRiskAssessment,
} from "@/modules/chatbot/ai/actions";
import {
  generateUUID,
  getMostRecentUserMessage,
  sanitizeResponseMessages,
} from "@/modules/chatbot/lib/utils";
import { calculateAge } from "@/modules/core/lib/utils";
import { formatDate } from "@/modules/payment/lib/utils";
import { getUserProfileData } from "@/utils/profile";

export const maxDuration = 60;

type AllowedTools =
  | "recommendExercise"
  | "healthRiskAssessment"
  | "nutritionalAdvice"
  | "moodTracking";

const allTools: AllowedTools[] = [
  "recommendExercise",
  "healthRiskAssessment",
  "nutritionalAdvice",
  "moodTracking",
];

export async function POST(request: Request) {
  const { id, messages }: { id: string; messages: Array<Message> } =
    await request.json();

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session?.user?.id as string;
  const [subscription] = await getSubscription(userId);

  if (!subscription) {
    return new Response("Unauthorized", { status: 401 });
  }

  const isPremium = subscription.isPremium;
  const premiumExpiresAt = formatDate(subscription.expiresAt);

  if (!isPremium) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = session ? await getUserProfileData({ session }) : null;

  const {
    firstName,
    lastName,
    birthdate,
    location,
    bio,
    weight,
    height,
    genre,
  } = user || {};

  const age = calculateAge(user?.birthdate as Date);

  const coreMessages = convertToCoreMessages(messages);
  const userMessage = getMostRecentUserMessage(coreMessages);

  if (!userMessage) {
    return new Response("No user message found", { status: 400 });
  }

  const chat = await getChatById({ id });

  if (!chat) {
    const title = await generateTitleFromUserMessage({ message: userMessage });
    await saveChat({ id, userId: session.user.id, title });
  }

  const userMessageId = generateUUID();

  await saveMessages({
    messages: [
      { ...userMessage, id: userMessageId, createdAt: new Date(), chatId: id },
    ],
  });

  const streamingData = new StreamData();

  streamingData.append({
    type: "user-message-id",
    content: userMessageId,
  });

  const systemPrompt = createSystemPrompt({
    firstName,
    lastName,
    birthdate,
    location,
    bio,
    weight,
    height,
    genre,
    age,
    premiumExpiresAt,
  });

  const result = await streamText({
    model: gptFlashModel,
    system: systemPrompt,
    messages: coreMessages,
    maxTokens: 1024,
    maxSteps: 2,
    experimental_activeTools: allTools,
    tools: {
      recommendExercise: {
        description: "Mostrar rutina de ejercicios personalizada",
        parameters: z.object({
          objective: z.string().describe("Objetivo principal"),
          physicalLevel: z.string().describe("Nivel de condición física"),
          time: z
            .string()
            .describe("Tiempo disponible para realizar la rutina"),
          preferences: z.string().describe("Preferencias"),
          healthConditions: z
            .string()
            .describe("Condiciones de salud preexistentes"),
          equipment: z.string().describe("Disponibilidad de equipamiento"),
        }),
        execute: async ({
          objective,
          physicalLevel,
          time,
          preferences,
          healthConditions,
          equipment,
        }) => {
          const results = await generateExerciseRoutine({
            objective,
            physicalLevel,
            time,
            preferences,
            healthConditions,
            equipment,
          });
          return results;
        },
      },
      healthRiskAssessment: {
        description: "Mostrar evaluación de riesgo de salud",
        parameters: z.object({
          weight: z.number().describe("Peso"),
          height: z.number().describe("Altura"),
          familyHistory: z.string().describe("Historial familiar"),
          lifestyle: z.string().describe("Estilo de vida"),
          healthConditions: z
            .string()
            .describe("Condiciones de salud preexistentes"),
        }),
        execute: async ({
          weight,
          height,
          familyHistory,
          lifestyle,
          healthConditions,
        }) => {
          const results = await generateRiskAssessment({
            weight,
            height,
            familyHistory,
            lifestyle,
            healthConditions,
          });
          return results;
        },
      },
      nutritionalAdvice: {
        description: "Mostrar plan nutricional",
        parameters: z.object({
          dietType: z.string().describe("Tipo de alimento"),
          restrictions: z.string().describe("Restricciones"),
          calorieGoal: z.string().describe("Meta de calorías"),
          activityLevel: z.string().describe("Nivel de actividad"),
          weight: z.number().describe("Peso"),
          height: z.number().describe("Altura"),
          weightGoal: z.string().describe("Meta de peso"),
        }),
        execute: async ({
          dietType,
          restrictions,
          calorieGoal,
          activityLevel,
          weight,
          height,
          weightGoal,
        }) => {
          const results = await generateNutritionalPlan({
            dietType,
            restrictions,
            calorieGoal,
            activityLevel,
            weight,
            height,
            weightGoal,
          });
          return results;
        },
      },
      moodTracking: {
        description:
          "Mostrar recomendación de actividades para mejorar el estado de ánimo",
        parameters: z.object({
          mood: z.string().describe("Estado de ánimo"),
        }),
        execute: async ({ mood }) => {
          const results = await generateMoodTracking({ mood });
          return results;
        },
      },
    },
    onFinish: async ({ response }) => {
      if (session?.user?.id) {
        try {
          const responseMessagesWithoutIncompleteToolCalls =
            sanitizeResponseMessages(response.messages);

          await saveMessages({
            messages: responseMessagesWithoutIncompleteToolCalls.map(
              (message) => {
                const messageId = generateUUID();

                if (message.role === "assistant") {
                  streamingData.appendMessageAnnotation({
                    messageIdFromServer: messageId,
                  });
                }

                return {
                  id: messageId,
                  chatId: id,
                  role: message.role,
                  content: message.content,
                  createdAt: new Date(),
                };
              },
            ),
          });
        } catch (error) {
          console.error("Error al guardar el chat:", error);
        }
      }

      streamingData.close();
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stream-text",
    },
  });

  return result.toDataStreamResponse({
    data: streamingData,
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized, please login", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat eliminado", { status: 200 });
  } catch {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
