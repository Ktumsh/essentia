import { CalendarDate, DateValue } from "@internationalized/date";
import { toast } from "sonner";
import { z } from "zod";

import { getUserByUsername } from "@/db/user-querys";
import { getMessageFromCode, ResultCode } from "@/utils/code";

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
  birthdate: string | DateValue | undefined,
): DateValue | null => {
  if (typeof birthdate === "string") {
    return convertToDateValue(birthdate);
  }

  if (birthdate instanceof Date) {
    return new CalendarDate(
      birthdate.getFullYear(),
      birthdate.getMonth() + 1,
      birthdate.getDate(),
    );
  }

  return null;
};

export async function uploadFile(
  file: File,
  imageType: "profile" | "banner",
  userId: string,
  hasToast: boolean = false,
  toastMessage?: string,
  toastErrorMessage?: string,
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("imageType", imageType);
  formData.append("userId", userId);

  const uploadPromise = fetch("/api/files/upload-profile", {
    method: "POST",
    body: formData,
  });

  if (hasToast) {
    return toast.promise(uploadPromise, {
      loading: `Subiendo ${imageType === "banner" ? "foto de portada" : "foto de perfil"}...`,
      success: async () => {
        const response = await uploadPromise;
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || "Error al subir la imagen");
        }

        return toastMessage || "Archivo subido exitosamente";
      },
      error: toastErrorMessage || "Error al subir el archivo",
    });
  } else {
    const response = await uploadPromise;
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Error al subir la imagen");
    }

    return result[`${imageType}_image`];
  }
}

export async function validateProfileForm(
  tempFormData: any,
  setErrors: (errors: { [key: string]: string | null }) => void,
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

export const profileSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: getMessageFromCode(ResultCode.REQUIRED_NAME) }),
  last_name: z
    .string()
    .min(1, { message: getMessageFromCode(ResultCode.REQUIRED_LASTNAME) }),
  username: z
    .string()
    .min(3, { message: getMessageFromCode(ResultCode.INVALID_LENGTH_USERNAME) })
    .max(20, {
      message: getMessageFromCode(ResultCode.INVALID_LENGTH_USERNAME),
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: getMessageFromCode(ResultCode.INVALID_STRING_USERNAME),
    }),
  bio: z
    .string()
    .max(160, { message: getMessageFromCode(ResultCode.INVALID_LENGTH_BIO) })
    .optional(),
  location: z
    .string()
    .max(50, {
      message: getMessageFromCode(ResultCode.INVALID_LENGTH_LOCATION),
    })
    .optional(),
  birthdate: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDifference = today.getMonth() - date.getMonth();
      const dayDifference = today.getDate() - date.getDate();

      if (date.getFullYear() < 1900 || date > today) {
        return false;
      }

      if (age > 13) return true;
      if (age === 13 && monthDifference > 0) return true;
      if (age === 13 && monthDifference === 0 && dayDifference >= 0) {
        return true;
      }
      return false;
    },
    {
      message: getMessageFromCode(ResultCode.INVALID_BIRTHDATE),
    },
  ),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
