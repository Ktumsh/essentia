"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { KeyedMutator } from "swr";

import { shareChat } from "@/db/chat-querys";
import { Chat } from "@/types/chat";

import SidebarActions from "./sidebar-actions";
import { SidebarItem } from "./sidebar-item";

interface SidebarItemsProps {
  chats?: Chat[];
  mutate: KeyedMutator<Chat[]>;
}

export function SidebarItems({ chats, mutate }: SidebarItemsProps) {
  const pathname = usePathname();

  if (!chats?.length) return null;

  return (
    <AnimatePresence>
      {chats.map((chat, index) => {
        const isActive = pathname === chat.path;

        return (
          chat && (
            <motion.div key={chat?.id}>
              <SidebarItem index={index} chat={chat} isActive={isActive}>
                <SidebarActions
                  chat={chat}
                  shareChat={shareChat}
                  isActive={isActive}
                  mutate={mutate}
                />
              </SidebarItem>
            </motion.div>
          )
        );
      })}
    </AnimatePresence>
  );
}
