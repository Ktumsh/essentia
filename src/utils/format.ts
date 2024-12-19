import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

export function formatDate(
  input: Date,
  formatStr: string = "dd/MM/yyyy",
): string {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error("Fecha inválida proporcionada.");
  }

  const formattedDate = format(date, formatStr, { locale: es });
  return formattedDate;
}

export function formatDateWithTimezone(date: Date, formatStr: string) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const zonedDate = toZonedTime(date, userTimeZone);

  return format(zonedDate, formatStr, { locale: es });
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const formatTitle = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-");

export const formatText = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const formatPathName = (pathname: string): string => {
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
};

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
