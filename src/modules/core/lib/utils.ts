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
