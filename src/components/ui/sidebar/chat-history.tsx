import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import { KeyedMutator } from "swr";

import { groupChatsByDate } from "@/app/(main)/(chat)/_lib/utils";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/kit/sidebar";
import { useChatContext } from "@/hooks/use-chat-context";

import ChatItem from "./chat-item";

import type { Chat } from "@/db/schema";

interface ChatHistoryProps {
  history?: Chat[];
  mutate: KeyedMutator<Chat[]>;
}

const ChatHistory = ({ history, mutate }: ChatHistoryProps) => {
  const { id } = useParams();

  const { activeChatId } = useChatContext();

  const ChatDateTitle = ({ day }: { day: string }) => {
    return (
      <SidebarGroupLabel className="bg-popover md:bg-background sticky top-0 z-1 mt-4 p-2 text-nowrap group-data-[collapsible=icon]:mt-6 first:mt-0 group-data-[collapsible=icon]:first:mt-0">
        {day}
      </SidebarGroupLabel>
    );
  };

  if (history?.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="flex items-center justify-center">
            <p className="text-muted-foreground text-sm text-nowrap">
              Sin historial de chat
            </p>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  } else {
    return (
      <SidebarGroup className="pt-0">
        <SidebarGroupContent>
          <SidebarMenu className="md:max-w-[197px]">
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
                                  isActive={
                                    chat.id === id || chat.id === activeChatId
                                  }
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
                                  isActive={
                                    chat.id === id || chat.id === activeChatId
                                  }
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
                                  isActive={
                                    chat.id === id || chat.id === activeChatId
                                  }
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
                                  isActive={
                                    chat.id === id || chat.id === activeChatId
                                  }
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
                                  isActive={
                                    chat.id === id || chat.id === activeChatId
                                  }
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
