import { NextResponse } from "next/server";

import { auth } from "@/app/(auth)/auth";
import { getUserAiRecommendationUsage } from "@/db/querys/ai-recommendations-querys";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const usage = await getUserAiRecommendationUsage(session.user.id);

    return NextResponse.json({ usage });
  } catch (error) {
    console.error("Error al obtener el uso de recomendaciones AI:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
