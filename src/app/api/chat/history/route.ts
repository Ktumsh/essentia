import { getChats } from "@/db/chat-querys";
import { Session } from "@/types/session";
import { auth } from "@/app/(auth)/auth";

export async function GET() {
  const session = (await auth()) as Session;

  if (!session || !session.user) {
    return Response.json("Unauthorized!", { status: 401 });
  }

  const chats = await getChats(session.user.id);
  return Response.json(chats);
}
