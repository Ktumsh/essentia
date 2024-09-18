import { clearChats } from "@/app/(main)/essentia-ai/actions";
import ClearHistory from "./clear-history";
import { SidebarItems } from "./sidebar-items";
import { Chat } from "@/types/chat";
import { groupChatsByDate } from "../lib/utils";
import { Fragment } from "react";

interface SidebarListProps {
  chats: Chat[];
}

const SidebarList = ({ chats }: SidebarListProps) => {
  const {
    todayChats,
    yesterdayChats,
    last7DaysChats,
    last30DaysChats,
    olderChats,
  } = groupChatsByDate(chats);

  const ChatDateTitle = ({ day }: { day: string }) => {
    return (
      <div className="sticky top-0 z-20">
        <span className="flex items-center">
          <h3 className="p-2 text-xs break-all truncate text-base-color-m dark:text-base-color-dark-m">
            {day}
          </h3>
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="relative flex-1 overflow-auto">
        {chats?.length ? (
          <div className="space-y-5 px-2">
            {todayChats.length > 0 && (
              <div className="relative">
                <ChatDateTitle day="Hoy" />
                <SidebarItems chats={todayChats} />
              </div>
            )}

            {yesterdayChats.length > 0 && (
              <div className="relative">
                <ChatDateTitle day="Ayer" />
                <SidebarItems chats={yesterdayChats} />
              </div>
            )}

            {last7DaysChats.length > 0 && (
              <div className="relative">
                <ChatDateTitle day="Últimos 7 días" />
                <SidebarItems chats={last7DaysChats} />
              </div>
            )}

            {last30DaysChats.length > 0 && (
              <div className="relative">
                <ChatDateTitle day="Últimos 30 días" />
                <SidebarItems chats={last30DaysChats} />
              </div>
            )}

            {Object.keys(olderChats).map((monthYear) => (
              <div key={monthYear} className="relative">
                <ChatDateTitle day={monthYear} />
                <SidebarItems chats={olderChats[monthYear]} />
              </div>
            ))}
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
        <ClearHistory clearChats={clearChats} isEnabled={chats.length > 0} />
      </div>
    </div>
  );
};

export default SidebarList;
