import { openai } from "@ai-sdk/openai";
import { geolocation } from "@vercel/functions";
import {
  appendClientMessage,
  appendResponseMessages,
  createDataStream,
  smoothStream,
  streamText,
} from "ai";
import { after } from "next/server";
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from "resumable-stream";

import { auth } from "@/app/(auth)/auth";
import { generateTitleFromUserMessage } from "@/app/(main)/(chat)/actions";
import { isProductionEnvironment } from "@/consts/env";
import {
  createStreamId,
  deleteChatById,
  getChatById,
  getMessagesByChatId,
  getStreamIdsByChatId,
  saveChat,
  saveMessages,
} from "@/db/querys/chat-querys";
import { getSubscription } from "@/db/querys/payment-querys";
import { getUserTrialStatus } from "@/db/querys/user-querys";
import { calculateAge } from "@/lib/utils";
import { formatDate } from "@/utils/format";
import { getUserProfileData } from "@/utils/profile";

import { postRequestBodySchema, type PostRequestBody } from "./schema";
import { modelProvider } from "../../_lib/models";
import { systemPrompt, type RequestHints } from "../../_lib/prompts";
import { createHealthRisk } from "../../_lib/tools/create-health-risk";
import { createMoodTrack } from "../../_lib/tools/create-mood-track";
import { createNutritionalPlan } from "../../_lib/tools/create-nutritional-plan";
import { createRoutine } from "../../_lib/tools/create-routine";
import { createTrackTask } from "../../_lib/tools/create-track-task";
import { getWeather } from "../../_lib/tools/get-weather";
import { generateUUID, getTrailingMessageId } from "../../_lib/utils";

import type { Chat } from "@/db/schema";

export const maxDuration = 60;

let globalStreamContext: ResumableStreamContext | null = null;

function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error: any) {
      if (error.message.includes("REDIS_URL")) {
        console.log(
          " > Resumable streams are disabled due to missing REDIS_URL",
        );
      } else {
        console.error(error);
      }
    }
  }

  return globalStreamContext;
}

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch {
    return new Response("Invalid request body", { status: 400 });
  }

  try {
    const { id, message, selectedChatModel, selectedVisibilityType } =
      requestBody;

    console.log("selectedChatModel", selectedChatModel);

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

    const chat = await getChatById({ id });

    if (!chat) {
      const title = await generateTitleFromUserMessage({
        message,
      });
      await saveChat({
        id,
        userId: session.user.id,
        title,
        visibility: selectedVisibilityType,
      });
    } else {
      if (chat.userId !== session.user.id) {
        return new Response("No autorizado", { status: 403 });
      }
    }

    const previousMessages = await getMessagesByChatId({ id });

    const messages = appendClientMessage({
      // @ts-expect-error: todo add type conversion from DBMessage[] to UIMessage[]
      messages: previousMessages,
      message,
    });

    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    await saveMessages({
      messages: [
        {
          chatId: id,
          id: message.id,
          role: "user",
          parts: message.parts,
          attachments: message.experimental_attachments ?? [],
          createdAt: new Date(),
        },
      ],
    });

    const streamId = generateUUID();
    await createStreamId({ streamId, chatId: id });

    const stream = createDataStream({
      execute: async (dataStream) => {
        const result = streamText({
          model: modelProvider.languageModel(selectedChatModel),
          system: systemPrompt({
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
            requestHints,
          }),
          maxSteps: 5,
          messages,
          experimental_transform: smoothStream({ chunking: "word" }),
          experimental_generateMessageId: generateUUID,
          tools: {
            ...(selectedChatModel !== "chat-model-reasoning" && {
              web_search_preview: openai.tools.webSearchPreview({
                searchContextSize: "high",
                userLocation: {
                  type: "approximate",
                  country: "CL",
                  city: "Santiago",
                  timezone: "America/Santiago",
                },
              }),
            }),
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
                  messages: [message],
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
          sendSources: true,
        });
      },
      onError: (error) => {
        console.error("Error al procesar la solicitud:", error);
        return "Lo lamento, ha ocurrido un error inesperado!";
      },
    });

    const streamContext = getStreamContext();

    if (streamContext) {
      return new Response(
        await streamContext.resumableStream(streamId, () => stream),
      );
    } else {
      return new Response(stream);
    }
  } catch {
    return new Response("¡Se produjo un error al procesar tu solicitud!", {
      status: 404,
    });
  }
}

export async function GET(request: Request) {
  const streamContext = getStreamContext();

  if (!streamContext) {
    return new Response(null, { status: 204 });
  }

  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return new Response("id es requerida", { status: 400 });
  }

  const session = await auth();

  if (!session?.user) {
    return new Response("No autorizado", { status: 401 });
  }

  let chat: Chat;

  try {
    chat = await getChatById({ id: chatId });
  } catch {
    return new Response("Not found", { status: 404 });
  }

  if (!chat) {
    return new Response("Not found", { status: 404 });
  }

  if (chat.visibility === "private" && chat.userId !== session.user.id) {
    return new Response("No autorizado", { status: 403 });
  }

  const streamIds = await getStreamIdsByChatId({ chatId });

  if (!streamIds.length) {
    return new Response("No se encontraron streams", { status: 404 });
  }

  const recentStreamId = streamIds.at(-1);

  if (!recentStreamId) {
    return new Response("No se encontró ningún stream reciente", {
      status: 404,
    });
  }

  const emptyDataStream = createDataStream({
    execute: () => {},
  });

  return new Response(
    await streamContext.resumableStream(recentStreamId, () => emptyDataStream),
    {
      status: 200,
    },
  );
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
