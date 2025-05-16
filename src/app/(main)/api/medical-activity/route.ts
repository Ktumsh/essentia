import { auth } from "@/app/(auth)/auth";
import { getUserMedicalFolderActivity } from "@/db/querys/medical-folder-querys";
import { getMedicalHistoryActivityWithDetails } from "@/db/querys/medical-history-querys";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return Response.json("No autorizado", { status: 401 });
    }

    const userId = session.user.id!;

    const [documentActivity, folderActivity] = await Promise.all([
      getMedicalHistoryActivityWithDetails({ userId }),
      getUserMedicalFolderActivity(userId),
    ]);

    const unifiedActivity = [
      ...documentActivity.map((item) => ({
        ...item,
        source: "document" as const,
      })),
      ...folderActivity.map((item) => ({
        ...item,
        source: "folder" as const,
      })),
    ].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return Response.json(unifiedActivity);
  } catch (error) {
    console.error("Error en GET /api/medical-activity:", error);
    return Response.json(
      { error: "No se pudo obtener la actividad médica." },
      { status: 500 },
    );
  }
}
