import { auth } from "@/app/(auth)/auth";
import { getUserMedicalFolders } from "@/db/querys/medical-folder-querys";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json("No autorizado", { status: 401 });
  }
  const userId = session.user.id!;

  try {
    const folders = await getUserMedicalFolders(userId);
    return Response.json(folders);
  } catch (error) {
    console.error("Error en GET /api/medical-folders:", error);
    return Response.json(
      { error: "No se pudo obtener las carpetas." },
      { status: 500 },
    );
  }
}
