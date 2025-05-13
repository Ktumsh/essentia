import {
  BrainIcon,
  DumbbellIcon,
  HeartPulseIcon,
  SaladIcon,
} from "lucide-react";
import { FC } from "react";

import type { IconSvgProps } from "@/lib/types";

export const TOOL_NAME_LABELS: Record<string, string> = {
  createHealthRisk: "Evaluaciones de salud",
  createRoutine: "Rutinas de ejercicio",
  createNutritionalPlan: "Planes nutricionales",
  createMoodTrack: "Seguimientos del ánimo",
};

export const TOOL_SLUGS: Record<string, string> = {
  createHealthRisk: "evaluaciones-de-salud",
  createRoutine: "rutinas-de-ejercicio",
  createNutritionalPlan: "planes-nutricionales",
  createMoodTrack: "seguimientos-del-animo",
};

export const SLUG_TO_TOOL = Object.fromEntries(
  Object.entries(TOOL_SLUGS).map(([k, v]) => [v, k]),
);

export const TOOL_CREATING_MESSAGE_ALTERNATIVES: Record<string, string[]> = {
  createHealthRisk: [
    "Analizando tu historial para cuidar tu salud",
    "Evaluando factores que podrían afectarte",
    "Revisando posibles riesgos para prevenir a tiempo",
    "Cuidarte también es conocerte mejor",
    "Poniendo un poco de esencia para entender tu bienestar",
  ],
  createRoutine: [
    "Diseñando una rutina pensada para ti",
    "Equilibrando movimiento y descanso",
    "Buscando ejercicios que se adapten a tu cuerpo",
    "Tu energía merece una guía personalizada",
    "Poniendo un poco de esencia para ayudarte a avanzar",
  ],
  createNutritionalPlan: [
    "Eligiendo alimentos que nutran tu día",
    "Armando un plan rico y balanceado",
    "Conectando tus metas con lo que comes",
    "Cuidar tu cuerpo también es un acto de cariño",
    "Poniendo un poco de esencia en tu plato",
  ],
  createMoodTrack: [
    "Escuchando cómo te sientes hoy",
    "Trazando tu mapa emocional",
    "Ayudándote a comprender tus altibajos",
    "Porque tu bienestar emocional también importa",
    "Poniendo un poco de esencia para acompañarte",
  ],
  createTrackTask: [
    "Creando tu nueva tarea de bienestar",
    "Registrando lo que necesitas recordar",
    "Organizando lo que importa para tu salud",
    "Preparando tu recordatorio personalizado",
    "Poniendo un poco de esencia para ayudarte a seguir tu camino",
  ],
  getWeather: [
    "Revisando el clima para planificar tu día",
    "Consultando el tiempo para sugerirte actividades al aire libre",
    "Averiguando si hoy es buen día para una caminata",
    "Viendo cómo está el clima en tu zona para cuidarte mejor",
    "Poniendo un poco de esencia para hacer tu día más claro",
  ],
};

export const TOOL_VISUALS: Record<
  string,
  {
    bg: string;
    border: string;
    borderMuted: string;
    gradient: string;
    text: string;
    icon: FC<IconSvgProps>;
  }
> = {
  createRoutine: {
    bg: "bg-lime-500",
    border: "border-lime-500",
    borderMuted: "border-lime-300 dark:border-lime-700",
    gradient: "from-lime-600 to-lime-500",
    text: "text-lime-500",
    icon: DumbbellIcon,
  },
  createHealthRisk: {
    bg: "bg-blue-500",
    border: "border-blue-500",
    borderMuted: "border-blue-300 dark:border-blue-700",
    gradient: "from-blue-600 to-blue-500",
    text: "text-blue-500",
    icon: HeartPulseIcon,
  },
  createMoodTrack: {
    bg: "bg-fuchsia-500",
    border: "border-fuchsia-500",
    borderMuted: "border-fuchsia-300 dark:border-fuchsia-700",
    gradient: "from-fuchsia-500 to-fuchsia-500",
    text: "text-fuchsia-500",
    icon: BrainIcon,
  },
  createNutritionalPlan: {
    bg: "bg-red-500",
    border: "border-red-500",
    borderMuted: "border-red-300 dark:border-red-700",
    gradient: "from-red-500 to-red-500",
    text: "text-red-500",
    icon: SaladIcon,
  },
};

export const TOOL_IMAGE: Record<string, string> = {
  createRoutine: "/extras/exercise-routine.png",
  createHealthRisk: "/extras/health-risk.png",
  createMoodTrack: "/extras/mood-tracking.png",
  createNutritionalPlan: "/extras/nutritional-plan.jpg",
};
