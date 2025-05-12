import {
  BrainIcon,
  DumbbellIcon,
  HeartPulseIcon,
  SaladIcon,
} from "lucide-react";

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

export const TOOL_VISUALS: Record<
  string,
  {
    bg: string;
    border: string;
    borderMuted: string;
    gradient: string;
    text: string;
    icon: React.ReactNode;
  }
> = {
  createRoutine: {
    bg: "bg-lime-500",
    border: "border-lime-500",
    borderMuted: "border-lime-300 dark:border-lime-700",
    gradient: "from-lime-600 to-lime-500",
    text: "text-lime-500",
    icon: <DumbbellIcon className="size-4 text-white" />,
  },
  createHealthRisk: {
    bg: "bg-blue-500",
    border: "border-blue-500",
    borderMuted: "border-blue-300 dark:border-blue-700",
    gradient: "from-blue-600 to-blue-500",
    text: "text-blue-500",
    icon: <HeartPulseIcon className="size-4 text-white" />,
  },
  createMoodTrack: {
    bg: "bg-fuchsia-500",
    border: "border-fuchsia-500",
    borderMuted: "border-fuchsia-300 dark:border-fuchsia-700",
    gradient: "from-fuchsia-500 to-fuchsia-500",
    text: "text-fuchsia-500",
    icon: <BrainIcon className="size-4 text-white" />,
  },
  createNutritionalPlan: {
    bg: "bg-red-500",
    border: "border-red-500",
    borderMuted: "border-red-300 dark:border-red-700",
    gradient: "from-red-500 to-red-500",
    text: "text-red-500",
    icon: <SaladIcon className="size-4 text-white" />,
  },
};

export const TOOL_IMAGE: Record<string, string> = {
  createRoutine: "/extras/exercise-routine.png",
  createHealthRisk: "/extras/health-risk.png",
  createMoodTrack: "/extras/mood-tracking.png",
  createNutritionalPlan: "/extras/nutritional-plan.jpg",
};
