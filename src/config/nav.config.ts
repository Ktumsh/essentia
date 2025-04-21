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

import Emergencies from "@/app/(main)/additionals/emergencies/_components/emergencies";
import Guides from "@/app/(main)/additionals/guides/_components/guides";
import Kit from "@/app/(main)/additionals/kit/_components/kit";
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
  KitFillIcon,
  KitIcon,
} from "@/components/ui/icons/miscellaneus";

export const navConfig = {
  navLinks: [
    {
      name: "Inicio",
      path: "/",
      icon: HomeIcon,
      activeIcon: HomeFillIcon,
    },
    {
      name: "Essentia AI",
      path: "/essentia-ai",
      icon: AIIcon,
      activeIcon: AIFillIcon,
    },
    {
      name: "Centros de salud",
      path: "/health-centers",
      icon: HealthCentersIcon,
      activeIcon: HealthCentersFillIcon,
    },
    {
      name: "Historial médico",
      path: "/medical-history",
      icon: MedicalHistoryIcon,
      activeIcon: MedicalHistoryFillIcon,
    },
    {
      name: "Recursos adicionales",
      path: "/additionals",
      icon: AdditionalIcon,
      activeIcon: AdditionalFillIcon,
    },
  ],
  asideMenuLinks: [
    {
      name: "Salud y bienestar",
      path: "/salud-y-bienestar",
      icon: HealthIcon,
      emoji: "🌿",
      activeIcon: HealthFillIcon,
    },
    {
      name: "Ejercicios y fitness",
      path: "/ejercicios-y-fitness",
      icon: ExerciseIcon,
      emoji: "🏋️‍♀️",
      activeIcon: ExerciseFillIcon,
    },
    {
      name: "Nutrición y alimentación",
      path: "/nutricion-y-alimentacion",
      icon: NutritionIcon,
      emoji: "🍋",
      activeIcon: NutritionFillIcon,
    },
    {
      name: "Bienestar emocional",
      path: "/bienestar-emocional",
      icon: WellbeingIcon,
      emoji: "💙",
      activeIcon: WellbeingFillIcon,
    },
    {
      name: "Salud y educación sexual",
      path: "/salud-y-educacion-sexual",
      icon: SexualityIcon,
      emoji: "❤️‍🔥",
      activeIcon: SexualityFillIcon,
    },
    {
      name: "Salud en todas las edades",
      path: "/salud-en-todas-las-edades",
      icon: ForAllAgesIcon,
      emoji: "👨‍👩‍👧‍👦",
      activeIcon: ForAllAgesFillIcon,
    },
  ],
  additionalLinks: [
    {
      name: "Guías",
      path: "/additionals/guides",
      icon: GuidesIcon,
      activeIcon: GuidesFillIcon,
      component: Guides,
    },
    {
      name: "Emergencias",
      path: "/additionals/emergencies",
      icon: EmergenciesIcon,
      activeIcon: EmergenciesFillIcon,
      component: Emergencies,
    },
    {
      name: "Botiquín",
      path: "/additionals/kit",
      icon: KitIcon,
      activeIcon: KitFillIcon,
      component: Kit,
    },
  ],
  menuFooterLinks: {
    extras: [
      { name: "Descubre Essentia", path: "/about", icon: Info },
      { name: "Planes y Precios", path: "/pricing", icon: Stars },
      { name: "Términos y Condiciones", path: "#", icon: FileText },
      { name: "Política de Privacidad", path: "#", icon: Lock },
    ],
    config: [
      {
        name: "Configuración",
        path: "/settings/account-profile",
        icon: Settings,
      },
      { name: "Soporte", path: "#", icon: HelpCircle },
      {
        name: "Reportar un error",
        path: "https://github.com/Ktumsh/essentia/issues/new",
        icon: Bug,
      },
    ],
    account: [
      { name: "Cuenta", path: "/account", icon: BadgeCheck },
      { name: "Perfil", path: "/profile", icon: User },
      { name: "Suscripción", path: "/subscription", icon: CreditCard },
      { name: "Cerrar sesión", icon: LogOut },
    ],
  },
  footerLinks: {
    resources: [
      { path: "/salud-y-bienestar", text: "Salud y Bienestar" },
      { path: "/ejercicios-y-fitness", text: "Ejercicios y Fitness" },
      {
        path: "/nutricion-y-alimentacion",
        text: "Nutrición y Alimentación",
      },
      { path: "/bienestar-emocional", text: "Bienestar Emocional" },
      {
        path: "/salud-y-educacion-sexual",
        text: "Salud y Educación Sexual",
      },
      {
        path: "/salud-en-todas-las-edades",
        text: "Salud en Todas las Edades",
      },
    ],
    additionalresources: [
      { path: "/additionals/guides", text: "Guías" },
      {
        path: "/additionals/emergencies",
        text: "Emergencias",
      },
      { path: "/additionals/links", text: "Enlaces" },
      {
        path: "/additionals/recommendations",
        text: "Recomendaciones",
      },
    ],
    more: [
      { path: "/about", text: "Descubre Essentia" },
      { path: "", text: "Privacidad" },
      { path: "", text: "Términos" },
      { path: "", text: "Cookies" },
    ],
  },
  desktopFooterLinks: {
    more: [
      { path: "", text: "Políticas de privacidad" },
      { path: "", text: "Términos y condiciones" },
      { path: "", text: "Cookies" },
      { path: "/about", text: "Descubre Essentia" },
    ],
  },
};

export type NavConfig = typeof navConfig;
