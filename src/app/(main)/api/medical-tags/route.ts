import { NextResponse } from "next/server";

import { auth } from "@/app/(auth)/auth";
import { getMedicalTags } from "@/db/querys/medical-history-querys";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return Response.json("No autorizado", { status: 401 });
    }

    const tags = await getMedicalTags();
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error en GET /api/medical-tags:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener los tags." },
      { status: 500 },
    );
  }
}
