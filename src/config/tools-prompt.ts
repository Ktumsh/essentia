import { calculateExactDate } from "@/modules/core/lib/utils";

type Routine = {
  objective: string;
  physicalLevel: string;
  time: string;
  preferences: string;
  healthConditions: string;
  equipment: string;
};

type RiskAssessment = {
  weight: number;
  height: number;
  familyHistory: string;
  lifestyle: string;
  healthConditions: string;
};

type Plan = {
  dietType: string;
  restrictions: string;
  calorieGoal: number;
  activityLevel: string;
  weight: number;
  height: number;
  weightGoal: string;
};

type MoodTracking = {
  mood: string;
};

type Task = {
  name: string | null;
  schedule: {
    frequency: string;
    time: string;
    weekDay?: string | null;
    monthDay?: number | null;
    month?: string | null;
  };
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

export const RISK_ASSESSMENT_PROMPT = (assessment: RiskAssessment) => `\
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

export const PLAN_PROMPT = (plan: Plan) => `\
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

export const MOOD_TRACKING_PROMPT = (tracking: MoodTracking) => `\
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
