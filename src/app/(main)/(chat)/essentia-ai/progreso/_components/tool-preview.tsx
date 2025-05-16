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
      return (
        <RoutineStock routine={result.routine} className="mb-0! shadow-none!" />
      );
    case "createHealthRisk":
      return <HealthRiskStock {...result.healthRisk} />;
    case "createNutritionalPlan":
      return (
        <NutritionPlanStock
          nutritionalPlan={result.nutritionalPlan}
          className="mb-0! shadow-none!"
        />
      );
    case "createMoodTrack":
      return <MoodTrackStock moodTrack={result.moodTrack} />;
    case "createTrackTask":
      return <TaskStock task={result.task} isLoading={false} />;
    default:
      return null;
  }
}
