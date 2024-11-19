import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { KeyedMutator } from "swr";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { groupChatsByDate } from "@/modules/chatbot/lib/utils";
import ChatItem from "@/modules/core/components/ui/sidebar/chat-item";
import { Chat } from "@/types/chat";

interface ChatHistoryProps {
  history?: Chat[];
  mutate: KeyedMutator<Chat[]>;
}

const ChatHistory = ({ history, mutate }: ChatHistoryProps) => {
  const pathname = usePathname();

  const ChatDateTitle = ({ day }: { day: string }) => {
    return (
      <SidebarGroupLabel className="sticky top-0 z-10 mt-4 text-nowrap bg-white p-2 first:mt-0 group-data-[collapsible=icon]:mt-4 first:group-data-[collapsible=icon]:mt-0 dark:bg-full-dark">
        {day}
      </SidebarGroupLabel>
    );
  };

  if (history?.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="flex items-center justify-center">
            <p className="text-sm text-main-l dark:text-main-dark-l">
              Sin historial de chat
            </p>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  } else {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {history &&
              (() => {
                const groupedChats = groupChatsByDate(history);

                if (groupedChats) {
                  return (
                    <AnimatePresence>
                      {groupedChats.today.length > 0 && (
                        <Fragment key="today-group">
                          <ChatDateTitle day="Hoy" />
                          {groupedChats.today.map((chat, index) => {
                            return (
                              <motion.div key={chat.id}>
                                <ChatItem
                                  index={index}
                                  chat={chat}
                                  isActive={pathname === chat.path}
                                  mutate={mutate}
                                />
                              </motion.div>
                            );
                          })}
                        </Fragment>
                      )}
                      {groupedChats.yesterday.length > 0 && (
                        <Fragment key="yesterday-group">
                          <ChatDateTitle day="Ayer" />
                          {groupedChats.yesterday.map((chat, index) => {
                            return (
                              <motion.div key={chat.id}>
                                <ChatItem
                                  index={index}
                                  chat={chat}
                                  isActive={pathname === chat.path}
                                  mutate={mutate}
                                />
                              </motion.div>
                            );
                          })}
                        </Fragment>
                      )}
                      {groupedChats.lastWeek.length > 0 && (
                        <Fragment key="lastWeek-group">
                          <ChatDateTitle day="Última semana" />
                          {groupedChats.lastWeek.map((chat, index) => {
                            return (
                              <motion.div key={chat.id}>
                                <ChatItem
                                  index={index}
                                  chat={chat}
                                  isActive={pathname === chat.path}
                                  mutate={mutate}
                                />
                              </motion.div>
                            );
                          })}
                        </Fragment>
                      )}
                      {groupedChats.lastMonth.length > 0 && (
                        <Fragment key="lastMonth-group">
                          <ChatDateTitle day="Último mes" />
                          {groupedChats.lastMonth.map((chat, index) => {
                            return (
                              <motion.div key={chat.id}>
                                <ChatItem
                                  index={index}
                                  chat={chat}
                                  isActive={pathname === chat.path}
                                  mutate={mutate}
                                />
                              </motion.div>
                            );
                          })}
                        </Fragment>
                      )}
                      {groupedChats.older.length > 0 && (
                        <Fragment key="older-group">
                          <ChatDateTitle day="Antiguo" />
                          {groupedChats.older.map((chat, index) => {
                            return (
                              <motion.div key={chat.id}>
                                <ChatItem
                                  index={index}
                                  chat={chat}
                                  isActive={pathname === chat.path}
                                  mutate={mutate}
                                />
                              </motion.div>
                            );
                          })}
                        </Fragment>
                      )}
                    </AnimatePresence>
                  );
                }
              })()}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }
};

export default ChatHistory;
