import { auth } from "@/app/(auth)/auth";
import { getChats } from "@/db/chat-querys";
import { Session } from "@/types/session";

export async function GET() {
  const session = (await auth()) as Session;

  if (!session || !session.user) {
    return Response.json("Unauthorized!", { status: 401 });
  }

  const chats = await getChats(session.user.id);
  return Response.json(chats);
}
