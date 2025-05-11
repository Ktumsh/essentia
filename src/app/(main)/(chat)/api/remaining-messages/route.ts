import { NextResponse } from "next/server";

import { auth } from "@/app/(auth)/auth";
import { getRemainingMessages } from "@/db/querys/chat-querys";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const remaining = await getRemainingMessages(session.user.id);
    return NextResponse.json(remaining);
  } catch (error) {
    console.error("Error al obtener los mensajes restantes:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
