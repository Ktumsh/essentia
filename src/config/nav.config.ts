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

import Emergencies from "@/app/(main)/additionals/_components/emergencies";
import Guides from "@/app/(main)/additionals/_components/guides";
import Links from "@/app/(main)/additionals/_components/links";
import Recommendations from "@/app/(main)/additionals/_components/recommendations";
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
  MedicalHistoryFillIcon,
  MedicalHistoryIcon,
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
      href: "/health-centers",
      icon: HealthCentersIcon,
      activeIcon: HealthCentersFillIcon,
    },
    {
      name: "Historial médico",
      href: "/medical-history",
      icon: MedicalHistoryIcon,
      activeIcon: MedicalHistoryFillIcon,
    },
    {
      name: "Recursos adicionales",
      href: "/additionals",
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
      href: "/additionals/guides",
      name: "Guías",
      icon: GuidesIcon,
      activeIcon: GuidesFillIcon,
      component: Guides,
    },
    {
      href: "/additionals/emergencies",
      name: "Emergencias",
      icon: EmergenciesIcon,
      activeIcon: EmergenciesFillIcon,
      component: Emergencies,
    },
    {
      href: "/additionals/links",
      name: "Enlaces",
      icon: LinksIcon,
      activeIcon: LinksFillIcon,
      component: Links,
    },
    {
      href: "/additionals/recommendations",
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
      { href: "/additionals/guides", text: "Guías" },
      {
        href: "/additionals/emergencies",
        text: "Emergencias",
      },
      { href: "/additionals/links", text: "Enlaces" },
      {
        href: "/additionals/recommendations",
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
