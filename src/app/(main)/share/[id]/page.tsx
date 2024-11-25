import { CoreMessage } from "ai";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getSharedChat } from "@/db/chat-querys";
import FooterText from "@/modules/chatbot/components/ui/footer-text";
import PreviewMessage from "@/modules/chatbot/components/ui/message";
import { convertToUIMessages } from "@/modules/chatbot/lib/utils";
import { Chat } from "@/types/chat";
import { Session } from "@/types/session";
import { formatDate } from "@/utils/format";
import { getUserProfileData } from "@/utils/profile";

interface SharePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(
  props: SharePageProps,
): Promise<Metadata> {
  const params = await props.params;
  const chat = await getSharedChat(params.id);

  return {
    title: chat.title ? chat.title.slice(0, 50) + "..." : "Chat",
  };
}

export default async function SharePage(props: SharePageProps) {
  const params = await props.params;
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
      <div className="flex-1 space-y-6">
        <div className="border-b border-gray-50 px-4 py-6 dark:border-white/10 md:px-6 md:py-8">
          <div className="mx-auto max-w-2xl">
            <div className="space-y-1 md:-mx-8">
              <h1 className="text-2xl font-bold text-main dark:text-main-dark">
                {chat.title}
              </h1>
              <div className="text-sm text-main-m dark:text-main-dark-m">
                {formatDate(chat.created_at, "dd 'de' MMMM 'de' yyyy")} ·{" "}
                {chat.messages.length} mensajes
              </div>
            </div>
          </div>
        </div>
        {chat.messages.map((message, index) => (
          <PreviewMessage
            key={`${message.id}-${index}`}
            message={message}
            profileData={profileData}
            isLoading={false}
          />
        ))}
      </div>
      <FooterText className="py-8" />
    </>
  );
}
