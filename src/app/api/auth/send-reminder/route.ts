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

  const usersDay1 = await pool.sql`
      SELECT email, id
      FROM users
      WHERE email_verified = FALSE
      AND created_at BETWEEN NOW() - INTERVAL '2 days' AND NOW() - INTERVAL '1 day';
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
      console.error(`Error al enviar recordatorio a ${user.email} (día 1).`);
    }
  }

  const usersDay3 = await pool.sql`
      SELECT email, id
      FROM users
      WHERE email_verified = FALSE
      AND created_at BETWEEN NOW() - INTERVAL '4 days' AND NOW() - INTERVAL '3 days';
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
      console.error(`Error al enviar recordatorio a ${user.email} (día 3).`);
    }
  }

  return NextResponse.json({ message: "Recordatorios enviados" });
}
