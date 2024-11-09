import dynamic from "next/dynamic";

import ToolSkeleton from "./tool-skeleton";

export const ExerciseRoutineStock = dynamic(
  () => import("./excercise-routine-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <ToolSkeleton />,
  },
);

export const HealthRiskStock = dynamic(
  () => import("./health-risk-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <ToolSkeleton />,
  },
);

export const NutritionPlanStock = dynamic(
  () => import("./nutrition-plan-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <ToolSkeleton />,
  },
);

export const MoodTrackingStock = dynamic(
  () => import("./mood-tracking-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <ToolSkeleton />,
  },
);
