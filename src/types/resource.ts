import { FC, type JSX } from "react";

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
  component: FC<{
    isPremium?: boolean | null;
    resource: {
      resourceId: string;
      resourceName: string;
    };
    modules: Modules[];
    about: string;
    slug: string;
    completedLessons: string[];
    progress: { [moduleId: string]: number };
    totalProgress: number;
  }>;
}

export interface Modules {
  module: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    objectives: string | null;
    order: number;
  };
  lessons: Array<{
    id: string;
    title: string;
    slug: string;
    objective: string | null;
    content: string | null;
    order: number;
  }>;
  exam: {
    id: string;
    title: string;
    slug: string;
    instructions: string;
  } | null;
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
