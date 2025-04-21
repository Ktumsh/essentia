import { FC, type JSX } from "react";

import { IconSvgProps } from "./common";

import type { Lesson, Review, Stage } from "@/db/schema";

export interface MaincapResources {
  id: number;
  title: string;
  description: string;
  link: string;
  image?: string;
  icon: (props: IconSvgProps) => JSX.Element;
  requiresPremium?: boolean;
}

export interface Stages {
  stage: Stage;
  lessons: Lesson[];
  review: Review | null;
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
  stageProgress: { [stageId: string]: number };
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

export interface Resources {
  title: string;
  subtitle: string;
  intro: string;
  quote: string;
  videoTitle: string;
  videoLink: string;
  videoImage: string;
  description: string;
  image: string;
  imageFull: string;
  route: string;
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
