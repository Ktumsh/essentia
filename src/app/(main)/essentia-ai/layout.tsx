import ChatSidebar from "@/modules/chatbot/componentes/chat-sidebar";
import { ReactNode } from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex size-full lg:h-[calc(100dvh-80px)] mt-20 sm:mt-0 text-white overflow-hidden">
      <ChatSidebar />
      {children}
    </div>
  );
}
