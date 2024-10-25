import { generateObject } from "ai";

import {
  MOOD_TRACKING_PROMPT,
  PLAN_PROMPT,
  RISK_ASSESSMENT_PROMPT,
  ROUTINE_PROMPT,
} from "@/config/tools-prompt";

import {
  moodTrackingSchema,
  nutritionalPlanSchema,
  riskAssessmentSchema,
  routineSchema,
} from "../components/tools/tool-schemas";

import { gptFlashModel } from ".";

type Routine = {
  objective: string;
  physicalLevel: string;
  time: string;
  preferences: string;
  healthConditions: string;
  equipment: string;
};

type RiskAssessment = {
  weight: number;
  height: number;
  familyHistory: string;
  lifestyle: string;
  healthConditions: string;
};

type Plan = {
  dietType: string;
  restrictions: string;
  calorieGoal: number;
  activityLevel: string;
  weight: number;
  height: number;
  weightGoal: string;
};

type MoodTracking = {
  mood: string;
};

export async function generateExerciseRoutine(props: Routine) {
  const { object: routine } = await generateObject({
    model: gptFlashModel,
    prompt: ROUTINE_PROMPT(props),
    schema: routineSchema,
  });

  return routine;
}

export async function generateRiskAssessment(props: RiskAssessment) {
  const { object: riskAssessment } = await generateObject({
    model: gptFlashModel,
    prompt: RISK_ASSESSMENT_PROMPT(props),
    schema: riskAssessmentSchema,
  });

  return riskAssessment;
}

export async function generateNutritionalPlan(props: Plan) {
  const { object: plan } = await generateObject({
    model: gptFlashModel,
    prompt: PLAN_PROMPT(props),
    schema: nutritionalPlanSchema,
  });

  return plan;
}

export async function generateMoodTracking({ mood }: MoodTracking) {
  const { object: moodTracking } = await generateObject({
    model: gptFlashModel,
    prompt: MOOD_TRACKING_PROMPT({
      mood,
    }),
    schema: moodTrackingSchema,
  });

  return moodTracking;
}
