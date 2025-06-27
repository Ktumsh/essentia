import {
  addMonths,
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  format,
} from "date-fns";
import { es } from "date-fns/locale";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

import { GUIDE_DATA } from "@/db/data/guide-data";
import { SEGMENTS_DATA } from "@/db/data/segments-data";

export function formatDate(
  input: Date | string,
  formatStr: string = "dd/MM/yyyy",
): string {
  const date = new Date(input);
  if (isNaN(date.getTime())) {
    throw new Error("Fecha inválida proporcionada.");
  }

  const zoned = toZonedTime(date, "America/Santiago");
  return formatInTimeZone(zoned, "America/Santiago", formatStr, { locale: es });
}

export function formatDateWithAutoTimezone(
  input: Date,
  formatStr: string = "d MMM. yyyy HH:mm:ss",
): string {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error("Fecha inválida proporcionada.");
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const zonedDate = toZonedTime(date, timeZone);

  const regionName =
    new Intl.DateTimeFormat("es", {
      timeZoneName: "long",
      timeZone,
    })
      .formatToParts(zonedDate)
      .find((part) => part.type === "timeZoneName")?.value || timeZone;

  const formattedDate = format(zonedDate, formatStr, { locale: es });

  return `${formattedDate} (${regionName})`;
}

export function formatDateInTimezone(date: Date, formatStr: string) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return formatInTimeZone(date, userTimeZone, formatStr, { locale: es });
}

export function getPreciseAge(birthdate: string | Date): string {
  const today = new Date();
  const birthDate = new Date(birthdate);

  let age = today.getFullYear() - birthDate.getFullYear();

  const isBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!isBirthdayPassed) {
    age -= 1;
  }

  return `${age} años`;
}

export function getTimeOnPlatform(createdAt: Date): string {
  const now = new Date();

  const years = differenceInYears(now, createdAt);
  const adjustedDate = addYears(createdAt, years);
  const months = differenceInMonths(now, adjustedDate);
  const adjustedMonthDate = addMonths(adjustedDate, months);
  const days = differenceInDays(now, adjustedMonthDate);

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} año${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mes${months > 1 ? "es" : ""}`);
  if (days > 0) parts.push(`${days} día${days > 1 ? "s" : ""}`);

  return parts.length > 1
    ? parts.slice(0, -1).join(", ") + " y " + parts[parts.length - 1]
    : parts[0] || "Hoy";
}

export const formatTitle = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-");

export const normalizeQuery = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const formatPathName = (pathname: string): string => {
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
};

export const formatSegment = (segment: string) => {
  if (SEGMENTS_DATA[segment]) return SEGMENTS_DATA[segment];

  const guide = GUIDE_DATA.find((guide) => String(guide.id) === segment);

  if (guide) return guide.title;

  const words = segment.replace(/-/g, " ").split(" ");
  const firstWord =
    words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  const rest = words.slice(1).join(" ").toLowerCase();
  return firstWord + (rest ? " " + rest : "");
};

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const convertTo12HourFormat = (time: string): string => {
  if (!time) return "Hora no especificada";
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0);
  return format(date, "h:mm a").toLocaleLowerCase();
};

export const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} kB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

export const getFileContentType = (fileContentType: string): string => {
  if (!fileContentType) return "Otro";

  const mapping: Record<string, string> = {
    "image/jpeg": "JPEG",
    "image/jpg": "JPG",
    "image/png": "PNG",
    "image/gif": "GIF",
    "application/pdf": "PDF",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "application/vnd.ms-excel": "XLS",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
  };

  return mapping[fileContentType] || "Otro";
};
