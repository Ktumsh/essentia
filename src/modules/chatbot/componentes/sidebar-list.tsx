import { clearChats, getChats } from "@/app/(main)/essentia-ai/actions";
import { ReactNode } from "react";
import ClearHistory from "./clear-history";
import { SidebarItems } from "./sidebar-items";

interface SidebarListProps {
  userId?: string;
  children?: ReactNode;
}

const loadChats = async (userId?: string) => {
  return await getChats(userId);
};

const SidebarList = async ({ userId }: SidebarListProps) => {
  const chats = await loadChats(userId);
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {chats?.length ? (
          <div className="space-y-2 px-2">
            <SidebarItems chats={chats} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-base-color-d dark:text-base-color-dark-d">
              Sin historial de chat
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} />
      </div>
    </div>
  );
};

export default SidebarList;
