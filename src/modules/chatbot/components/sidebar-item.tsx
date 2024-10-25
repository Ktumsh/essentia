"use client";

import { motion } from "framer-motion";
import Link from "next/link";


import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import { useLocalStorage } from "@/modules/core/hooks/use-local-storage";
import { ChatIcon, UsersIcon } from "@/modules/icons/miscellaneus";
import { type Chat } from "@/types/chat";
import { cn } from "@/utils/common";

interface SidebarItemProps {
  index: number;
  chat: Chat;
  isActive: boolean;
  children: React.ReactNode;
}

export function SidebarItem({
  index,
  chat,
  isActive,
  children,
}: SidebarItemProps) {
  const [newChatId, setNewChatId] = useLocalStorage("newChatId", null);
  const shouldAnimate = index === 0 && isActive && newChatId;

  if (!chat?.id) return null;

  return (
    <motion.div
      className="group relative h-9"
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
          "inline-flex flex-col justify-center w-full text-sm px-8 py-2 pr-16 whitespace-nowrap font-semibold text-base-color-h dark:text-base-color-dark-h group-hover:text-base-color dark:group-hover:text-white group-hover:bg-gray-100 dark:group-hover:bg-base-dark rounded-md transition-colors duration-150",
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
      {
        <div
          className={cn(
            isActive ? "opacity-100" : "opacity-0",
            "group-hover:opacity-100 transition-opacity absolute right-2 top-1"
          )}
        >
          {children}
        </div>
      }
    </motion.div>
  );
}
