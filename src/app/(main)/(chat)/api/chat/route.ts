import {
  type Message,
  createDataStreamResponse,
  smoothStream,
  streamText,
} from "ai";

import { auth } from "@/app/(auth)/auth";
import { generateTitleFromUserMessage } from "@/app/(main)/(chat)/actions";
import {
  deleteChatById,
  getChatById,
  saveChat,
  saveMessages,
} from "@/db/querys/chat-querys";
import { getSubscription } from "@/db/querys/payment-querys";
import { modelProvider } from "@/modules/chatbot/lib/ai/models";
import { createSystemPrompt } from "@/modules/chatbot/lib/ai/prompts";
import { createHealthRisk } from "@/modules/chatbot/lib/ai/tools/create-health-risk";
import { createMoodTrack } from "@/modules/chatbot/lib/ai/tools/create-mood-track";
import { createNutritionalPlan } from "@/modules/chatbot/lib/ai/tools/create-nutritional-plan";
import { createRoutine } from "@/modules/chatbot/lib/ai/tools/create-routine";
import { createTrackTask } from "@/modules/chatbot/lib/ai/tools/create-track-task";
import { getWeather } from "@/modules/chatbot/lib/ai/tools/get-weather";
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
  const {
    id,
    messages,
    selectedChatModel,
  }: { id: string; messages: Array<Message>; selectedChatModel: string } =
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

  const userMessage = getMostRecentUserMessage(messages);

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
        onFinish: async ({ response, reasoning }) => {
          if (session?.user?.id) {
            try {
              const sanitizedResponseMessages = sanitizeResponseMessages({
                messages: response.messages,
                reasoning,
              });

              await saveMessages({
                messages: sanitizedResponseMessages.map((message) => {
                  return {
                    id: message.id,
                    chatId: id,
                    role: message.role,
                    content: message.content,
                    createdAt: new Date(),
                  };
                }),
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

      result.mergeIntoDataStream(dataStream, {
        sendReasoning: true,
      });
    },
    onError: (error) => {
      return "Lo lamento, ha ocurrido un error inesperado!" + error;
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
