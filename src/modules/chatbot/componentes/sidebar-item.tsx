"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import { type Chat } from "@/types/chat";
import { tooltipStyles } from "@/styles/tooltip-styles";
import { Tooltip } from "@nextui-org/react";
import { useLocalStorage } from "@/modules/core/hooks/use-local-storage";
import { ChatIcon, UsersIcon } from "@/modules/icons/miscellaneus";
import { cn } from "@/utils/common";
import TooltipCTN from "@/modules/core/components/ui/tooltip-ctn";

interface SidebarItemProps {
  index: number;
  chat: Chat;
  children: React.ReactNode;
}

export function SidebarItem({ index, chat, children }: SidebarItemProps) {
  const pathname = usePathname();

  const isActive = pathname === chat.path;
  const [newChatId, setNewChatId] = useLocalStorage("newChatId", null);
  const shouldAnimate = index === 0 && isActive && newChatId;

  if (!chat?.id) return null;

  return (
    <motion.div
      className="relative h-8"
      variants={{
        initial: {
          height: 0,
          opacity: 0,
        },
        animate: {
          height: "auto",
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
      <div className="absolute left-2 top-1 flex size-6 items-center justify-center">
        {chat.share_path ? (
          <TooltipCTN content="Este es un chat compartido">
            <span>
              <UsersIcon className="size-4 mr-2 mt-1 text-base-color-m dark:text-base-color-dark-m" />
            </span>
          </TooltipCTN>
        ) : (
          <span>
            <ChatIcon className="size-4 mr-2 mt-2 text-base-color-d dark:text-base-color-dark-d" />
          </span>
        )}
      </div>

      <Link
        href={chat.path}
        className={cn(
          "inline-flex flex-col justify-center w-full text-sm px-8 py-2 pr-16 whitespace-nowrap font-semibold text-base-color-h dark:text-base-color-dark-h hover:text-base-color dark:hover:text-white hover:bg-gray-100 dark:hover:bg-base-dark rounded-md transition-colors duration-150",
          isActive && "bg-gray-100 dark:bg-base-dark"
        )}
      >
        <div className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all">
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
        </div>
      </Link>
      {isActive && <div className="absolute right-2 top-1">{children}</div>}
    </motion.div>
  );
}
