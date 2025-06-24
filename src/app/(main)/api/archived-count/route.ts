import { NextResponse } from "next/server";

import { auth } from "@/app/(auth)/auth";
import { getArchivedDocuments } from "@/db/querys/medical-history-querys";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const count = await getArchivedDocuments(session.user.id);
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching archived document count:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
