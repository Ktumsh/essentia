import { createPool } from "@vercel/postgres";
import { NextResponse } from "next/server";

import { sendEmail } from "@/modules/auth/lib/send-email";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const day1Start = new Date(
    Date.now() - 2 * 24 * 60 * 60 * 1000
  ).toISOString();
  const day1End = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString();
  const day3Start = new Date(
    Date.now() - 4 * 24 * 60 * 60 * 1000
  ).toISOString();
  const day3End = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

  console.log(`Intervalo de día 1: ${day1Start} - ${day1End}`);
  console.log(`Intervalo de día 3: ${day3Start} - ${day3End}`);

  const usersDay1 = await pool.sql`
    SELECT email, id, created_at
    FROM users
    WHERE email_verified = FALSE
    AND created_at BETWEEN ${day1Start} AND ${day1End};
  `;

  console.log(
    `Usuarios encontrados para el recordatorio de día 1: ${usersDay1.rowCount}`
  );

  for (const user of usersDay1.rows) {
    const verificationToken = user.id;
    const result = await sendEmail(user.email, verificationToken);

    if (result.success) {
      console.log(`Recordatorio enviado a ${user.email} (día 1).`);
    } else {
      console.error(
        `Error al enviar recordatorio a ${user.email} (día 1):`,
        result.error
      );
    }
  }

  const usersDay3 = await pool.sql`
    SELECT email, id, created_at
    FROM users
    WHERE email_verified = FALSE
    AND created_at BETWEEN ${day3Start} AND ${day3End};
  `;

  console.log(
    `Usuarios encontrados para el recordatorio de día 3: ${usersDay3.rowCount}`
  );

  for (const user of usersDay3.rows) {
    const verificationToken = user.id;
    const result = await sendEmail(user.email, verificationToken);

    if (result.success) {
      console.log(`Recordatorio enviado a ${user.email} (día 3).`);
    } else {
      console.error(
        `Error al enviar recordatorio a ${user.email} (día 3):`,
        result.error
      );
    }
  }

  return NextResponse.json({ message: "Recordatorios enviados" });
}
