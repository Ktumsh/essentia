import {
  AlarmClockCheck,
  BrainIcon,
  DumbbellIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  LightbulbIcon,
  SaladIcon,
} from "lucide-react";

export const INITIAL_CHAT_MESSAGES = [
  {
    heading: "Mejorar mi bienestar emocional",
    action: `Recomiéndame actividades para mi bienestar emocional`,
    icon: BrainIcon,
    iconColor: "text-fuchsia-500",
  },
  {
    heading: "Crear una rutina de ejercicios",
    action: "Crea una rutina diaria de ejercicios de acuerdo a mis necesidades",
    icon: DumbbellIcon,
    iconColor: "text-lime-500",
  },
  {
    heading: "Aprender sobre salud sexual",
    action: `¿Qué recursos confiables existen para aprender sobre salud y educación sexual?`,
    icon: GraduationCapIcon,
    iconColor: "text-sky-300",
  },
  {
    heading: "Dormir mejor",
    action: `¿Qué técnicas efectivas puedo usar para mejorar mi calidad de sueño?`,
    icon: LightbulbIcon,
    iconColor: "text-yellow-500",
  },
  {
    heading: "Diseñar un plan nutricional",
    action: `Crea un plan nutricional de acuerdo a mis necesidades`,
    icon: SaladIcon,
    iconColor: "text-red-500",
  },
  {
    heading: "Evaluar mi salud",
    action: `Evalua mis riesgos de salud y recomiéndame acciones para prevenirlos`,
    icon: HeartPulseIcon,
    iconColor: "text-blue-500",
  },
  {
    heading: "Organizar tareas y recordatorios",
    action: `Ayúdame a configurar recordatorios periódicos para tareas importantes o hábitos diarios`,
    icon: AlarmClockCheck,
    iconColor: "text-purple-500",
  },
];
