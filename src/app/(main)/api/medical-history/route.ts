import { auth } from "@/app/(auth)/auth";
import { getMedicalHistoryWithTags } from "@/db/querys/medical-history-querys";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return Response.json("No autorizado", { status: 401 });
    }

    const medicalHistory = await getMedicalHistoryWithTags({
      userId: session.user.id!,
    });
    return Response.json(medicalHistory);
  } catch (error) {
    console.error("Error en GET /api/medical-history:", error);
    return Response.json(
      { error: "No se pudo obtener el historial médico." },
      { status: 500 },
    );
  }
}
