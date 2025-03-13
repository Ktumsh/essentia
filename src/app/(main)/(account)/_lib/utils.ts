import { toast } from "sonner";

export const getPlanType = (type: string) => {
  if (type === "premium") {
    return "Premium";
  } else if (type === "premium-plus") {
    return "Premium Plus";
  } else {
    return "Gratis";
  }
};

export const getPlanStatus = (status: string) => {
  if (status === "active") {
    return "Activa";
  } else if (status === "canceled") {
    return "Cancelada";
  } else if (status === "unpaid") {
    return "No pagada";
  } else if (status === "deleted") {
    return "Eliminada";
  } else {
    return "No aplica";
  }
};

export const getPaymentStatus = (status: string) => {
  if (status === "paid") {
    return "Pagado";
  } else if (status === "pending") {
    return "Pendiente";
  } else {
    return "No aplica";
  }
};

export async function uploadFile(file: File, userId: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  const uploadPromise = new Promise<string>(async (resolve, reject) => {
    try {
      const response = await fetch("/api/files/upload-profile", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        return reject(result.error || "Error al subir la imagen");
      }

      resolve(result.message || "Foto de perfil actualizada");
    } catch {
      reject("Error al subir la imagen, revisa tu conexión");
    }
  });

  const toastNotification = toast.promise(uploadPromise, {
    loading: "Subiendo foto de perfil...",
    success: (message) => message,
    error: (err) => err,
  });

  const resultMessage = await toastNotification.unwrap();
  return resultMessage;
}
