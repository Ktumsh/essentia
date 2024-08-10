import ChatSidebar from "@/modules/chatbot/componentes/chat-sidebar";
import { ReactNode } from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex w-full lg:h-[calc(100dvh-56px)] h-[calc(100dvh-112px)] mt-14 text-white overflow-hidden">
      <ChatSidebar />
      {children}
    </div>
  );
}
