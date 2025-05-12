import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { chatMessage, chatTool } from "@/db/schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

async function seed() {
  // 1) Trae todos los mensajes con sus parts
  const messages = await db
    .select({
      id: chatMessage.id,
      parts: chatMessage.parts,
      createdAt: chatMessage.createdAt,
    })
    .from(chatMessage)
    .execute();

  const rowsToInsert: Array<{
    chatMessageId: string;
    toolName: string;
    toolCallId: string;
    args: any;
    result: any;
    createdAt: Date;
  }> = [];

  // 2) Recorre cada mensaje y extrae las invocaciones
  for (const msg of messages) {
    for (const part of msg.parts as any[]) {
      if (part.type === "tool-invocation") {
        const ti = part.toolInvocation;
        rowsToInsert.push({
          chatMessageId: msg.id,
          toolName: ti.toolName,
          toolCallId: ti.toolCallId,
          args: ti.args,
          result: ti.result,
          createdAt: msg.createdAt, // o usa ti.result.assessmentDate si prefieres
        });
      }
    }
  }

  // 3) Inserta todo en batch
  if (rowsToInsert.length > 0) {
    await db.insert(chatTool).values(rowsToInsert).onConflictDoNothing();
    console.log(
      `✅ Insertadas ${rowsToInsert.length} filas en tool_invocation`,
    );
  } else {
    console.log("⚠️ No se encontraron invocaciones para insertar");
  }
}

seed()
  .then(() => {
    console.log("Seed completada");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error en seed:", err);
    process.exit(1);
  });
