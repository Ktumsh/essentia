import { ChatModelProvider } from "@/hooks/use-chat-model";

export const experimental_ppr = true;

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatModelProvider>{children}</ChatModelProvider>;
}
