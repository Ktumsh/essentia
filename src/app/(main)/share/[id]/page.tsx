import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getSharedChat } from "@/app/(main)/essentia-ai/actions";
import {
  AI,
  getUIStateFromAIState,
  UIState,
} from "@/modules/chatbot/chat/actions";
import { formatDate } from "@/utils/format";
import ChatList from "@/modules/chatbot/componentes/chat-list";
import FooterText from "@/modules/chatbot/componentes/footer-text";

export const runtime = "edge";
export const preferredRegion = "home";

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
    title: chat?.title.slice(0, 50) + "..." ?? "Chat",
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const chat = await getSharedChat(params.id);

  if (!chat || !chat?.share_path) {
    notFound();
  }

  const uiState: UIState = getUIStateFromAIState(chat);

  return (
    <>
      <div className="flex-1 space-y-6 mt-14">
        <div className="border-b border-gray-50 dark:border-white/10 px-4 py-6 md:px-6 md:py-8">
          <div className="mx-auto max-w-2xl">
            <div className="space-y-1 md:-mx-8">
              <h1 className="text-2xl font-bold text-base-color dark:text-base-color-dark">
                {chat.title}
              </h1>
              <div className="text-sm text-base-color-d dark:text-base-color-dark-d">
                {formatDate(chat.created_at)} · {chat.messages.length} mensajes
              </div>
            </div>
          </div>
        </div>
        <AI>
          <ChatList messages={uiState} isShared={true} />
        </AI>
      </div>
      <FooterText className="py-8" />
    </>
  );
}
