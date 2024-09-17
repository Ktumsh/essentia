import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getChat, getMissingKeys } from "../../actions";
import { auth } from "@@/auth";
import { AI } from "@/modules/chatbot/chat/actions";
import { Chat } from "@/modules/chatbot/componentes/chat";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

export interface ChatPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ChatPageProps): Promise<Metadata> {
  const session = (await auth()) as Session;

  if (!session?.user) {
    return {};
  }

  const chat = await getChat(params.id, session.user.id);
  return {
    title: chat?.title.slice(0, 50) ?? "Chat",
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = (await auth()) as Session;
  const missingKeys = await getMissingKeys();
  const profileData = session ? await getUserProfileData(session) : null;

  if (!session?.user) {
    redirect(`/login?get=/chat/${params.id}`);
  }

  const userId = session.user.id;
  const chat = await getChat(params.id, userId);

  if (!chat) {
    redirect("/essentia-ai");
  }

  if (chat?.user_id !== userId) {
    notFound();
  }

  return (
    <AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
      <Chat
        id={chat.id}
        session={session as any}
        initialMessages={chat.messages}
        missingKeys={missingKeys}
        profileData={profileData}
      />
    </AI>
  );
}
