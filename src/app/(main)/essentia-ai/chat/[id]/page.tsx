import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import {
  getChatById,
  getMessagesByChatId,
  getMissingKeys,
} from "@/db/querys/chat-querys";
import { getSubscription } from "@/db/querys/payment-querys";
import { Chat as PreviewChat } from "@/modules/chatbot/components/chat";
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

  const missingKeys = await getMissingKeys();

  const session = await auth();

  const profileData = session ? await getUserProfileData(session) : null;

  const [subscription] = await getSubscription(session?.user?.id as string);

  const isPremium = subscription.isPremium || false;

  if (!chat) {
    notFound();
  }

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

  if (!messagesFromDb) {
    redirect("/essentia-ai");
  }

  return (
    <PreviewChat
      id={chat.id}
      initialMessages={convertToUIMessages(messagesFromDb)}
      missingKeys={missingKeys}
      session={session}
      user={profileData}
      isPremium={isPremium}
      isReadonly={session?.user?.id !== chat.userId}
    />
  );
}
