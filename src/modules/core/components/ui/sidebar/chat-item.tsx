"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { KeyedMutator } from "swr";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { shareChat } from "@/db/chat-querys";
import { useLocalStorage } from "@/modules/core/hooks/use-local-storage";
import { type Chat } from "@/types/chat";

import ChatActions from "./chat-actions";

interface ChatItemProps {
  index: number;
  chat: Chat;
  isActive: boolean;
  mutate: KeyedMutator<Chat[]>;
}

const ChatItem = ({ index, chat, isActive, mutate }: ChatItemProps) => {
  const { setOpenMobile } = useSidebar();
  const [newChatId, setNewChatId] = useLocalStorage("newChatId", null);
  const shouldAnimate = index === 0 && isActive && newChatId;

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
        <SidebarMenuButton asChild isActive={isActive}>
          <Link href={chat.path} onClick={() => setOpenMobile(false)}>
            <span className="whitespace-nowrap">
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
        </SidebarMenuButton>
        {
          <ChatActions
            chat={chat}
            shareChat={shareChat}
            isActive={isActive}
            mutate={mutate}
          />
        }
      </motion.div>
    </SidebarMenuItem>
  );
};

export default ChatItem;
