export const ROUTINE_PROMPT = `\
    Recomienda una rutina de ejercicios personalizada basada en el nivel de condición física, objetivos, tiempo disponible, preferencias, edad, género y condiciones de salud del usuario.
    Considera el acceso a equipamiento (gimnasio, pesas, bandas elásticas, etc) o si no dispone de él.
    Genera una rutina de 1 a 3 meses, aumentando progresivamente repeticiones y duración.
    Indica semanas de duración, ejercicios recomendados, repeticiones, series y tiempos de descanso.
    Incluye, si es posible, una evaluación física inicial y recomendaciones basadas en el progreso esperado.`;

export const RISK_ASSESSMENT_PROMPT = `\
    Evalúa el riesgo de salud del usuario basándose en factores como edad, peso, altura, género, historial familiar de enfermedades, estilo de vida (dieta, actividad física, consumo de tabaco, drogas o alcohol) y condiciones médicas preexistentes.
    Se enfoca en riesgos específicos para enfermedades cardiovasculares, diabetes, hipertensión y enfermedades respiratorias.
    Proporciona para cada riesgo un porcentaje y lo categoriza como "bajo", "medio" o "alto".
    Calcula el IMC y determina si el usuario está en su peso ideal.
    Ofrece interpretaciones claras de los resultados y, si el riesgo es medio o alto, proporciona recomendaciones personalizadas para mitigarlos.`;

export const PLAN_PROMPT = `\
    Crea un plan nutricional personalizado basado en el tipo de dieta, restricciones y objetivo calórico del usuario.
    Considera el tipo de dieta que sigue el usuario (vegetariana, vegana, keto, balanceada, u otra), restricciones como alergias o intolerancias, y su objetivo calórico.
    Si el usuario no ha proporcionado su objetivo calórico, determina su necesidad calórica basada en su actividad física, peso, altura, edad y objetivo de peso.
    Si faltan datos, realiza suposiciones razonables basadas en información general.
    Proporciona el tipo de cada comida (desayuno, almuerzo, once, cena y otros), junto con los alimentos, cantidades, calorías y horarios sugeridos.
    Finalmente, da recomendaciones para seguir el plan y alcanzar su objetivo de manera saludable.`;

export const MOOD_TRACKING_PROMPT = `\
    Proporciona actividades de bienestar según el estado de ánimo del usuario.
    Si no conoces su estado de ánimo, pregúntalo de manera amable y empática.
    Si es necesario, pregunta el género del usuario para personalizar la respuesta.
    Genera una lista de actividades recomendadas adaptadas al estado de ánimo.
    Incluye una recomendación para mejorar su estado de ánimo y un consejo de vida significativo y motivador, basado en su situación actual.
    Presenta esta información de manera clara y accesible.`;
