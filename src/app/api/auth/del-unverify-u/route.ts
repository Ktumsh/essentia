import { createPool } from "@vercel/postgres";
import { NextResponse } from "next/server";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const deleteResult = await pool.sql`
    DELETE FROM users
    WHERE email_verified = FALSE
    AND DATE_TRUNC('day', created_at) <= DATE_TRUNC('day', NOW() - INTERVAL '7 days');
  `;

  console.log(
    `Se eliminaron ${deleteResult.rowCount} usuarios no verificados.`,
  );

  return NextResponse.json({ message: "Usuarios no verificados eliminados" });
}
