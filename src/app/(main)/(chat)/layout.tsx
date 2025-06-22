import { ChatModelProvider } from "@/hooks/use-chat-model";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatModelProvider>{children}</ChatModelProvider>;
}
