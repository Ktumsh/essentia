import { CoreMessage } from "ai";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getSharedChat } from "@/db/chat-querys";
import ChatList from "@/modules/chatbot/components/chat-list";
import FooterText from "@/modules/chatbot/components/ui/footer-text";
import { convertToUIMessages } from "@/modules/chatbot/lib/utils";
import { Chat } from "@/types/chat";
import { Session } from "@/types/session";
import { formatDate } from "@/utils/format";
import { getUserProfileData } from "@/utils/profile";

interface SharePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const chat = await getSharedChat(params.id);

  return {
    title: chat.title ? chat.title.slice(0, 50) + "..." : "Chat",
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { id } = params;
  const chatFromDb = await getSharedChat(id);
  const chat: Chat = {
    ...chatFromDb,
    messages: convertToUIMessages(chatFromDb.messages as Array<CoreMessage>),
  };

  const session = (await auth()) as Session;

  const profileData = session ? await getUserProfileData(session) : null;

  if (!chat || !chat?.share_path) {
    notFound();
  }

  return (
    <>
      <div className="flex-1 space-y-6 mt-14">
        <div className="border-b border-gray-50 dark:border-white/10 px-4 py-6 md:px-6 md:py-8">
          <div className="mx-auto max-w-2xl">
            <div className="space-y-1 md:-mx-8">
              <h1 className="text-2xl font-bold text-base-color dark:text-base-color-dark">
                {chat.title}
              </h1>
              <div className="text-sm text-base-color-m dark:text-base-color-dark-m">
                {formatDate(chat.created_at, "dd 'de' MMMM 'de' yyyy")} ·{" "}
                {chat.messages.length} mensajes
              </div>
            </div>
          </div>
        </div>
        <ChatList
          messages={chat.messages}
          isShared={true}
          profileData={profileData}
        />
      </div>
      <FooterText className="py-8" />
    </>
  );
}
