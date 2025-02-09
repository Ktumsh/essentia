import { NextResponse } from "next/server";

import { getChatTitle } from "@/db/querys/chat-querys";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "No se proporcionó chatId" },
      { status: 400 },
    );
  }

  try {
    const chatTitle = await getChatTitle({ id });
    if (!chatTitle) {
      return NextResponse.json(
        { error: "Chat no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json({ title: chatTitle }, { status: 200 });
  } catch (error) {
    console.error("Error en getChatTitle API:", error);
    return NextResponse.json(
      { error: "Error al obtener el título del chat" },
      { status: 500 },
    );
  }
}
