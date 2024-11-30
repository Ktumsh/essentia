import {
  HomeIcon,
  HomeFillIcon,
  HealthIcon,
  NutritionIcon,
  WellbeingIcon,
  SexualityIcon,
  ForAllAgesIcon,
  AdditionalFillIcon,
  AdditionalIcon,
  AIFillIcon,
  AIIcon,
  HealthFillIcon,
  ExerciseIcon,
  ExerciseFillIcon,
  NutritionFillIcon,
  WellbeingFillIcon,
  SexualityFillIcon,
  ForAllAgesFillIcon,
} from "@/modules/icons/interface";
import {
  HealthCentersFillIcon,
  HealthCentersIcon,
} from "@/modules/icons/miscellaneus";
import { SiteConfig } from "@/types/common";

export const siteConfig: SiteConfig = {
  name: "Essentia",
  description:
    "Tu recurso de información esencial y confiable para una vida más saludable y equilibrada",
  planPrices: {
    free: "price_free",
    premium: "price_1Q1y3NI2PMoTUNZeKCLhLp9Y",
    premiumPlus: "price_1Q1y2QI2PMoTUNZeMt1eynxB",
  },
  links: {
    github: "https://github.com/Ktumsh/essentia",
    instagram: "https://www.instagram.com/ktumsh/",
    twitter: "hhttps://twitter.com",
  },
  navLinks: [
    {
      name: "Inicio",
      href: "/",
      icon: HomeIcon,
      activeIcon: HomeFillIcon,
    },
    {
      name: "Essentia AI",
      href: "/essentia-ai",
      icon: AIIcon,
      activeIcon: AIFillIcon,
    },
    {
      name: "Centros de salud",
      href: "/centros-de-salud",
      icon: HealthCentersIcon,
      activeIcon: HealthCentersFillIcon,
    },
    {
      name: "Recursos adicionales",
      href: "/adicionales",
      icon: AdditionalIcon,
      activeIcon: AdditionalFillIcon,
    },
  ],
  asideMenuLinks: [
    {
      name: "Salud y bienestar",
      link: "/salud-y-bienestar",
      icon: HealthIcon,
      activeIcon: HealthFillIcon,
    },
    {
      name: "Ejercicios y fitness",
      link: "/ejercicios-y-fitness",
      icon: ExerciseIcon,
      activeIcon: ExerciseFillIcon,
    },
    {
      name: "Nutrición y alimentación",
      link: "/nutricion-y-alimentacion",
      icon: NutritionIcon,
      activeIcon: NutritionFillIcon,
    },
    {
      name: "Bienestar emocional",
      link: "/bienestar-emocional",
      icon: WellbeingIcon,
      activeIcon: WellbeingFillIcon,
    },
    {
      name: "Salud y educación sexual",
      link: "/salud-y-educacion-sexual",
      icon: SexualityIcon,
      activeIcon: SexualityFillIcon,
    },
    {
      name: "Salud en todas las edades",
      link: "/salud-en-todas-las-edades",
      icon: ForAllAgesIcon,
      activeIcon: ForAllAgesFillIcon,
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
        href: "/salud-en-todas-las-edades",
        text: "Salud en Todas las Edades",
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
      { href: "/about-essentia", text: "Acerca de" },
      { href: "", text: "Privacidad" },
      { href: "", text: "Términos" },
      { href: "", text: "Cookies" },
    ],
  },
  desktopFooterLinks: {
    more: [
      { href: "", text: "Políticas de privacidad" },
      { href: "", text: "Términos y condiciones" },
      { href: "", text: "Cookies" },
      { href: "/about-essentia", text: "Acerca de" },
    ],
  },
};
