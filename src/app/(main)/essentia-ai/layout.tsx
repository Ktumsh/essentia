import ChatSidebar from "@/modules/chatbot/components/chat-sidebar";
import { Session } from "@/types/session";
import { auth } from "@/app/(auth)/auth";
import { ReactNode } from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const session = (await auth()) as Session;
  return (
    <div className="flex w-full lg:h-[calc(100dvh-56px)] h-[calc(100dvh-112px)] mt-14 text-white overflow-hidden">
      <ChatSidebar session={session} />
      {children}
    </div>
  );
}
