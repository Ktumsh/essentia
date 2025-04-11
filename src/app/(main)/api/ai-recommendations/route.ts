import { NextResponse } from "next/server";

import { auth } from "@/app/(auth)/auth";
import { getSavedAiRecommendations } from "@/db/querys/ai-recommendations-querys";

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json("No autorizado", { status: 401 });
  }

  try {
    const data = await getSavedAiRecommendations(session.user.id!);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error al obtener recomendaciones IA:", error);
    return NextResponse.json(
      { error: "Error al obtener recomendaciones" },
      { status: 500 },
    );
  }
}
