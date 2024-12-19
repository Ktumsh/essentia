"use server";

import { revalidatePath } from "next/cache";

import { deleteUserPhoto } from "@/db/querys/profile-querys";

export async function deleteFile(userId: string) {
  try {
    if (!userId) {
      throw new Error("ID de usuario es requerido");
    }

    await deleteUserPhoto(userId);

    revalidatePath("/profile");

    return {
      success: true,
      message: "Foto de perfil eliminada correctamente.",
    };
  } catch (error) {
    const errorMessage = (error as Error).message || "Error desconocido";
    console.error("Error al eliminar el archivo:", errorMessage);
  }
}
