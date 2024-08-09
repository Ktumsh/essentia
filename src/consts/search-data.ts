import { HEALTH_MODAL_DATA } from "@/consts/health-modal";

import { nanoid } from "nanoid";
import RESOURCES_VIDEOS from "./resources-videos";
import { FITNESS_MODAL_DATA } from "./fitness-modal";
import { IconSvgProps } from "@/types/common";

import { NUTRITION_MODAL_DATA } from "./nutrition-modal";

import { Video } from "@/types/resource";

import {
  HealthIcon,
  ExcerciseIcon,
  NutritionIcon,
  WellbeingIcon,
  SexualityIcon,
  ForAllAgesIcon,
} from "@/modules/icons/interface";

import { formatTitle } from "@/utils/format";

export interface SearchResult {
  content: string;
  objectID: string;
  type: string;
  url: string;
  hierarchy?: {
    lvl1: string | null;
    lvl2?: string | null;
    lvl3?: string | null;
  };
  icon?: (props: IconSvgProps) => JSX.Element;
}

const healthVideos: Video[] =
  RESOURCES_VIDEOS.find((section) => section.section === "HealthWellness")
    ?.videos || [];

// Datos estáticos
const healthSearchData: SearchResult[] = [
  {
    content: "Introducción a Salud y Bienestar",
    objectID: nanoid(),
    type: "lvl1",
    url: "/salud-y-bienestar#introduccion-a-salud-y-bienestar",
    hierarchy: {
      lvl1: "Salud y Bienestar",
      lvl2: null,
      lvl3: null,
    },
    icon: HealthIcon,
  },
  {
    content: "Artículos Interesantes",
    objectID: nanoid(),
    type: "lvl2",
    url: "/salud-y-bienestar#articulos-interesantes",
    hierarchy: {
      lvl1: "Salud y Bienestar",
      lvl2: "Artículos Interesantes",
      lvl3: null,
    },
  },
  {
    content: "Videos Recomendados",
    objectID: nanoid(),
    type: "lvl2",
    url: "/salud-y-bienestar#videos-recomendados",
    hierarchy: {
      lvl1: "Salud y Bienestar",
      lvl2: "Videos Recomendados",
      lvl3: null,
    },
  },
  {
    content: "Podcasts Recomendados",
    objectID: nanoid(),
    type: "lvl2",
    url: "/salud-y-bienestar#podcasts-recomendados",
    hierarchy: {
      lvl1: "Salud y Bienestar",
      lvl2: "Podcasts Recomendados",
      lvl3: null,
    },
  },
];

const fitnessSearchData: SearchResult[] = [
  {
    content: "Introducción a Ejercicios y Fitness",
    objectID: nanoid(),
    type: "lvl1",
    url: "/ejercicios-y-fitness#introduccion-a-ejercicios-y-fitness",
    hierarchy: {
      lvl1: "Ejercicios y Fitness",
      lvl2: null,
      lvl3: null,
    },
    icon: ExcerciseIcon,
  },
  {
    content: "Rutinas de Ejercicios",
    objectID: nanoid(),
    type: "lvl2",
    url: "/ejercicios-y-fitness#rutinas-de-ejercicios",
    hierarchy: {
      lvl1: "Ejercicios y Fitness",
      lvl2: "Rutinas de Ejercicios",
      lvl3: null,
    },
  },
  {
    content: "Música para tu Entrenamiento",
    objectID: nanoid(),
    type: "lvl2",
    url: "/ejercicios-y-fitness#musica-para-tu-entrenamiento",
    hierarchy: {
      lvl1: "Ejercicios y Fitness",
      lvl2: "Música para tu Entrenamiento",
      lvl3: null,
    },
  },
];

const nutritionSearchData: SearchResult[] = [
  {
    content: "Introducción a Nutrición y Alimentación",
    objectID: nanoid(),
    type: "lvl1",
    url: "/nutricion-y-alimentacion#introduccion-a-nutricion-y-alimentacion",
    hierarchy: {
      lvl1: "Nutrición y Alimentación",
      lvl2: null,
      lvl3: null,
    },
    icon: NutritionIcon,
  },
  {
    content: "Recetas Saludables",
    objectID: nanoid(),
    type: "lvl2",
    url: "/nutricion-y-alimentacion#recetas-saludables",
    hierarchy: {
      lvl1: "Nutrición y Alimentación",
      lvl2: "Recetas Saludables",
      lvl3: null,
    },
  },
  {
    content: "Desayunos Saludables",
    objectID: nanoid(),
    type: "lvl3",
    url: "/nutricion-y-alimentacion#desayunos-saludables",
    hierarchy: {
      lvl1: "Nutrición y alimentación",
      lvl2: "Recetas Saludables",
      lvl3: "Desayunos Saludables",
    },
  },
  {
    content: "Almuerzos y Cenas Saludables",
    objectID: nanoid(),
    type: "lvl3",
    url: "/nutricion-y-alimentacion#almuerzos-y-cenas-saludables",
    hierarchy: {
      lvl1: "Nutrición y alimentación",
      lvl2: "Recetas Saludables",
      lvl3: "Almuerzos y Cenas Saludables",
    },
  },
  {
    content: "Onces Saludables",
    objectID: nanoid(),
    type: "lvl3",
    url: "/nutricion-y-alimentacion#onces-saludables",
    hierarchy: {
      lvl1: "Nutrición y alimentación",
      lvl2: "Recetas Saludables",
      lvl3: "Onces Saludables",
    },
  },
];

const wellbeingSearchData: SearchResult[] = [
  {
    content: "Introducción a Bienestar Emocional",
    objectID: nanoid(),
    type: "lvl1",
    url: "/bienestar-emocional#introduccion-a-bienestar-emocional",
    hierarchy: {
      lvl1: "Bienestar Emocional",
      lvl2: null,
      lvl3: null,
    },
    icon: WellbeingIcon,
  },
];

const sexEducationSearchData: SearchResult[] = [
  {
    content: "Introducción a Salud y Educación Sexual",
    objectID: nanoid(),
    type: "lvl1",
    url: "/salud-y-educacion-sexual#introduccion-a-salud-y-educacion-sexual",
    hierarchy: {
      lvl1: "Salud y Educación Sexual",
      lvl2: null,
      lvl3: null,
    },
    icon: SexualityIcon,
  },
];

const forAllAgesSearchData: SearchResult[] = [
  {
    content: "Introducción a Salud para Todas las Edades",
    objectID: nanoid(),
    type: "lvl1",
    url: "/salud-para-todas-las-edades#introduccion-a-salud-para-todas-las-edades",
    hierarchy: {
      lvl1: "Salud para todas las edades",
      lvl2: null,
      lvl3: null,
    },
    icon: ForAllAgesIcon,
  },
];

// Datos de video modales
const videoHealthSearchData: SearchResult[] = healthVideos.map((video) => ({
  content: video.title,
  objectID: nanoid(),
  type: "lvl3",
  url: `/salud-y-bienestar#${formatTitle(video.title)}`,
  hierarchy: {
    lvl1: "Salud y Bienestar",
    lvl2: "Videos Recomendados",
    lvl3: video.title,
  },
  icon: HealthIcon,
}));

// Datos de modal
const healthModalSearchData: SearchResult[] = HEALTH_MODAL_DATA.map((data) => ({
  content: data.modalTitle,
  objectID: nanoid(),
  type: "lvl3",
  url: `/salud-y-bienestar#${formatTitle(data.modalTitle)}`,
  hierarchy: {
    lvl1: "Salud y Bienestar",
    lvl2: "Artículos Interesantes",
    lvl3: data.modalTitle,
  },
  icon: HealthIcon,
}));

const fitnessModalSearchData: SearchResult[] = FITNESS_MODAL_DATA.map(
  (data) => ({
    content: data.modalTitle,
    objectID: nanoid(),
    type: "lvl3",
    url: `/ejercicios-y-fitness#${formatTitle(data.modalTitle)}`,
    hierarchy: {
      lvl1: "Ejercicios y Fitness",
      lvl2: "Rutinas de Ejercicios",
      lvl3: data.modalTitle,
    },
    icon: ExcerciseIcon,
  })
);

const nutritionModalSearchData: SearchResult[] = NUTRITION_MODAL_DATA.map(
  (data) => ({
    content: data.modalTitle,
    objectID: nanoid(),
    type: "lvl3",
    url: `/nutricion-y-alimentacion#${formatTitle(data.modalTitle)}`,
    hierarchy: {
      lvl1: "Nutrición y alimentación",
      lvl2: "Recetas Saludables",
      lvl3: data.modalTitle,
    },
    icon: NutritionIcon,
  })
);

// Combinación de arrays
export const searchData: SearchResult[] = [
  ...healthSearchData,
  ...fitnessSearchData,
  ...nutritionSearchData,
  ...wellbeingSearchData,
  ...sexEducationSearchData,
  ...forAllAgesSearchData,
  ...healthModalSearchData,
  ...fitnessModalSearchData,
  ...nutritionModalSearchData,
  ...videoHealthSearchData,
];
