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

export const ROUTINE_PROMPT = (routine: Routine) => `\
  Recomienda una rutina de ejercicios personalizada basada en el nivel físico (${routine.physicalLevel}), objetivo (${routine.objective}), tiempo disponible (${routine.time}), y preferencias (${routine.preferences}) del usuario.
  Considera su edad, género, y cualquier condición de salud preexistente (${routine.healthConditions}).
  Evalúa el acceso a equipamiento (${routine.equipment}) o si no dispone de él.
  Genera una rutina para 1 a 3 meses con una progresión adecuada, indicando semanas de duración, ejercicios recomendados, repeticiones, series y tiempos de descanso.
  Si es posible, incluye una evaluación física inicial y recomendaciones basadas en el progreso esperado.`;

export const RISK_ASSESSMENT_PROMPT = (assessment: RiskAssessment) => `\
    Evalúa el riesgo de salud del usuario basándose en factores como su edad, peso (${assessment.weight}), altura (${assessment.height}), género, historial familiar (${assessment.familyHistory}), estilo de vida (${assessment.lifestyle}) y condiciones médicas preexistentes (${assessment.healthConditions}).
    Se enfoca en riesgos específicos para enfermedades cardiovasculares, diabetes, hipertensión y enfermedades respiratorias.
    Proporciona para cada riesgo un porcentaje y lo categoriza como "bajo", "medio" o "alto".
    Calcula el IMC y determina si el usuario está en su peso ideal.
    Ofrece interpretaciones claras de los resultados y, si el riesgo es medio o alto, proporciona recomendaciones personalizadas para mitigarlos.`;

export const PLAN_PROMPT = (plan: Plan) => `\
    Crea un plan nutricional personalizado basado en la dieta del usuario (${plan.dietType}), restricciones (${plan.restrictions}) y objetivo calórico (${plan.calorieGoal} kcal).
    Considera el tipo de dieta que sigue el usuario y su nivel de actividad (${plan.activityLevel}), peso (${plan.weight} kg), altura (${plan.height} cm), edad y objetivo de peso (${plan.weightGoal}).
    Si faltan datos, realiza suposiciones razonables basadas en información general.
    Proporciona el tipo de cada comida (desayuno, almuerzo, cena, etc.), junto con los alimentos, cantidades, calorías y horarios sugeridos.
    Da recomendaciones para seguir el plan y alcanzar su objetivo de manera saludable.`;

export const MOOD_TRACKING_PROMPT = (tracking: MoodTracking) => `\
    Proporciona actividades para mejorar el bienestar según el estado de ánimo del usuario (${tracking.mood}).
    Si es necesario, pregunta el género del usuario para personalizar la respuesta.
    Genera una lista de actividades recomendadas adaptadas al estado de ánimo.
    Incluye una recomendación para mejorar su estado de ánimo y un consejo de vida significativo y motivador, basado en su situación actual.
    Presenta esta información de manera clara y accesible.`;
