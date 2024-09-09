import { UserProfileData } from "@/types/session";
import { CalendarDate, DateValue } from "@internationalized/date";
import { toast } from "sonner";

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
  userId: string,
  hasToast: boolean = false,
  toastMessage?: string,
  toastErrorMessage?: string
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
    throw new Error(result.error || "Error al subir la imagen");
  }

  if (result.success && hasToast) {
    toast.success(toastMessage);
  } else {
    if (hasToast) toast.error(toastErrorMessage);
  }

  return result[`${imageType}_image`];
};

export const deleteFile = async (
  userId: string,
  hasToast: boolean = false,
  toastMessage?: string,
  toastErrorMessage?: string
) => {
  const response = await fetch("/api/upload", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Error al subir la imagen");
  }

  if (result.success && hasToast) {
    toast.success(toastMessage);
  } else {
    if (hasToast) toast.error(toastErrorMessage);
  }

  return result;
};

export const isPersonalInfoComplete = (profileData: UserProfileData) => {
  return (
    profileData.first_name && profileData.last_name && profileData.username
  );
};

export const isProfileComplete = (profileData: UserProfileData) => {
  return (
    isPersonalInfoComplete(profileData) &&
    profileData.profile_image &&
    profileData.banner_image &&
    profileData.bio &&
    profileData.location
  );
};

export const calculateProfileProgress = (profileData: UserProfileData) => {
  let progress = 0;

  if (isProfileComplete(profileData)) {
    progress += 30;
  }
  if (isPersonalInfoComplete(profileData)) {
    progress += 20;
  }
  if (profileData.profile_image) progress += 15;
  if (profileData.banner_image) progress += 15;
  if (profileData.bio) progress += 10;
  if (profileData.location) progress += 10;

  return progress;
};
