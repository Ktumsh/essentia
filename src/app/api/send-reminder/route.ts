import { NextResponse } from "next/server";
import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET() {
  const usersDay1 = await pool.sql`
      SELECT email, id
      FROM users
      WHERE email_verified = FALSE
      AND created_at = NOW() - INTERVAL '1 day';
    `;

  for (const user of usersDay1.rows) {
    const verificationToken = user.id;

    const response = await fetch("/api/auth/send-verification-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        token: verificationToken,
      }),
    });

    const result = await response.json();

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
      AND created_at = NOW() - INTERVAL '3 days';
    `;

  for (const user of usersDay3.rows) {
    const verificationToken = user.id;

    const response = await fetch("/api/auth/send-verification-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        token: verificationToken,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log(`Recordatorio enviado a ${user.email} (día 3).`);
    } else {
      console.error(`Error al enviar recordatorio a ${user.email} (día 3).`);
    }
  }

  return NextResponse.json({ message: "Recordatorios enviados" });
}
