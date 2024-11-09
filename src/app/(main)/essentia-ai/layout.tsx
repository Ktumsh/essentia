import { ReactNode } from "react";

import { auth } from "@/app/(auth)/auth";
import ChatSidebar from "@/modules/chatbot/components/chat-sidebar";
import { Session } from "@/types/session";

interface ChatLayoutProps {
  children: ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const session = (await auth()) as Session;
  return (
    <div className="mt-14 flex h-[calc(100dvh-112px)] w-full overflow-hidden text-white lg:h-[calc(100dvh-56px)]">
      <ChatSidebar session={session} />
      {children}
    </div>
  );
}
