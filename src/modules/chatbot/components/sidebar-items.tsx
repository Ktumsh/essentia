"use client";

import { Chat } from "@/types/chat";
import { AnimatePresence, motion } from "framer-motion";
import { SidebarItem } from "./sidebar-item";
import SidebarActions from "./sidebar-actions";
import { usePathname } from "next/navigation";
import { removeChat, shareChat } from "@/db/chat-querys";
import { KeyedMutator } from "swr";

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
