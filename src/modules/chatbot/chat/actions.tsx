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
  SpinnerMessage,
  BotCard,
} from "../componentes/stocks/message";

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
        <BotMessage content="Debes iniciar sesión para usar esta función." />
      ),
    };
  }

  const userId = session.user.id;
  const user = await getUserById(userId);

  if (!user) {
    return {
      id: nanoid(),
      display: <BotMessage content="Usuario no encontrado." />,
    };
  }

  const isPremium = user.is_premium;

  if (!isPremium) {
    return {
      id: nanoid(),
      display: (
        <BotMessage content="Necesitas tener un plan premium para acceder a las herramientas de Essentia AI. Actualiza tu cuenta para continuar." />
      ),
    };
  }

  const profileData = session ? await getUserProfileData(session) : null;

  const userName = profileData?.first_name;

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  let systemPrompt = `\
  Essentia AI es una asistente virtual diseñada para proporcionar apoyo especializado en temas de salud y bienestar a personas residentes en Chile.
  Como una experta en inteligencia artificial, tu rol es responder exclusivamente preguntas relacionadas con la salud y el bienestar, ofreciendo consejos prácticos, información confiable y apoyo emocional cuando sea necesario.
  
  Adoptas un tono amable, cordial y accesible, siempre dispuesto a escuchar las inquietudes de los usuarios.
  Tus respuestas son claras, educadas y brindan la mejor información disponible, enfocándote en las necesidades individuales de cada persona.
  Además, utilizas emojis en tus respuestas para hacerlas más expresivas y amigables, adecuando su uso al contexto de la conversación.
  
  Recuerda que, aunque brindas información sobre salud y bienestar, no eres un profesional médico. Tus consejos no deben reemplazar la consulta con un especialista. Si el usuario presenta síntomas preocupantes o necesita asistencia médica urgente, recomiéndale amablemente que consulte a un profesional de la salud.
  
  Essentia AI busca generar un ambiente de confianza y comprensión, asegurando que cada interacción sea positiva y esté orientada a mejorar el bienestar de los usuarios.
  Mantendrás siempre un enfoque en la salud integral, considerando tanto el aspecto físico como el emocional, y responderás de manera apropiada a la diversidad de situaciones que puedan presentarse.
  
  Trata toda la información proporcionada por el usuario con confidencialidad y respeto. Evita solicitar o compartir información personal innecesaria y nunca reveles datos sensibles.
  
  Utiliza un lenguaje inclusivo y respetuoso en todas tus interacciones, considerando la diversidad de género, edad, origen étnico, orientación sexual y otras características personales de los usuarios.
  
  Si el usuario realiza preguntas fuera del ámbito de la salud y el bienestar, infórmale amablemente que tu especialidad es en salud y bienestar, y guíalo de regreso al tema si es posible.
  
  Si detectas que el usuario está experimentando una emergencia médica o emocional, recomiéndale de manera empática que busque ayuda profesional inmediata. No proporciones consejos específicos sobre situaciones críticas.
  
  Asegúrate de que la información que proporcionas sea precisa y esté actualizada. Cuando sea relevante, puedes mencionar fuentes confiables o sugerir al usuario que consulte recursos oficiales para obtener más detalles.
  
  Ten en cuenta el contexto de la conversación y la información compartida por el usuario para personalizar tus respuestas y satisfacer mejor sus necesidades individuales.
  
  Utiliza emojis para hacer tus respuestas más expresivas y amigables, pero asegúrate de que su uso sea apropiado y no distraiga del mensaje principal.
  
  Mantén siempre una conducta ética en tus interacciones. Respeta la privacidad del usuario y no compartas información personal o sensible. Sé honesto acerca de tus capacidades y limitaciones.
  
  Evita cualquier tipo de sesgo o prejuicio en tus respuestas. Trata a todos los usuarios con igualdad y respeto, independientemente de sus características personales o situaciones.
  
  Solo debes responder a preguntas exclusivamente relacionadas con la salud y el bienestar.
  `;

  if (userName) {
    systemPrompt += `\nEl nombre del usuario es ${userName}. Puedes llamarlo por su nombre en tus respuestas para hacerlas más personales.`;
  }

  systemPrompt += `
  **Instrucciones para el modelo:**
  
  - **recommendExercise**: Cuando recomiendes una rutina de ejercicios, utiliza la herramienta 'recommendExercise' y proporciona el argumento 'routine' con la estructura especificada.
  - **healthRiskAssessment**: Cuando realices una evaluación de riesgos de salud, utiliza la herramienta 'healthRiskAssessment' y proporciona el argumento 'riskAssessment' con la estructura especificada.
  - **nutritionalAdvice**: Cuando proporciones un plan nutricional, debes utilizar la herramienta 'nutritionalAdvice' y proporcionar el argumento 'plan' con la estructura especificada.
  - **moodTracking**: Cuando hagas un seguimiento del estado de ánimo, utiliza la herramienta 'moodTracking' y proporciona el argumento 'moodTracking' con la estructura especificada.
  
  Al utilizar una herramienta, debes:
  
  - Llamar a la herramienta por su nombre exacto.
  - Proporcionar los argumentos exactamente como se definen en los parámetros de la herramienta.
  - No incluir información adicional fuera de los argumentos especificados.
  
  Cuando no necesites usar una herramienta, responde al usuario de manera directa y amable, siguiendo el tono y las directrices establecidas.
  `;

  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    initial: <SpinnerMessage />,
    maxTokens: 1024,
    system: systemPrompt,

    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
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
        description: `\
        Recomienda una rutina de ejercicios personalizada basada en el nivel de condición física, objetivos, tiempo disponible, preferencias, edad, género y condiciones de salud del usuario.
        Considera el acceso a equipamiento (gimnasio, pesas, bandas elásticas, etc) o si no dispone de él.
        Genera una rutina de 1 a 3 meses, aumentando progresivamente repeticiones y duración.
        Indica semanas de duración, ejercicios recomendados, repeticiones, series y tiempos de descanso.
        Incluye, si es posible, una evaluación física inicial y recomendaciones basadas en el progreso esperado.`,

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

          try {
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
          } catch (error) {
            console.error("Error generando la respuesta de IA:", error);

            return (
              <BotCard>
                <ErrorMessage />
              </BotCard>
            );
          }
        },
      },
      healthRiskAssessment: {
        description: `\
        Evalúa el riesgo de salud del usuario basándose en factores como edad, peso, altura, género, historial familiar de enfermedades, estilo de vida (dieta, actividad física, consumo de tabaco, drogas o alcohol) y condiciones médicas preexistentes.
        Se enfoca en riesgos específicos para enfermedades cardiovasculares, diabetes, hipertensión y enfermedades respiratorias.
        Proporciona para cada riesgo un porcentaje y lo categoriza como "bajo", "medio" o "alto".
        Calcula el IMC y determina si el usuario está en su peso ideal.
        Ofrece interpretaciones claras de los resultados y, si el riesgo es medio o alto, proporciona recomendaciones personalizadas para mitigarlos.`,

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

          try {
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
          } catch (error) {
            console.error("Error generando la respuesta de IA:", error);

            return (
              <BotCard>
                <ErrorMessage />
              </BotCard>
            );
          }
        },
      },
      nutritionalAdvice: {
        description: `\
        Crea un plan nutricional personalizado basado en el tipo de dieta, restricciones y objetivo calórico del usuario.
        Considera el tipo de dieta que sigue el usuario (vegetariana, vegana, keto, balanceada, u otra), restricciones como alergias o intolerancias, y su objetivo calórico.
        Si el usuario no ha proporcionado su objetivo calórico, determina su necesidad calórica basada en su actividad física, peso, altura, edad y objetivo de peso.
        Si faltan datos, realiza suposiciones razonables basadas en información general.
        Proporciona el tipo de cada comida (desayuno, almuerzo, once, cena y otros), junto con los alimentos, cantidades, calorías y horarios sugeridos.
        Finalmente, da recomendaciones para seguir el plan y alcanzar su objetivo de manera saludable.`,

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

          try {
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
                      result: plan,
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
          } catch (error) {
            console.error("Error generando la respuesta de IA:", error);

            return (
              <BotCard>
                <ErrorMessage />
              </BotCard>
            );
          }
        },
      },
      moodTracking: {
        description: `\
        Proporciona actividades de bienestar según el estado de ánimo del usuario.
        Si no conoces su estado de ánimo, pregúntalo de manera amable y empática.
        Si es necesario, pregunta el género del usuario para personalizar la respuesta.
        Genera una lista de actividades recomendadas adaptadas al estado de ánimo.
        Incluye una recomendación para mejorar su estado de ánimo y un consejo de vida significativo y motivador, basado en su situación actual.
        Presenta esta información de manera clara y accesible.`,

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

          try {
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
          } catch (error) {
            console.error("Error generando la respuesta de IA:", error);

            return (
              <BotCard>
                <ErrorMessage />
              </BotCard>
            );
          }
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
