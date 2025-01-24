import { NextResponse } from "next/server";

import { getUserNotifications } from "@/db/querys/notification-querys";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Falta el ID del usuario" },
      { status: 400 },
    );
  }

  try {
    const notifications = await getUserNotifications(userId);
    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    return NextResponse.json(
      { error: "Error al obtener las notificaciones" },
      { status: 500 },
    );
  }
}
