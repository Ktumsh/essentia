import dynamic from "next/dynamic";
import Link from "next/link";
import { FC } from "react";
import { KeyedMutator } from "swr";

import { NewIcon } from "@/modules/icons/action";
import { Chat } from "@/types/chat";

import HistoryLoading from "../components/ui/history-loading";

const SidebarList = dynamic(() => import("./sidebar-list"), {
  loading: () => <HistoryLoading hideHeader={true} />,
});

interface ChatHistoryProps {
  chats?: Chat[];
  mutate: KeyedMutator<Chat[]>;
}

const ChatHistory: FC<ChatHistoryProps> = ({ chats, mutate }) => {
  return (
    <div className="flex flex-col h-full text-main dark:text-main-dark">
      <div className="flex items-center p-4 gap-2">
        <h4 className="text-sm font-medium">Historial de chat</h4>
      </div>
      <div className="mb-2 px-2">
        <Link
          className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium font-motivasans focus-visible:outline-none border border-gray-200 dark:border-dark hover:text-main dark:hover:text-white py-2 h-10 w-full justify-start bg-gray-50 px-4 shadow-none transition-colors hover:bg-gray-100 dark:bg-dark/50 dark:hover:bg-dark"
          href="/essentia-ai"
        >
          <NewIcon className="size-4 -translate-x-2 stroke-2" />
          Nuevo chat
        </Link>
      </div>
      <SidebarList chats={chats} mutate={mutate} />
    </div>
  );
};

export default ChatHistory;
