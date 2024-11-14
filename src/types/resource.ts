import { FC } from "react";
import { UserProfileData } from "./session";

export interface MaincapResources {
  id: number;
  title: string;
  description: string;
  url: string;
  img: string;
}

export interface Resources {
  id: number;
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
  component: FC<{ profileData?: UserProfileData | null }>;
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
  id: string;
  title: string;
  image: string;
  category: string;
  body: string;
}
