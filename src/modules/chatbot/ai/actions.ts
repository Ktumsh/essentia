"use server";

import { generateObject } from "ai";

import {
  MOOD_TRACKING_PROMPT,
  PLAN_PROMPT,
  RISK_ASSESSMENT_PROMPT,
  ROUTINE_PROMPT,
  TRACK_TASK_PROMPT,
  TRACK_TASK_SYSTEM_PROMPT,
} from "@/config/tools-prompt";

import { modelProvider } from "./models";
import {
  moodTrackingSchema,
  nutritionalPlanSchema,
  riskAssessmentSchema,
  routineSchema,
  taskSchema,
} from "../components/tools/tool-schemas";

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

type Task = {
  name: string;
  schedule: {
    frequency: string;
    time: string;
    exactDate?: Date | null;
    weekDay?: string | null;
    monthDay?: number | null;
    month?: string | null;
  };
};

export async function generateExerciseRoutine(props: Routine) {
  const { object: routine } = await generateObject({
    model: modelProvider.languageModel("chat-model-small"),
    prompt: ROUTINE_PROMPT(props),
    schema: routineSchema,
  });

  return routine;
}

export async function generateRiskAssessment(props: RiskAssessment) {
  const { object: riskAssessment } = await generateObject({
    model: modelProvider.languageModel("chat-model-small"),
    prompt: RISK_ASSESSMENT_PROMPT(props),
    schema: riskAssessmentSchema,
  });

  return riskAssessment;
}

export async function generateNutritionalPlan(props: Plan) {
  const { object: plan } = await generateObject({
    model: modelProvider.languageModel("chat-model-small"),
    prompt: PLAN_PROMPT(props),
    schema: nutritionalPlanSchema,
  });

  return plan;
}

export async function generateMoodTracking(props: MoodTracking) {
  const { object: moodTracking } = await generateObject({
    model: modelProvider.languageModel("chat-model-small"),
    prompt: MOOD_TRACKING_PROMPT(props),
    schema: moodTrackingSchema,
  });

  return moodTracking;
}

export async function generateTaskTracking(props: Task) {
  const { object: task } = await generateObject({
    model: modelProvider.languageModel("chat-model-small"),
    system: TRACK_TASK_SYSTEM_PROMPT,
    prompt: TRACK_TASK_PROMPT(props),
    schema: taskSchema,
  });

  return task;
}
