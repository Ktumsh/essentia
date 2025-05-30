"use client";

import { Globe } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

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
import ChatEditTitleDialog from "./chat-edit-title-dialog";

import type { ChatHistory } from "@/app/(main)/(chat)/_lib/utils";
import type { Chat } from "@/db/schema";
import type { SWRInfiniteKeyedMutator } from "swr/infinite";

interface ChatItemProps {
  index: number;
  chat: Chat;
  isActive: boolean;
  mutate: SWRInfiniteKeyedMutator<ChatHistory[]>;
}

const ChatItem = ({ index, chat, isActive, mutate }: ChatItemProps) => {
  const { isMobile, setOpenMobile } = useSidebar();

  const { mutate: mutateTitle } = useSWRConfig();

  const pathname = usePathname();

  const [previousPathname, setPreviousPathname] = useState(pathname);

  const { activeChatId, setActiveChatId } = useChatContext();

  const [newChatId, setNewChatId] = useLocalStorage("new-chat-id", null);

  const [openEditTitle, setOpenEditTitle] = useState(false);

  const [chatTitle, setChatTitle] = useState(chat.title);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const shouldAnimate = index === 0 && isActive && newChatId;

  const { visibilityType } = useChatVisibility({
    chatId: chat.id,
    initialVisibilityType: chat.visibility,
  });

  useEffect(() => {
    if (!activeChatId) return;

    if (
      pathname === `/aeris/chat/${chat.id}` &&
      previousPathname !== pathname
    ) {
      setActiveChatId(null);
    }
    setPreviousPathname(pathname);
  }, [activeChatId, pathname, chat.id, previousPathname, setActiveChatId]);

  const handleEditTitle = () => {
    setChatTitle(chat.title);
    setOpenEditTitle(true);
  };

  const handleSaveTitle = async () => {
    try {
      setIsSubmitting(true);
      if (chatTitle.trim() && chatTitle === chat.title) {
        return toast.success("Chat renombrado exitosamente 🎉");
      }

      const res = await updateChatTitle({
        chatId: chat.id,
        title: chatTitle.trim(),
      });
      setChatTitle(chatTitle.trim());
      if (!res) {
        return toast.error("No se ha podido renombrar el chat 😢");
      }
      mutate((pages) => {
        if (!pages) return [];
        return pages.map((page) => ({
          ...page,
          chats: page.chats.map((c) =>
            c.id === chat.id ? { ...c, title: chatTitle.trim() } : c,
          ),
        }));
      }, false);
      mutateTitle(`/api/chat-title?id=${chat.id}`);
      toast.success("Chat renombrado exitosamente 🎉");
    } catch (error) {
      console.error("Error al guardar el título del chat:", error);
    } finally {
      setOpenEditTitle(false);
      setIsSubmitting(false);
    }
  };

  if (!chat?.id) return null;

  return (
    <>
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
            className="hover:bg-accent hover:text-foreground data-[active=true]:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:dark:border-alternative/50 data-[active=true]:border-0 data-[active=true]:shadow-none"
          >
            <Link
              href={`/aeris/chat/${chat.id}`}
              onClick={() => setOpenMobile(false)}
            >
              {visibilityType === "public" && (
                <BetterTooltip content="Chat público">
                  <Globe />
                </BetterTooltip>
              )}
              <span
                className="w-full whitespace-nowrap"
                onDoubleClick={isMobile ? undefined : handleEditTitle}
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
          </SidebarMenuButton>
          <ChatActions
            chat={chat}
            isActive={isActive}
            mutate={mutate}
            handleEditMode={handleEditTitle}
          />
        </motion.div>
      </SidebarMenuItem>
      <ChatEditTitleDialog
        open={openEditTitle}
        setOpen={setOpenEditTitle}
        onSaveTitle={handleSaveTitle}
        chatTitle={chatTitle}
        setChatTitle={setChatTitle}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default ChatItem;
