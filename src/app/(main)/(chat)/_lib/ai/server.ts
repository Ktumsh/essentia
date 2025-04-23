"use server";

import { generateObject } from "ai";

import { modelProvider } from "./models";
import {
  HEALTH_RISK_PROMPT,
  HEALTH_RISK_SYSTEM_PROMPT,
  MOOD_TRACK_PROMPT,
  MOOD_TRACK_SYSTEM_PROMPT,
  NUTRITIONAL_PLAN_PROMPT,
  NUTRITIONAL_PLAN_SYSTEM_PROMPT,
  ROUTINE_PROMPT,
  ROUTINE_SYSTEM_PROMPT,
  TRACK_TASK_PROMPT,
  TRACK_TASK_SYSTEM_PROMPT,
} from "./prompts";
import {
  healthRiskSchema,
  moodTrackSchema,
  nutritionalPlanSchema,
  routineSchema,
  taskSchema,
} from "./tool-schemas";

export type Routine = {
  objective: string;
  physicalLevel: string;
  time: string;
  preferences: string;
  healthConditions: string;
  equipment: string;
};

export type HealthRisk = {
  weight: number;
  height: number;
  familyHistory: string;
  lifestyle: string;
  healthConditions: string;
  currentDate: Date;
};

export type NutritionalPlan = {
  dietType: string;
  restrictions: string;
  calorieGoal: number;
  activityLevel: string;
  weight: number;
  height: number;
  weightGoal: string;
};

export type MoodTrack = {
  mood: string;
};

export type Task = {
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

export async function generateRoutine(props: Routine) {
  const { object: routine } = await generateObject({
    model: modelProvider.languageModel("chat-model-small"),
    system: ROUTINE_SYSTEM_PROMPT,
    prompt: ROUTINE_PROMPT(props),
    schema: routineSchema,
  });

  return routine;
}

export async function generateHealthRisk(props: HealthRisk) {
  const { object: healthRisk } = await generateObject({
    model: modelProvider.languageModel("chat-model-small"),
    system: HEALTH_RISK_SYSTEM_PROMPT,
    prompt: HEALTH_RISK_PROMPT(props),
    schema: healthRiskSchema,
  });

  return healthRisk;
}

export async function generateNutritionalPlan(props: NutritionalPlan) {
  const { object: nutritionalPlan } = await generateObject({
    model: modelProvider.languageModel("chat-model-small"),
    system: NUTRITIONAL_PLAN_SYSTEM_PROMPT,
    prompt: NUTRITIONAL_PLAN_PROMPT(props),
    schema: nutritionalPlanSchema,
  });

  return nutritionalPlan;
}

export async function generateMoodTrack(props: MoodTrack) {
  const { object: moodTrack } = await generateObject({
    model: modelProvider.languageModel("chat-model-small"),
    system: MOOD_TRACK_SYSTEM_PROMPT,
    prompt: MOOD_TRACK_PROMPT(props),
    schema: moodTrackSchema,
  });

  return moodTrack;
}

export async function generateTrackTask(props: Task) {
  const { object: task } = await generateObject({
    model: modelProvider.languageModel("chat-model-small"),
    system: TRACK_TASK_SYSTEM_PROMPT,
    prompt: TRACK_TASK_PROMPT(props),
    schema: taskSchema,
  });

  return task;
}
