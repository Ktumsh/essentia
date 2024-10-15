import Link from "next/link";
import { FC } from "react";
import { NewIcon } from "@/modules/icons/action";
import { Chat } from "@/types/chat";
import dynamic from "next/dynamic";
import HistoryLoading from "../components/ui/history-loading";
import { KeyedMutator } from "swr";

const SidebarList = dynamic(() => import("./sidebar-list"), {
  loading: () => <HistoryLoading hideHeader={true} />,
});

interface ChatHistoryProps {
  chats?: Chat[];
  mutate: KeyedMutator<Chat[]>;
}

const ChatHistory: FC<ChatHistoryProps> = ({ chats, mutate }) => {
  return (
    <div className="flex flex-col h-full text-base-color dark:text-base-color-dark">
      <div className="flex items-center p-4 gap-2">
        <h4 className="text-sm font-medium">Historial de chat</h4>
      </div>
      <div className="mb-2 px-2">
        <Link
          className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium font-motivasans focus-visible:outline-none border border-gray-200 dark:border-base-dark hover:text-base-color dark:hover:text-white py-2 h-10 w-full justify-start bg-gray-50 px-4 shadow-none transition-colors hover:bg-gray-100 dark:bg-base-dark-50 dark:hover:bg-base-dark"
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
