import { KeyedMutator } from "swr";

import { clearChats } from "@/db/chat-querys";
import { Chat } from "@/types/chat";

import ClearHistory from "./clear-history";
import { SidebarItems } from "./sidebar-items";
import { groupChatsByDate } from "../lib/utils";

interface SidebarListProps {
  chats?: Chat[];
  mutate: KeyedMutator<Chat[]>;
}

const SidebarList = ({ chats, mutate }: SidebarListProps) => {
  const {
    todayChats,
    yesterdayChats,
    last7DaysChats,
    last30DaysChats,
    olderChats,
  } = groupChatsByDate(chats);

  const ChatDateTitle = ({ day }: { day: string }) => {
    return (
      <div className="sticky top-0 z-20 bg-white dark:bg-full-dark">
        <span className="flex items-center">
          <h3 className="truncate break-all p-2 text-xs text-main-m dark:text-main-dark-m">
            {day}
          </h3>
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="custom-scroll v2 relative flex-1 overflow-auto">
        {chats?.length ? (
          <div className="space-y-5 px-2">
            {todayChats.length > 0 && (
              <div className="relative">
                <ChatDateTitle day="Hoy" />
                <SidebarItems chats={todayChats} mutate={mutate} />
              </div>
            )}

            {yesterdayChats.length > 0 && (
              <div className="relative">
                <ChatDateTitle day="Ayer" />
                <SidebarItems chats={yesterdayChats} mutate={mutate} />
              </div>
            )}

            {last7DaysChats.length > 0 && (
              <div className="relative">
                <ChatDateTitle day="Últimos 7 días" />
                <SidebarItems chats={last7DaysChats} mutate={mutate} />
              </div>
            )}

            {last30DaysChats.length > 0 && (
              <div className="relative">
                <ChatDateTitle day="Últimos 30 días" />
                <SidebarItems chats={last30DaysChats} mutate={mutate} />
              </div>
            )}

            {Object.keys(olderChats).map((monthYear) => (
              <div key={monthYear} className="relative">
                <ChatDateTitle day={monthYear} />
                <SidebarItems chats={olderChats[monthYear]} mutate={mutate} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-main-l dark:text-main-dark-l">
              Sin historial de chat
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <ClearHistory
          clearChats={clearChats}
          isEnabled={chats ? chats.length > 0 : false}
        />
      </div>
    </div>
  );
};

export default SidebarList;
