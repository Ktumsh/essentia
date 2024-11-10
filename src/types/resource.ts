import { FC } from "react";

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
  component: FC;
}

export interface Video {
  id: number;
  title: string;
  link: string;
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
