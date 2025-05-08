import dynamic from "next/dynamic";

import ToolSkeleton from "./tool-skeleton";

export const RoutineStock = dynamic(
  () => import("./routine-stock").then((mod) => mod.default),
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
  () => import("./nutritional-plan-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <ToolSkeleton />,
  },
);

export const MoodTrackStock = dynamic(
  () => import("./mood-track-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <ToolSkeleton />,
  },
);

export const TaskStock = dynamic(
  () => import("./task-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <ToolSkeleton />,
  },
);
