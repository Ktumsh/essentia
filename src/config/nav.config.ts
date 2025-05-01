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

import Kit from "@/app/(main)/adicionales/botiquin/_components/kit";
import Emergencies from "@/app/(main)/adicionales/emergencias/_components/emergencies";
import Guides from "@/app/(main)/adicionales/guias/_components/guides";
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
      path: "/centros-de-salud",
      icon: HealthCentersIcon,
      activeIcon: HealthCentersFillIcon,
    },
    {
      name: "Historial médico",
      path: "/historial-medico",
      icon: MedicalHistoryIcon,
      activeIcon: MedicalHistoryFillIcon,
    },
    {
      name: "Recursos adicionales",
      path: "/adicionales",
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
      path: "/adicionales/guias",
      icon: GuidesIcon,
      activeIcon: GuidesFillIcon,
      component: Guides,
    },
    {
      name: "Emergencias",
      path: "/adicionales/emergencias",
      icon: EmergenciesIcon,
      activeIcon: EmergenciesFillIcon,
      component: Emergencies,
    },
    {
      name: "Botiquín",
      path: "/adicionales/botiquin",
      icon: KitIcon,
      activeIcon: KitFillIcon,
      component: Kit,
    },
  ],
  menuFooterLinks: {
    extras: [
      { name: "Descubre Essentia", path: "/descubre-essentia", icon: Info },
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
      { path: "/adicionales/guias", text: "Guías" },
      {
        path: "/adicionales/emergencias",
        text: "Emergencias",
      },
      {
        path: "/adicionales/botiquin",
        text: "Botiquín",
      },
    ],
    more: [
      { path: "/descubre-essentia", text: "Descubre Essentia" },
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
      { path: "/descubre-essentia", text: "Descubre Essentia" },
    ],
  },
  publicLinks: [
    { title: "Descubre Essentia", href: "/", hasDropdown: true },
    { title: "Planes y Precios", href: "/pricing" },
    /* { title: "Sobre Nosotros", href: "/sobre-nosotros" }, */
    /* { title: "Blog", href: "/blog" }, */
    { title: "Soporte", href: "/soporte" },
    { title: "Panel Essentia", href: "/" },
  ],
  publicListLinks: [
    {
      title: "Nuestro Método",
      href: "/descubre-essentia#metodo",
      description:
        "Conoce el enfoque integral y personalizado de Essentia para tu bienestar.",
    },
    {
      title: "Nuestros Recursos",
      href: "/descubre-essentia#recursos",
      description:
        "Accede a rutas de aprendizaje con etapas, revisiones prácticas, artículos, guías y más recursos para tu bienestar.",
    },
    {
      title: "Historial Médico",
      href: "/descubre-essentia#historial-medico",
      description:
        "Gestiona y consulta tu información médica de forma segura y centralizada.",
    },
    {
      title: "Essentia AI",
      href: "/descubre-essentia#ai",
      description:
        "Aprovecha la inteligencia artificial para recomendaciones y seguimiento personalizado.",
    },
    {
      title: "Progreso",
      href: "/descubre-essentia#progreso",
      description:
        "Visualiza tus avances y logros en tu camino hacia una vida más saludable.",
    },
    {
      title: "Visión y Propósito",
      href: "/descubre-essentia#vision-proposito",
      description:
        "Descubre la misión y valores que impulsan el proyecto Essentia.",
    },
  ],
};

export type NavConfig = typeof navConfig;
