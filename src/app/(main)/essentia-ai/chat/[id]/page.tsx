import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getChatById, getMessagesByChatId } from "@/db/querys/chat-querys";
import { Chat } from "@/modules/chatbot/components/chat";
import { convertToUIMessages } from "@/modules/chatbot/lib/utils";
import { getUserProfileData } from "@/utils/profile";

export interface ChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(
  props: ChatPageProps,
): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;
  const session = await auth();

  if (!session?.user) {
    return {};
  }

  const chat = await getChatById({ id });
  return {
    title: chat?.title.slice(0, 50) ?? "Chat",
  };
}

export default async function ChatPage(props: ChatPageProps) {
  const params = await props.params;

  const { id } = params;

  const chat = await getChatById({ id });

  if (!chat) {
    redirect("/essentia-ai");
  }

  const session = await auth();

  const isOwnChat = chat?.userId === session?.user?.id;

  const profileData = !isOwnChat
    ? await getUserProfileData({ userId: chat.userId, isOwn: false })
    : session
      ? await getUserProfileData({ session })
      : null;

  if (chat.visibility === "private") {
    if (!session || !session.user) {
      return notFound();
    }

    if (session.user.id !== chat.userId) {
      return notFound();
    }
  }

  const messagesFromDb = await getMessagesByChatId({
    id,
  });

  return (
    <Chat
      id={chat.id}
      chat={chat}
      initialMessages={convertToUIMessages(messagesFromDb)}
      isReadonly={session?.user?.id !== chat.userId}
      selectedVisibilityType={chat.visibility}
      session={session}
      user={profileData}
    />
  );
}
