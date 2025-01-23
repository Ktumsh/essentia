import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { auth } from "@/app/(auth)/auth";
import { getUserTasks } from "@/db/querys/task-querys";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    const tasks = await getUserTasks(userId);

    revalidatePath("/", "layout");

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    return NextResponse.json(
      { error: "Error al obtener las tareas" },
      { status: 500 },
    );
  }
}
