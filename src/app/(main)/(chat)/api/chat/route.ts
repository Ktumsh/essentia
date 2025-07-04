import { openai, type OpenAIResponsesProviderOptions } from "@ai-sdk/openai";
import { geolocation } from "@vercel/functions";
import {
  appendClientMessage,
  appendResponseMessages,
  createDataStream,
  smoothStream,
  streamText,
} from "ai";
import { differenceInSeconds } from "date-fns";
import { after } from "next/server";
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from "resumable-stream";

import { auth } from "@/app/(auth)/auth";
import { generateTitleFromUserMessage } from "@/app/(main)/(chat)/actions";
import {
  canSendMessage,
  createStreamId,
  deleteChatById,
  getChatById,
  getMessagesByChatId,
  getStreamIdsByChatId,
  incrementUserChatUsage,
  saveChat,
  saveChatToolsFromMessageParts,
  saveMessages,
} from "@/db/querys/chat-querys";
import { getSubscription } from "@/db/querys/payment-querys";
import { getUserTrialStatus } from "@/db/querys/user-querys";
import { isProductionEnvironment } from "@/lib/consts";
import { calculateAge, formatDate } from "@/utils";
import { getUserData } from "@/utils/profile";

import { postRequestBodySchema, type PostRequestBody } from "./schema";
import { ChatSDKError } from "../../_lib/errors";
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
    return new ChatSDKError("bad_request:api").toResponse();
  }

  try {
    const { id, message, selectedChatModel, selectedVisibilityType } =
      requestBody;

    const session = await auth();

    if (!session?.user?.id) {
      return new ChatSDKError("unauthorized:session").toResponse();
    }

    const userId = session?.user?.id as string;
    const [subscription] = await getSubscription(userId);
    const trial = await getUserTrialStatus(userId);

    if (!subscription && !trial.isActive) {
      return new ChatSDKError("unauthorized:chat").toResponse();
    }

    const isPremium = subscription.isPremium;
    const premiumExpiresAt = formatDate(subscription.expiresAt!);

    if (!isPremium && !trial.isActive) {
      return new ChatSDKError("unauthorized:chat").toResponse();
    }

    const user = userId ? await getUserData({ userId }) : null;

    const canSend = await canSendMessage(userId);
    if (!canSend) {
      return new ChatSDKError("rate_limit:chat").toResponse();
    }

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
        return new ChatSDKError("forbidden:chat").toResponse();
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
          providerOptions: {
            openai: {
              reasoningSummary: "auto",
            } satisfies OpenAIResponsesProviderOptions,
          },
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
                  throw new Error("No se encontró un mensaje del asistente");
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

                await saveChatToolsFromMessageParts({
                  message: {
                    id: assistantId,
                    chatId: id,
                    role: assistantMessage.role,
                    parts: assistantMessage.parts,
                    attachments:
                      assistantMessage.experimental_attachments ?? [],
                    createdAt: new Date(),
                  },
                });

                await incrementUserChatUsage(userId);
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
  } catch (error) {
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }
  }
}

export async function GET(request: Request) {
  const streamContext = getStreamContext();
  const resumeRequestedAt = new Date();

  if (!streamContext) {
    return new Response(null, { status: 204 });
  }

  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:session").toResponse();
  }

  let chat: Chat;

  try {
    chat = await getChatById({ id: chatId });
  } catch {
    return new ChatSDKError("not_found:chat").toResponse();
  }

  if (!chat) {
    return new ChatSDKError("not_found:chat").toResponse();
  }

  if (chat.visibility === "private" && chat.userId !== session.user.id) {
    return new ChatSDKError("forbidden:chat").toResponse();
  }

  const streamIds = await getStreamIdsByChatId({ chatId });

  if (!streamIds.length) {
    return new ChatSDKError("not_found:stream").toResponse();
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

  const stream = await streamContext.resumableStream(
    recentStreamId,
    () => emptyDataStream,
  );

  if (!stream) {
    const messages = await getMessagesByChatId({ id: chatId });
    const mostRecentMessage = messages.at(-1);

    if (!mostRecentMessage) {
      return new Response(emptyDataStream, { status: 200 });
    }

    if (mostRecentMessage.role !== "assistant") {
      return new Response(emptyDataStream, { status: 200 });
    }

    const messageCreatedAt = new Date(mostRecentMessage.createdAt);

    if (differenceInSeconds(resumeRequestedAt, messageCreatedAt) > 15) {
      return new Response(emptyDataStream, { status: 200 });
    }

    const restoredStream = createDataStream({
      execute: (buffer) => {
        buffer.writeData({
          type: "append-message",
          message: JSON.stringify(mostRecentMessage),
        });
      },
    });

    return new Response(restoredStream, { status: 200 });
  }

  return new Response(stream, { status: 200 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ChatSDKError("not_found:chat").toResponse();
  }

  const session = await auth();

  if (!session || !session.user) {
    return new ChatSDKError("unauthorized:session").toResponse();
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new ChatSDKError("forbidden:chat").toResponse();
    }

    await deleteChatById({ id });

    return Response.json({ id, message: "Chat eliminado" }, { status: 200 });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new ChatSDKError("bad_request:api").toResponse();
  }
}
