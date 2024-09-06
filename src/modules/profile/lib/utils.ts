import { CalendarDate, DateValue } from "@internationalized/date";

export const convertToDateValue = (dateString: string): DateValue => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new CalendarDate(year, month, day);
};

export function formatCreatedAt(createdAt: Date): string {
  if (!createdAt) {
    return "Fecha no disponible";
  }

  return new Date(createdAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });
}

export const formatInitialDate = (
  birthdate: string | DateValue | undefined
): DateValue | null => {
  if (typeof birthdate === "string") {
    return convertToDateValue(birthdate);
  }

  if (birthdate instanceof Date) {
    return new CalendarDate(
      birthdate.getFullYear(),
      birthdate.getMonth() + 1,
      birthdate.getDate()
    );
  }

  return null;
};

export const uploadFile = async (
  file: File,
  imageType: "profile" | "banner",
  userId: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("imageType", imageType);
  formData.append("userId", userId);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || `Error al subir la imagen ${imageType}`);
  }

  return result[`${imageType}_image`];
};
