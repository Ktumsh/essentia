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
    <div className="flex h-full flex-col text-main dark:text-main-dark">
      <div className="flex items-center gap-2 p-4">
        <h4 className="text-sm font-medium">Historial de chat</h4>
      </div>
      <div className="mb-2 px-2">
        <Link
          className="inline-flex h-10 w-full items-center justify-start whitespace-nowrap rounded-md border border-gray-200 bg-gray-50 px-4 py-2 font-motivasans text-sm font-medium shadow-none transition-colors hover:bg-gray-100 hover:text-main focus-visible:outline-none dark:border-dark dark:bg-dark/50 dark:hover:bg-dark dark:hover:text-white"
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
