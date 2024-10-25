import { convertToCoreMessages, Message, streamText } from "ai";
import { z } from "zod";

import { auth } from "@/app/(auth)/auth";
import { createSystemPrompt } from "@/config/chatbot-prompt";
import { removeChat, saveChat } from "@/db/chat-querys";
import { getUserById } from "@/db/user-querys";
import { gptFlashModel } from "@/modules/chatbot/ai";
import {
  generateExerciseRoutine,
  generateMoodTracking,
  generateNutritionalPlan,
  generateRiskAssessment,
} from "@/modules/chatbot/ai/actions";
import { calculateAge } from "@/modules/core/lib/utils";
import { formatDate } from "@/modules/payment/lib/utils";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

export const maxDuration = 60;

export async function POST(request: Request) {
  const { id, messages }: { id: string; messages: Array<Message> } =
    await request.json();

  const session = (await auth()) as Session;

  const userId = session.user.id;
  const user = await getUserById(userId);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const isPremium = user.is_premium;
  const premiumExpiresAt = formatDate(user.premium_expires_at);

  if (!isPremium) {
    return new Response("Unauthorized", { status: 401 });
  }

  const profileData = session ? await getUserProfileData(session) : null;

  const userName = profileData?.first_name;
  const userLastName = profileData?.last_name;
  const userAge = calculateAge(profileData?.birthdate as string);
  const userBirthday = profileData?.birthdate;
  const userLocation = profileData?.location;
  const userBio = profileData?.bio;

  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0,
  );

  const systemPrompt = createSystemPrompt({
    userName,
    userLastName,
    userAge,
    userBirthday,
    userLocation,
    userBio,
    premiumExpiresAt,
  });

  const result = await streamText({
    model: gptFlashModel,
    system: systemPrompt,
    messages: coreMessages,
    maxTokens: 1024,
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
    onFinish: async ({ responseMessages }) => {
      if (session.user && session.user.id) {
        try {
          const createdAt = new Date();
          const userId = session.user.id;
          const path = `/essentia-ai/chat/${id}`;
          const firstMessageContent = messages[0].content;
          const title = firstMessageContent.substring(0, 100);

          const chat: any = {
            id,
            title,
            userId,
            createdAt,
            messages: [...coreMessages, ...responseMessages],
            path,
          };

          await saveChat(chat);
        } catch (error) {
          console.error("Error al guardar el chat:", error);
        }
      }
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stream-text",
    },
  });

  return result.toDataStreamResponse({});
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = (await auth()) as Session;

  if (!session || !session.user) {
    return new Response("Unauthorized, please login", { status: 401 });
  }

  try {
    const path = `/essentia-ai/chat/${id}`;

    await removeChat({ id, path });

    return new Response("Chat eliminado", { status: 200 });
  } catch {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
