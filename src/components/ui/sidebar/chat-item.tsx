"use client";

import { Globe } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { KeyedMutator, useSWRConfig } from "swr";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/kit/sidebar";
import { BetterTooltip } from "@/components/kit/tooltip";
import { updateChatTitle } from "@/db/querys/chat-querys";
import { useChatContext } from "@/hooks/use-chat-context";
import { useChatVisibility } from "@/hooks/use-chat-visibility";
import { useLocalStorage } from "@/hooks/use-local-storage";

import ChatActions from "./chat-actions";

import type { Chat } from "@/db/schema";

interface ChatItemProps {
  index: number;
  chat: Chat;
  isActive: boolean;
  mutate: KeyedMutator<Chat[]>;
}

const ChatItem = ({ index, chat, isActive, mutate }: ChatItemProps) => {
  const { setOpenMobile } = useSidebar();

  const { mutate: mutateTitle } = useSWRConfig();

  const pathname = usePathname();

  const [previousPathname, setPreviousPathname] = useState(pathname);

  const { activeChatId, setActiveChatId } = useChatContext();

  const [newChatId, setNewChatId] = useLocalStorage("new-chat-id", null);

  const [editMode, setEditMode] = useState(false);

  const [chatTitle, setChatTitle] = useState(chat.title);

  const inputRef = useRef<HTMLInputElement>(null);

  const shouldAnimate = index === 0 && isActive && newChatId;

  const { visibilityType } = useChatVisibility({
    chatId: chat.id,
    initialVisibility: chat.visibility,
  });

  useEffect(() => {
    if (!activeChatId) return;

    if (
      pathname === `/essentia-ai/chat/${chat.id}` &&
      previousPathname !== pathname
    ) {
      setActiveChatId(null);
    }
    setPreviousPathname(pathname);
  }, [activeChatId, pathname, chat.id, previousPathname, setActiveChatId]);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();

      const handleFocusIn = () => {
        if (
          editMode &&
          inputRef.current &&
          document.activeElement !== inputRef.current
        ) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      };

      document.addEventListener("focusin", handleFocusIn);
      return () => {
        document.removeEventListener("focusin", handleFocusIn);
      };
    }
  }, [editMode]);

  const handleEditMode = () => {
    setChatTitle(chat.title);
    setEditMode(true);
  };

  const handleSaveTitle = async () => {
    try {
      if (chatTitle.trim() && chatTitle !== chat.title) {
        const res = await updateChatTitle({
          chatId: chat.id,
          title: chatTitle.trim(),
        });
        setChatTitle(chatTitle.trim());
        if (res) {
          mutate((history) => {
            if (history) {
              return history.map((h) =>
                h.id === chat.id ? { ...h, title: chatTitle.trim() } : h,
              );
            }
          });
          mutateTitle(`/api/chat-title?id=${chat.id}`);
        }
      }
    } catch (error) {
      console.error("Error al guardar el título del chat:", error);
    } finally {
      setEditMode(false);
    }
  };

  if (!chat?.id) return null;

  return (
    <SidebarMenuItem>
      <motion.div
        variants={{
          initial: {
            height: 0,
            opacity: 0,
          },
          animate: {
            height: "36px",
            opacity: 1,
          },
        }}
        initial={shouldAnimate ? "initial" : undefined}
        animate={shouldAnimate ? "animate" : undefined}
        transition={{
          duration: 0.25,
          ease: "easeIn",
        }}
      >
        <SidebarMenuButton
          asChild
          isActive={isActive}
          className="hover:bg-accent hover:text-foreground data-[active=true]:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:dark:border-alternative/50"
        >
          {editMode ? (
            <input
              ref={inputRef}
              type="text"
              value={chatTitle}
              autoFocus={editMode}
              onChange={(e) => setChatTitle(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }
              }}
              className="flex w-full rounded outline-0"
            />
          ) : (
            <Link
              href={`/essentia-ai/chat/${chat.id}`}
              onClick={() => setOpenMobile(false)}
            >
              {visibilityType === "public" && (
                <BetterTooltip content="Chat público">
                  <Globe />
                </BetterTooltip>
              )}
              <span
                className="w-full whitespace-nowrap"
                onDoubleClick={handleEditMode}
              >
                {shouldAnimate ? (
                  chat.title.split("").map((character, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        initial: {
                          opacity: 0,
                          x: -100,
                        },
                        animate: {
                          opacity: 1,
                          x: 0,
                        },
                      }}
                      initial={shouldAnimate ? "initial" : undefined}
                      animate={shouldAnimate ? "animate" : undefined}
                      transition={{
                        duration: 0.25,
                        ease: "easeIn",
                        delay: index * 0.05,
                        staggerChildren: 0.05,
                      }}
                      onAnimationComplete={() => {
                        if (index === chat.title.length - 1) {
                          setNewChatId(null);
                        }
                      }}
                    >
                      {character}
                    </motion.span>
                  ))
                ) : (
                  <span>{chat.title}</span>
                )}
              </span>
            </Link>
          )}
        </SidebarMenuButton>
        <ChatActions
          chat={chat}
          isActive={isActive}
          mutate={mutate}
          handleEditMode={handleEditMode}
        />
      </motion.div>
    </SidebarMenuItem>
  );
};

export default ChatItem;
