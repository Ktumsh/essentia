import { FC, type JSX } from "react";

import { Exam, Lesson, Module } from "@/db/schema";

import { IconSvgProps } from "./common";

export interface MaincapResources {
  id: number;
  title: string;
  description: string;
  link: string;
  image?: string;
  icon: (props: IconSvgProps) => JSX.Element;
  requiresPremium?: boolean;
}

export interface Modules {
  module: Module;
  lessons: Lesson[];
  exam: Exam | null;
}

export type Course = {
  userId: string;
  resource: {
    resourceId: string;
    resourceName: string;
  };
  modules: Modules[];
  about: string;
  slug: string;
  completedLessons: string[];
  moduleProgress: { [moduleId: string]: number };
  courseProgress: { completed: boolean; progress: number };
  courseInitialized: boolean;
  isPremium?: boolean | null;
};

export type Courses = {
  courseId: string;
  courseName: string;
  courseSlug: string;
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
  resource: string;
  component: FC<{ isPremium?: boolean | null } & Course>;
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

type Step = {
  step: number;
  title: string;
  description: string;
  color: string;
};

export type EmergencySteps = {
  title: string;
  steps: Step[];
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
