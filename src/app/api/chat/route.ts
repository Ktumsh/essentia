import {
  convertToCoreMessages,
  Message,
  createDataStreamResponse,
  streamText,
} from "ai";
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
import { createUserTask } from "@/db/querys/task-querys";
import { gptFlashModel } from "@/modules/chatbot/ai";
import {
  generateExerciseRoutine,
  generateMoodTracking,
  generateNutritionalPlan,
  generateRiskAssessment,
  generateTaskTracking,
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
  | "getWeather"
  | "recommendExercise"
  | "healthRiskAssessment"
  | "nutritionalAdvice"
  | "moodTracking"
  | "trackTask";

const allTools: AllowedTools[] = [
  "getWeather",
  "recommendExercise",
  "healthRiskAssessment",
  "nutritionalAdvice",
  "moodTracking",
  "trackTask",
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
    return new Response("Mensaje de usuario no encontrado", { status: 400 });
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

  return createDataStreamResponse({
    execute: (dataStream) => {
      dataStream.writeData({
        type: "user-message-id",
        content: userMessageId,
      });

      const result = streamText({
        model: gptFlashModel,
        system: systemPrompt,
        messages: coreMessages,
        maxSteps: 5,
        experimental_activeTools: allTools,
        tools: {
          getWeather: {
            description: "Obtén el clima actual en una ubicación",
            parameters: z.object({
              latitude: z.number(),
              longitude: z.number(),
            }),
            execute: async ({ latitude, longitude }) => {
              const response = await fetch(
                `https://api.open-meteo.com/v1/dwd-icon?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m,weather_code&daily=sunrise,sunset&timezone=auto`,
              );

              const weatherData = await response.json();
              return weatherData;
            },
          },
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
            execute: async (args) => {
              try {
                const results = await generateExerciseRoutine(args);
                return results;
              } catch (error) {
                console.error("Error en recommendExercise:", error);
                return { error: String(error) };
              }
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
            execute: async (args) => {
              try {
                const results = await generateRiskAssessment(args);
                return results;
              } catch (error) {
                console.error("Error en riskAssessment:", error);
                return { error: String(error) };
              }
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
            execute: async (args) => {
              try {
                const results = await generateNutritionalPlan(args);
                return results;
              } catch (error) {
                console.error("Error en nutritionalAdvice:", error);
                return { error: String(error) };
              }
            },
          },
          moodTracking: {
            description:
              "Mostrar recomendación de actividades para mejorar el estado de ánimo",
            parameters: z.object({
              mood: z.string().describe("Estado de ánimo"),
            }),
            execute: async (args) => {
              try {
                const results = await generateMoodTracking(args);
                return results;
              } catch (error) {
                console.error("Error en moodTracking:", error);
                return { error: String(error) };
              }
            },
          },
          trackTask: {
            description:
              "Crea un seguimiento personalizado para una tarea específica",
            parameters: z.object({
              name: z.string().max(80).describe("Nombre de la tarea"),
              schedule: z.object({
                frequency: z
                  .enum([
                    "No se repite",
                    "Diariamente",
                    "Semanalmente",
                    "Mensualmente",
                    "Anualmente",
                  ])
                  .describe("Frecuencia de la tarea"),
                time: z
                  .string()
                  .regex(
                    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                    "Hora en formato 24 horas (hh:mm)",
                  )
                  .describe("Hora específica para realizar la tarea"),
                weekDay: z
                  .enum([
                    "lunes",
                    "martes",
                    "miércoles",
                    "jueves",
                    "viernes",
                    "sábado",
                    "domingo",
                  ])
                  .nullable()
                  .optional()
                  .describe(
                    "Día de la semana para tareas semanales o sin repetición",
                  ),
                monthDay: z
                  .number()
                  .nullable()
                  .optional()
                  .describe(
                    "Día del mes para tareas mensuales, anuales o sin repetición",
                  ),
                month: z
                  .enum([
                    "enero",
                    "febrero",
                    "marzo",
                    "abril",
                    "mayo",
                    "junio",
                    "julio",
                    "agosto",
                    "septiembre",
                    "octubre",
                    "noviembre",
                    "diciembre",
                  ])
                  .nullable()
                  .optional()
                  .describe("Mes para tareas anuales o sin repetición"),
              }),
            }),
            execute: async (args) => {
              try {
                const result = await generateTaskTracking(args);

                const createdTask = await createUserTask({
                  userId,
                  chatId: id,
                  name: result.task.name,
                  instructions: result.task.instructions,
                  frequency: result.task.schedule.frequency,
                  time: result.task.schedule.time,
                  exactDate: result.task.schedule.exactDate ?? null,
                  weekDay: result.task.schedule.weekDay ?? null,
                  monthDay: result.task.schedule.monthDay ?? null,
                  month: result.task.schedule.month ?? null,
                });

                return createdTask;
              } catch (error) {
                console.error("Error en trackTask:", error);
                return { error: String(error) };
              }
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
                      dataStream.writeMessageAnnotation({
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
        },
        experimental_telemetry: {
          isEnabled: true,
          functionId: "stream-text",
        },
      });

      result.mergeIntoDataStream(dataStream);
    },
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
