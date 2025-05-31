import { clsx, type ClassValue } from "clsx";
import {
  addDays,
  Day,
  format,
  isPast,
  nextDay,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setSeconds,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";

import { navConfig } from "@/config/nav.config";
import { siteConfig } from "@/config/site.config";
import { FUN_FACT_DATA, type FunFactType } from "@/db/data/fun-fact-data";
import { capitalize } from "@/utils/format";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePremiumExpiresAt(currentPeriodEnd: number): Date {
  return new Date(currentPeriodEnd * 1000);
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
);

interface ApplicationError extends Error {
  info: string;
  status: number;
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data.",
    ) as ApplicationError;

    error.info = await res.json();
    error.status = res.status;

    throw error;
  }

  return res.json();
};

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>,
) => {
  fn();
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export const getFirstNameAndLastName = (
  fullName: string | undefined | null,
) => {
  if (!fullName) return "Usuario";
  const nameParts = fullName.toLowerCase().split(" ");
  if (nameParts.length < 3) return capitalize(fullName);
  return `${capitalize(nameParts[0])} ${capitalize(
    nameParts[nameParts.length - 2],
  )}`;
};

export const usernameOrEmail = (session: any) => {
  const username = session?.user?.username
    ? `@${session.user.username}`
    : session?.user?.email;

  return username;
};

export const containsAllLetters = (str: string, query: string) => {
  let strIndex = 0;
  for (const char of query) {
    strIndex = str.indexOf(char, strIndex);
    if (strIndex === -1) return false;
    strIndex++;
  }
  return true;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getRandomFacts = (
  num: number,
  pool: FunFactType[] = FUN_FACT_DATA,
) => {
  const shuffled = pool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export function calculateAge(birthDate: Date): number {
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function startsWithAny(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => pathname.startsWith(prefix));
}

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

export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const getSureLabel = (genre?: string | null) => {
  if (genre === "Femenino") {
    return "segura";
  } else if (genre === "Masculino") {
    return "seguro";
  }
  return "segur@";
};

export const getWelcomeLabel = (genre?: string | null) => {
  if (genre === "Femenino") {
    return "Bienvenida";
  } else if (genre === "Masculino") {
    return "Bienvenido";
  }
  return "Bienvenid@";
};

export function convertTo12HourFormat(time: string): string {
  if (!time) {
    return "Hora no especificada";
  }
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0);
  return format(date, "h:mm a").toLocaleLowerCase();
}

export function calculateExactDate(
  time: string,
  options?: {
    weekDay?: string | null;
    monthDay?: number | null;
    month?: string | null;
  },
): Date | null {
  const [hours, minutes] = time.split(":").map(Number);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const now = toZonedTime(new Date(), timeZone);
  let targetDate = setHours(
    setMinutes(setSeconds(new Date(now), 0), minutes),
    hours,
  );

  if (options?.weekDay) {
    const daysOfWeek: { [key: string]: number } = {
      domingo: 0,
      lunes: 1,
      martes: 2,
      miércoles: 3,
      jueves: 4,
      viernes: 5,
      sábado: 6,
    };

    const targetDayIndex = daysOfWeek[options.weekDay.toLowerCase()];
    if (targetDayIndex === undefined) {
      throw new Error(`El día especificado (${options.weekDay}) no es válido.`);
    }

    targetDate = nextDay(targetDate, targetDayIndex as Day);
  }

  if (options?.monthDay && options?.month) {
    const monthsOfYear: { [key: string]: number } = {
      enero: 0,
      febrero: 1,
      marzo: 2,
      abril: 3,
      mayo: 4,
      junio: 5,
      julio: 6,
      agosto: 7,
      septiembre: 8,
      octubre: 9,
      noviembre: 10,
      diciembre: 11,
    };

    const targetMonthIndex = monthsOfYear[options.month.toLowerCase()];
    if (targetMonthIndex === undefined) {
      throw new Error(`El mes especificado (${options.month}) no es válido.`);
    }

    targetDate = setMonth(
      setDate(targetDate, options.monthDay),
      targetMonthIndex,
    );

    if (isPast(targetDate)) {
      targetDate.setFullYear(targetDate.getFullYear() + 1);
    }
  }

  if (targetDate.getTime() <= now.getTime()) {
    targetDate = addDays(targetDate, 1);
  }

  return targetDate;
}

export function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export interface ServerPushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export function convertSubscriptionToServerFormat(
  subscription: PushSubscription,
): ServerPushSubscription {
  const p256dh = subscription.getKey("p256dh");
  const auth = subscription.getKey("auth");

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
  };

  return {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: p256dh ? arrayBufferToBase64(p256dh) : "",
      auth: auth ? arrayBufferToBase64(auth) : "",
    },
  };
}

export const getPlanName = (planId: string): string => {
  switch (planId) {
    case siteConfig.plan.free:
      return "Gratis";
    case siteConfig.plan.premium:
      return "Premium";
    case siteConfig.plan.premiumPlus:
      return "Premium Plus";
    default:
      return "Plan";
  }
};

export const getPlanPrice = (plan: string) => {
  switch (plan) {
    case siteConfig.plan.free:
      return siteConfig.priceId.free;
    case siteConfig.plan.premium:
      return siteConfig.priceId.premium;
    case siteConfig.plan.premiumPlus:
      return siteConfig.priceId.premiumPlus;
    default:
      return siteConfig.priceId.free;
  }
};

export function getDeviceInfo(): string {
  const ua = navigator.userAgent;

  // iPhone
  const iPhoneMatch = ua.match(/iPhone OS (\d+_\d+)/);
  if (iPhoneMatch) return `iPhone iOS ${iPhoneMatch[1].replace("_", ".")}`;

  // iPad
  const iPadMatch = ua.match(/iPad; CPU OS (\d+_\d+)/);
  if (iPadMatch) return `iPad iOS ${iPadMatch[1].replace("_", ".")}`;

  // iPod
  const iPodMatch = ua.match(/iPod.*OS (\d+_\d+)/);
  if (iPodMatch) return `iPod iOS ${iPodMatch[1].replace("_", ".")}`;

  // Android
  const androidMatch = ua.match(/Android (\d+(\.\d+)?)/);
  if (androidMatch) {
    const androidVersion = androidMatch[1];
    const deviceMatch = ua.match(/Android.*?;\s([^)]+)\)/);
    const rawDevice = deviceMatch
      ? deviceMatch[1].split("Build")[0].trim()
      : "Android";
    return `${rawDevice} Android ${androidVersion}`;
  }

  // Windows
  const windowsMatch = ua.match(/Windows NT (\d+\.\d+)/);
  if (windowsMatch) {
    const versionMap: Record<string, string> = {
      "10.0": "10 / 11",
      "6.3": "8.1",
      "6.2": "8",
      "6.1": "7",
      "6.0": "Vista",
      "5.1": "XP",
    };
    const version = windowsMatch[1];
    return `Windows ${versionMap[version] ?? version}`;
  }

  // macOS
  const macMatch = ua.match(/Mac OS X (\d+[_\.\d]+)/);
  if (macMatch) {
    return `Mac OS X ${macMatch[1].replace(/_/g, ".")}`;
  }

  // ChromeOS
  if (/CrOS/.test(ua)) return "Chrome OS";

  // Linux
  if (/Linux/.test(ua)) return "Linux";

  // Fallback
  return "Otro";
}

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

export async function getClientIp(): Promise<string> {
  try {
    const res = await fetch("/api/ip");
    const data = await res.json();
    return data.ip;
  } catch (error) {
    console.error("Error al obtener la IP del cliente:", error);
    return "";
  }
}
