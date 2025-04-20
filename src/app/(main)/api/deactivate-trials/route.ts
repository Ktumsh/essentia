import { NextResponse } from "next/server";

import { deactivateExpiredTrials } from "@/db/querys/user-querys";

const CRON_SECRET = process.env.CRON_SECRET!;

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    await deactivateExpiredTrials();
    return new NextResponse("Expired trials deactivated", { status: 200 });
  } catch (err) {
    console.error("[CRON ERROR]", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
