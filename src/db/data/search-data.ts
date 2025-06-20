import { nanoid } from "nanoid";

import {
  AdditionalFillIcon,
  HealthCentersFillIcon,
  MedicalHistoryFillIcon,
} from "@/components/icons/interface";
import {
  EmergenciesFillIcon,
  GuidesFillIcon,
  KitFillIcon,
} from "@/components/icons/miscellaneus";
import { navConfig } from "@/config/nav.config";
import routes from "@/db/data/01_routes.json";

import { GUIDE_DATA } from "./guide-data";

import type { IconSvgProps } from "@/lib/types";
import type { JSX } from "react";

type Hierarchy = {
  lvl1: string | null;
  lvl2?: string | null;
  lvl3?: string | null;
};

const HEALTH_WELLNESS_ROUTE = routes.resources.find(
  (resource) => resource.slug === "salud-y-bienestar",
);

const HEALTH_WELLNESS_LESSONS = HEALTH_WELLNESS_ROUTE?.modules.flatMap(
  (module) =>
    module.lessons.map((lesson) => ({ ...lesson, moduleSlug: module.slug })),
);

const EXCERCISE_FITNESS_ROUTE = routes.resources.find(
  (resource) => resource.slug === "ejercicios-y-fitness",
);

const EXCERCISE_FITNESS_LESSONS = EXCERCISE_FITNESS_ROUTE?.modules.flatMap(
  (module) =>
    module.lessons.map((lesson) => ({ ...lesson, moduleSlug: module.slug })),
);

const NUTRITION_ROUTE = routes.resources.find(
  (resource) => resource.slug === "nutricion-y-alimentacion",
);

const NUTRITION_LESSONS = NUTRITION_ROUTE?.modules.flatMap((module) =>
  module.lessons.map((lesson) => ({ ...lesson, moduleSlug: module.slug })),
);

const WELLBEING_ROUTE = routes.resources.find(
  (resource) => resource.slug === "bienestar-emocional",
);

const WELLBEING_LESSONS = WELLBEING_ROUTE?.modules.flatMap((module) =>
  module.lessons.map((lesson) => ({ ...lesson, moduleSlug: module.slug })),
);

const SEX_EDUCATION_ROUTE = routes.resources.find(
  (resource) => resource.slug === "salud-y-educacion-sexual",
);

const SEX_EDUCATION_LESSONS = SEX_EDUCATION_ROUTE?.modules.flatMap((module) =>
  module.lessons.map((lesson) => ({ ...lesson, moduleSlug: module.slug })),
);

const FOR_ALL_AGES_ROUTE = routes.resources.find(
  (resource) => resource.slug === "salud-en-todas-las-edades",
);

const FOR_ALL_AGES_LESSONS = FOR_ALL_AGES_ROUTE?.modules.flatMap((module) =>
  module.lessons.map((lesson) => ({ ...lesson, moduleSlug: module.slug })),
);

export interface SearchResult {
  content: string;
  objectID: string;
  type: string;
  url: string;
  hierarchy?: Hierarchy;
  icon?: (props: IconSvgProps) => JSX.Element;
  emoji?: string;
}

const resourceIcons = navConfig.asideMenuLinks;

const medicalHistorySearchData: SearchResult[] = [
  {
    content: "Historial médico",
    objectID: nanoid(),
    type: "lvl1",
    url: "/historial-medico",
    hierarchy: {
      lvl1: "Historial médico",
      lvl2: null,
      lvl3: null,
    },
    icon: MedicalHistoryFillIcon,
  },
];

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
    icon: HealthCentersFillIcon,
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
    emoji: resourceIcons[0].emoji,
  },
  {
    content: "Aprende sobre Salud y Bienestar",
    objectID: nanoid(),
    type: "lvl2",
    url: "/salud-y-bienestar#aprende-sobre-salud-y-bienestar",
    hierarchy: {
      lvl1: "Salud y Bienestar",
      lvl2: "Aprende sobre Salud y Bienestar",
      lvl3: null,
    },
  },
  {
    content: "Cuida tu salud física y mental",
    objectID: nanoid(),
    type: "lvl2",
    url: "/salud-y-bienestar#cuida-salud-fisica-mental",
    hierarchy: {
      lvl1: "Salud y Bienestar",
      lvl2: "Cuida tu salud física y mental",
      lvl3: null,
    },
  },
  /* {
    content: "Artículos Interesantes",
    objectID: nanoid(),
    type: "lvl2",
    url: "/salud-y-bienestar#articulos-interesantes",
    hierarchy: {
      lvl1: "Salud y Bienestar",
      lvl2: "Artículos Interesantes",
      lvl3: null,
    },
  }, */
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
    emoji: resourceIcons[1].emoji,
  },
  {
    content: "Aprende sobre Ejercicios y Fitness",
    objectID: nanoid(),
    type: "lvl2",
    url: "/ejercicios-y-fitness#aprende-sobre-ejercicios-y-fitness",
    hierarchy: {
      lvl1: "Ejercicios y Fitness",
      lvl2: "Aprende sobre Ejercicios y Fitness",
      lvl3: null,
    },
  },
  {
    content: "Crea tu rutina personalizada",
    objectID: nanoid(),
    type: "lvl2",
    url: "/ejercicios-y-fitness#rutina-personalizada",
    hierarchy: {
      lvl1: "Ejercicios y Fitness",
      lvl2: "Crea tu rutina personalizada",
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
    emoji: resourceIcons[2].emoji,
  },
  {
    content: "Aprende sobre Nutrición y Alimentación",
    objectID: nanoid(),
    type: "lvl2",
    url: "/nutricion-y-alimentacion#aprende-sobre-nutricion-y-alimentacion",
    hierarchy: {
      lvl1: "Nutrición y Alimentación",
      lvl2: "Aprende sobre Nutrición y Alimentación",
      lvl3: null,
    },
  },
  {
    content: "Crea tu plan nutricional",
    objectID: nanoid(),
    type: "lvl2",
    url: "/nutricion-y-alimentacion#plan-nutricional",
    hierarchy: {
      lvl1: "Nutrición y Alimentación",
      lvl2: "Crea tu plan nutricional",
      lvl3: null,
    },
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
      lvl2: "Recetas",
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
      lvl2: "Recetas",
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
      lvl2: "Recetas",
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
    emoji: resourceIcons[3].emoji,
  },
  {
    content: "Aprende sobre Bienestar Emocional",
    objectID: nanoid(),
    type: "lvl2",
    url: "/bienestar-emocional#aprende-sobre-bienestar-emocional",
    hierarchy: {
      lvl1: "Bienestar Emocional",
      lvl2: "Aprende sobre Bienestar Emocional",
      lvl3: null,
    },
  },
  {
    content: "Mejora tu bienestar emocional",
    objectID: nanoid(),
    type: "lvl2",
    url: "/bienestar-emocional#mejora-bienestar-emocional",
    hierarchy: {
      lvl1: "Bienestar Emocional",
      lvl2: "Mejora tu bienestar emocional",
      lvl3: null,
    },
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
    emoji: resourceIcons[4].emoji,
  },
  {
    content: "Aprende sobre Salud y Educación Sexual",
    objectID: nanoid(),
    type: "lvl2",
    url: "/salud-y-educacion-sexual#aprende-sobre-salud-y-educacion-sexual",
    hierarchy: {
      lvl1: "Salud y Educación Sexual",
      lvl2: "Aprende sobre Salud y Educación Sexual",
      lvl3: null,
    },
  },
  {
    content: "Infórmate sobre salud sexual",
    objectID: nanoid(),
    type: "lvl2",
    url: "/salud-y-educacion-sexual#informa-sobre-salud-sexual",
    hierarchy: {
      lvl1: "Salud y Educación Sexual",
      lvl2: "Infórmate sobre salud sexual",
      lvl3: null,
    },
  },
];

const forAllAgesSearchData: SearchResult[] = [
  {
    content: "Introducción a Salud en Todas las Edades",
    objectID: nanoid(),
    type: "lvl1",
    url: "/salud-en-todas-las-edades#¿como-cuidar-tu-salud-a-cualquier-edad?",
    hierarchy: {
      lvl1: "Salud en todas las edades",
      lvl2: null,
      lvl3: null,
    },
    emoji: resourceIcons[5].emoji,
  },
  {
    content: "Aprende sobre Salud en Todas las Edades",
    objectID: nanoid(),
    type: "lvl2",
    url: "/salud-en-todas-las-edades#aprende-sobre-salud-en-todas-las-edades",
    hierarchy: {
      lvl1: "Salud en todas las edades",
      lvl2: "Aprende sobre Salud en Todas las Edades",
      lvl3: null,
    },
  },
  {
    content: "Cuida tu salud según tu etapa de vida",
    objectID: nanoid(),
    type: "lvl2",
    url: "/salud-en-todas-las-edades#cuida-salud-por-etapa",
    hierarchy: {
      lvl1: "Salud en todas las edades",
      lvl2: "Cuida tu salud según tu etapa de vida",
      lvl3: null,
    },
  },
];

const healthWellnessLessonsSearchData: SearchResult[] =
  HEALTH_WELLNESS_LESSONS?.map((data) => ({
    content: data.title,
    objectID: nanoid(),
    type: "lvl3",
    url: `/salud-y-bienestar/${data.moduleSlug}/${data.slug}`,
    hierarchy: {
      lvl1: "Salud y Bienestar",
      lvl2: "Aprende sobre Salud y Bienestar",
      lvl3: data.title,
    },
  })) || [];

const fitnessLessonsSearchData: SearchResult[] =
  EXCERCISE_FITNESS_LESSONS?.map((data) => ({
    content: data.title,
    objectID: nanoid(),
    type: "lvl3",
    url: `/ejercicios-y-fitness/${data.moduleSlug}/${data.slug}`,
    hierarchy: {
      lvl1: "Ejercicios y Fitness",
      lvl2: "Aprende sobre Ejercicios y Fitness",
      lvl3: data.title,
    },
  })) || [];

const nutritionLessonsSearchData: SearchResult[] =
  NUTRITION_LESSONS?.map((data) => ({
    content: data.title,
    objectID: nanoid(),
    type: "lvl3",
    url: `/nutricion-y-alimentacion/${data.moduleSlug}/${data.slug}`,
    hierarchy: {
      lvl1: "Nutrición y Alimentación",
      lvl2: "Aprende sobre Nutrición y Alimentación",
      lvl3: data.title,
    },
  })) || [];

const wellbeingLessonsSearchData: SearchResult[] =
  WELLBEING_LESSONS?.map((data) => ({
    content: data.title,
    objectID: nanoid(),
    type: "lvl3",
    url: `/bienestar-emocional/${data.moduleSlug}/${data.slug}`,
    hierarchy: {
      lvl1: "Bienestar Emocional",
      lvl2: "Aprende sobre Bienestar Emocional",
      lvl3: data.title,
    },
  })) || [];

const sexEducationLessonsSearchData: SearchResult[] =
  SEX_EDUCATION_LESSONS?.map((data) => ({
    content: data.title,
    objectID: nanoid(),
    type: "lvl3",
    url: `/salud-y-educacion-sexual/${data.moduleSlug}/${data.slug}`,
    hierarchy: {
      lvl1: "Salud y Educación Sexual",
      lvl2: "Aprende sobre Salud y Educación Sexual",
      lvl3: data.title,
    },
  })) || [];

const forAllAgesLessonsSearchData: SearchResult[] =
  FOR_ALL_AGES_LESSONS?.map((data) => ({
    content: data.title,
    objectID: nanoid(),
    type: "lvl3",
    url: `/salud-en-todas-las-edades/${data.moduleSlug}/${data.slug}`,
    hierarchy: {
      lvl1: "Salud en todas las edades",
      lvl2: "Aprende sobre Salud en Todas las Edades",
      lvl3: data.title,
    },
  })) || [];

const additionalsSearchData: SearchResult[] = [
  {
    content: "Recursos Adicionales",
    objectID: nanoid(),
    type: "lvl1",
    url: "/herramientas",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: null,
      lvl3: null,
    },
    icon: AdditionalFillIcon,
  },
  {
    content: "Guías",
    objectID: nanoid(),
    type: "lvl2",
    url: "/herramientas/guias",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Guias",
      lvl3: null,
    },
    icon: GuidesFillIcon,
  },
  {
    content: "Emergencias",
    objectID: nanoid(),
    type: "lvl2",
    url: "/herramientas/emergencias",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Emergencias",
      lvl3: null,
    },
    icon: EmergenciesFillIcon,
  },
  {
    content: "Teléfonos de Emergencia",
    objectID: nanoid(),
    type: "lvl3",
    url: "/herramientas/emergencias#telefonos-de-emergencia",
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
    url: "/herramientas/emergencias#primeros-auxilios",
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
    url: "/herramientas/emergencias#emergencias-de-salud-sexual",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Emergencias",
      lvl3: "Emergencias de salud sexual",
    },
  },
  {
    content: "Botiquín",
    objectID: nanoid(),
    type: "lvl2",
    url: "/herramientas/botiquin",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Botiquín",
      lvl3: null,
    },
    icon: KitFillIcon,
  },
  {
    content: "Medicamentos para un botiquín",
    objectID: nanoid(),
    type: "lvl3",
    url: "/herramientas/kit#medicamentos-para-un-botiquin",
    hierarchy: {
      lvl1: "Recursos Adicionales",
      lvl2: "Botiquín",
      lvl3: "Medicamentos para un botiquín",
    },
  },
];

const additionalsGuidesSearchData: SearchResult[] = GUIDE_DATA.map((guide) => ({
  content: guide.title,
  objectID: nanoid(),
  type: "lvl2",
  url: `/herramientas/guides/${guide.id}`,
  hierarchy: {
    lvl1: "Recursos Adicionales",
    lvl2: "Guias",
    lvl3: guide.title,
  },
}));

/* const healthModalSearchData: SearchResult[] = HEALTH_ARTICLE_DATA.map(
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

const fitnessModalSearchData: SearchResult[] = ROUTINE_DATA.map((data) => ({
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

const nutritionModalSearchData: SearchResult[] = RECIPE_DATA.map((data) => ({
  content: data.title,
  objectID: nanoid(),
  type: "lvl3",
  url: `/nutricion-y-alimentacion#${data.slug}`,
  hierarchy: {
    lvl1: "Nutrición y alimentación",
    lvl2: "Recetas",
    lvl3: data.title,
  },
})); */

export const SEARCH_DATA: SearchResult[] = [
  ...medicalHistorySearchData,
  ...healthCentersSearchData,
  ...healthSearchData,
  ...fitnessSearchData,
  ...nutritionSearchData,
  ...wellbeingSearchData,
  ...sexEducationSearchData,
  ...forAllAgesSearchData,
  ...healthWellnessLessonsSearchData,
  ...fitnessLessonsSearchData,
  ...nutritionLessonsSearchData,
  ...wellbeingLessonsSearchData,
  ...sexEducationLessonsSearchData,
  ...forAllAgesLessonsSearchData,
  ...additionalsSearchData,
  ...additionalsGuidesSearchData,
];
