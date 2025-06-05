import { navConfig } from "@/config/nav.config";

export function startsWithAny(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => pathname.startsWith(prefix));
}

export const getRouteColor = (
  index: number,
  colorType:
    | "gradient"
    | "background"
    | "text"
    | "text-strong"
    | "text-contrast"
    | "text-muted"
    | "border"
    | "borderAccent",
): string => {
  const colorMap: {
    [key in
      | "gradient"
      | "background"
      | "text"
      | "text-strong"
      | "text-contrast"
      | "text-muted"
      | "border"
      | "borderAccent"]: { [index: number]: string };
  } = {
    gradient: {
      0: "from-emerald-600 to-emerald-500",
      1: "from-fuchsia-600 to-fuchsia-500",
      2: "from-yellow-500 to-yellow-400",
      3: "from-blue-600 to-blue-500",
      4: "from-rose-600 to-rose-500",
      5: "from-lime-600 to-lime-500",
    },
    background: {
      0: "bg-emerald-200 dark:bg-emerald-900/50",
      1: "bg-fuchsia-200 dark:bg-fuchsia-900/50",
      2: "bg-yellow-200 dark:bg-yellow-900/50",
      3: "bg-blue-200 dark:bg-blue-900/50",
      4: "bg-rose-200 dark:bg-rose-900/50",
      5: "bg-lime-200 dark:bg-lime-900/50",
    },
    text: {
      0: "text-emerald-500",
      1: "text-fuchsia-500",
      2: "text-yellow-500",
      3: "text-blue-500",
      4: "text-rose-500",
      5: "text-lime-500",
    },
    "text-strong": {
      0: "prose-strong:text-emerald-950 dark:prose-strong:text-emerald-50",
      1: "prose-strong:text-fuchsia-950 dark:prose-strong:text-fuchsia-50",
      2: "prose-strong:text-yellow-950 dark:prose-strong:text-yellow-50",
      3: "prose-strong:text-blue-950 dark:prose-strong:text-blue-50",
      4: "prose-strong:text-rose-950 dark:prose-strong:text-rose-50",
      5: "prose-strong:text-lime-950 dark:prose-strong:text-lime-50",
    },
    "text-contrast": {
      0: "text-emerald-950 dark:text-emerald-50",
      1: "text-fuchsia-950 dark:text-fuchsia-50",
      2: "text-yellow-950 dark:text-yellow-50",
      3: "text-blue-950 dark:text-blue-50",
      4: "text-rose-950 dark:text-rose-50",
      5: "text-lime-950 dark:text-lime-50",
    },
    "text-muted": {
      0: "text-emerald-800! dark:text-emerald-200!",
      1: "text-fuchsia-800! dark:text-fuchsia-200!",
      2: "text-yellow-800! dark:text-yellow-200!",
      3: "text-blue-800! dark:text-blue-200!",
      4: "text-rose-800! dark:text-rose-200!",
      5: "text-lime-800! dark:text-lime-200!",
    },
    border: {
      0: "border-emerald-200 dark:border-emerald-900",
      1: "border-fuchsia-200 dark:border-fuchsia-900",
      2: "border-yellow-200 dark:border-yellow-900",
      3: "border-blue-200 dark:border-blue-900",
      4: "border-rose-200 dark:border-rose-900",
      5: "border-lime-200 dark:border-lime-900",
    },
    borderAccent: {
      0: "border-emerald-500",
      1: "border-fuchsia-500",
      2: "border-yellow-500",
      3: "border-blue-500",
      4: "border-rose-500",
      5: "border-lime-500",
    },
  };

  return colorMap[colorType][index];
};

export const getRouteDarkColor = (index: number): string => {
  const colorMap: { [key: number]: string } = {
    0: "dark:bg-emerald-500/20",
    1: "dark:bg-fuchsia-500/20",
    2: "dark:bg-yellow-500/20",
    3: "dark:bg-blue-500/20",
    4: "dark:bg-rose-500/20",
    5: "dark:bg-lime-500/20",
  };

  return colorMap[index];
};

export const getItemBackgroundColor = (id: number): string => {
  const colorMap: Record<number, string> = {
    1: "bg-amber-400",
    2: "bg-red-500",
    3: "bg-indigo-500",
    4: "bg-emerald-500",
    5: "bg-blue-500",
    6: "bg-pink-500",
    7: "bg-lime-500",
    8: "bg-fuchsia-500",
  };

  return colorMap[id];
};

export const getProgressColor = (value: number) => {
  if (value === 0) return "bg-transparent";
  if (value <= 25) return "bg-red-500";
  if (value <= 50) return "bg-amber-500";
  if (value <= 75) return "bg-lime-500";
  return "bg-green-500";
};

export const getRouteIndex = (name: string): number => {
  const routes = navConfig.asideMenuLinks;
  const index = routes.findIndex(
    (resource) =>
      resource.name.toLowerCase().normalize("NFD") ===
      name.toLowerCase().normalize("NFD"),
  );
  return index;
};

export const getRouteDetails = (name: string) => {
  const routes = navConfig.asideMenuLinks;
  const resource = routes.find(
    (r) =>
      r.name.toLowerCase().normalize("NFD") ===
      name.toLowerCase().normalize("NFD"),
  );
  return resource;
};

export const getReadableContext = (path: string): string => {
  if (path === "/") return "Inicio";

  const map: Record<string, string> = {
    "/account": "Cuenta",
    "/account/profile": "Perfil",
    "/account/subscription": "Suscripción",
    "/aeris": "Aeris",
    "/salud-y-bienestar": "Recurso Salud y Bienestar",
    "/ejercicios-y-fitness": "Recurso Ejercicios y Fitness",
    "/nutricion-y-alimentacion": "Recurso Nutrición y Alimentación",
    "/bienestar-emocional": "Recurso Bienestar Emocional",
    "/salud-y-educacion-sexual": "Recurso Salud y Educación Sexual",
    "/salud-en-todas-las-edades": "Recurso Salud en Todas las Edades",
    "/herramientas/guias": "Guías de salud",
    "/herramientas/emergenciass": "Emergencias",
    "/herramientas/botiquin": "Botiquín",
    "/settings": "Configuración",
    "/settings/accessibility": "Configuración de accesibilidad",
    "/settings/account": "Configuración de cuenta",
    "/settings/notifications": "Configuración de notificaciones",
    "/settings/subscriptions": "Configuración de suscripciones",
    "/settings/support": "Configuración de soporte",
    "/centros-de-salud": "Centros de salud",
    "/historial-medico": "Historial médico",
    "/planes": "Planes y precios",
  };

  if (/^\/aeris\/chat\/[^/]+$/.test(path)) {
    return "Chat con IA";
  }

  return map[path] ?? "General";
};
