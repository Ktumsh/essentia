import { calculateExactDate } from "@/modules/core/lib/utils";

import type {
  HealthRisk,
  MoodTrack,
  NutritionalPlan,
  Routine,
  Task,
} from "./server";

type SystemPrompt = {
  firstName?: string;
  lastName?: string;
  age?: number;
  birthdate?: Date | null;
  location?: string | null;
  bio?: string | null;
  height?: number | null;
  weight?: number | null;
  genre?: string | null;
  premiumExpiresAt?: string | null;
  selectedChatModel: string;
};

export const createSystemPrompt = (params: SystemPrompt): string => {
  const {
    firstName,
    lastName,
    age,
    birthdate,
    location,
    bio,
    height,
    weight,
    genre,
    premiumExpiresAt,
    selectedChatModel,
  } = params;

  let prompt = `\
  1. Rol y Propósito
  
  Essentia AI es una asistente virtual diseñada para proporcionar apoyo especializado en temas de salud y bienestar a personas residentes en Chile. Como experta en inteligencia artificial, tu rol es responder **exclusivamente** preguntas relacionadas con la salud y el bienestar, ofreciendo consejos prácticos, información confiable y apoyo emocional cuando sea necesario.
  
  - Limitaciones: No eres un profesional médico. Tus consejos no deben reemplazar la consulta con un especialista. Si el usuario presenta síntomas preocupantes o necesita asistencia médica urgente, recomiéndale amablemente que consulte a un profesional de la salud.
  
  2. Tono y Estilo
  
  - Amable y Empático: Adopta un tono cordial y accesible, siempre dispuesto a escuchar las inquietudes de los usuarios.
  - Lenguaje Inclusivo: Utiliza un lenguaje respetuoso y considerado, teniendo en cuenta la diversidad de género, edad, origen étnico, orientación sexual y otras características personales de los usuarios.
  - Uso de Emojis: Incorpora emojis en tus respuestas para hacerlas más expresivas y amigables. Asegúrate de que su uso sea apropiado y no distraiga del mensaje principal.
  
  3. Personalización
  
  Utiliza la información del usuario para personalizar tus respuestas:
  - Nombre y Apellido: Si conoces el nombre y apellido del usuario, úsalo para hacer la interacción más personal.
  - Edad y Etapa de Vida: Adapta tus respuestas según la edad del usuario.
  - Ubicación: Ofrece información localizada o adapta tus respuestas a la región del usuario.
  - Biografía: Utiliza detalles de la biografía del usuario para contextualizar tus respuestas.
  - Fecha de Nacimiento: Desea un feliz cumpleaños cuando corresponda.
  - Estado Premium: Recuerda la fecha de expiración de la suscripción premium y ofrece beneficios exclusivos.
  - Preferencias de Comunicación: Adapta el formato de tus respuestas según las preferencias del usuario.
  - Necesidades de Accesibilidad: Asegura que tus respuestas sean accesibles según las necesidades del usuario.
  
  4. Ética y Privacidad
  
  - Confidencialidad: Trata toda la información proporcionada por el usuario con confidencialidad y respeto.
  - Privacidad:
    - Cumplimiento con Regulaciones: Cumple con la Ley de Protección de Datos Personales de Chile.
    - Transparencia en el Uso de Datos: Informa al usuario que sus datos serán utilizados únicamente para proporcionar respuestas personalizadas.

  5. Manejo de Situaciones Específicas
  
  - Emergencias Médicas o Emocionales:
    - Si detectas que el usuario está experimentando una emergencia, recomiéndale de manera empática que busque ayuda profesional inmediata.
  
  - Preguntas Fuera del Ámbito de Salud y Bienestar:
    - No proporciones información ni respuestas sobre temas que no estén relacionados con la salud y el bienestar.
  
  6. Precisión y Actualización de Información
  
  - Información Precisa: Asegúrate de que la información que proporcionas sea precisa y esté actualizada.
  - Actualización Continua: Mantente al día con las últimas investigaciones en salud y bienestar.
  
  7. Accesibilidad y Soporte Multimodal
  
  - Texto Alternativo para Imágenes: Incluye descripciones detalladas de las imágenes.
  - Lenguaje Claro y Sencillo: Utiliza un lenguaje fácil de entender, evitando términos técnicos innecesarios.
  
  8. Feedback y Mejora Continua
  
  - Solicitar Opiniones: Pide al usuario que proporcione feedback sobre la ayuda recibida.
  - Adaptación Basada en Feedback: Utiliza la retroalimentación para ajustar y personalizar futuras interacciones.
  
  9. Temas Prohibidos
  
  - No proporciones información sobre:
    - Política, Economía, Deportes, Tecnología, Entretenimiento, Religión, Contenido Adulto o Explícito.
  `;

  if (selectedChatModel !== "chat-model-reasoning") {
    prompt += `\n\n10. Uso de Herramientas y Manejo de Imágenes\n\n`;

    prompt += `### Instrucciones Generales\n`;
    prompt += `- Llama a la herramienta por su nombre exacto.\n`;
    prompt += `- Proporciona los argumentos exactamente como se definen en los parámetros de la herramienta.\n`;
    prompt += `- No incluyas información adicional fuera de los argumentos especificados.\n`;

    prompt += `\n### Herramientas Disponibles\n`;

    prompt += `#### 🌦️ getWeather\n`;
    prompt += `- **Uso:** Obtiene información meteorológica actualizada y si es de día o de noche.\n`;
    prompt += `- **Ejemplo:**\n  - Si es de día y soleado, puedes recomendar actividades al aire libre.\n`;

    prompt += `#### 🏋️‍♂️ createRoutine\n`;
    prompt += `- **Uso:** \`createRoutine(routine)\`\n`;
    prompt += `- **Ejemplo:** "Te recomiendo una rutina de yoga de 30 minutos para mejorar tu flexibilidad."\n`;

    prompt += `#### 🏥 createHealthRisk\n`;
    prompt += `- **Uso:** \`createHealthRisk(healthRisk)\`\n`;
    prompt += `- **Ejemplo:** "Según tu historial, realizaré una evaluación de riesgos para tu salud cardiovascular."\n`;

    prompt += `#### 🍽️ createNutritionalPlan\n`;
    prompt += `- **Uso:** \`createNutritionalPlan(nutritionalPlan)\`\n`;
    prompt += `- **Ejemplo:** "Aquí tienes un plan nutricional balanceado para mejorar tu energía diaria."\n`;

    prompt += `#### 🧘‍♂️ createMoodTrack\n`;
    prompt += `- **Uso:** \`createMoodTrack(moodTrack)\`\n`;
    prompt += `- **Ejemplo:** "Vamos a registrar tu estado de ánimo diario para monitorear tu bienestar emocional."\n`;

    prompt += `#### ⏰ createTrackTask\n`;
    prompt += `- **Uso:** \`createTrackTask(task)\`\n`;
    prompt += `- **Ejemplo:** "He configurado un recordatorio para que recuerdes beber agua diariamente a las 9:00 am."\n`;
    prompt += `  - **Detalles:**\n`;
    prompt += `    1. Nombre del recordatorio.\n`;
    prompt += `    2. Frecuencia configurada.\n`;
    prompt += `    3. Hora específica.\n`;
    prompt += `    4. (Opcional) Fecha si la tarea es única.\n`;
    prompt += `    5. Si el usuario menciona tareas complejas como "Cada 3 días", responde con un mensaje claro sobre las limitaciones y ofrece alternativas válidas.\n`;
  }

  prompt += `\n\n### Datos del Usuario\n`;

  const additionalDetails = [
    firstName && `- El nombre del usuario es ${firstName}.`,
    lastName && `- El apellido del usuario es ${lastName}.`,
    age && `- La edad del usuario es ${age} años.`,
    birthdate && `- La fecha de nacimiento del usuario es ${birthdate}.`,
    location && `- La ubicación del usuario es ${location}.`,
    bio && `- La biografía del usuario es: "${bio}".`,
    height && `- La altura del usuario es ${height} cm.`,
    weight && `- El peso del usuario es ${weight} kg.`,
    genre && `- El género del usuario es ${genre}.`,
    premiumExpiresAt &&
      `- La fecha de expiración de la suscripción premium del usuario es ${premiumExpiresAt}.`,
  ];

  prompt += `\n\n${additionalDetails.filter(Boolean).join("\n")}`;

  return prompt;
};

export const ROUTINE_PROMPT = (routine: Routine) => `\
  Genera una rutina de ejercicios personalizada basada en los siguientes datos del usuario:
  - **Nivel físico**: ${routine.physicalLevel || "general"}.
  - **Objetivo principal**: ${routine.objective || "mejorar la condición física"}.
  - **Tiempo disponible por día**: ${routine.time || "30 minutos"}.
  - **Preferencias de ejercicios**: ${routine.preferences || "ninguna"}.
  - **Condiciones de salud preexistentes**: ${routine.healthConditions || "ninguna"}.
  - **Disponibilidad de equipamiento**: ${routine.equipment || "ninguno"}.

  La rutina debe incluir:
  1. **Duración total**: Entre 1 y 3 meses (especifica las semanas).
  2. **Lista de ejercicios**: Cada ejercicio debe incluir:
     - Nombre del ejercicio.
     - Repeticiones y series (si aplican).
     - Duración (en caso de ser un ejercicio por tiempo).
     - Tiempo de descanso recomendado.
     - Equipamiento necesario (o "ninguno" si no se requiere).
     - Instrucciones detalladas.
     - Beneficios del ejercicio.
     - Modificaciones para distintos niveles.
  3. **Progresión**: Explica cómo aumentar la intensidad o dificultad con el tiempo.
  4. **Calentamiento y enfriamiento**: Incluye ejercicios breves para ambos.
  5. **Programa semanal**: Indica qué ejercicios realizar cada día.
  6. **Recomendaciones finales**: Consejos para optimizar el progreso.
`;

export const HEALTH_RISK_PROMPT = (assessment: HealthRisk) => `\
  Realiza una evaluación detallada del riesgo de salud del usuario utilizando la siguiente información:
  - **Peso**: ${assessment.weight || "sin especificar"} kg.
  - **Altura**: ${assessment.height || "sin especificar"} cm.
  - **Historial familiar**: ${assessment.familyHistory || "sin especificar"}.
  - **Estilo de vida**: ${assessment.lifestyle || "sin especificar"}.
  - **Condiciones médicas preexistentes**: ${assessment.healthConditions || "ninguna"}.

  La evaluación debe incluir:
  1. **Riesgos individuales**:
     - Enfermedades cardiovasculares.
     - Diabetes.
     - Hipertensión.
     - Enfermedades pulmonares.
     - Enfermedades renales.
     Para cada una, calcula el porcentaje de riesgo, clasifica el nivel como "bajo", "medio" o "alto", y proporciona:
     - Interpretación personalizada.
     - Acciones recomendadas para mitigar el riesgo.
  2. **Riesgo general**: Calcula un porcentaje de riesgo general y clasifícalo como "bajo", "medio" o "alto".
  3. **IMC**: Calcula el índice de masa corporal y clasifícalo (e.g., peso ideal, sobrepeso).
  4. **Recomendaciones**: Proporciona consejos generales para reducir los riesgos.
  5. **Fecha de evaluación**: Incluye una marca temporal en el resultado.
`;

export const NUTRITIONAL_PLAN_PROMPT = (plan: NutritionalPlan) => `\
  Crea un plan nutricional personalizado basado en los siguientes datos del usuario:
  - **Tipo de dieta**: ${plan.dietType || "general"}.
  - **Restricciones alimentarias**: ${plan.restrictions || "ninguna"}.
  - **Meta calórica diaria**: ${plan.calorieGoal || "sin especificar"} kcal.
  - **Nivel de actividad**: ${plan.activityLevel || "moderado"}.
  - **Peso actual**: ${plan.weight || "sin especificar"} kg.
  - **Altura**: ${plan.height || "sin especificar"} cm.
  - **Objetivo de peso**: ${plan.weightGoal || "mantener el peso actual"}.

  El plan debe incluir:
  1. **Distribución diaria**: Para cada comida (desayuno, almuerzo, cena, snacks y adicionales), detalla:
     - Nombre del alimento o plato.
     - Cantidad o porción.
     - Calorías estimadas.
     - Horario sugerido.
  2. **Macronutrientes**: Proporciona un desglose total en gramos de proteínas, carbohidratos y grasas.
  3. **Calorías totales diarias**: Calcula las calorías de todas las comidas.
  4. **Recomendaciones**: Consejos para implementar el plan y alcanzar los objetivos nutricionales de manera sostenible.
`;

export const MOOD_TRACK_PROMPT = (tracking: MoodTrack) => `\
  Proporciona recomendaciones basadas en el estado de ánimo del usuario (${tracking.mood || "indefinido"}). Genera una respuesta que incluya:
  1. **Actividades de bienestar**: Crea una lista de actividades con descripciones detalladas.
  2. **Recomendación principal**: Sugiere una actividad o hábito destacado para mejorar el estado de ánimo.
  3. **Consejo motivador**: Ofrece un consejo práctico y motivador para el usuario.
  4. **Frase inspiradora**: Incluye una frase poética o reflexiva relevante al estado emocional actual del usuario (indica el autor si corresponde).
`;

export const TRACK_TASK_SYSTEM_PROMPT = `
  Generas tareas de seguimiento o recordatorios para notificaciones con las siguientes reglas:

  1. Genera una instrucción interna breve y clara (máximo 100 caracteres) que defina el mensaje de la notificación.
     - Ejemplo: Para "Beber agua", usa "Dime que tome un vaso de agua". Caracterizado por la palabra "Dime" seguida de una acción.

  2. Evalúa la validez de la solicitud basándote en las siguientes **frecuencias válidas**:
     - "No se repite": Incluye la fecha exacta, hora, día de la semana, día del mes y mes.
     - "Diariamente": Solo incluye la hora.
     - "Semanalmente": Incluye el día de la semana (\`weekDay\`) y la hora.
     - "Mensualmente": Incluye el día del mes (\`monthDay\`) y la hora.
     - "Anualmente": Incluye el mes, el día del mes (\`monthDay\`) y la hora.

  3. Si el usuario especifica una frecuencia o configuración **no válida**, responde con un mensaje claro:
     - Ejemplo de frecuencias no válidas:
       - "Cada 3 días".
       - "Cada 2 horas".
       - "2 veces al mes".
       - "Una vez cada semana y media".
       - "El primer lunes de cada mes y también el tercer viernes".
     - Mensaje de respuesta:
       - "La frecuencia o configuración proporcionada no es válida. Por favor, utiliza una de las siguientes frecuencias válidas: 'No se repite', 'Diariamente', 'Semanalmente', 'Mensualmente', 'Anualmente'. Si necesitas configuraciones más específicas, divídelas en solicitudes separadas."

  4. Genera únicamente una llamada a la herramienta:
     - Si detectas más de una configuración en una sola solicitud, selecciona únicamente **la primera configuración válida** y omite las demás.
     - Si no puedes determinar ninguna configuración válida, responde indicando las limitaciones con un mensaje claro.

  5. Cuando el usuario no especifica una tarea:
     - Genera ejemplos útiles de tareas comunes que se puedan seguir.
     - Cada tarea debe incluir:
       - **Nombre**: Una tarea clara y concisa.
       - **Cronograma sugerido**: Frecuencia y hora recomendada.
       - Las opciones de frecuencia válidas son: "No se repite", "Diariamente", "Semanalmente", "Mensualmente" o "Anualmente".
       - Proporciona 3-5 ejemplos variados y relevantes.
`;

export const TRACK_TASK_PROMPT = (task: Task) => {
  let prompt = `
    - Nombre de la tarea: ${task.name || "sin especificar"}.
    - Frecuencia: ${task.schedule?.frequency || "sin especificar"}.
    - Hora: ${task.schedule?.time || "sin especificar"}.
  `;

  const exactDate =
    task.schedule?.frequency === "No se repite"
      ? calculateExactDate(task.schedule.time || "00:00", {
          weekDay: task.schedule?.weekDay,
          monthDay: task.schedule?.monthDay,
          month: task.schedule?.month,
        })
      : null;

  const weekDay =
    task.schedule.frequency === "Semanalmente" ||
    task.schedule.frequency === "No se repite"
      ? task.schedule?.weekDay
      : null;

  const monthDay =
    task.schedule.frequency === "Mensualmente" ||
    task.schedule.frequency === "Anualmente" ||
    task.schedule.frequency === "No se repite"
      ? task.schedule?.monthDay
      : null;

  const month =
    task.schedule.frequency === "Anualmente" ||
    task.schedule.frequency === "No se repite"
      ? task.schedule?.month
      : null;

  if (exactDate) {
    prompt += `- Fecha exacta: ${exactDate.toISOString()}.`;
  }

  if (weekDay) {
    prompt += `- Día de la semana: ${weekDay}.`;
  }

  if (monthDay) {
    prompt += `- Día del mes: ${monthDay}.`;
  }

  if (month) {
    prompt += `- Mes: ${month}.`;
  }

  return prompt;
};
