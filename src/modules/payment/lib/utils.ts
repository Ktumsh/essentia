import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(
  dateInput: string | Date | null | undefined,
  dateFormat: string = "dd MMMM yyyy"
): string | null {
  if (!dateInput) return null;

  const date =
    typeof dateInput === "string"
      ? parse(dateInput, "dd-MM-yyyy", new Date())
      : dateInput;

  if (isNaN(date.getTime())) {
    console.error("Fecha inválida:", dateInput);
    return null;
  }

  return format(date, dateFormat, { locale: es });
}

export function calculatePremiumExpiresAt(currentPeriodEnd: number): string {
  const expirationDate = new Date(currentPeriodEnd * 1000);
  return expirationDate.toISOString();
}
