import {
  BadgeCheck,
  Bug,
  Cookie,
  FileText,
  HelpCircle,
  Info,
  Lock,
  LogOut,
  Settings,
  Sparkles,
  User,
} from "lucide-react";

import Emergencies from "@/modules/additionals/components/emergencies";
import Guides from "@/modules/additionals/components/guides";
import Links from "@/modules/additionals/components/links";
import Recommendations from "@/modules/additionals/components/recommendations";
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
  EmergenciesFillIcon,
  EmergenciesIcon,
  GuidesFillIcon,
  GuidesIcon,
  HealthCentersFillIcon,
  HealthCentersIcon,
  LinksFillIcon,
  LinksIcon,
  RecommendationsFillIcon,
  RecommendationsIcon,
} from "@/modules/icons/miscellaneus";
import { SiteConfig } from "@/types/common";

export const siteConfig: SiteConfig = {
  name: "Essentia",
  description:
    "Tu recurso de información esencial y confiable para una vida más saludable y equilibrada",
  url: "https://essentia-web.vercel.app",
  keywords: [
    "essentia",
    "salud",
    "nutricion",
    "alimentacion",
    "bienestar",
    "ejercicios",
    "salud mental",
    "esencial",
    "salud rapida",
  ],
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
  additionalLinks: [
    {
      href: "/adicionales/guias",
      name: "Guías",
      icon: GuidesIcon,
      activeIcon: GuidesFillIcon,
      component: Guides,
    },
    {
      href: "/adicionales/emergencias",
      name: "Emergencias",
      icon: EmergenciesIcon,
      activeIcon: EmergenciesFillIcon,
      component: Emergencies,
    },
    {
      href: "/adicionales/enlaces",
      name: "Enlaces",
      icon: LinksIcon,
      activeIcon: LinksFillIcon,
      component: Links,
    },
    {
      href: "/adicionales/recomendaciones",
      name: "Recomendaciones",
      icon: RecommendationsIcon,
      activeIcon: RecommendationsFillIcon,
      component: Recommendations,
    },
  ],
  menuFooterLinks: {
    extras: [
      { name: "Descubre Essentia", link: "/about", icon: Info },
      { name: "Privacidad", link: "#", icon: Lock },
      { name: "Términos", link: "#", icon: FileText },
      { name: "Cookies", link: "#", icon: Cookie },
    ],
    config: [
      { name: "Configuración", link: "#", icon: Settings },
      { name: "Soporte", link: "#", icon: HelpCircle },
      {
        name: "Reportar un error",
        link: "https://github.com/Ktumsh/essentia/issues/new",
        icon: Bug,
      },
    ],
    account: [
      { name: "Perfil", icon: User },
      { name: "Cuenta", link: "/account", icon: BadgeCheck },
      { name: "Premium", link: "/premium", icon: Sparkles },
      { name: "Cerrar sesión", icon: LogOut },
    ],
  },
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
      { href: "/adicionales/guias", text: "Guías" },
      {
        href: "/adicionales/emergencias",
        text: "Emergencias",
      },
      { href: "/adicionales/enlaces", text: "Enlaces" },
      {
        href: "/adicionales/recomendaciones",
        text: "Recomendaciones",
      },
    ],
    more: [
      { href: "/about", text: "Descubre Essentia" },
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
      { href: "/about", text: "Descubre Essentia" },
    ],
  },
};
