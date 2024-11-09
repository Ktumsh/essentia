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
              <UsersIcon className="mr-2 mt-1 size-4 text-main-m dark:text-main-dark-m" />
            </span>
          </TooltipCTN>
        ) : (
          <span>
            <ChatIcon className="mr-2 mt-2 size-4 text-main-l dark:text-main-dark-l" />
          </span>
        )}
      </div>

      <Link
        href={chat.path}
        className={cn(
          "inline-flex w-full flex-col justify-center whitespace-nowrap rounded-md px-8 py-2 pr-16 text-sm font-semibold text-main-h transition-colors duration-150 group-hover:bg-gray-100 group-hover:text-main dark:text-main-dark-h dark:group-hover:bg-dark dark:group-hover:text-white",
          isActive && "bg-gray-100 dark:bg-dark",
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
            "absolute right-2 top-1 transition-opacity group-hover:opacity-100",
          )}
        >
          {children}
        </div>
      }
    </motion.div>
  );
}
