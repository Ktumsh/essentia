import {
  addDays,
  type Day,
  isPast,
  nextDay,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setSeconds,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";

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

export function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
