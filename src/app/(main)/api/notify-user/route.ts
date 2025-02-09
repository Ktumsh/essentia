import { NextResponse } from "next/server";

import { notifyUsersWithoutCourse } from "@/db/querys/notification-querys";

export async function POST() {
  try {
    await notifyUsersWithoutCourse();
    return NextResponse.json(
      { message: "Notificaciones enviadas correctamente." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error al enviar notificaciones:", error);
    return NextResponse.json(
      { message: "Error al enviar notificaciones." },
      { status: 500 },
    );
  }
}
