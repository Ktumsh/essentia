import dynamic from "next/dynamic";

import {
  HealthRiskStockLoading,
  MoodTrackStockLoading,
  NutritionalPlanStockLoading,
  RoutineStockLoading,
  TaskStockLoading,
} from "./tool-loading";

export const RoutineStock = dynamic(
  () => import("./routine-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <RoutineStockLoading />,
  },
);

export const HealthRiskStock = dynamic(
  () => import("./health-risk-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <HealthRiskStockLoading />,
  },
);

export const NutritionPlanStock = dynamic(
  () => import("./nutritional-plan-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <NutritionalPlanStockLoading />,
  },
);

export const MoodTrackStock = dynamic(
  () => import("./mood-track-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <MoodTrackStockLoading />,
  },
);

export const TaskStock = dynamic(
  () => import("./task-stock").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <TaskStockLoading />,
  },
);
