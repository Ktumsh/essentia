"server only";

import {
  createAI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
  streamUI,
} from "ai/rsc";

import { nanoid } from "nanoid";
import { z } from "zod";

import { openai } from "@ai-sdk/openai";
import { auth } from "@@/auth";
import { saveChat } from "@/app/(main)/essentia-ai/actions";
import { Chat, Message } from "@/types/chat";

import {
  UserMessage,
  BotMessage,
  BotCard,
} from "../componentes/stocks/message";

import { InitialLoading } from "../componentes/stocks/initial-loading";

import { RiskAssessment } from "../componentes/stocks/health-risk-stock";
import { Routine } from "../componentes/stocks/excercise-routine-stock";
import { Plan } from "../componentes/stocks/nutrition-plan-stock";
import { MoodTracking } from "../componentes/stocks/mood-tracking-stock";
import {
  ExerciseRoutineStock,
  HealthRiskStock,
  MoodTrackingStock,
  NutritionPlanStock,
} from "../componentes/stocks";

import { Session, UserProfileData } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import ToolSkeleton from "../componentes/tools/tool-skeleton";
import ErrorMessage from "../componentes/stocks/error-message";
import { getUserById } from "@/db/actions";
import { calculateAge } from "@/modules/core/lib/utils";
import { formatDate } from "@/modules/payment/lib/utils";
import { createSystemPrompt } from "@/config/chatbot-prompt";
import { generateToolResponse } from "../componentes/tools/tool-response";
import {
  MOOD_TRACKING_PROMPT,
  PLAN_PROMPT,
  RISK_ASSESSMENT_PROMPT,
  ROUTINE_PROMPT,
} from "@/config/tools-prompt";
import {
  moodTrackingSchema,
  nutritionalPlanSchema,
  riskAssessmentSchema,
  routineSchema,
} from "../componentes/tools/tool-parameters";

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content,
      },
    ],
  });

  const session = (await auth()) as Session;

  if (!session || !session.user) {
    return {
      id: nanoid(),
      display: (
        <BotMessage content="Por favor, debes iniciar sesión para que puedas interactuar conmigo. ¡Te espero pronto! 😊" />
      ),
    };
  }

  const userId = session.user.id;
  const user = await getUserById(userId);

  if (!user) {
    return {
      id: nanoid(),
      display: <BotMessage content="Usuario no encontrado 💔" />,
    };
  }

  const isPremium = user.is_premium;
  const premiumExpiresAt = formatDate(user.premium_expires_at);

  if (!isPremium) {
    return {
      id: nanoid(),
      display: (
        <BotMessage content="Necesitas tener un plan premium para poder acceder a mis herramientas 🌼✨. Por favor, actualiza tu plan para continuar. ¡Aquí te espero! 😊" />
      ),
    };
  }

  const profileData = session ? await getUserProfileData(session) : null;

  const userName = profileData?.first_name;
  const userLastName = profileData?.last_name;
  const userAge = calculateAge(profileData?.birthdate as string);
  const userBirthday = profileData?.birthdate;
  const userLocation = profileData?.location;
  const userBio = profileData?.bio;

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const systemPrompt = createSystemPrompt({
    userName,
    userLastName,
    userAge,
    userBirthday,
    userLocation,
    userBio,
    premiumExpiresAt,
  });

  const history = aiState.get().messages.map((message: any) => ({
    role: message.role,
    content: message.content,
    name: message.name,
  }));

  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    initial: <InitialLoading />,
    maxTokens: 1024,
    system: systemPrompt,

    messages: [...history],
    text: ({ content, done, delta }) => {
      try {
        if (!textStream) {
          textStream = createStreamableValue("");
          textNode = <BotMessage content={textStream.value} />;
        }

        if (done) {
          textStream.done();
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content,
              },
            ],
          });
        } else {
          textStream.update(delta);
        }

        return textNode;
      } catch (error) {
        console.error("Error generando la respuesta de IA:", error);

        return (
          <BotCard>
            <ErrorMessage />
          </BotCard>
        );
      }
    },
    tools: {
      recommendExercise: {
        description: ROUTINE_PROMPT,
        parameters: routineSchema,
        generate: async function* ({ routine }) {
          if (!routine || Object.keys(routine).length === 0) {
            console.error("Error: La rutina está vacía o indefinida.");
            yield (
              <BotCard>
                <ErrorMessage />
              </BotCard>
            );
          }

          yield (
            <BotCard>
              <ToolSkeleton />
            </BotCard>
          );

          const result = await generateToolResponse(
            aiState,
            "recommendExercise",
            { routine },
            <ExerciseRoutineStock props={routine} />
          );

          return result;
        },
      },
      healthRiskAssessment: {
        description: RISK_ASSESSMENT_PROMPT,
        parameters: riskAssessmentSchema,
        generate: async function* ({ riskAssessment }) {
          if (!riskAssessment || Object.keys(riskAssessment).length === 0) {
            console.error(
              "Error: La evaluación de riesgo está vacía o indefinida."
            );
            yield (
              <BotCard>
                <ErrorMessage />
              </BotCard>
            );
          }

          yield (
            <BotCard>
              <ToolSkeleton />
            </BotCard>
          );

          const result = await generateToolResponse(
            aiState,
            "healthRiskAssessment",
            { riskAssessment },
            <HealthRiskStock props={riskAssessment} />
          );

          return result;
        },
      },
      nutritionalAdvice: {
        description: PLAN_PROMPT,
        parameters: nutritionalPlanSchema,
        generate: async function* ({ plan }) {
          if (!plan || Object.keys(plan).length === 0) {
            console.error("Error: El plan está vacío o indefinido.");
            return <ErrorMessage />;
          }

          yield (
            <BotCard>
              <ToolSkeleton />
            </BotCard>
          );

          const result = await generateToolResponse(
            aiState,
            "nutritionalAdvice",
            { plan },
            <NutritionPlanStock props={plan} />
          );

          return result;
        },
      },
      moodTracking: {
        description: MOOD_TRACKING_PROMPT,
        parameters: moodTrackingSchema,
        generate: async function* ({ moodTracking }) {
          if (!moodTracking || Object.keys(moodTracking).length === 0) {
            console.error(
              "Error: El seguidor de ánimo está vacío o indefinido."
            );
            return <ErrorMessage />;
          }

          yield (
            <BotCard>
              <ToolSkeleton />
            </BotCard>
          );

          const result = await generateToolResponse(
            aiState,
            "moodTracking",
            { moodTracking },
            <MoodTrackingStock props={moodTracking} />
          );

          return result;
        },
      },
    },
  });

  return {
    id: nanoid(),
    display: result.value,
  };
}

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    "use server";

    const session = (await auth()) as Session;
    const profileData = session ? await getUserProfileData(session) : null;

    if (session && session.user) {
      const aiState = getAIState() as Chat;

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState, profileData);
        return uiState;
      }
    } else {
      return;
    }
  },
  onSetAIState: async ({ state }) => {
    "use server";

    const session = await auth();

    if (session && session.user) {
      const { chatId, messages } = state;

      const createdAt = new Date();
      const userId = session.user.id as string;
      const path = `/essentia-ai/chat/${chatId}`;

      const firstMessageContent = messages[0].content as string;
      const title = firstMessageContent.substring(0, 100);

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path,
      };

      await saveChat(chat);
    } else {
      return;
    }
  },
});

export const getUIStateFromAIState = (
  aiState: Chat,
  profileData: UserProfileData | null
) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === "tool" ? (
          message.content.map((tool) => {
            return tool.toolName === "recommendExercise" ? (
              <BotCard>
                <ExerciseRoutineStock props={tool.result as Routine} />
              </BotCard>
            ) : tool.toolName === "healthRiskAssessment" ? (
              <BotCard>
                <HealthRiskStock props={tool.result as RiskAssessment} />
              </BotCard>
            ) : tool.toolName === "nutritionalAdvice" ? (
              <BotCard>
                <NutritionPlanStock props={tool.result as Plan} />
              </BotCard>
            ) : tool.toolName === "moodTracking" ? (
              <BotCard>
                <MoodTrackingStock props={tool.result as MoodTracking} />
              </BotCard>
            ) : null;
          })
        ) : message.role === "user" ? (
          <UserMessage profileData={profileData}>
            {message.content as string}
          </UserMessage>
        ) : message.role === "assistant" &&
          typeof message.content === "string" ? (
          <BotMessage content={message.content} />
        ) : null,
    }));
};
