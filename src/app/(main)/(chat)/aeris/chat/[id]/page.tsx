import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getChatById, getMessagesByChatId } from "@/db/querys/chat-querys";
import { getUserData } from "@/utils/profile";

import { Chat } from "../../../_components/chat";
import { convertToUIMessages } from "../../../_lib/utils";

interface ChatPageProps {
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
    redirect("/aeris");
  }

  const session = await auth();

  const isOwnChat = chat?.userId === session?.user?.id;

  const userData = !isOwnChat
    ? await getUserData({ userId: chat.userId })
    : session?.user?.id
      ? await getUserData({ userId: session.user.id })
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
      initialMessages={convertToUIMessages(messagesFromDb)}
      initialVisibilityType={chat.visibility}
      session={session}
      user={userData}
      isReadonly={session?.user?.id !== chat.userId}
      autoResume={true}
    />
  );
}
