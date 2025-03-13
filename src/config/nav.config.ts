import {
  BadgeCheck,
  Bug,
  CreditCard,
  FileText,
  HelpCircle,
  Info,
  Lock,
  LogOut,
  Settings,
  Stars,
  User,
} from "lucide-react";

import Emergencies from "@/app/(main)/adicionales/_components/emergencies";
import Guides from "@/app/(main)/adicionales/_components/guides";
import Links from "@/app/(main)/adicionales/_components/links";
import Recommendations from "@/app/(main)/adicionales/_components/recommendations";
import {
  AdditionalFillIcon,
  AdditionalIcon,
  AIFillIcon,
  AIIcon,
  ExerciseFillIcon,
  ExerciseIcon,
  ForAllAgesFillIcon,
  ForAllAgesIcon,
  HealthFillIcon,
  HealthIcon,
  HomeFillIcon,
  HomeIcon,
  NutritionFillIcon,
  NutritionIcon,
  SexualityFillIcon,
  SexualityIcon,
  WellbeingFillIcon,
  WellbeingIcon,
} from "@/components/ui/icons/interface";
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
} from "@/components/ui/icons/miscellaneus";

export const navConfig = {
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
      emoji: "🌿",
      activeIcon: HealthFillIcon,
    },
    {
      name: "Ejercicios y fitness",
      link: "/ejercicios-y-fitness",
      icon: ExerciseIcon,
      emoji: "🏋️‍♀️",
      activeIcon: ExerciseFillIcon,
    },
    {
      name: "Nutrición y alimentación",
      link: "/nutricion-y-alimentacion",
      icon: NutritionIcon,
      emoji: "🍋",
      activeIcon: NutritionFillIcon,
    },
    {
      name: "Bienestar emocional",
      link: "/bienestar-emocional",
      icon: WellbeingIcon,
      emoji: "💙",
      activeIcon: WellbeingFillIcon,
    },
    {
      name: "Salud y educación sexual",
      link: "/salud-y-educacion-sexual",
      icon: SexualityIcon,
      emoji: "❤️‍🔥",
      activeIcon: SexualityFillIcon,
    },
    {
      name: "Salud en todas las edades",
      link: "/salud-en-todas-las-edades",
      icon: ForAllAgesIcon,
      emoji: "👨‍👩‍👧‍👦",
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
      { name: "Planes y Precios", link: "/pricing", icon: Stars },
      { name: "Términos y Condiciones", link: "#", icon: FileText },
      { name: "Política de Privacidad", link: "#", icon: Lock },
    ],
    config: [
      {
        name: "Configuración",
        link: "/settings/account-profile",
        icon: Settings,
      },
      { name: "Soporte", link: "#", icon: HelpCircle },
      {
        name: "Reportar un error",
        link: "https://github.com/Ktumsh/essentia/issues/new",
        icon: Bug,
      },
    ],
    account: [
      { name: "Cuenta", link: "/account", icon: BadgeCheck },
      { name: "Perfil", link: "/profile", icon: User },
      { name: "Suscripción", link: "/subscription", icon: CreditCard },
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
