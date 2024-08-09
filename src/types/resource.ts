import { FC } from "react";

export interface MaincapResources {
  id: number;
  title: string;
  description: string;
  textBtn: string;
  url: string;
  img: string;
}

export interface Resources {
  id: number;
  title: string;
  intro: string;
  quote: string;
  videoTitle: string;
  videoLink: string;
  videoImage: string;
  description?: string;
  image: string;
  imageFull: string;
  background: string;
  resource: string;
  component: FC;
  span?: string;
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
