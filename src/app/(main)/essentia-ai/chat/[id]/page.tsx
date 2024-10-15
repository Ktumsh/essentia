import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import { Chat as PreviewChat } from "@/modules/chatbot/components/chat";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import { getUserById } from "@/db/actions";
import { getChat, getMissingKeys } from "@/db/chat-querys";
import { CoreMessage } from "ai";
import { Chat } from "@/types/chat";
import { convertToUIMessages } from "@/modules/chatbot/lib/utils";

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
