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

import { sleep } from "@/utils/common";
import { Session, UserProfileData } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import ToolSkeleton from "../componentes/stocks/tool-skeleton";
import ErrorMessage from "../componentes/stocks/error-message";
import { getUserById } from "@/db/actions";
import { calculateAge } from "@/modules/core/lib/utils";
import { formatDate } from "@/modules/payment/lib/utils";
import { createSystemPrompt } from "@/config/chatbot-prompt";
import { generateToolResponse } from "../componentes/stocks/tool-response";
import {
  MOOD_TRACKING_PROMPT,
  PLAN_PROMPT,
  RISK_ASSESSMENT_PROMPT,
  ROUTINE_PROMPT,
} from "@/config/tools-prompt";

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
        parameters: z.object({
          routine: z.object({
            exercises: z.array(
              z.object({
                name: z.string().describe("Nombre del ejercicio"),
                reps: z
                  .number()
                  .optional()
                  .describe("Número de repeticiones por serie"),
                sets: z
                  .number()
                  .optional()
                  .describe("Número de series por ejercicio"),
                duration: z
                  .string()
                  .optional()
                  .describe("Duración del ejercicio o serie"),
                rest: z
                  .string()
                  .optional()
                  .describe("Tiempo de descanso entre series o ejercicios"),
                progression: z
                  .string()
                  .describe("Instrucciones para aumentar la dificultad"),
                equipment: z
                  .string()
                  .optional()
                  .describe("Equipamiento necesario"),
                instructions: z
                  .string()
                  .optional()
                  .describe("Instrucciones detalladas del ejercicio"),
                benefits: z
                  .string()
                  .optional()
                  .describe("Beneficios para la salud"),
                modifications: z
                  .string()
                  .optional()
                  .describe(
                    "Modificaciones para distintos niveles o limitaciones"
                  ),
              })
            ),
            durationWeeks: z
              .number()
              .describe("Número de semanas de la rutina"),
            goal: z.string().describe("Objetivo principal del usuario"),
            fitnessLevel: z
              .string()
              .describe("Nivel de condición física del usuario"),
            warmUp: z
              .string()
              .optional()
              .describe("Recomendaciones para el calentamiento"),
            coolDown: z
              .string()
              .optional()
              .describe("Recomendaciones para el enfriamiento"),

            schedule: z
              .array(
                z.object({
                  day: z.string().describe("Día de la semana"),
                  exercises: z
                    .array(z.string())
                    .describe("Ejercicios programados para el día"),
                })
              )
              .optional()
              .describe("Programa semanal de ejercicios"),
            recommendations: z
              .string()
              .optional()
              .describe(
                "Recomendaciones finales basadas en el progreso esperado"
              ),
          }),
        }),
        generate: async function* ({ routine }) {
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
        parameters: z.object({
          riskAssessment: z.object({
            diabetes: z.object({
              percentage: z
                .number()
                .describe("Porcentaje de riesgo de diabetes"),
              level: z.string().describe("Nivel de riesgo de diabetes"),
              interpretation: z
                .string()
                .optional()
                .describe(
                  "Interpretación personalizada del riesgo de diabetes"
                ),
              recommendedActions: z
                .string()
                .optional()
                .describe(
                  "Acciones recomendadas para reducir el riesgo de diabetes"
                ),
            }),
            heartDisease: z.object({
              percentage: z
                .number()
                .describe("Porcentaje de riesgo de enfermedad cardiaca"),
              level: z
                .string()
                .describe("Nivel de riesgo de enfermedad cardiaca"),
              interpretation: z
                .string()
                .optional()
                .describe("Interpretación personalizada del riesgo cardiaco"),
              recommendedActions: z
                .string()
                .optional()
                .describe(
                  "Acciones recomendadas para reducir el riesgo cardiaco"
                ),
            }),
            hypertension: z.object({
              percentage: z
                .number()
                .describe("Porcentaje de riesgo de hipertensión"),
              level: z.string().describe("Nivel de riesgo de hipertensión"),
              interpretation: z
                .string()
                .optional()
                .describe(
                  "Interpretación personalizada del riesgo de hipertensión"
                ),
              recommendedActions: z
                .string()
                .optional()
                .describe(
                  "Acciones recomendadas para reducir el riesgo de hipertensión"
                ),
            }),
            lungDisease: z.object({
              percentage: z
                .number()
                .describe("Porcentaje de riesgo de enfermedad pulmonar"),
              level: z
                .string()
                .describe("Nivel de riesgo de enfermedad pulmonar"),
              interpretation: z
                .string()
                .optional()
                .describe("Interpretación personalizada del riesgo pulmonar"),
              recommendedActions: z
                .string()
                .optional()
                .describe(
                  "Acciones recomendadas para reducir el riesgo pulmonar"
                ),
            }),
            kidneyDisease: z.object({
              percentage: z
                .number()
                .describe("Porcentaje de riesgo de enfermedad renal"),
              level: z.string().describe("Nivel de riesgo de enfermedad renal"),
              interpretation: z
                .string()
                .optional()
                .describe("Interpretación personalizada del riesgo renal"),
              recommendedActions: z
                .string()
                .optional()
                .describe("Acciones recomendadas para reducir el riesgo renal"),
            }),
            generalRiskLevelPercentage: z
              .number()
              .describe("Porcentaje de riesgo general"),
            generalRiskLevel: z.string().describe("Nivel de riesgo general"),
            bmi: z.number().describe("Índice de masa corporal"),
            bmiLevel: z.string().describe("Interpretación del IMC"),
            recommendations: z
              .string()
              .describe("Recomendaciones generales según el nivel de riesgo"),
            assessmentDate: z
              .string()
              .describe("Fecha actual de la evaluación"),
          }),
        }),
        generate: async function* ({ riskAssessment }) {
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
        parameters: z.object({
          plan: z.object({
            breakfast: z
              .array(
                z.object({
                  type: z.string().describe("Tipo de la comida (desayuno)"),
                  name: z.string().describe("Nombre del alimento o plato"),
                  quantity: z.string().describe("Cantidad o porción"),
                  calories: z
                    .number()
                    .describe("Calorías del alimento o plato"),
                  time: z.string().describe("Horario sugerido"),
                })
              )
              .optional(),
            lunch: z
              .array(
                z.object({
                  type: z.string().describe("Tipo de la comida (almuerzo)"),
                  name: z.string().describe("Nombre del alimento o plato"),
                  quantity: z.string().describe("Cantidad o porción"),
                  calories: z
                    .number()
                    .describe("Calorías del alimento o plato"),
                  time: z.string().describe("Horario sugerido"),
                })
              )
              .optional(),
            snack: z
              .array(
                z.object({
                  type: z.string().describe("Tipo de la comida (snack)"),
                  name: z.string().describe("Nombre del alimento o plato"),
                  quantity: z.string().describe("Cantidad o porción"),
                  calories: z
                    .number()
                    .describe("Calorías del alimento o plato"),
                  time: z.string().describe("Horario sugerido"),
                })
              )
              .optional(),
            dinner: z
              .array(
                z.object({
                  type: z.string().describe("Tipo de la comida (cena)"),
                  name: z.string().describe("Nombre del alimento o plato"),
                  quantity: z.string().describe("Cantidad o porción"),
                  calories: z
                    .number()
                    .describe("Calorías del alimento o plato"),
                  time: z.string().describe("Horario sugerido"),
                })
              )
              .optional(),
            additional: z
              .array(
                z.object({
                  type: z.string().describe("Tipo de la comida (adicional)"),
                  name: z.string().describe("Nombre del alimento o plato"),
                  quantity: z.string().describe("Cantidad o porción"),
                  calories: z
                    .number()
                    .describe("Calorías del alimento o plato"),
                  time: z.string().describe("Horario sugerido"),
                })
              )
              .optional(),
            totalCalories: z
              .number()
              .optional()
              .describe("Calorías totales diarias"),
            macronutrients: z
              .object({
                proteins: z.number().describe("Gramos de proteínas"),
                carbohydrates: z.number().describe("Gramos de carbohidratos"),
                fats: z.number().describe("Gramos de grasas"),
              })
              .describe("Desglose de macronutrientes"),
            recommendations: z
              .string()
              .describe("Recomendaciones sobre el plan nutricional"),
          }),
        }),
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
        parameters: z.object({
          moodTracking: z.object({
            mood: z.array(
              z.object({
                activity: z
                  .string()
                  .describe("Actividad de bienestar recomendada"),
                description: z
                  .string()
                  .describe("Descripción detallada de la actividad"),
              })
            ),
            suggestion: z
              .string()
              .describe("Recomendación para mejorar el estado de ánimo"),
            tip: z.string().describe("Consejo de vida motivador"),
            poeticPhrase: z
              .object({
                phrase: z
                  .string()
                  .describe("Frase poética o inspiradora sin comillas."),
                author: z.string().describe("Autor real de la frase poética."),
              })
              .optional(),
          }),
        }),
        generate: async function* ({ moodTracking }) {
          if (!moodTracking || Object.keys(moodTracking).length === 0) {
            console.error("Mood tracking data is required.");
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
