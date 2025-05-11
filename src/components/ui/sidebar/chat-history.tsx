import { Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import { Fragment } from "react";

import {
  groupChatsByDate,
  type ChatHistory as ChatHistoryType,
} from "@/app/(main)/(chat)/_lib/utils";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/kit/sidebar";
import { useChatContext } from "@/hooks/use-chat-context";
import { cn } from "@/lib/utils";

import ChatItem from "./chat-item";

import type { SWRInfiniteKeyedMutator } from "swr/infinite";

interface ChatHistoryProps {
  paginatedChatHistories?: ChatHistoryType[];
  mutate: SWRInfiniteKeyedMutator<ChatHistoryType[]>;
  isValidating: boolean;
  setSize: (
    size: number | ((_size: number) => number),
  ) => Promise<ChatHistoryType[] | undefined>;
  isAtBottom: boolean;
}

const ChatHistory = ({
  paginatedChatHistories,
  mutate,
  isValidating,
  setSize,
  isAtBottom,
}: ChatHistoryProps) => {
  const { id } = useParams();

  const { activeChatId } = useChatContext();

  const hasReachedEnd = paginatedChatHistories
    ? paginatedChatHistories.some((page) => page.hasMore === false)
    : false;

  const hasEmptyChatHistory = paginatedChatHistories
    ? paginatedChatHistories.every((page) => page.chats.length === 0)
    : false;

  const ChatDateTitle = ({ day }: { day: string }) => {
    return (
      <SidebarGroupLabel className="bg-popover md:bg-background sticky top-0 z-1 mt-4 p-2 text-nowrap group-data-[collapsible=icon]:mt-6 first:mt-0 group-data-[collapsible=icon]:first:mt-0">
        {day}
      </SidebarGroupLabel>
    );
  };

  if (hasEmptyChatHistory) {
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
      <>
        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarMenu className="md:max-w-[197px]">
              {paginatedChatHistories &&
                (() => {
                  const chatsFromHistory = paginatedChatHistories.flatMap(
                    (paginatedChatHistory) => paginatedChatHistory.chats,
                  );

                  const groupedChats = groupChatsByDate(chatsFromHistory);

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

              <motion.div
                onViewportEnter={() => {
                  if (!isValidating && !hasReachedEnd) {
                    setSize((size) => size + 1);
                  }
                }}
              />

              {hasReachedEnd ? (
                <div className="text-muted-foreground mt-4 flex w-full flex-row items-center justify-center gap-2 px-2 text-center text-xs">
                  Has llegado al final del historial de chats.
                </div>
              ) : (
                <div className="text-muted-foreground mt-4 flex flex-row items-center justify-center gap-2 p-2">
                  <Loader className="size-4 animate-spin" />
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div
          aria-hidden="true"
          className={cn(
            "from-background via-background/75 pointer-events-none absolute right-2 bottom-0 left-0 z-10 h-16 bg-gradient-to-t opacity-100 transition-opacity",
            {
              "opacity-0": isAtBottom,
            },
          )}
        />
      </>
    );
  }
};

export default ChatHistory;
