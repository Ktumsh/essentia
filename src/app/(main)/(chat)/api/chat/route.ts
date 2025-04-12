import {
  UIMessage,
  appendResponseMessages,
  createDataStreamResponse,
  smoothStream,
  streamText,
} from "ai";

import { auth } from "@/app/(auth)/auth";
import { generateTitleFromUserMessage } from "@/app/(main)/(chat)/actions";
import { isProductionEnvironment } from "@/consts/env";
import {
  deleteChatById,
  getChatById,
  saveChat,
  saveMessages,
} from "@/db/querys/chat-querys";
import { getSubscription } from "@/db/querys/payment-querys";
import { getUserTrialStatus } from "@/db/querys/user-querys";
import { calculateAge } from "@/lib/utils";
import { formatDate } from "@/utils/format";
import { getUserProfileData } from "@/utils/profile";

import { modelProvider } from "../../_lib/ai/models";
import { createSystemPrompt } from "../../_lib/ai/prompts";
import { createHealthRisk } from "../../_lib/ai/tools/create-health-risk";
import { createMoodTrack } from "../../_lib/ai/tools/create-mood-track";
import { createNutritionalPlan } from "../../_lib/ai/tools/create-nutritional-plan";
import { createRoutine } from "../../_lib/ai/tools/create-routine";
import { createTrackTask } from "../../_lib/ai/tools/create-track-task";
import { getWeather } from "../../_lib/ai/tools/get-weather";
import {
  generateUUID,
  getMostRecentUserMessage,
  getTrailingMessageId,
} from "../../_lib/utils";

export const maxDuration = 60;

type AllowedTools =
  | "getWeather"
  | "createRoutine"
  | "createHealthRisk"
  | "createNutritionalPlan"
  | "createMoodTrack"
  | "createTrackTask";

const allTools: AllowedTools[] = [
  "getWeather",
  "createRoutine",
  "createHealthRisk",
  "createNutritionalPlan",
  "createMoodTrack",
  "createTrackTask",
];

export async function POST(request: Request) {
  try {
    const {
      id,
      messages,
      selectedChatModel,
    }: { id: string; messages: Array<UIMessage>; selectedChatModel: string } =
      await request.json();

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new Response("No autorizado", { status: 401 });
    }

    const userId = session?.user?.id as string;
    const [subscription] = await getSubscription(userId);
    const trial = await getUserTrialStatus(userId);

    if (!subscription && !trial.isActive) {
      return new Response("No autorizado", { status: 401 });
    }

    const isPremium = subscription.isPremium;
    const premiumExpiresAt = formatDate(subscription.expiresAt!);

    if (!isPremium && !trial.isActive) {
      return new Response("No autorizado", { status: 401 });
    }

    const user = userId ? await getUserProfileData({ userId }) : null;

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

    const userMessage = getMostRecentUserMessage(messages);

    if (!userMessage) {
      return new Response("Mensaje de usuario no encontrado", { status: 400 });
    }

    const chat = await getChatById({ id });

    if (!chat) {
      const title = await generateTitleFromUserMessage({
        message: userMessage,
      });
      await saveChat({ id, userId: session.user.id, title });
    } else {
      if (chat.userId !== session.user.id) {
        return new Response("No autorizado", { status: 401 });
      }
    }

    await saveMessages({
      messages: [
        {
          chatId: id,
          id: userMessage.id,
          role: "user",
          parts: userMessage.parts,
          attachments: userMessage.experimental_attachments ?? [],
          createdAt: new Date(),
        },
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
      selectedChatModel,
    });

    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model: modelProvider.languageModel(selectedChatModel),
          system: systemPrompt,
          messages,
          maxSteps: 5,
          experimental_activeTools:
            selectedChatModel === "chat-model-reasoning" ? [] : allTools,
          experimental_transform: smoothStream({ chunking: "word" }),
          experimental_generateMessageId: generateUUID,
          tools: {
            getWeather,
            createRoutine,
            createHealthRisk,
            createNutritionalPlan,
            createMoodTrack,
            createTrackTask: createTrackTask({ userId, chatId: id }),
          },
          onFinish: async ({ response }) => {
            if (session?.user?.id) {
              try {
                const assistantId = getTrailingMessageId({
                  messages: response.messages.filter(
                    (message) => message.role === "assistant",
                  ),
                });

                if (!assistantId) {
                  throw new Error("No se encontró un mensaje de asistente");
                }

                const [, assistantMessage] = appendResponseMessages({
                  messages: [userMessage],
                  responseMessages: response.messages,
                });

                await saveMessages({
                  messages: [
                    {
                      id: assistantId,
                      chatId: id,
                      role: assistantMessage.role,
                      parts: assistantMessage.parts,
                      attachments:
                        assistantMessage.experimental_attachments ?? [],
                      createdAt: new Date(),
                    },
                  ],
                });
              } catch (error) {
                console.error("Error al guardar el chat:", error);
              }
            }
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: "stream-text",
          },
        });

        result.consumeStream();

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: (error) => {
        console.error("Error al procesar la solicitud:", error);
        return "Lo lamento, ha ocurrido un error inesperado!";
      },
    });
  } catch {
    return new Response("¡Se produjo un error al procesar tu solicitud!", {
      status: 404,
    });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("No autorizado. Por favor, inicia sesión", {
      status: 401,
    });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response("No autorizado", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat eliminado", { status: 200 });
  } catch {
    return new Response("¡Se produjo un error al procesar tu solicitud!", {
      status: 500,
    });
  }
}
