import { ipAddress } from "@vercel/functions";
import { NextResponse, type NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const ip = ipAddress(request);
  return NextResponse.json({ ip });
}
