import { getUserByUsername } from "@/db/user-querys";
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

// Subir un archivo al servidor
export async function uploadFile(
  file: File,
  imageType: "profile" | "banner",
  userId: string,
  hasToast: boolean = false,
  toastMessage?: string,
  toastErrorMessage?: string
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("imageType", imageType);
  formData.append("userId", userId);

  const response = await fetch("/api/files/upload-profile", {
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
}

export async function validateProfileForm(
  tempFormData: any,
  setErrors: (errors: { [key: string]: string | null }) => void
): Promise<boolean> {
  let isValid = true;
  const newErrors: { [key: string]: string | null } = {
    first_name: null,
    last_name: null,
    username: null,
  };

  if (!tempFormData.first_name) {
    newErrors.first_name = "El nombre no puede quedar vacío.";
    isValid = false;
  }

  if (!tempFormData.last_name) {
    newErrors.last_name = "El apellido no puede quedar vacío.";
    isValid = false;
  }

  const username = tempFormData.username;

  if (!username) {
    newErrors.username = "El nombre de usuario no puede quedar vacío.";
    isValid = false;
  } else {
    if (username.length < 3) {
      newErrors.username =
        "El nombre de usuario debe tener al menos 3 caracteres.";
      isValid = false;
    } else if (username.length > 20) {
      newErrors.username =
        "El nombre de usuario no puede tener más de 20 caracteres.";
      isValid = false;
    }

    const validUsernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!validUsernameRegex.test(username)) {
      newErrors.username =
        "El nombre de usuario solo puede contener letras, números y guiones bajos.";
      isValid = false;
    }

    const validStartUsernameRegex = /^[a-zA-Z0-9]/;
    if (!validStartUsernameRegex.test(username)) {
      newErrors.username =
        "El nombre de usuario no puede empezar con un guion bajo.";
      isValid = false;
    }

    const validEndUsernameRegex = /[a-zA-Z0-9]$/;
    if (!validEndUsernameRegex.test(username)) {
      newErrors.username =
        "El nombre de usuario no puede terminar con un guion bajo.";
      isValid = false;
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser && existingUser.id !== tempFormData.user_id) {
      newErrors.username = "¡Este nombre de usuario ya existe!";
      isValid = false;
    }
  }

  setErrors(newErrors);
  return isValid;
}
