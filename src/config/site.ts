import {
  HomeIcon,
  HomeFillIcon,
  NewsIcon,
  NewsFillIcon,
  HealthIcon,
  ExcerciseIcon,
  NutritionIcon,
  WellbeingIcon,
  SexualityIcon,
  ForAllAgesIcon,
  AdditionalFillIcon,
  AdditionalIcon,
  AIFillIcon,
  AIIcon,
} from "@/modules/icons/interface";

import { SiteConfig } from "@/types/common";

export const siteConfig: SiteConfig = {
  name: "Essentia",
  description:
    "Tu recurso de información esencial y confiable para una vida más saludable y equilibrada",
  links: {
    github: "https://github.com/Ktumsh/essentia-web",
    instagram: "https://www.instagram.com/ktumsh/",
    twitter: "hhttps://twitter.com",
  },
  navLinks: [
    {
      name: "Inicio",
      href: "/",
      icon: HomeIcon,
      fillIcon: HomeFillIcon,
    },
    {
      name: "Noticias",
      href: "/noticias",
      icon: NewsIcon,
      fillIcon: NewsFillIcon,
    },
    {
      name: "Essentia AI",
      href: "/essentia-ai",
      icon: AIIcon,
      fillIcon: AIFillIcon,
    },
    {
      name: "Recursos adicionales",
      href: "/adicionales",
      icon: AdditionalIcon,
      fillIcon: AdditionalFillIcon,
    },
  ],
  asideMenuLinks: [
    {
      name: "Salud y bienestar",
      link: "/salud-y-bienestar",
      icon: HealthIcon,
    },
    {
      name: "Ejercicios y fitness",
      link: "/ejercicios-y-fitness",
      icon: ExcerciseIcon,
    },
    {
      name: "Nutrición y alimentación",
      link: "/nutricion-y-alimentacion",
      icon: NutritionIcon,
    },
    {
      name: "Bienestar emocional",
      link: "/bienestar-emocional",
      icon: WellbeingIcon,
    },
    {
      name: "Salud y educación sexual",
      link: "/salud-y-educacion-sexual",
      icon: SexualityIcon,
    },
    {
      name: "Salud para todas las edades",
      link: "/salud-para-todas-las-edades",
      icon: ForAllAgesIcon,
    },
  ],
  footerLinks: {
    resources: [
      { href: "/salud-y-bienestar", text: "Salud y Bienestar" },
      { href: "/ejercicios-y-fitness", text: "Ejercicios y Fitness" },
      {
        href: "/nutricion-y-alimentacion",
        text: "Nutrición y Alimentación",
      },
      { href: "/bienestar-emocional", text: "Bienestar Emocional" },
      {
        href: "/salud-y-educacion-sexual",
        text: "Salud y Educación Sexual",
      },
      {
        href: "/salud-para-todas-las-edades",
        text: "Salud para Todas las Edades",
      },
    ],
    additionalresources: [
      { href: "/adicionales", text: "Guías" },
      { href: "/adicionales", text: "Enlaces" },
      { href: "/adicionales", text: "Recomendaciones" },
      { href: "/adicionales", text: "Centros de salud" },
      { href: "/adicionales", text: "Fonos de emergencia" },
    ],
    comunidad: [
      { href: "/comunidad/blog", text: "Blog" },
      { href: "/comunidad/support-groups", text: "Grupos de apoyo" },
      { href: "/comunidad/inspiring-stories", text: "Historias inspiradoras" },
      { href: "/comunidad/community-resources", text: "Recursos comunitarios" },
    ],
    more: [
      { href: "", text: "Acerca de Essentia" },
      { href: "", text: "Política de privacidad" },
      { href: "", text: "Términos y condiciones" },
      { href: "", text: "Cookies" },
    ],
  },
};
