import { Sidebar } from "./sidebar";
import ChatHistory from "./chat-history";
import { auth } from "@@/auth";
import { Session } from "@/types/session";
import { getChats } from "@/app/(main)/essentia-ai/actions";

const ChatSidebar = async () => {
  const session = (await auth()) as Session;

  if (!session?.user?.id) {
    return null;
  }

  const chats = await getChats(session.user.id);

  return (
    <Sidebar className="peer absolute inset-y-0 pt-14 z-30 hidden lg:flex lg:w-[250px] xl:w-[300px] -translate-x-full border-r border-gray-200 dark:border-base-dark bg-white dark:bg-base-full-dark duration-300 ease-in-out data-[state=open]:translate-x-0">
      <ChatHistory chats={chats} />
    </Sidebar>
  );
};

export default ChatSidebar;
