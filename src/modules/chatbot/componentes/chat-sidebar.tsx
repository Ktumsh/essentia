import { Sidebar } from "./sidebar";
import ChatHistory from "./chat-history";
import { auth } from "@@/auth";

const ChatSidebar = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return (
    <Sidebar className="peer absolute inset-y-0 pt-14 z-30 hidden -translate-x-full border-r border-gray-200 dark:border-base-dark bg-white dark:bg-base-full-dark duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <ChatHistory userId={session.user.id} />
    </Sidebar>
  );
};

export default ChatSidebar;
