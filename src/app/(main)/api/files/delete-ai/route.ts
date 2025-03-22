import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/app/(auth)/auth";

const DeleteSchema = z.object({
  filePath: z.string(),
});

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { filePath } = await request.json();
    const parsed = DeleteSchema.safeParse({ filePath });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    try {
      await del(filePath);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error al eliminar el blob", error);
      return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
