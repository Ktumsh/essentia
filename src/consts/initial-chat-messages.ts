import {
  AcademicIcon,
  BrainIcon,
  FruitIcon,
  HeartbeatIcon,
  ItineraryIcon,
  LightbulbIcon,
} from "@/modules/icons/miscellaneus";

export const INITIAL_CHAT_MESSAGES = [
  {
    heading: "Consejos para",
    subheading: "mejorar el bienestar emocional",
    action: `Recomiéndame actividades para mi bienestar emocional`,
    icon: BrainIcon,
    iconColor: "text-fuchsia-500",
  },
  {
    heading: "Rutinas diarias para",
    subheading: "fortalecer el bienestar físico",
    action: "Crea una rutina diaria de ejercicios de acuerdo a mis necesidades",
    icon: ItineraryIcon,
    iconColor: "text-lime-500",
  },
  {
    heading: "Aprende sobre",
    subheading: "educación sexual segura",
    action: `¿Qué recursos confiables existen para aprender sobre salud y educación sexual?`,
    icon: AcademicIcon,
    iconColor: "text-sky-300",
  },
  {
    heading: "Mejora tu",
    subheading: `calidad de sueño`,
    action: `¿Qué técnicas efectivas puedo usar para mejorar mi calidad de sueño?`,
    icon: LightbulbIcon,
    iconColor: "text-yellow-500",
  },
  {
    heading: "Crea un plan",
    subheading: "nutricional personalizado",
    action: `Crea un plan nutricional de acuerdo a mis necesidades`,
    icon: FruitIcon,
    iconColor: "text-red-500",
  },
  {
    heading: "Evalua tus",
    subheading: "riesgos de salud",
    action: `Evalua mis riesgos de salud y recomiéndame acciones para prevenirlos`,
    icon: HeartbeatIcon,
    iconColor: "text-blue-500",
  },
];
