import { NextResponse } from "next/server";
import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET() {
  const deleteResult = await pool.sql`
      DELETE FROM users
      WHERE email_verified = FALSE
      AND created_at < NOW() - INTERVAL '7 days';
    `;

  console.log(
    `Se eliminaron ${deleteResult.rowCount} usuarios no verificados.`
  );

  return NextResponse.json({ message: "Usuarios no verificados eliminados" });
}
