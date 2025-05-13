import { FC, type JSX } from "react";

import { StageProgressType } from "@/db/querys/progress-querys";

import { IconSvgProps } from "./common";

import type { Lesson, Review, Route, Stage } from "@/db/schema";

export interface MaincapResources {
  id: number;
  title: string;
  description: string;
  link: string;
  image?: string;
  icon: (props: IconSvgProps) => JSX.Element;
  requiresPremium?: boolean;
}

export interface ReviewWithCount extends Review {
  questionCount?: number;
}

export interface Stages {
  stage: Stage;
  lessons: Lesson[];
  review: ReviewWithCount | null;
}

export type LearningRoute = {
  userId: string;
  route: {
    routeId: string;
    routeName: string;
  };
  stages: Stages[];
  about: string;
  slug: string;
  completedLessons: string[];
  stageProgress: StageProgressType[];
  routeProgress: { completed: boolean; progress: number };
  routeInitialized: boolean;
  isPremium?: boolean | null;
};

export type LearningRoutes = {
  routeId: string;
  routeName: string;
  routeSlug: string;
  progress: number;
  completed: boolean;
  startedAt: Date | null;
  completedAt: Date | null;
}[];

export interface RouteResource extends Route {
  label: string;
  quote: string;
  videoTitle: string;
  videoLink: string;
  component: FC;
  audience: string[];
  benefits: string[];
  learningOutcomes: string[];
}

export interface Video {
  id: number;
  title: string;
  link: string;
  channel?: string;
  description?: string;
}

export interface ResourcesVideos {
  section: string;
  videos: Video[];
}

export type MedicineItem = {
  name: string;
  description: string;
};

export type MedicineCategory = {
  category: string;
  verticalDividerClasses: string;
  innerDividersClasses: string[];
  items: MedicineItem[];
};

type Description = {
  type: "bold" | "text";
  content: string;
};

type SexualityStep = {
  step: number;
  title: string;
  description: Description[];
};

export type SexualEmergency = {
  title: string;
  steps: SexualityStep[];
};

export interface ResourceCard {
  id: number;
  slug: string;
  title: string;
  image: string;
  category?: string;
  body: string;
}
