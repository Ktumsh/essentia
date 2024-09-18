"use client";

import { Chat } from "@/types/chat";
import { AnimatePresence, motion } from "framer-motion";
import { SidebarItem } from "./sidebar-item";
import SidebarActions from "./sidebar-actions";
import { removeChat, shareChat } from "@/app/(main)/essentia-ai/actions";
import { usePathname } from "next/navigation";

interface SidebarItemsProps {
  chats?: Chat[];
}

export function SidebarItems({ chats }: SidebarItemsProps) {
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
                  removeChat={removeChat}
                  shareChat={shareChat}
                  isActive={isActive}
                />
              </SidebarItem>
            </motion.div>
          )
        );
      })}
    </AnimatePresence>
  );
}
