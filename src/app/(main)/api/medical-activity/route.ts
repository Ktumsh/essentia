import { auth } from "@/app/(auth)/auth";
import { getMedicalHistoryActivityWithDetails } from "@/db/querys/medical-history-querys";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return Response.json("No autorizado", { status: 401 });
    }

    const medicalActivity = await getMedicalHistoryActivityWithDetails({
      userId: session.user.id!,
    });
    return Response.json(medicalActivity);
  } catch (error) {
    console.error("Error en GET /api/medical-activity:", error);
    return Response.json(
      { error: "No se pudo obtener la actividad médica." },
      { status: 500 },
    );
  }
}
