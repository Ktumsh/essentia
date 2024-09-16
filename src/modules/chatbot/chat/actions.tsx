"server only";

import {
  createAI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
  streamUI,
} from "ai/rsc";
import { nanoid } from "nanoid";

import { openai } from "@ai-sdk/openai";
import { auth } from "@@/auth";
import { saveChat } from "@/app/(main)/essentia-ai/actions";
import { Chat, Message } from "@/types/chat";
import {
  UserMessage,
  BotMessage,
  SpinnerMessage,
  BotCard,
} from "../componentes/stocks/message";
import { z } from "zod";
import HealthRiskStock, {
  RiskAssessment,
} from "../componentes/stocks/health-risk-stock";
import ExerciseRoutineStock, {
  Routine,
} from "../componentes/stocks/excercise-routine-stock";
import NutritionPlanStock, {
  Plan,
} from "../componentes/stocks/nutrition-plan-stock";
import MoodTrackingStock, {
  MoodTracking,
} from "../componentes/stocks/mood-tracking-stock";
import NutritionPlanSkeleton from "../componentes/stocks/nutrition-plan-skeleton";
import ExerciseRoutineSkeleton from "../componentes/stocks/excercise-routine-skeleton";
import HealthRiskSkeleton from "../componentes/stocks/health-risk-skeleton";
import MoodTrackingSkeleton from "../componentes/stocks/mood-tracking-skeleton";
import { sleep } from "@/utils/common";
import { Session, UserProfileData } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

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

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    initial: <SpinnerMessage />,
    maxTokens: 1024,
    system: `\
    Essentia AI es una asistente virtual diseñada para proporcionar apoyo especializado en temas de salud y bienestar a personas residentes en Chile.
    Como una experta femenina en inteligencia artificial, tu rol es responder exclusivamente preguntas relacionadas con la salud y el bienestar, ofreciendo consejos prácticos, información confiable, y apoyo emocional cuando sea necesario.
    
    Adoptas un tono amable, cordial y accesible, siempre abierta a escuchar las inquietudes de los usuarios.
    Tus respuestas son claras, educadas y brindan la mejor información disponible, enfocándote en las necesidades individuales de cada persona.
    Además, utilizas emojis en tus respuestas para hacerlas más expresivas y amigables, adecuando su uso al contexto de la conversación.
    
    Essentia AI busca generar un ambiente de confianza y comprensión, asegurando que cada interacción sea positiva y orientada a mejorar el bienestar de los usuarios.
    Mantendrás siempre un enfoque en la salud integral, considerando tanto el aspecto físico como el emocional, y responderás de manera apropiada a la diversidad de situaciones que puedan presentarse.
    
    Solo debes responder a preguntas exclusivamente relacionadas con la salud y el bienestar.
    
    **Instrucciones para el modelo:**
    
    - **recommendExercise**: Cuando recomiendes una rutina de ejercicios, utiliza la herramienta 'recommendExercise' y proporciona el argumento 'routine' con la estructura especificada.
    - **healthRiskAssessment**: Cuando realices una evaluación de riesgos de salud, utiliza la herramienta 'healthRiskAssessment' y proporciona el argumento 'riskAssessment' con la estructura especificada.
    - **nutritionalAdvice**: Cuando proporciones un plan nutricional, utiliza la herramienta 'nutritionalAdvice' y proporciona el argumento 'plan' con la estructura especificada.
    - **moodTracking**: Cuando hagas un seguimiento del estado de ánimo, utiliza la herramienta 'moodTracking' y proporciona el argumento 'moodTracking' con la estructura especificada.
    
    Al utilizar una herramienta, debes:
    
    - Llamar a la herramienta por su nombre exacto.
    - Proporcionar los argumentos exactamente como se definen en los parámetros de la herramienta.
    - No incluir información adicional fuera de los argumentos especificados.
    
    Cuando no necesites usar una herramienta, responde al usuario de manera directa y amable, siguiendo el tono y las directrices establecidas.
    `,

    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done, delta }) => {
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
    },
    tools: {
      recommendExercise: {
        description: `\
        Recomienda una rutina de ejercicios personalizada basada en el nivel de condición física, objetivo, tiempo disponible, preferencias del usuario, edad, género, y cualquier condición de salud o lesión.
        Considera el acceso a equipamiento como gimnasio, pesas, bandas elásticas, o si no se dispone de equipamiento.
        Genera una rutina de 1, 2, o 3 meses, aumentando progresivamente repeticiones y duración.
        Indica la cantidad de semanas, ejercicios recomendados, repeticiones, series, duración de cada sesión, y tiempos de descanso.
        Si es posible, incluye una evaluación física inicial para ajustar la rutina.
        Finalmente, haz una recomendación basada en la información y el progreso esperado del usuario.`,

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
                  .describe(
                    "Duración del ejercicio o de cada serie, si aplica"
                  ),
                rest: z
                  .string()
                  .optional()
                  .describe("Tiempo de descanso entre series o ejercicios"),
                progression: z
                  .string()
                  .describe(
                    "Instrucciones de progresión para aumentar la dificultad"
                  ),
                equipment: z
                  .string()
                  .optional()
                  .describe("Equipamiento necesario para el ejercicio"),
              })
            ),
            durationWeeks: z
              .number()
              .describe("Número de semanas que dura la rutina"),
            goal: z
              .string()
              .describe("Objetivo principal del usuario para la rutina"),
            fitnessLevel: z
              .string()
              .describe("Nivel de condición física del usuario"),
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
              <ExerciseRoutineSkeleton />
            </BotCard>
          );

          await sleep(1000);

          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "recommendExercise",
                    toolCallId,
                    args: { routine },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "recommendExercise",
                    toolCallId,
                    result: routine,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <ExerciseRoutineStock props={routine} />
            </BotCard>
          );
        },
      },
      healthRiskAssessment: {
        description: `\
        Evalúa el riesgo de salud de un usuario basándote en factores como la edad, peso, altura, género, historial familiar de enfermedades, estilo de vida (dieta, actividad física, consumo de tabaco o alcohol) y cualquier condición médica preexistente.
        La evaluación debe centrarse en identificar riesgos específicos para enfermedades cardiovasculares, diabetes, hipertensión y enfermedades respiratorias.
        Proporciona para cada riesgo un porcentaje que indique el nivel de riesgo y categoriza este nivel como "bajo", "medio" o "alto".
        Calcula y proporciona el índice de masa corporal (IMC) del usuario y según su IMC deberás determinar si está en su peso ideal.
        Además, ofrece una interpretación clara de los resultados y, si el nivel de riesgo es medio o alto, proporciona recomendaciones personalizadas para mitigar los riesgos identificados.`,
        parameters: z.object({
          riskAssessment: z.object({
            diabetes: z.object({
              percentage: z
                .number()
                .describe("Porcentaje de riesgo de diabetes"),
              level: z.string().describe("Nivel de riesgo de diabetes"),
            }),
            heartDisease: z.object({
              percentage: z
                .number()
                .describe("Porcentaje de riesgo de enfermedad cardiaca"),
              level: z
                .string()
                .describe("Nivel de riesgo de enfermedad cardiaca"),
            }),
            hypertension: z.object({
              percentage: z
                .number()
                .describe("Porcentaje de riesgo de hipertensión"),
              level: z.string().describe("Nivel de riesgo de hipertensión"),
            }),
            lungDisease: z.object({
              percentage: z
                .number()
                .describe("Porcentaje de riesgo de enfermedad pulmonar"),
              level: z
                .string()
                .describe("Nivel de riesgo de enfermedad pulmonar"),
            }),
            kidneyDisease: z.object({
              percentage: z
                .number()
                .describe("Porcentaje de riesgo de enfermedad renal"),
              level: z.string().describe("Nivel de riesgo de enfermedad renal"),
            }),
            generalRiskLevelPercentage: z
              .number()
              .describe("Porcentaje de riesgo general"),
            generalRiskLevel: z.string().describe("Nivel de riesgo general"),
            bmi: z.number().describe("Índice de masa corporal"),
            bmiLevel: z.string().describe("Interpretación del IMC"),
            recommendations: z
              .string()
              .describe("Recomendaciones según el nivel de riesgo"),
          }),
        }),
        generate: async function* ({ riskAssessment }) {
          yield (
            <BotCard>
              <HealthRiskSkeleton />
            </BotCard>
          );
          await sleep(1000);

          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "healthRiskAssessment",
                    toolCallId,
                    args: { riskAssessment },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "healthRiskAssessment",
                    toolCallId,
                    result: riskAssessment,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <HealthRiskStock props={riskAssessment} />
            </BotCard>
          );
        },
      },
      nutritionalAdvice: {
        description: `\
        Crea un plan nutricional personalizado basado en el tipo de dieta, restricciones y objetivo calórico del usuario.
        Primero, pregunta qué tipo de dieta sigue (vegetariana, vegana, keto, balanceada, u otra) y anota cualquier restricción, como alergias o intolerancias.
        Si el usuario conoce su objetivo calórico, úsalo; si no, haz preguntas para determinarlo (actividad física, peso, altura, edad, objetivo de peso).
        Pregunta si hay alguna comida que no consuma regularmente, ya sea desayuno, almuerzo, once, cena u otro adicional.
        Proporciona el tipo de cada comida (desayuno, almuerzo, once, cena y otro adicional si lo consideras), junto con el nombre de la agrupación de alimentos al cuál pertenece con la cantidad y calorías correspondientes, estableciendo horarios sugeridos.
        Finalmente, da una recomendación sobre cómo seguir el plan para alcanzar su objetivo de manera saludable.`,
        parameters: z.object({
          plan: z.object({
            breakfast: z
              .array(
                z.object({
                  type: z.string().describe("Tipo de la comida (desayuno)"),
                  name: z
                    .string()
                    .describe("Nombre de la agrupación alimenticia"),
                  quantity: z
                    .string()
                    .describe("Intensidad de la comida o alimento"),
                  calories: z
                    .number()
                    .describe("Calorías de la comida o alimento"),
                  time: z.string().describe("Horario de la comida o alimento"),
                })
              )
              .optional(),
            lunch: z
              .array(
                z.object({
                  type: z.string().describe("Tipo de la comida (almuerzo)"),
                  name: z
                    .string()
                    .describe("Nombre de la agrupación alimenticia"),
                  quantity: z
                    .string()
                    .describe("Intensidad de la comida o alimento"),
                  calories: z
                    .number()
                    .describe("Calorías de la comida o alimento"),
                  time: z.string().describe("Horario de la comida o alimento"),
                })
              )
              .optional(),
            snack: z
              .array(
                z.object({
                  type: z.string().describe("Tipo de la comida (once)"),
                  name: z
                    .string()
                    .describe("Nombre de la agrupación alimenticia"),
                  quantity: z
                    .string()
                    .describe("Intensidad de la comida o alimento"),
                  calories: z
                    .number()
                    .describe("Calorías de la comida o alimento"),
                  time: z.string().describe("Horario de la comida o alimento"),
                })
              )
              .optional(),
            dinner: z
              .array(
                z.object({
                  type: z.string().describe("Tipo de la comida (cena)"),
                  name: z
                    .string()
                    .describe("Nombre de la agrupación alimenticia"),
                  quantity: z
                    .string()
                    .describe("Intensidad de la comida o alimento"),
                  calories: z
                    .number()
                    .describe("Calorías de la comida o alimento"),
                  time: z.string().describe("Horario de la comida o alimento"),
                })
              )
              .optional(),
            additional: z
              .array(
                z.object({
                  type: z.string().describe("Tipo de la comida"),
                  name: z
                    .string()
                    .describe("Nombre de la agrupación alimenticia"),
                  quantity: z
                    .string()
                    .describe("Intensidad de la comida o alimento"),
                  calories: z
                    .number()
                    .describe("Calorías de la comida o alimento"),
                  time: z.string().describe("Horario de la comida o alimento"),
                })
              )
              .optional(),
            recommendations: z
              .string()
              .describe("Recomendaciones acerca del plan nutricional")
              .optional(),
          }),
        }),
        generate: async function* ({ plan }) {
          yield (
            <BotCard>
              <NutritionPlanSkeleton />
            </BotCard>
          );
          await sleep(1000);

          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "nutritionalAdvice",
                    toolCallId,
                    args: { plan },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "nutritionalAdvice",
                    toolCallId,
                    result: { plan },
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <NutritionPlanStock props={plan} />
            </BotCard>
          );
        },
      },
      moodTracking: {
        description: `
        Proporciona actividades de bienestar según el estado de ánimo del usuario.
        Si no conoces su estado de ánimo, realiza preguntas de manera amable y empática para determinarlo.
        Si es necesario, pregunta el género del usuario de forma educada para personalizar la respuesta.
        Luego, genera una lista de actividades recomendadas, bien adaptadas al estado de ánimo del usuario.
        Incluye una recomendación para mejorar su estado de ánimo y un consejo de vida significativo y motivador, basado en su situación actual.
        Presenta esta información de manera clara y accesible, permitiendo la descarga de las actividades en un formato fácil de usar.`,
        parameters: z.object({
          moodTracking: z.object({
            mood: z.array(
              z.object({
                activity: z.string().describe("Actividad de bienestar"),
              })
            ),
            suggestion: z
              .string()
              .describe("Recomendación para mejorar el estado de ánimo"),
            tip: z.string().describe("Consejo de vida para la persona"),
          }),
        }),
        generate: async function* ({ moodTracking }) {
          yield (
            <BotCard>
              <MoodTrackingSkeleton />
            </BotCard>
          );

          await sleep(1000);

          const toolCallId = nanoid();

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "moodTracking",
                    toolCallId,
                    args: { moodTracking },
                  },
                ],
              },
              {
                id: nanoid(),
                role: "tool",
                content: [
                  {
                    type: "tool-result",
                    toolName: "moodTracking",
                    toolCallId,
                    result: moodTracking,
                  },
                ],
              },
            ],
          });

          return (
            <BotCard>
              <MoodTrackingStock props={moodTracking} />
            </BotCard>
          );
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
