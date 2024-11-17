import { CoreMessage } from "ai";
import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getChat, getMissingKeys } from "@/db/chat-querys";
import { getUserById } from "@/db/user-querys";
import { Chat as PreviewChat } from "@/modules/chatbot/components/chat";
import { convertToUIMessages } from "@/modules/chatbot/lib/utils";
import { Chat } from "@/types/chat";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

export interface ChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(props: ChatPageProps): Promise<Metadata> {
  const params = await props.params;
  const session = (await auth()) as Session;

  if (!session?.user) {
    return {};
  }

  const chat = await getChat(params.id, session.user.id);
  return {
    title: chat?.title.slice(0, 50) ?? "Chat",
  };
}

export default async function ChatPage(props: ChatPageProps) {
  const params = await props.params;
  const { id } = params;
  const session = (await auth()) as Session;
  const missingKeys = await getMissingKeys();
  const profileData = session ? await getUserProfileData(session) : null;
  const user = session ? await getUserById(session.user.id) : null;
  const isPremium = user?.is_premium ?? null;

  if (!session?.user) {
    redirect(`/login?get=/chat/${params.id}`);
  }

  const userId = session.user.id;
  const chatFromDb = await getChat(id, userId);

  if (!chatFromDb) {
    redirect("/essentia-ai");
  }

  const chat: Chat = {
    ...chatFromDb,
    messages: convertToUIMessages(chatFromDb.messages as Array<CoreMessage>),
  };

  if (!chat) {
    redirect("/essentia-ai");
  }

  if (chat?.user_id !== userId) {
    notFound();
  }

  return (
    <PreviewChat
      id={chat.id}
      session={session}
      initialMessages={chat.messages}
      missingKeys={missingKeys}
      profileData={profileData}
      isPremium={isPremium}
    />
  );
}
