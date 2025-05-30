export const FAQ_PRICING_DATA = [
  {
    id: 1,
    question: "¿Qué incluye el plan gratuito de Essentia?",
    answer:
      "El plan gratuito te da acceso a recursos educativos, un mapa de centros de salud, rutas de aprendizaje y hasta 12 documentos médicos, junto con recomendaciones generales de salud.",
  },
  {
    id: 2,
    question: "¿Qué ventajas tiene el plan Premium?",
    answer:
      "Incluye todo lo del plan gratuito, más acceso a Chat con Aeris con hasta 15 mensajes diarios, recomendaciones con IA basadas en tus documentos (hasta 15 activas), planes personalizados, evaluación de riesgo de salud y actividades de bienestar.",
  },
  {
    id: 3,
    question:
      "¿Cuáles son las diferencias entre el plan Premium y Premium Plus?",
    answer:
      "Premium Plus incluye todo lo del plan Premium, pero sin límites: recomendaciones con IA ilimitadas, mensajes ilimitados en el chat, documentos médicos ilimitados y seguimiento de progreso agrupado por herramientas de IA.",
  },
  {
    id: 4,
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer:
      "Sí, puedes cambiar de plan cuando lo desees desde tu perfil. El cambio se aplica de forma inmediata o al finalizar tu ciclo actual, según corresponda.",
  },
  {
    id: 5,
    question: "¿El pago del plan Premium es mensual?",
    answer: "Sí, el plan Premium se paga mes a mes por $12.000 CLP.",
  },
  {
    id: 6,
    question: "¿Qué incluye el plan Premium Plus?",
    answer:
      "Incluye todas las funciones del plan Premium, pero sin límites: IA con mensajes y recomendaciones ilimitadas, documentos médicos sin tope y seguimiento agrupado por herramienta de IA.",
  },
  {
    id: 7,
    question: "¿Cómo cancelo mi suscripción?",
    answer:
      "Puedes cancelar tu suscripción desde la configuración de tu cuenta. Seguirás teniendo acceso al plan hasta que finalice tu ciclo de facturación.",
  },
  {
    id: 8,
    question: "¿Ofrecen reembolsos si cancelo mi plan antes de tiempo?",
    answer:
      "No ofrecemos reembolsos por cancelaciones anticipadas. El acceso se mantiene hasta que termine el ciclo actual.",
  },
  {
    id: 9,
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito y débito. Pronto habilitaremos más medios de pago electrónicos.",
  },
  {
    id: 10,
    question: "¿Qué ocurre si no pago mi suscripción a tiempo?",
    answer:
      "Se suspenderá tu acceso a las funciones Premium. Podrás seguir utilizando el plan gratuito sin perder tus datos.",
  },
  {
    id: 11,
    question: "¿Chat con Aeris está disponible en todos los planes?",
    answer:
      "No. Chat con Aeris solo está disponible en los planes Premium y Premium Plus.",
  },
  {
    id: 12,
    question: "¿Puedo compartir mi suscripción Premium con otras personas?",
    answer:
      "No, la suscripción es personal y está vinculada a tu cuenta. Cada usuario debe tener su propia suscripción.",
  },
  {
    id: 13,
    question: "¿Los precios de suscripción incluyen impuestos?",
    answer: "Sí, los precios mostrados ya incluyen impuestos.",
  },
  {
    id: 14,
    question: "¿Qué sucede si quiero cambiar de Premium Plus a Premium?",
    answer:
      "Puedes cambiar en cualquier momento desde tu perfil. El nuevo plan se aplicará al finalizar tu ciclo de facturación actual.",
  },
  {
    id: 15,
    question: "¿Puedo probar el plan Premium antes de comprarlo?",
    answer:
      "Sí, puedes acceder a una prueba gratuita de 7 días del plan Premium. Durante ese periodo podrás explorar funcionalidades como Chat con Aeris, recomendaciones personalizadas y planes adaptados a tu perfil.",
  },
  {
    id: 16,
    question: "¿Los precios de suscripción pueden cambiar?",
    answer:
      "Sí, los precios pueden cambiar. Si ya tienes una suscripción activa, te avisaremos con anticipación.",
  },
  {
    id: 17,
    question: "¿Qué herramientas ofrece Chat con Aeris?",
    answer:
      "Chat con Aeris es un asistente conversacional que responde tus dudas sobre salud, bienestar, nutrición y ejercicio. A través del chat puedes generar rutinas personalizadas, planes nutricionales, actividades para mejorar el ánimo, recibir una evaluación de riesgo de salud, obtener recomendaciones según el clima de tu zona y recibir recordatorios relacionados con tu bienestar.",
  },
];

export type FAQPricingType = (typeof FAQ_PRICING_DATA)[number];
