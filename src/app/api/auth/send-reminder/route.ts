import { NextResponse } from "next/server";

import {
  getUsersForReminder,
  sendVerificationReminderToUsers,
} from "@/db/querys/email-querys";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const day1Start = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const day1End = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
  const day3Start = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);
  const day3End = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  console.log(`Intervalo de día 1: ${day1Start} - ${day1End}`);
  console.log(`Intervalo de día 3: ${day3Start} - ${day3End}`);

  try {
    const usersDay1 = await getUsersForReminder(day1Start, day1End);
    await sendVerificationReminderToUsers(usersDay1);

    const usersDay3 = await getUsersForReminder(day3Start, day3End);
    await sendVerificationReminderToUsers(usersDay3);
  } catch (error) {
    console.error("Error al procesar recordatorios:", error);
    return NextResponse.json(
      { message: "Ocurrió un error al enviar los recordatorios." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Recordatorios enviados" });
}
