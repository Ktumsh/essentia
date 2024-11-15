import { nanoid } from "nanoid";

import {
  HealthIcon,
  ExcerciseIcon,
  NutritionIcon,
  WellbeingIcon,
  SexualityIcon,
  ForAllAgesIcon,
  AdditionalIcon,
} from "@/modules/icons/interface";
import {
  EmergenciesIcon,
  GuidesIcon,
  HealthCentersIcon,
  LinksIcon,
  RecommendationsIcon,
} from "@/modules/icons/miscellaneus";
import { IconSvgProps } from "@/types/common";

import { HEALTH_WELLNESS_ARTICLES } from "./health-wellness-articles";
import { RECIPES } from "./recipes-data";
import { ROUTINES } from "./routines-data";

type Hierarchy = {
  lvl1: string | null;
  lvl2?: string | null;
  lvl3?: string | null;
};

export interface SearchResult {
  content: string;
  objectID: string;
  type: string;
  url: string;
  hierarchy?: Hierarchy;
  icon?: (props: IconSvgProps) => JSX.Element;
}

const healthCentersSearchData: SearchResult[] = [
  {
    content: "Centros de Salud",
    objectID: nanoid(),
    type: "lvl1",
    url: "/centros-de-salud",
    hierarchy: {
      lvl1: "Centros de Salud",
      lvl2: null,
      lvl3: null,
    },
    icon: HealthCentersIcon,
  },
];

const healthSearchData: SearchResult[] = [
  {
    content: "Introducción a Salud y Bienestar",
    objectID: nanoid(),
    type: "lvl1",
    url: "/salud-y-bienestar#¿que-es-salud-y-bienestar?",
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
];

const fitnessSearchData: SearchResult[] = [
  {
    content: "Introducción a Ejercicios y Fitness",
    objectID: nanoid(),
    type: "lvl1",
    url: "/ejercicios-y-fitness#¿como-mejorar-tu-condicion-fisica?",
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
];

const nutritionSearchData: SearchResult[] = [
  {
    content: "Introducción a Nutrición y Alimentación",
    objectID: nanoid(),
    type: "lvl1",
    url: "/nutricion-y-alimentacion#¿que-es-una-alimentacion-saludable?",
    hierarchy: {
      lvl1: "Nutrición y Alimentación",
      lvl2: null,
      lvl3: null,
    },
    icon: NutritionIcon,
  },
  {
    content: "Recetas",
    objectID: nanoid(),
    type: "lvl2",
    url: "/nutricion-y-alimentacion#recetas",
    hierarchy: {
      lvl1: "Nutrición y Alimentación",
      lvl2: "Recetas",
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
    url: "/bienestar-emocional#¿como-mejorar-tu-bienestar-emocional?",
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
    url: "/salud-y-educacion-sexual#¿que-es-la-salud-sexual?",
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
    url: "/salud-para-todas-las-edades#¿como-cuidar-tu-salud-a-cualquier-edad?",
    hierarchy: {
      lvl1: "Salud para todas las edades",
      lvl2: null,
      lvl3: null,
    },
    icon: ForAllAgesIcon,
  },
];

const additionalsSearchData: SearchResult[] = [
  {
    content: "Recursos Adicionales",
    objectID: nanoid(),
    type: "lvl1",
    url: "/adicionales",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: null,
      lvl3: null,
    },
    icon: AdditionalIcon,
  },
  {
    content: "Guías",
    objectID: nanoid(),
    type: "lvl2",
    url: "/adicionales/guias",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Guias",
      lvl3: null,
    },
    icon: GuidesIcon,
  },
  {
    content: "Enlaces",
    objectID: nanoid(),
    type: "lvl2",
    url: "/adicionales/enlaces",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Enlaces",
      lvl3: null,
    },
    icon: LinksIcon,
  },
  {
    content: "Recomendaciones",
    objectID: nanoid(),
    type: "lvl2",
    url: "/adicionales/recomendaciones",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Recomendaciones",
      lvl3: null,
    },
    icon: RecommendationsIcon,
  },
  {
    content: "Emergencias",
    objectID: nanoid(),
    type: "lvl2",
    url: "/adicionales/emergencias",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Emergencias",
      lvl3: null,
    },
    icon: EmergenciesIcon,
  },
  {
    content: "Teléfonos de Emergencia",
    objectID: nanoid(),
    type: "lvl3",
    url: "/adicionales/emergencias#telefonos-de-emergencia",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Emergencias",
      lvl3: "Teléfonos de Emergencia",
    },
  },
  {
    content: "Primeros Auxilios",
    objectID: nanoid(),
    type: "lvl3",
    url: "/adicionales/emergencias#primeros-auxilios",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Emergencias",
      lvl3: "Primeros Auxilios",
    },
  },
  {
    content: "Emergencias de salud sexual",
    objectID: nanoid(),
    type: "lvl3",
    url: "/adicionales/emergencias#emergencias-de-salud-sexual",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Emergencias",
      lvl3: "Emergencias de salud sexual",
    },
  },
  {
    content: "Medicamentos para un botiquín de primeros auxilios",
    objectID: nanoid(),
    type: "lvl3",
    url: "/adicionales/emergencias#medicamentos-para-un-botiquin-de-primeros-auxilios",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Emergencias",
      lvl3: "Medicamentos para un Botiquín de Primeros Auxilios",
    },
  },
];

const healthModalSearchData: SearchResult[] = HEALTH_WELLNESS_ARTICLES.map(
  (data) => ({
    content: data.title,
    objectID: nanoid(),
    type: "lvl3",
    url: `/salud-y-bienestar#${data.slug}`,
    hierarchy: {
      lvl1: "Salud y Bienestar",
      lvl2: "Artículos Interesantes",
      lvl3: data.title,
    },
  }),
);

const fitnessModalSearchData: SearchResult[] = ROUTINES.map((data) => ({
  content: data.title,
  objectID: nanoid(),
  type: "lvl3",
  url: `/ejercicios-y-fitness#${data.slug}`,
  hierarchy: {
    lvl1: "Ejercicios y Fitness",
    lvl2: "Rutinas de Ejercicios",
    lvl3: data.title,
  },
}));

const nutritionModalSearchData: SearchResult[] = RECIPES.map((data) => ({
  content: data.title,
  objectID: nanoid(),
  type: "lvl3",
  url: `/nutricion-y-alimentacion#${data.slug}`,
  hierarchy: {
    lvl1: "Nutrición y alimentación",
    lvl2: "Recetas Saludables",
    lvl3: data.title,
  },
}));

export const searchData: SearchResult[] = [
  ...healthCentersSearchData,
  ...healthSearchData,
  ...fitnessSearchData,
  ...nutritionSearchData,
  ...wellbeingSearchData,
  ...sexEducationSearchData,
  ...forAllAgesSearchData,
  ...healthModalSearchData,
  ...fitnessModalSearchData,
  ...nutritionModalSearchData,
  ...additionalsSearchData,
];
