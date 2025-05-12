"use client";

import {
  HealthRiskStock,
  MoodTrackStock,
  NutritionPlanStock,
  RoutineStock,
  TaskStock,
} from "../../../_components/tools";

export function ToolPreview({
  toolName,
  result,
}: {
  toolName: string;
  result: any;
}) {
  switch (toolName) {
    case "createRoutine":
      return <RoutineStock {...result.routine} />;
    case "createHealthRisk":
      return <HealthRiskStock {...result.healthRisk} />;
    case "createNutritionalPlan":
      return <NutritionPlanStock {...result.nutritionalPlan} />;
    case "createMoodTrack":
      return <MoodTrackStock {...result.moodTrack} />;
    case "createTrackTask":
      return <TaskStock task={result.task} isLoading={false} />;
    default:
      return null;
  }
}
