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

import { siteConfig } from "@/config/site";
import { HEALTH_FACTS } from "@/consts/health-facts";
import { HealthFact } from "@/types/common";

export const getRandomFacts = (
  num: number,
  pool: HealthFact[] = HEALTH_FACTS,
): HealthFact[] => {
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

export const getResourceColor = (
  index: number,
  colorType: "gradient" | "background" | "text",
): string => {
  const colorMap: {
    gradient: { [key: number]: string };
    background: { [key: number]: string };
    text: { [key: number]: string };
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
      0: "bg-emerald-100 dark:bg-emerald-950",
      1: "bg-fuchsia-100 dark:bg-fuchsia-950",
      2: "bg-yellow-100 dark:bg-yellow-950",
      3: "bg-blue-100 dark:bg-blue-950",
      4: "bg-rose-100 dark:bg-rose-950",
      5: "bg-lime-100 dark:bg-lime-950",
    },
    text: {
      0: "text-emerald-600",
      1: "text-fuchsia-600",
      2: "text-yellow-500",
      3: "text-blue-600",
      4: "text-rose-600",
      5: "text-lime-600",
    },
  };

  return colorMap[colorType][index];
};

export const getResourceIndex = (name: string): number => {
  const resources = siteConfig.asideMenuLinks;
  const index = resources.findIndex(
    (resource) =>
      resource.name.toLowerCase().normalize("NFD") ===
      name.toLowerCase().normalize("NFD"),
  );
  return index;
};

export const getResourceDetails = (name: string) => {
  const resources = siteConfig.asideMenuLinks;
  const resource = resources.find(
    (resource) =>
      resource.name.toLowerCase().normalize("NFD") ===
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
