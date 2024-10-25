"use server";

import { revalidatePath } from "next/cache";

import { deleteUserBanner, deleteUserPhoto } from "@/db/profile-querys";

export async function deleteFile(userId: string, type: "banner" | "profile") {
  try {
    if (!userId) {
      throw new Error("ID de usuario es requerido");
    }

    let deleteResult;
    if (type === "banner") {
      deleteResult = await deleteUserBanner(userId);
    } else if (type === "profile") {
      deleteResult = await deleteUserPhoto(userId);
    } else {
      throw new Error("Tipo de eliminación no válido");
    }

    if (deleteResult.error) {
      throw new Error(deleteResult.error);
    }

    revalidatePath("/profile");

    return {
      success: true,
      message: `${
        type === "banner" ? "Banner" : "Foto de perfil"
      } eliminado correctamente.`,
    };
  } catch (error) {
    const errorMessage = (error as Error).message || "Error desconocido";
    console.error("Error al eliminar el archivo:", errorMessage);
  }
}
