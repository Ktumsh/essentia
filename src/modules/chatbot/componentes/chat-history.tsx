import Link from "next/link";
import { FC, Suspense } from "react";
import SidebarList from "./sidebar-list";
import { NewIcon } from "@/modules/icons/action";

interface ChatHistoryProps {
  userId?: string;
}

const ChatHistory: FC<ChatHistoryProps> = ({ userId }) => {
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
      <Suspense
        fallback={
          <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-gray-100 dark:bg-base-dark"
              />
            ))}
          </div>
        }
      >
        <SidebarList userId={userId} />
      </Suspense>
    </div>
  );
};

export default ChatHistory;
