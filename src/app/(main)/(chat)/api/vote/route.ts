import { auth } from "@/app/(auth)/auth";
import { getVotesByChatId, voteMessage } from "@/db/querys/chat-querys";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return new Response("chatId es requerido", { status: 400 });
  }

  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return new Response("No autorizado", { status: 401 });
  }

  const votes = await getVotesByChatId({ id: chatId });

  return Response.json(votes, { status: 200 });
}

export async function PATCH(request: Request) {
  const {
    chatId,
    messageId,
    type,
  }: { chatId: string; messageId: string; type: "up" | "down" } =
    await request.json();

  if (!chatId || !messageId || !type) {
    return new Response("messageId y type son requeridos", { status: 400 });
  }

  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return new Response("No autorizado", { status: 401 });
  }

  await voteMessage({
    chatId,
    messageId,
    type: type,
  });

  return new Response("Mensaje votado", { status: 200 });
}
