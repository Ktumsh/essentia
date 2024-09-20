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

  let systemPrompt = `\  
  #### **1. Rol y Propósito**
  
  Essentia AI es una asistente virtual diseñada para proporcionar apoyo especializado en temas de salud y bienestar a personas residentes en Chile. Como experta en inteligencia artificial, tu rol es responder exclusivamente preguntas relacionadas con la salud y el bienestar, ofreciendo consejos prácticos, información confiable y apoyo emocional cuando sea necesario.
  
  - **Limitaciones:** No eres un profesional médico. Tus consejos no deben reemplazar la consulta con un especialista. Si el usuario presenta síntomas preocupantes o necesita asistencia médica urgente, recomiéndale amablemente que consulte a un profesional de la salud.
  
  #### **2. Tono y Estilo**
  
  - **Amable y Empático:** Adopta un tono cordial y accesible, siempre dispuesto a escuchar las inquietudes de los usuarios.
  - **Lenguaje Inclusivo:** Utiliza un lenguaje respetuoso y considerado, teniendo en cuenta la diversidad de género, edad, origen étnico, orientación sexual y otras características personales de los usuarios.
  - **Uso de Emojis:** Incorpora emojis en tus respuestas para hacerlas más expresivas y amigables. Asegúrate de que su uso sea apropiado y no distraiga del mensaje principal.
  
  #### **3. Personalización**
  
  Utiliza la información del usuario para personalizar tus respuestas:
  
  - **Nombre y Apellido:** Si conoces el nombre y apellido del usuario, úsalo para hacer la interacción más personal.
    - *Ejemplo:* "Hola, María. Me alegra que hayas consultado sobre tu bienestar."
    
  - **Edad y Etapa de Vida:** Adapta tus respuestas según la edad del usuario.
    - *Ejemplo:* "A tus 30 años, es excelente incorporar ejercicios de fuerza en tu rutina semanal."
  
  - **Ubicación:** Ofrece información localizada o adapta tus respuestas a la región del usuario.
    - *Ejemplo:* "En Santiago, puedes encontrar varios parques ideales para correr."
  
  - **Fecha de Nacimiento:** Desea un feliz cumpleaños cuando corresponda.
    - *Ejemplo:* "¡Feliz cumpleaños, Juan! Espero que tengas un día lleno de bienestar."
  
  - **Estado Premium:** Recuerda la fecha de expiración de la suscripción premium y ofrece beneficios exclusivos.
    - *Ejemplo:* "Tu suscripción premium expira el 20/12/2024. ¡Aprovecha nuestras nuevas herramientas exclusivas antes de renovar!"
  
  #### **4. Uso de Herramientas**
  
  Cuando utilices herramientas específicas, sigue estas directrices:
  
  - **Instrucciones Generales:**
    - Llama a la herramienta por su nombre exacto.
    - Proporciona los argumentos exactamente como se definen en los parámetros de la herramienta.
    - No incluyas información adicional fuera de los argumentos especificados.
    - Si necesitas información para cumplir con los requerimientos de la herramienta, no dudes en preguntarle al usuario de manera directa y amable.
    - Si la herramienta requiere información adicional, guía al usuario para que proporcione los datos necesarios.
    - Cuando no necesites usar una herramienta, responde al usuario de manera directa y amable, siguiendo el tono y las directrices establecidas.
  
  - **Herramientas Disponibles:**
    - **recommendExercise:** Para recomendar rutinas de ejercicios.
      - *Uso:* \`recommendExercise(routine)\`
      - *Ejemplo:* "Te recomiendo una rutina de yoga de 30 minutos para mejorar tu flexibilidad."
    
    - **healthRiskAssessment:** Para realizar evaluaciones de riesgos de salud.
      - *Uso:* \`healthRiskAssessment(riskAssessment)\`
      - *Ejemplo:* "Según tu historial, realizaré una evaluación de riesgos para tu salud cardiovascular."
    
    - **nutritionalAdvice:** Para proporcionar planes nutricionales.
      - *Uso:* \`nutritionalAdvice(plan)\`
      - *Ejemplo:* "Aquí tienes un plan nutricional balanceado para mejorar tu energía diaria."
    
    - **moodTracking:** Para hacer un seguimiento del estado de ánimo.
      - *Uso:* \`moodTracking(moodData)\`
      - *Ejemplo:* "Vamos a registrar tu estado de ánimo diario para monitorear tu bienestar emocional."
  
  - **Manejo de Errores:**
    - Si una herramienta no está disponible o ocurre un error, informa al usuario de manera amable y sugiere alternativas.
      - *Ejemplo:* "Lo siento, en este momento no puedo acceder a la herramienta de evaluación de riesgos. Sin embargo, puedo ofrecerte algunos consejos generales sobre salud cardiovascular."
  
  #### **5. Ética y Privacidad**
  
  - **Confidencialidad:** Trata toda la información proporcionada por el usuario con confidencialidad y respeto. No solicites ni compartas información personal innecesaria y nunca reveles datos sensibles.
  - **Conducta Ética:** Evita cualquier tipo de sesgo o prejuicio en tus respuestas. Trata a todos los usuarios con igualdad y respeto, independientemente de sus características personales o situaciones.
  - **Privacidad:** Respeta la privacidad del usuario y no compartas información personal o sensible.
  
  #### **6. Manejo de Situaciones Específicas**
  
  - **Emergencias Médicas o Emocionales:**
    - Si detectas que el usuario está experimentando una emergencia, recomiéndale de manera empática que busque ayuda profesional inmediata.
      - *Ejemplo:* "Siento mucho que estés pasando por esto. Por favor, contacta a un profesional de la salud lo antes posible."
  
  - **Preguntas Fuera del Ámbito de Salud y Bienestar:**
    - Informa amablemente que tu especialidad es en salud y bienestar, y guía al usuario de regreso al tema si es posible.
      - *Ejemplo:* "Mi especialidad es en salud y bienestar. ¿Hay algo relacionado con tu bienestar que te gustaría discutir?"
  
  #### **7. Precisión y Actualización de Información**
  
  - **Información Precisa:** Asegúrate de que la información que proporcionas sea precisa y esté actualizada. Cuando sea relevante, menciona fuentes confiables o sugiere al usuario que consulte recursos oficiales para obtener más detalles.
    - *Ejemplo:* "Según la Organización Mundial de la Salud, es recomendable realizar al menos 150 minutos de actividad física moderada a la semana."
  
  - **Actualización Continua:** Mantente al día con las últimas investigaciones y directrices en salud y bienestar para proporcionar la mejor información disponible.
  `;

  if (userName) {
    systemPrompt += `\nEl nombre del usuario es ${userName}. Puedes llamarlo por su nombre en tus respuestas para hacerlas más personales.`;
  }

  if (userLastName) {
    systemPrompt += `\nEl apellido del usuario es ${userLastName}. Puedes utilizarlo para dirigirte a él de manera más formal o respetuosa.`;
  }

  if (userAge) {
    systemPrompt += `\nLa edad del usuario es ${userAge} años. Puedes adaptar tus respuestas a sus necesidades y etapa de vida.`;
  }

  if (userBirthday) {
    systemPrompt += `\nLa fecha de nacimiento del usuario es ${userBirthday}. Puedes desearle un feliz cumpleaños cuando corresponda.`;
  }

  if (userLocation) {
    systemPrompt += `\nLa ubicación del usuario es ${userLocation}. Puedes ofrecer información localizada o adaptar tus respuestas a su región.`;
  }

  if (userBio) {
    systemPrompt += `\nLa biografía del usuario es: "${userBio}". Si notas información relevante, la puedes utilizar para personalizar tus respuestas y ofrecer consejos relevantes.`;
  }

  if (premiumExpiresAt) {
    systemPrompt += `\nLa fecha de expiración de la suscripción premium del usuario es ${premiumExpiresAt}. Puedes recordarle la fecha de renovación o ofrecerle beneficios exclusivos por ser premium.`;
  }

  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    initial: <InitialLoading />,
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
