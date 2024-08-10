import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getChat, getMissingKeys } from "../../actions";
import { auth } from "@@/auth";
import { AI } from "@/modules/chatbot/chat/actions";
import { Chat } from "@/modules/chatbot/componentes/chat";

export interface ChatPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ChatPageProps): Promise<Metadata> {
  const session = await auth();

  if (!session?.user) {
    return {};
  }

  const chat = await getChat(params.id, session.user.id);
  return {
    title: chat?.title.toString().slice(0, 50) ?? "Chat",
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth();
  const missingKeys = await getMissingKeys();

  if (!session?.user) {
    redirect(`/login?next=/chat/${params.id}`);
  }

  const userId = session.user.id as string;
  const chat = await getChat(params.id, userId);

  if (!chat) {
    redirect("/essentia-ai");
  }

  if (chat?.userId !== session?.user?.id) {
    notFound();
  }

  return (
    <AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
      <Chat
        id={chat.id}
        session={session as any}
        initialMessages={chat.messages}
        missingKeys={missingKeys}
      />
    </AI>
  );
}
