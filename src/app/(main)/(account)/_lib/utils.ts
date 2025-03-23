import { PixelCrop } from "react-image-crop";
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
    return "Activo";
  } else if (status === "canceled") {
    return "Cancelado";
  } else if (status === "unpaid") {
    return "No pagado";
  } else if (status === "deleted") {
    return "Eliminado";
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

export async function getCroppedImg(
  image: HTMLImageElement,
  crop: PixelCrop,
): Promise<Blob> {
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo obtener el contexto del canvas");

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  ctx.translate(-crop.x * scaleX, -crop.y * scaleY);
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
  ctx.restore();

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("No se pudo generar el Blob de la imagen"));
        return;
      }
      resolve(blob);
    }, "image/jpeg");
  });
}
